/*
 * ============================================================
 *  CẤU HÌNH THIỆP CƯỚI — chỉnh nội dung ở file này là đủ
 * ============================================================
 *
 *  Link gửi khách:
 *    Thiệp nhà trai : index.html?ben=trai&to=Anh%20Nam
 *    Thiệp nhà gái  : index.html?ben=gai&to=Cô%20Lan
 *    Không có ?ben  : hiển thị cả hai bên (có tab chuyển)
 *  Tham số "to" là tên khách mời (không bắt buộc).
 */
window.WEDDING = {
  groom: {
    fullName: "Bùi Việt Phương",
    shortName: "Việt Phương",
    father: "Bùi Dũng",
    mother: "Lê Thị Thuý Nga",
    // Địa chỉ nhà trai (để trống nếu không muốn hiển thị)
    address: "",
    bio: "", // vài dòng giới thiệu chú rể (tuỳ chọn)
  },
  bride: {
    fullName: "Nguyễn Hương Giang",
    shortName: "Hương Giang",
    father: "Nguyễn Cao Sơn",
    mother: "Ngô Thị Hạnh",
    address: "Số nhà 845, Tổ 12 Phố Cò, Đ. Cách Mạng Tháng Tám, Sông Công, Thái Nguyên",
    bio: "",
  },

  // Mốc đếm ngược (giờ Việt Nam)
  countdownTo: "2026-11-29T11:00:00+07:00",

  events: {
    trai: [
      {
        title: "Lễ Thành Hôn",
        start: "2026-11-29T11:00:00+07:00",
        end: "2026-11-29T12:00:00+07:00",
        weekday: "Chủ Nhật",
        lunar: "Tức ngày 21 tháng 10 năm Bính Ngọ",
        venue: "Trống Đồng Palace Cảnh Hồ",
        hall: "Sảnh Queen 2 - Tầng 1",
        address: "173B Đ. Trường Chinh, Phương Liệt, Hà Nội",
        map: "Trống Đồng Palace Cảnh Hồ, 173B Trường Chinh, Hà Nội",
      },
      {
        title: "Tiệc Cưới",
        start: "2026-11-29T11:00:00+07:00",
        end: "2026-11-29T14:00:00+07:00",
        weekday: "Chủ Nhật",
        lunar: "Tức ngày 21 tháng 10 năm Bính Ngọ",
        venue: "Trống Đồng Palace Cảnh Hồ",
        hall: "Sảnh Queen 2 - Tầng 1",
        address: "173B Trường Chinh, Phương Liệt, Hà Nội",
        map: "Trống Đồng Palace Cảnh Hồ, 173B Trường Chinh, Hà Nội",
      },
    ],
    gai: [
      {
        title: "Tiệc Cưới",
        start: "2026-11-28T16:00:00+07:00",
        end: "2026-11-28T19:00:00+07:00",
        weekday: "Thứ Bảy",
        lunar: "Tức ngày 20 tháng 10 năm Bính Ngọ",
        venue: "Tư gia nhà gái",
        hall: "",
        address: "Số nhà 845, Tổ 12 Phố Cò, Đ. Cách Mạng Tháng Tám, Sông Công, Thái Nguyên",
        map: "Số 845 Đường Cách Mạng Tháng Tám, Sông Công, Thái Nguyên",
      },
      {
        title: "Lễ Vu Quy",
        start: "2026-11-29T08:00:00+07:00",
        end: "2026-11-29T09:30:00+07:00",
        weekday: "Chủ Nhật",
        lunar: "Tức ngày 21 tháng 10 năm Bính Ngọ",
        venue: "Tư gia nhà gái",
        hall: "",
        address: "Số nhà 845, Tổ 12 Phố Cò, Đ. Cách Mạng Tháng Tám, Sông Công, Thái Nguyên",
        map: "Số 845 Đường Cách Mạng Tháng Tám, Sông Công, Thái Nguyên",
      },
    ],
  },

  /*
   * ẢNH — chỉ cần chép ảnh vào thư mục images/ đúng tên dưới đây.
   * Ảnh nào chưa có sẽ tự hiện khung placeholder.
   */
  photos: {
    cover: "images/cover.jpg",   // ảnh dọc, dùng cho bìa
    groom: "images/groom.jpg",   // ảnh chân dung chú rể
    bride: "images/bride.jpg",   // ảnh chân dung cô dâu
    couple: "images/couple.jpg", // ảnh ngang, dùng cho phần lời mời
    footer: "images/footer.jpg", // ảnh kết thiệp
    album: [
      "images/album-01.jpg",
      "images/album-02.jpg",
      "images/album-03.jpg",
      "images/album-04.jpg",
      "images/album-05.jpg",
      "images/album-06.jpg",
      "images/album-07.jpg",
      "images/album-08.jpg",
      "images/album-09.jpg",
    ],
  },

  // Nhạc nền (mp3). Để trống "" nếu không dùng.
  music: "music/song.mp3",

  /*
   * Xác nhận tham dự (RSVP): dán URL Web App của Google Apps Script
   * (xem hướng dẫn trong README.md). Để trống thì form chỉ hiện lời cảm ơn
   * mà KHÔNG lưu dữ liệu.
   */
  rsvpEndpoint: "",

  /*
   * Hộp mừng cưới. Để mảng rỗng [] nếu không muốn hiển thị mục này.
   * qr: đường dẫn ảnh QR (images/qr-groom.png ...)
   */
  gifts: [
    {
      label: "Mừng cưới chú rể",
      bank: "Tên ngân hàng",
      accountName: "BUI VIET PHUONG",
      accountNumber: "0000000000",
      qr: "images/qr-groom.png",
    },
    {
      label: "Mừng cưới cô dâu",
      bank: "Tên ngân hàng",
      accountName: "NGUYEN HUONG GIANG",
      accountNumber: "0000000000",
      qr: "images/qr-bride.png",
    },
  ],
};
