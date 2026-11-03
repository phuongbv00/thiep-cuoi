# Thiệp cưới online · Việt Phương & Hương Giang

Website thiệp cưới tĩnh (HTML/CSS/JS thuần, không cần build), nền màu kem, tối ưu cho điện thoại.

## Tính năng
- Màn hình "phong bì" mở thiệp, hiện tên khách mời
- Bìa ảnh + Save the date, thông tin hai bên gia đình, cô dâu & chú rể
- Thông tin lễ/tiệc theo từng bên, nút **Chỉ đường** (Google Maps) và **Lưu vào lịch** (Google Calendar), bản đồ nhúng
- Lịch tháng 11/2026 + đồng hồ đếm ngược
- Album ảnh có xem phóng to
- Form xác nhận tham dự (RSVP) gửi về Google Sheets
- Hộp mừng cưới (QR + số tài khoản, nút sao chép)
- Nhạc nền, hiệu ứng cánh hoa rơi

## Link gửi khách
| Link | Hiển thị |
|---|---|
| `index.html?ben=trai&to=Anh%20Nam` | Thiệp nhà trai (Lễ Thành Hôn + Tiệc tại Trống Đồng Palace) |
| `index.html?ben=gai&to=Cô%20Lan` | Thiệp nhà gái (Tiệc 28/11 + Lễ Vu Quy 29/11 tại Thái Nguyên) |
| `index.html` | Cả hai bên, có tab chuyển |

`to` là tên khách (dấu cách viết `%20`, có thể bỏ trống).

## Chỉnh nội dung
Mọi nội dung nằm trong `assets/js/config.js`. Ảnh: xem `images/README.md`. Nhạc: đặt file `music/song.mp3`.

## Chạy thử
```bash
python3 -m http.server 8000
```
Mở http://localhost:8000

## Đăng lên GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → chọn nhánh và thư mục `/ (root)`.

## Lưu RSVP vào Google Sheets
1. Tạo Google Sheet, hàng 1 ghi: `time | name | attend | guests | side | invite | message`
2. Extensions → Apps Script, dán:
   ```js
   function doPost(e) {
     var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
     var p = e.parameter;
     sh.appendRow([p.time, p.name, p.attend, p.guests, p.side, p.invite, p.message]);
     return ContentService.createTextOutput("ok");
   }
   ```
3. Deploy → New deployment → Web app → *Execute as: Me*, *Who has access: Anyone* → copy URL
4. Dán URL vào `rsvpEndpoint` trong `config.js`
