"""Build the offline Windows ZIP from the current canonical web app. No dependencies."""
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parent
output = root / 'ollama-local-windows.zip'
files = {
    'index.html': root / 'index.html',
    'THIRD_PARTY_LICENSES.txt': root / 'THIRD_PARTY_LICENSES.txt',
    **{name: root / 'local' / name for name in ['bridge.py', 'BASLAT.cmd', 'README.txt']},
}
with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
    for name, source in files.items():
        archive.write(source, 'Local-Ollama/' + name)
print(output)
