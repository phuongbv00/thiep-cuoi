/*
 * ============================================================
 *  CẤU HÌNH THIỆP CƯỚI — chỉnh nội dung ở file này là đủ
 * ============================================================
 *
 *  Link gửi khách (tham số URL):
 *    side=groom   thiệp nhà trai      side=bride   thiệp nhà gái
 *                 (không có side: hiển thị cả hai bên, có tab chuyển)
 *    guest=...    tên khách mời (không bắt buộc)
 *  Ví dụ:
 *    index.html?side=groom&guest=Anh%20Nam
 *    index.html?side=bride&guest=C%C3%B4%20Lan
 */
window.WEDDING = {
  groom: {
    fullName: "Bùi Việt Phương",
    shortName: "Việt Phương",
    father: "Bùi Dũng",
    mother: "Lê Thị Thuý Nga",
    // Địa chỉ nhà trai (để trống nếu không muốn hiển thị)
    address: "",
  },
  bride: {
    fullName: "Nguyễn Hương Giang",
    shortName: "Hương Giang",
    father: "Nguyễn Cao Sơn",
    mother: "Ngô Thị Hạnh",
    address: "",
  },

  // Mốc đếm ngược (giờ Việt Nam)
  countdownTo: "2026-11-29T11:00:00+07:00",

  // Sự kiện của từng bên
  events: {
    groom: [
      {
        title: "Tiệc Cưới",
        start: "2026-11-29T11:00:00+07:00",
        end: "2026-11-29T14:00:00+07:00",
        weekday: "Chủ Nhật",
        lunar: "Tức ngày 21 tháng 10 năm Bính Ngọ",
        venue: "Trống Đồng Palace Cảnh Hồ",
        hall: "Sảnh Queen 2 - Tầng 1",
        address: "173B Đ. Trường Chinh, Phương Liệt, Hà Nội",
        map: "Trống Đồng Palace Cảnh Hồ, 173B Đ. Trường Chinh, Phương Liệt, Hà Nội",
      },
      {
        title: "Lễ Thành Hôn",
        start: "2026-11-29T11:00:00+07:00",
        end: "2026-11-29T12:00:00+07:00",
        weekday: "Chủ Nhật",
        lunar: "Tức ngày 21 tháng 10 năm Bính Ngọ",
        venue: "Trống Đồng Palace Cảnh Hồ",
        hall: "Sảnh Queen 2 - Tầng 1",
        address: "173B Đ. Trường Chinh, Phương Liệt, Hà Nội",
        map: "Trống Đồng Palace Cảnh Hồ, 173B Đ. Trường Chinh, Phương Liệt, Hà Nội",
      },
    ],
    bride: [
      {
        title: "Tiệc Cưới",
        start: "2026-11-28T16:00:00+07:00",
        end: "2026-11-28T19:00:00+07:00",
        weekday: "Thứ Bảy",
        lunar: "Tức ngày 20 tháng 10 năm Bính Ngọ",
        venue: "Tư gia nhà gái",
        hall: "",
        address: "845 Đ. Cách Mạng Tháng Tám, Sông Công, Thái Nguyên",
        map: "845 Đ. Cách Mạng Tháng Tám, Sông Công, Thái Nguyên",
      },
      {
        title: "Lễ Vu Quy",
        start: "2026-11-29T08:00:00+07:00",
        end: "2026-11-29T09:30:00+07:00",
        weekday: "Chủ Nhật",
        lunar: "Tức ngày 21 tháng 10 năm Bính Ngọ",
        venue: "Tư gia nhà gái",
        hall: "",
        address: "845 Đ. Cách Mạng Tháng Tám, Sông Công, Thái Nguyên",
        map: "845 Đ. Cách Mạng Tháng Tám, Sông Công, Thái Nguyên",
      },
    ],
  },

  /*
   * ẢNH — chép ảnh vào thư mục images/ đúng tên dưới đây.
   * Ảnh nào chưa có sẽ tự hiện khung placeholder.
   * Gợi ý nhóm ảnh nằm ở cuối mỗi dòng (xem thêm images/README.md).
   */
  photos: {
    cover: "images/cover.jpg",           // 01 Toàn thân - Đứng (dọc)
    portrait: "images/portrait.jpg",     // 03 Bán thân - Chính diện (dọc), khung vòm "Mãi bên nhau"
    couple: "images/couple.jpg",         // 02 Toàn thân - Tương tác (ngang), trên lời mời
    calendarBg: "images/detail.jpg",     // 09 Phông nền - Chi tiết, nền mờ sau lịch
    footer: "images/footer.jpg",         // 05 Cận cảnh - Ôm, hôn (dọc), kết thiệp
    album: [
      "images/album-01.jpg", // ô lớn  · 04 Bán thân - Nghiêng, nhìn nhau
      "images/album-02.jpg", //          06 Pose - Nhẫn
      "images/album-03.jpg", //          08 Cô dâu solo
      "images/album-04.jpg", //          07 Set hoa - Ngồi
      "images/album-05.jpg", //          06 Pose - Bó hoa
      "images/album-06.jpg", //          05 Cận cảnh - Ôm
      "images/album-07.jpg", // ô lớn  · 02 Toàn thân - Tương tác
      "images/album-08.jpg", //          08 Cô dâu solo
      "images/album-09.jpg", //          05 Cận cảnh - Hôn
      "images/album-10.jpg", //          07 Set hoa - Nằm
      "images/album-11.jpg", //          04 Bán thân - Nhìn nhau
      "images/album-12.jpg", //          06 Pose - Giơ tay
    ],
  },

  // Nhạc nền (mp3). Để trống "" nếu không dùng.
  music: "music/song.mp3",

};
