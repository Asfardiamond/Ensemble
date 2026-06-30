from pathlib import Path

path = Path(r"c:\Users\user\Downloads\Website Creation\src\app\App.tsx")
text = path.read_text(encoding="utf-8")
replacements = {
    "â”€": "",
    "â€”": "—",
    "â€“": "–",
    "â†’": "→",
    "â¤": "♥",
    "Â©": "©",
    "Â·": "·",
}
for old, new in replacements.items():
    text = text.replace(old, new)
path.write_text(text, encoding="utf-8")
print("ok")
