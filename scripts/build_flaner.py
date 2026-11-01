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
# Hosted editions are maintained separately: do not overwrite live API/theme features.
# Run this build to regenerate only the downloadable single-file edition.
