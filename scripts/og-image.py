# Genera el SVG de la imagen para compartir (1200×630) con la estética del hero en modo oscuro.
# El texto se convierte en trazos con las fuentes Geist del proyecto, así no depende de las fuentes
# del sistema. Lo llama scripts/og-image.mjs, que lo pasa a JPEG con sharp.
# Uso: uv run --with fonttools --with brotli scripts/og-image.py es|en
import sys
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = Path(__file__).resolve().parent.parent
GEIST = ROOT / 'node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'
MONO = ROOT / 'node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2'

TEXT = {
    'es': {'status': 'DISPONIBLE · REMOTO · TIEMPO COMPLETO', 'role': 'Desarrollador Full-Stack'},
    'en': {'status': 'AVAILABLE · REMOTE · FULL-TIME', 'role': 'Full-Stack Developer'},
}
BG, SURFACE, LINE, FG, MUTED, FAINT, OK = '#0b0b0c', '#131315', '#2f2f33', '#ededee', '#9a9aa0', '#6a6a70', '#4ade80'

_fonts = {}


def font(path, wght):
    key = (path, wght)
    if key not in _fonts:
        _fonts[key] = instantiateVariableFont(TTFont(path), {'wght': wght})
    return _fonts[key]


def text(path, wght, s, size, x, y, fill, tracking=0.0):
    """Trazo SVG del texto con la línea base en y; devuelve (svg, ancho)."""
    f = font(path, wght)
    scale = size / f['head'].unitsPerEm
    cmap, glyphs, hmtx = f.getBestCmap(), f.getGlyphSet(), f['hmtx']
    cx, parts = x, []
    for ch in s:
        name = cmap[ord(ch)]
        pen = SVGPathPen(glyphs)
        glyphs[name].draw(TransformPen(pen, (scale, 0, 0, -scale, cx, y)))
        parts.append(pen.getCommands())
        cx += hmtx[name][0] * scale + tracking * size
    return f'<path fill="{fill}" d="{"".join(parts)}"/>', cx - x


def main(lang):
    t = TEXT[lang]
    out = []
    # Píldora de estado
    label, w = text(MONO, 500, t['status'], 17, 0, 0, MUTED, 0.03)
    label, _ = text(MONO, 500, t['status'], 17, 80 + 42, 96 + 27, MUTED, 0.03)
    out.append(f'<rect x="80.5" y="96.5" width="{w + 42 + 18:.0f}" height="40" rx="20" fill="{SURFACE}" stroke="{LINE}"/>')
    out.append(f'<circle cx="{80 + 24}" cy="116.5" r="5" fill="{OK}"/>')
    out.append(label)
    # Nombre
    out.append(text(GEIST, 500, 'Juan Diego', 100, 76, 270, FG, -0.04)[0])
    out.append(text(GEIST, 500, 'Díaz Avendaño', 100, 76, 372, MUTED, -0.04)[0])
    # Rol y stack
    role, rw = text(GEIST, 500, t['role'], 34, 80, 456, FG, -0.015)
    sep, sw = text(GEIST, 400, '·', 34, 80 + rw + 12, 456, FAINT)
    stack, _ = text(GEIST, 500, 'Java, Spring Boot, React, React Native', 34, 80 + rw + 12 + sw + 12, 456, MUTED, -0.015)
    out += [role, sep, stack]
    # Dirección del sitio
    out.append(text(MONO, 500, 'juandiegodiaz-dev.web.app', 22, 80, 556, FAINT, 0.01)[0])

    print(f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="11" cy="11" r="1.2" fill="{FG}" fill-opacity="0.13"/>
    </pattern>
    <radialGradient id="fade" cx="0.78" cy="0.3" r="0.75" gradientTransform="translate(0.78 0.3) scale(1 1.1) translate(-0.78 -0.3)">
      <stop offset="0.1" stop-color="#fff"/>
      <stop offset="0.72" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="m"><rect width="1200" height="630" fill="url(#fade)"/></mask>
  </defs>
  <rect width="1200" height="630" fill="{BG}"/>
  <rect width="1200" height="630" fill="url(#dots)" mask="url(#m)"/>
  {chr(10).join(out)}
</svg>''')


if __name__ == '__main__':
    main(sys.argv[1])
