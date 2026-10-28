"""Build the two self-contained Flâner editions from one maintained template."""
from pathlib import Path
import re
ROOT=Path(__file__).resolve().parents[1]
base=(ROOT/'scripts/flaner-template.html').read_text()
out=ROOT/'apps/flaner';out.mkdir(exist_ok=True)
local=base.replace('__EDITION__','Local')
# Download is not a service worker origin; don't register one from a local server.
local=local.replace('prepareOffline();',"$('offlineStatus').textContent='Tek HTML • Ollama + Nano + Anki';")
(out/'flaner.html').write_text(local)
web=base.replace('__EDITION__','Web')
web=web.replace("state.engine=state.engine==='chrome'?'chrome':'ollama';","state.engine='chrome';")
web=web.replace("state.engine=$('engine').value;","state.engine='chrome';")
web=web.replace('↓ Tek HTML indir · Ollama + Nano + Anki','↓ HTML indir · Ollama + Nano + Anki')
web=re.sub(r'<select id="engine".*?</select>','<span>Chrome • Gemini Nano</span><select id="engine" hidden><option value="chrome">Chrome • Gemini Nano</option></select>',web,count=1)
for id in ['model','think']:
 web=web.replace(f'<select id="{id}"',f'<select hidden id="{id}"',1)
web=web.replace('<button id="connect">Bağlan</button>','<button id="connect">Nano’yu kontrol et</button>')
web=re.sub(r'<button id="ollamaFix".*?</button>','',web,count=1)
web=re.sub(r'<dialog id="ollamaRepair">.*?</dialog>','',web,count=1,flags=re.S)
a=web.index("$('ollamaFix').onclick=");e=web.index("$('helpOpen').onclick=",a);web=web[:a]+web[e:]
web=web.replace('Ollama bağlantısı bekleniyor','Nano bağlantısı bekleniyor')
web=web.replace('Enter: gönder · Shift+Enter: yeni satır · Anki’ye ekleme yalnızca sen düğmeye bastığında yapılır.','Enter: gönder · Shift+Enter: yeni satır · by Dr. Suat ATAN')
# No Anki action or dialog in the hosted edition.
web=re.sub(r"if\(m.role==='assistant'\)tools.append\(action\('Anki’ye ekle'.*?openAnki\(\);\}\)\);",'',web,count=1)
a=web.index('async function ankiCall(');e=web.index('if(!state.sessions.length)newChat();',a);web=web[:a]+web[e:]
web=re.sub(r'<dialog id="anki">.*?</dialog>','',web,count=1,flags=re.S)
web=web.replace("$('ankiHelp').onclick=()=>$('help').showModal();",'').replace("$('origin').textContent=location.origin;",'')
# Settings expose only the actual Nano controls and editable prompts.
settings='''<dialog id="settings"><button class="close" data-close="settings">Kapat</button><h2>Flâner · Nano ayarları</h2><p>Bu ayarlar her sohbet için ayrı saklanır. Varsayılan açıklama dili Türkçe. Nano’da Türkçe resmi olarak desteklenmediğinden bu yönerge deneyseldir; model reddedebilir.</p><label>Genel system prompt<textarea id="chromeSystem" rows="5"></textarea></label><label>Fransızca modu system promptu<textarea id="chromeFrenchSystem" rows="7"></textarea></label><label>Nano yanıt dili<select id="chromeLanguage"><option value="tr">Türkçe · Nano’da deneysel</option><option value="en">English</option><option value="fr">Français</option></select></label><p class="hint">Fransızca modunda genel prompt ile Fransızca promptu birlikte gönderilir. Nano’nun sayısal temperature / token ayarı burada sunulmaz.</p><button id="saveSettings" class="primary">Kaydet</button><p id="settingsStatus" role="status"></p></dialog>'''
web=re.sub(r'<dialog id="settings">.*?</dialog>',settings,web,count=1,flags=re.S)
a=web.index("$('settingsOpen').onclick=");e=web.index("$('helpOpen').onclick=",a)
web=web[:a]+'''$('settingsOpen').onclick=()=>{for(const id of ['chromeSystem','chromeFrenchSystem','chromeLanguage'])$(id).value=current().cfg[id]??defaults[id];$('settings').showModal();};
$('saveSettings').onclick=()=>{for(const id of ['chromeSystem','chromeFrenchSystem','chromeLanguage'])current().cfg[id]=$(id).value;save();$('settings').close();checkNano();};
'''+web[e:]
a=web.index('async function discoverModels()');e=web.index("$('connect').onclick=",a)
web=web[:a]+"async function discoverModels(){await checkNano();}\n"+web[e:]
a=web.index('function engineControls()');e=web.index('async function checkNano()',a)
web=web[:a]+"function engineControls(){$('prepareNano').hidden=false;}\n"+web[e:]
help='''<dialog id="help"><button class="close" data-close="help">Kapat</button><h2>Flâner · Web</h2><div class="help"><h3>Gemini Nano’yu hazırla</h3><p>Web sürümü yalnızca Chrome Prompt API / Gemini Nano kullanır. Güncel masaüstü Google Chrome’da <b>Nano hazırla / indir</b> düğmesine bas. İlk indirme İnternet ve uygun cihaz gerektirir. API veya cihaz uygun değilse <b>Chrome API tanılama</b> ekranını aç.</p><p>Türkçe cevap yönergesi varsayılandır; Nano’nun Türkçe desteği resmi değildir ve model yanıtı reddedebilir. <a href="https://developer.chrome.com/docs/ai/get-started" target="_blank" rel="noopener">Chrome gereksinimleri</a>. Fransızca–Türkçe çalışma için Ollama destekli HTML’i indir.</p><h3>Ollama ve Anki için tek HTML</h3><p><a href="https://suatatan.com/apps/flaner/flaner.html" download="flaner.html">Flâner HTML’i indir</a>. Dosya sürümünde Ollama, Nano ve AnkiConnect bulunur. İlk yerel bağlantı için dosyanın yardımındaki servis izinlerini ayarla. Web sürümü Anki’ye bağlanmaz.</p><h3>Sohbetler</h3><p>Sohbetler bu tarayıcıda saklanır. Dosya ve web sürümleri arasında Yedekle / İçe aktar kullan. İnternet varken çevrimdışı arayüzün hazır olduğunu kontrol et; Nano modeli cihazda kaldığı sürece çevrimdışı kullanılabilir.</p></div></dialog>'''
web=re.sub(r'<dialog id="help">.*?</dialog>',help,web,count=1,flags=re.S)
web=web.replace('Türkçe için Ollama’yı seç.','Türkçe için Ollama destekli HTML’i indir.')
(out/'index.html').write_text(web)
# Keep the old address and existing storage compatible.
(ROOT/'apps/ollama-local/index.html').write_text(web)
worker=(ROOT/'apps/ollama-local/sw.js').read_text().replace('v9-turkish-20261028','v10-anki-permission-20261028')
(ROOT/'apps/ollama-local/sw.js').write_text(worker)
(out/'sw.js').write_text(worker.replace('suat-ollama-local-','suat-flaner-'))
