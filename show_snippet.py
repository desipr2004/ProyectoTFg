from pathlib import Path
text = Path("Frontend/Diseno/index.html").read_text(encoding="utf-8")
for line in text.splitlines()[18:30]:
    print(repr(line))
