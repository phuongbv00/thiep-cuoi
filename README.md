# Thiệp cưới online · Việt Phương & Hương Giang

Website thiệp cưới tĩnh (HTML/CSS/JS thuần, không cần build), nền màu kem, tối ưu cho điện thoại.

## Tính năng
- Màn hình "phong bì" mở thiệp, hiện tên khách mời
- Bìa ảnh + Save the date, thông tin hai bên gia đình, cô dâu & chú rể
- Thông tin lễ/tiệc theo từng bên, nút **Chỉ đường** (Google Maps) và **Lưu vào lịch** (Google Calendar), bản đồ nhúng
- Lịch tháng 11/2026 + đồng hồ đếm ngược
- Album ảnh có xem phóng to
- Nhạc nền ("Lễ Đường" – Kai Đinh), hiệu ứng cánh hoa rơi

## Link gửi khách
| Tham số | Giá trị | Ý nghĩa |
|---|---|---|
| `side` | `groom` / `bride` | Thiệp nhà trai / nhà gái. Bỏ trống: hiện cả hai bên, có tab chuyển |
| `guest` | tên khách | Hiện "Thân mời …" (không bắt buộc) |

Ví dụ:
- Nhà trai: `?side=groom&guest=Anh%20Nam`
- Nhà gái: `?side=bride&guest=C%C3%B4%20Lan`

Dấu cách trong tên viết `%20`. Link cũ dạng `?ben=trai&to=...` vẫn chạy.

## Chỉnh nội dung
Mọi nội dung nằm trong `assets/js/config.js`.
Sau khi sửa CSS/JS, tăng số `?v=` trong `index.html` để trình duyệt của khách tải bản mới. Ảnh: xem `images/README.md`. Nhạc: đặt file `music/song.mp3`.

## Chạy thử
```bash
python3 -m http.server 8000
```
Mở http://localhost:8000

## Đăng lên GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → chọn nhánh và thư mục `/ (root)`.

