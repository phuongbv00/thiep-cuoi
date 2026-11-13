# Ảnh cưới

Bộ ảnh studio có 30 ảnh (5000–8000px, 12–25MB/ảnh). Mỗi ảnh xuất hiện **đúng một lần** trên thiệp: 4 ảnh ở vị trí riêng + 26 ảnh trong album. Ảnh nào thiếu sẽ tự hiện khung placeholder.

Kích thước tính cho màn hình điện thoại 3x (ngang tối đa 430 điểm → cần 1290px).

## Ảnh chính

| Tên file | Vị trí trên thiệp | Ảnh gốc | Kích thước |
|---|---|---|---|
| `cover.jpg` | Bìa toàn màn hình (được preload) | 1M4A3882 | ngang 1290px |
| `portrait.jpg` | Khung vòm "Mãi bên nhau" | 1M4A4036 | 1067×1600 |
| `couple.jpg` | Ảnh ngang mở đầu Album | 1M4A3886 | 1600×1067 |
| `footer.jpg` | Kết thiệp "Thank you" | 1M4A4622 | ngang 1290px |
| `detail.jpg` | Nền rất mờ phía sau lịch | cắt phần tường hoa (không có người) từ 1M4A4073 | 1200px |

`cover.jpg` đã qua chỉnh sửa: cắt bớt nền bên phải, kéo dài nền trên/dưới để màn hình dọc thấy đủ hai người, và lấp khe hở giữa hai chân chú rể.

## Album (26 ảnh)

Bố cục lặp mỗi 6 ảnh: 1 ô lớn + 5 ô nhỏ (ô lớn: 01, 07, 13, 19, 25). Nếu số ảnh chia 6 dư 2 (như 26), khối cuối tự thành 1 ô lớn + 1 ô cao, không bị trống ô.

- `album-XX.jpg`: bản xem phóng to, ngang 1290px.
- `thumbs/album-XX.jpg`: bản cho lưới album, ngang 480px (ô lớn 800px, ô cao cuối 560px). Thiếu thumb thì tự dùng bản lớn.

| File | Ảnh gốc | File | Ảnh gốc | File | Ảnh gốc | File | Ảnh gốc | File | Ảnh gốc |
|---|---|---|---|---|---|---|---|---|---|
| 01 | 4093 | 07 | 4260 | 13 | 4058 | 19 | 4266 | 25 | 4219 |
| 02 | 3880 | 08 | 4073 | 14 | 4162 | 20 | 4156 | 26 | 4417 |
| 03 | 4135 | 09 | 4635 | 15 | 4031 | 21 | 4197 | | |
| 04 | 3894 | 10 | 4014 | 16 | 4428 | 22 | 3835 | | |
| 05 | 4558 | 11 | 4556 | 17 | 4269 | 23 | 4223 | | |
| 06 | 4370 | 12 | 4297 | 18 | 3695 | 24 | 4094 | | |

Muốn thêm/bớt ảnh album: sửa danh sách `album` trong `assets/js/config.js` và tạo thumb tương ứng. Khi thay nội dung một file ảnh đã đăng, tăng số `?v=` của ảnh đó trong `config.js` để máy khách không dùng ảnh cũ.

## Cách nén (đã áp dụng)

JPEG progressive, quality ~78–82, đã xoá EXIF. Ví dụ với ImageMagick:

```bash
convert goc.jpg -auto-orient -resize 1290x -strip -interlace JPEG -quality 80 album-27.jpg
convert album-27.jpg -resize 480x -strip -interlace JPEG -quality 78 thumbs/album-27.jpg
```

## Ảnh xem trước khi chia sẻ link

`og-image.jpg` (1200×630) hiện khi gửi link qua Zalo, Messenger, Facebook, cắt từ ảnh gốc 1M4A3886. Khi thay ảnh này, tăng số `?v=` của `og-image.jpg` trong `index.html` để các app không dùng ảnh cũ đã lưu.
`apple-touch-icon.png` là biểu tượng khi khách lưu thiệp ra màn hình chính.
