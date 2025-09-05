# Run: python tools/make_icons.py
from PIL import Image
import base64, json, os

SRC = os.path.join(os.path.dirname(__file__), "source-logo.png")  # your round PNG
OUT = os.path.join(os.path.dirname(__file__), "..", "icons")
os.makedirs(OUT, exist_ok=True)

img = Image.open(SRC).convert("RGBA")
s = max(img.size)
can = Image.new("RGBA",(s,s),(0,0,0,0))
can.paste(img, ((s-img.size[0])//2, (s-img.size[1])//2))
img = can

targets = {
  "nterah-logo.png":768,
  "nterah-logo-64.png":64,
  "favicon-16x16.png":16,
  "favicon-32x32.png":32,
  "apple-touch-icon.png":180,
  "android-chrome-192x192.png":192,
  "android-chrome-512x512.png":512,
}
for name, size in targets.items():
  img.resize((size,size), Image.LANCZOS).save(os.path.join(OUT,name), "PNG", optimize=True)

# ICO multi-size
img.save(os.path.join(OUT,"favicon.ico"), sizes=[(16,16),(32,32),(48,48),(64,64)])

# SVG wrapper embedding the 64px PNG for broad support
b64 = base64.b64encode(open(os.path.join(OUT,"nterah-logo-64.png"),"rb").read()).decode("ascii")
open(os.path.join(OUT,"nterah-logo.svg"),"w",encoding="utf-8").write(
  '<?xml version="1.0" encoding="UTF-8"?>\n'
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">'
  f'<image href="data:image/png;base64,{b64}" width="64" height="64"/></svg>'
)

# manifest at repo root
manifest = {
  "name":"Ntembeko Zifuku",
  "short_name":"NZ",
  "icons":[
    {"src":"/icons/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},
    {"src":"/icons/android-chrome-512x512.png","sizes":"512x512","type":"image/png","purpose":"any maskable"}
  ],
  "theme_color":"#5b7da8",
  "background_color":"#ffffff",
  "display":"standalone"
}
open(os.path.join(os.path.dirname(__file__), "..", "site.webmanifest"),"w",encoding="utf-8").write(json.dumps(manifest, indent=2))
print("✅ /icons created + site.webmanifest written.")
