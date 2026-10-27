"""Local / Ollama: loopback-only app and fixed Ollama/Anki bridge (stdlib only)."""
import argparse
import json
import secrets
import sys
import threading
import urllib.error
import urllib.request
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
MAX_BODY = 8 * 1024 * 1024
ANKI_ACTIONS = {'version', 'deckNames', 'modelNames', 'modelFieldNames', 'addNote'}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


class LocalServer(ThreadingHTTPServer):
    daemon_threads = True
    allow_reuse_address = True

    def __init__(self, port=18765, app_dir=ROOT):
        self.app_dir = Path(app_dir).resolve()
        self.token = secrets.token_urlsafe(32)
        self.opener = urllib.request.build_opener(urllib.request.ProxyHandler({}), NoRedirect())
        # Targets are fixed loopback addresses, never supplied by the web client.
        self.ollama_target = 'http://127.0.0.1:11434'
        self.anki_target = 'http://127.0.0.1:8765'
        super().__init__(('127.0.0.1', port), Handler)
        self.origin = 'http://127.0.0.1:' + str(self.server_port)


class Handler(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'

    def log_message(self, fmt, *args):
        # Do not log prompts, card fields, API keys or the per-run token.
        pass

    def trusted(self, token=False):
        if self.headers.get_all('Host') != ['127.0.0.1:' + str(self.server.server_port)]:
            self.reply(403, {'error': 'Invalid local Host header'})
            return False
        origin = self.headers.get('Origin')
        if origin and origin != self.server.origin:
            self.reply(403, {'error': 'Only this local app may access the bridge'})
            return False
        if self.headers.get('Sec-Fetch-Site') == 'cross-site':
            self.reply(403, {'error': 'Cross-site requests are not allowed'})
            return False
        if token and not secrets.compare_digest(self.headers.get('X-Local-Token', '').encode('utf-8'), self.server.token.encode('utf-8')):
            self.reply(403, {'error': 'Local token expired. Reload the local app.'})
            return False
        return True

    def headers_for(self, code, content_type, length=None):
        self.send_response(code)
        self.send_header('Content-Type', content_type)
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'none'; worker-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'")
        if length is not None:
            self.send_header('Content-Length', str(length))
        else:
            self.send_header('Connection', 'close')
            self.close_connection = True
        self.end_headers()

    def reply(self, code, value):
        payload = json.dumps(value, ensure_ascii=False).encode('utf-8')
        self.headers_for(code, 'application/json; charset=utf-8', len(payload))
        self.wfile.write(payload)

    def do_GET(self):
        if not self.trusted():
            return
        if self.path in ('/', '/index.html'):
            text = (self.server.app_dir / 'index.html').read_text(encoding='utf-8')
            settings = json.dumps({'token': self.server.token, 'version': 1})
            marker = "<script>\n'use strict';"
            if marker not in text:
                self.reply(500, {'error': 'App package incomplete. Download and extract it again.'})
                return
            text = text.replace(marker, '<script>window.LOCAL_BRIDGE=' + settings + ';</script>\n' + marker, 1)
            payload = text.encode('utf-8')
            self.headers_for(200, 'text/html; charset=utf-8', len(payload))
            self.wfile.write(payload)
        elif self.path == '/health':
            self.reply(200, {'app': 'suat-ollama-local', 'version': 1})
        elif self.path == '/ollama/api/tags':
            if self.trusted(token=True):
                self.proxy(self.server.ollama_target + '/api/tags', 'GET', None, 'Ollama')
        elif self.path == '/favicon.ico':
            self.headers_for(204, 'image/x-icon', 0)
        else:
            self.reply(404, {'error': 'Not found'})

    def do_POST(self):
        if not self.trusted(token=True):
            self.close_connection = True
            return
        if self.headers.get('Transfer-Encoding'):
            self.reply(400, {'error': 'Transfer encoding is not supported'})
            self.close_connection = True
            return
        try:
            length = int(self.headers.get('Content-Length', '0'))
            if not 0 < length <= MAX_BODY:
                raise ValueError('Request size is invalid (maximum 8 MB)')
            if self.headers.get_content_type() != 'application/json':
                raise ValueError('JSON content type required')
            raw = self.rfile.read(length)
            if len(raw) != length:
                raise ValueError('Incomplete request')
            body = json.loads(raw)
            if not isinstance(body, dict):
                raise ValueError('JSON object required')
        except (ValueError, UnicodeDecodeError) as error:
            self.reply(400, {'error': str(error)})
            self.close_connection = True
            return
        if self.path in ('/ollama/api/show', '/ollama/api/chat'):
            self.proxy(self.server.ollama_target + self.path[len('/ollama'):], 'POST', raw, 'Ollama')
        elif self.path == '/anki':
            if not isinstance(body.get('action'), str) or body.get('action') not in ANKI_ACTIONS or body.get('version') != 6:
                self.reply(403, {'error': 'This Anki action is not enabled in the local app'})
                return
            params = body.get('params', {})
            if not isinstance(params, dict):
                self.reply(400, {'error': 'Invalid Anki params'})
                return
            if body.get('action') == 'addNote':
                # Only text notes: no automatic audio/video downloads or other side effects.
                note = params.get('note', {})
                if not isinstance(note, dict) or not set(note).issubset({'deckName', 'modelName', 'fields', 'options', 'tags'}):
                    self.reply(400, {'error': 'Only text cards can be added by this app'})
                    return
            self.proxy(self.server.anki_target, 'POST', raw, 'Anki')
        else:
            self.reply(404, {'error': 'Not found'})

    def proxy(self, target, method, payload, service):
        headers = {'Content-Type': 'application/json'} if payload is not None else {}
        request = urllib.request.Request(target, data=payload, headers=headers, method=method)
        # No Origin/Referer is forwarded: these are local server-to-server requests.
        try:
            upstream = self.server.opener.open(request, timeout=600 if self.path.endswith('/api/chat') else 20)
        except urllib.error.HTTPError as error:
            self.reply(error.code, {'error': service + ': ' + error.read(4096).decode('utf-8', errors='replace')})
            return
        except (urllib.error.URLError, TimeoutError, OSError):
            message = ('Ollama bağlantısı kurulamadı. Ollama uygulamasını açıp Bağlan düğmesine bas.' if service == 'Ollama' else
                       'Anki bağlantısı kurulamadı. Masaüstü Anki ve AnkiConnect açık olmalı. Varsayılan port: 8765. API anahtarı varsa Ayarlar alanına gir.')
            self.reply(502, {'error': message})
            return
        with upstream:
            self.headers_for(upstream.status, upstream.headers.get('Content-Type', 'application/json'))
            try:
                while True:
                    chunk = upstream.read1(8192)
                    if not chunk:
                        break
                    self.wfile.write(chunk)
                    self.wfile.flush()
            except (BrokenPipeError, ConnectionResetError, TimeoutError, OSError):
                self.close_connection = True


def main():
    parser = argparse.ArgumentParser(description='Local / Ollama and Anki bridge')
    parser.add_argument('--port', type=int, default=18765)
    parser.add_argument('--no-browser', action='store_true')
    args = parser.parse_args()
    if not (ROOT / 'index.html').is_file():
        print('index.html is missing. Extract all ZIP contents before starting.')
        return 1
    try:
        server = LocalServer(args.port)
    except OSError as error:
        print('Could not start the local app on port', args.port, '-', error)
        print('If it is already running, open http://127.0.0.1:' + str(args.port))
        return 1
    print('Local / Ollama:', server.origin)
    print('Keep this window open. Stop with Ctrl+C or close the window.')
    print('Ollama: 127.0.0.1:11434 | AnkiConnect: 127.0.0.1:8765')
    if not args.no_browser:
        threading.Timer(0.5, lambda: webbrowser.open(server.origin)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
    return 0


if __name__ == '__main__':
    sys.exit(main())
