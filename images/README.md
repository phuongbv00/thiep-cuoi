# Ảnh cưới

Ảnh gốc từ studio (5000–8000px, 12–25MB/ảnh) đã được thu nhỏ và nén lại. Ảnh nào thiếu sẽ tự hiện khung placeholder.

## Ảnh chính

| Tên file | Vị trí trên thiệp | Ảnh gốc | Cạnh dài |
|---|---|---|---|
| `cover.jpg` | Bìa toàn màn hình (được preload) | 1M4A3882 | 1800px |
| `portrait.jpg` | Khung vòm "Mãi bên nhau" | 1M4A4036 | 1600px |
| `couple.jpg` | Ảnh ngang mở đầu Album | 1M4A3886 | 1600px |
| `detail.jpg` | Nền mờ phía sau lịch | cắt tường hoa từ 1M4A4073 | 1200px |
| `footer.jpg` | Kết thiệp "Thank you" | 1M4A4622 | 1600px |

## Album (18 ảnh)

Bố cục lặp mỗi 6 ảnh: 1 ô lớn + 5 ô nhỏ (ô lớn: 01, 07, 13).

- `album-XX.jpg`: bản xem phóng to, cạnh dài 1400px.
- `thumbs/album-XX.jpg`: bản thu nhỏ 720px cho lưới album (~30KB/ảnh). Thiếu thumb thì tự dùng bản lớn.

| File | Ảnh gốc | File | Ảnh gốc | File | Ảnh gốc |
|---|---|---|---|---|---|
| 01 | 4093 | 07 | 4260 | 13 | 4058 |
| 02 | 3880 | 08 | 4073 | 14 | 4162 |
| 03 | 4135 | 09 | 4635 | 15 | 4031 |
| 04 | 3894 | 10 | 4014 | 16 | 4428 |
| 05 | 4558 | 11 | 4556 | 17 | 4269 |
| 06 | 4370 | 12 | 4297 | 18 | 3695 |

Muốn thêm/bớt ảnh album: sửa danh sách `album` trong `assets/js/config.js` (nên là bội số của 6) và tạo thêm thumb tương ứng.

## Cách nén (đã áp dụng)

JPEG progressive, quality ~78–80, đã xoá EXIF (ảnh lớn ~100KB, thumb ~30KB). Ví dụ với ImageMagick:

```bash
convert goc.jpg -auto-orient -resize 1400x1400 -strip -interlace JPEG -quality 78 album-19.jpg
convert album-19.jpg -resize 720x720 -strip -interlace JPEG -quality 76 thumbs/album-19.jpg
```

## Ảnh xem trước khi chia sẻ link

`og-image.jpg` (1200×630) hiện khi gửi link qua Zalo, Messenger, Facebook, cắt từ ảnh gốc 1M4A3886. Khi thay ảnh này, tăng số `?v=` của `og-image.jpg` trong `index.html` để các app không dùng ảnh cũ đã lưu.
`apple-touch-icon.png` là biểu tượng khi khách lưu thiệp ra màn hình chính.
