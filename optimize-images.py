"""
Amino Cure - سكربت تحويل الصور إلى WebP خفيف

الاستخدام:
1) ثبّت المكتبة مرة واحدة:   pip install pillow
2) ضع هذا الملف في مجلد الموقع (بجوار الصور) ثم شغّله:   python optimize-images.py

ماذا يفعل؟
- certificate*.png  ->  certificate*.webp  (عرض 900px)
- profile.png       ->  profile.webp       (640px)
- logo.png          ->  logo.webp          (240px، مع الحفاظ على الشفافية)

ملفات PNG الأصلية لا تُعدَّل ولا تُحذف (تُستخدم عند الضغط على الشهادة لعرضها كاملة).
الصور التي لها نسخة webp جاهزة يتم تخطيها. لإعادة التحويل: python optimize-images.py --force
"""

import sys
from pathlib import Path

from PIL import Image

FORCE = "--force" in sys.argv
FOLDER = Path(__file__).resolve().parent

# (نمط الملفات، أقصى عرض، أقصى ارتفاع، الجودة)
RULES = [
    ("certificate*.png", 900, 1000, 80),
    ("profile.png", 640, 640, 85),
    ("logo.png", 240, 240, 90),
]


def convert(path: Path, max_w: int, max_h: int, quality: int) -> None:
    target = path.with_suffix(".webp")
    if target.exists() and not FORCE:
        print(f"تخطي (موجود): {target.name}")
        return

    with Image.open(path) as img:
        has_alpha = img.mode in ("RGBA", "LA") or "transparency" in img.info
        img = img.convert("RGBA" if has_alpha else "RGB")
        img.thumbnail((max_w, max_h), Image.LANCZOS)
        img.save(target, "WEBP", quality=quality, method=6)

    before = path.stat().st_size // 1024
    after = target.stat().st_size // 1024
    print(f"{path.name}: {before}KB -> {target.name}: {after}KB")


def main() -> None:
    found = False
    for pattern, max_w, max_h, quality in RULES:
        for path in sorted(FOLDER.glob(pattern)):
            found = True
            convert(path, max_w, max_h, quality)
    if not found:
        print("لم أجد صورًا PNG في هذا المجلد. ضع السكربت بجوار الصور.")
    else:
        print("تم.")


if __name__ == "__main__":
    main()
