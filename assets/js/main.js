(function () {
  "use strict";

  var W = window.WEDDING;
  var params = new URLSearchParams(location.search);
  var sideParam = (params.get("ben") || params.get("side") || "").toLowerCase();
  var side = sideParam === "gai" || sideParam === "trai" ? sideParam : null;
  var guest = (params.get("to") || params.get("khach") || "").trim();

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var upper = function (s) { return String(s).toLocaleUpperCase("vi-VN"); };

  // Bên gái: tên cô dâu đứng trước, gia đình nhà gái đứng trước
  var first = side === "gai" ? W.bride : W.groom;
  var second = side === "gai" ? W.groom : W.bride;

  /* ---------- Bind text ---------- */
  var binds = {
    firstName: first.shortName,
    secondName: second.shortName,
    guest: guest,
    guestOrDefault: guest || "Quý khách",
    groomName: W.groom.fullName,
    brideName: W.bride.fullName,
    groomBio: W.groom.bio,
    brideBio: W.bride.bio,
  };
  $$("[data-bind]").forEach(function (el) {
    var v = binds[el.getAttribute("data-bind")];
    if (v) el.textContent = v; else if (el.classList.contains("person__bio")) el.remove();
  });
  if (guest) {
    $("#envelopeGuest").hidden = false;
    document.title = "Thân mời " + guest + " · " + document.title;
  }

  /* ---------- Gia đình ---------- */
  function familyCol(label, p) {
    return (
      '<div class="family">' +
      '<p class="family__label">' + label + "</p>" +
      '<p class="family__parent">Ông ' + esc(upper(p.father)) + "</p>" +
      '<p class="family__parent">Bà ' + esc(upper(p.mother)) + "</p>" +
      (p.address ? '<p class="family__addr">' + esc(p.address) + "</p>" : "") +
      "</div>"
    );
  }
  var famTrai = familyCol("Nhà trai", W.groom);
  var famGai = familyCol("Nhà gái", W.bride);
  $("#families").innerHTML = side === "gai" ? famGai + famTrai : famTrai + famGai;

  function personName(role, p) {
    return '<div class="couple-names__item"><span class="couple-names__role">' + role +
      '</span><span class="couple-names__name">' + esc(upper(p.fullName)) + "</span></div>";
  }
  var groomHtml = personName("Chú rể", W.groom);
  var brideHtml = personName("Cô dâu", W.bride);
  $("#coupleNames").innerHTML =
    (side === "gai" ? brideHtml : groomHtml) +
    '<div class="couple-names__heart">&amp;</div>' +
    (side === "gai" ? groomHtml : brideHtml);

  /* ---------- Sự kiện ---------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function parts(iso) {
    // Đọc trực tiếp từ chuỗi ISO để luôn hiển thị đúng giờ Việt Nam
    return { y: iso.slice(0, 4), m: iso.slice(5, 7), d: iso.slice(8, 10), time: iso.slice(11, 16) };
  }
  function gcalLink(ev) {
    var fmt = function (iso) { return iso.slice(0, 19).replace(/[-:]/g, ""); };
    var q = new URLSearchParams({
      action: "TEMPLATE",
      text: ev.title + " · " + W.groom.shortName + " & " + W.bride.shortName,
      dates: fmt(ev.start) + "/" + fmt(ev.end || ev.start),
      ctz: "Asia/Ho_Chi_Minh",
      location: [ev.venue, ev.hall, ev.address].filter(Boolean).join(", "),
      details: "Trân trọng kính mời bạn tới dự " + ev.title + " của " + W.groom.fullName + " & " + W.bride.fullName + ".",
    });
    return "https://calendar.google.com/calendar/render?" + q.toString();
  }
  function mapLink(ev) {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ev.map || ev.address);
  }
  function eventCard(ev) {
    var p = parts(ev.start);
    return (
      '<article class="event">' +
      '<h4 class="event__title">' + esc(ev.title) + "</h4>" +
      '<div class="event__when">' +
      '<span class="event__time">' + p.time + "</span>" +
      '<span class="event__sep"></span>' +
      '<span class="event__date"><small>' + esc(ev.weekday) + "</small><b>" + p.d + "." + p.m + "." + p.y + "</b></span>" +
      "</div>" +
      '<p class="event__lunar">(' + esc(ev.lunar) + ")</p>" +
      '<p class="event__venue">' + esc(ev.venue) + "</p>" +
      (ev.hall ? '<p class="event__hall">' + esc(ev.hall) + "</p>" : "") +
      '<p class="event__addr">' + esc(ev.address) + "</p>" +
      '<div class="event__actions">' +
      '<a class="btn btn--ghost" target="_blank" rel="noopener" href="' + mapLink(ev) + '">📍 Chỉ đường</a>' +
      '<a class="btn btn--ghost" target="_blank" rel="noopener" href="' + gcalLink(ev) + '">🗓 Lưu vào lịch</a>' +
      "</div></article>"
    );
  }
  function mapEmbed(query) {
    return '<div class="map"><iframe loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Bản đồ" src="https://maps.google.com/maps?q=' +
      encodeURIComponent(query) + '&z=16&output=embed"></iframe></div>';
  }

  var inviteText = {
    trai: "Tới dự bữa tiệc chung vui cùng gia đình chúng tôi tại Hà Nội",
    gai: "Tới dự bữa tiệc chung vui cùng gia đình chúng tôi tại Thái Nguyên",
  };

  function renderEvents(s) {
    var list = W.events[s] || [];
    var seen = {};
    var maps = list.filter(function (ev) {
      var k = ev.map || ev.address;
      if (seen[k]) return false;
      return (seen[k] = true);
    }).map(function (ev) { return mapEmbed(ev.map || ev.address); }).join("");
    $("#eventList").innerHTML = list.map(eventCard).join("") + maps;
    $("#inviteText").textContent = inviteText[s];
    $$("#sideTabs [data-side]").forEach(function (b) {
      var on = b.getAttribute("data-side") === s;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
    renderCalendar(s);
    startCountdown(s);
    var sel = $('#rsvpForm select[name="side"]');
    if (sel) sel.value = s === "gai" ? "Nhà gái" : "Nhà trai";
  }

  /* ---------- Lịch ---------- */
  function renderCalendar(s) {
    var year = 2026, month = 10; // tháng 11 (0-based)
    var marks = {};
    (W.events[s] || []).forEach(function (ev) { marks[+parts(ev.start).d] = true; });
    var mainDay = +parts(W.countdownTo).d;
    var firstDow = (new Date(year, month, 1).getDay() + 6) % 7; // T2 = 0
    var days = new Date(year, month + 1, 0).getDate();
    var html = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(function (d) { return '<span class="cal__dow">' + d + "</span>"; }).join("");
    for (var i = 0; i < firstDow; i++) html += "<span></span>";
    for (var d = 1; d <= days; d++) {
      var cls = "cal__day";
      if (marks[d]) cls += d === mainDay ? " cal__day--main" : " cal__day--mark";
      html += '<span class="' + cls + '">' + d + "</span>";
    }
    $("#calendar").innerHTML = html;
  }

  /* ---------- Đếm ngược ---------- */
  var cdTimer;
  function startCountdown(s) {
    var starts = (W.events[s] || []).map(function (e) { return new Date(e.start).getTime(); });
    var target = starts.length ? Math.min.apply(null, starts) : new Date(W.countdownTo).getTime();
    clearInterval(cdTimer);
    function tick() {
      var diff = Math.max(0, target - Date.now());
      if (diff === 0) {
        $("#countdown").innerHTML = '<p class="script countdown__done">Hôm nay là ngày vui!</p>';
        clearInterval(cdTimer);
        return;
      }
      var sec = Math.floor(diff / 1000);
      $('[data-cd="d"]').textContent = Math.floor(sec / 86400);
      $('[data-cd="h"]').textContent = pad(Math.floor((sec % 86400) / 3600));
      $('[data-cd="m"]').textContent = pad(Math.floor((sec % 3600) / 60));
      $('[data-cd="s"]').textContent = pad(sec % 60);
    }
    tick();
    cdTimer = setInterval(tick, 1000);
  }

  if (side) {
    renderEvents(side);
  } else {
    $("#sideTabs").hidden = false;
    $$("#sideTabs [data-side]").forEach(function (b) {
      b.addEventListener("click", function () { renderEvents(b.getAttribute("data-side")); });
    });
    renderEvents("trai");
  }

  /* ---------- Ảnh (tự hiện placeholder nếu chưa có) ---------- */
  function loadPhoto(el, src) {
    if (!src) return;
    var img = new Image();
    img.alt = el.getAttribute("data-label") || "";
    img.decoding = "async";
    img.onload = function () { el.classList.add("loaded"); };
    img.onerror = function () { img.remove(); };
    img.src = src;
    el.appendChild(img);
  }
  $$("[data-photo]").forEach(function (el) { loadPhoto(el, W.photos[el.getAttribute("data-photo")]); });

  var gallery = $("#gallery");
  (W.photos.album || []).forEach(function (src, i) {
    var el = document.createElement("button");
    el.type = "button";
    el.className = "photo gallery__item";
    el.setAttribute("data-label", "Ảnh " + (i + 1));
    el.setAttribute("data-index", i);
    gallery.appendChild(el);
    loadPhoto(el, src);
  });

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox"), lbImg = $("img", lb), lbIndex = 0;
  function loadedAlbum() { return $$(".gallery__item.loaded img", gallery).map(function (i) { return i.src; }); }
  function showLb(i) {
    var list = loadedAlbum();
    if (!list.length) return;
    lbIndex = (i + list.length) % list.length;
    lbImg.src = list[lbIndex];
    lb.hidden = false;
  }
  gallery.addEventListener("click", function (e) {
    var item = e.target.closest(".gallery__item.loaded");
    if (!item) return;
    showLb(loadedAlbum().indexOf($("img", item).src));
  });
  $(".lightbox__close", lb).addEventListener("click", function () { lb.hidden = true; });
  $(".lightbox__prev", lb).addEventListener("click", function () { showLb(lbIndex - 1); });
  $(".lightbox__next", lb).addEventListener("click", function () { showLb(lbIndex + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) lb.hidden = true; });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") lb.hidden = true;
    if (e.key === "ArrowLeft") showLb(lbIndex - 1);
    if (e.key === "ArrowRight") showLb(lbIndex + 1);
  });

  /* ---------- Mừng cưới ---------- */
  if (!W.gifts || !W.gifts.length) {
    $("#giftSection").remove();
  } else {
    $("#gifts").innerHTML = W.gifts.map(function (g) {
      return (
        '<div class="gift">' +
        '<p class="gift__label">' + esc(g.label) + "</p>" +
        '<div class="photo photo--qr" data-label="Mã QR" data-src="' + esc(g.qr || "") + '"></div>' +
        '<p class="gift__bank">' + esc(g.bank) + "</p>" +
        '<p class="gift__name">' + esc(g.accountName) + "</p>" +
        '<p class="gift__acc">' + esc(g.accountNumber) + "</p>" +
        '<button type="button" class="btn btn--ghost btn--sm" data-copy="' + esc(g.accountNumber) + '">Sao chép số tài khoản</button>' +
        "</div>"
      );
    }).join("");
    $$("#gifts [data-src]").forEach(function (el) { loadPhoto(el, el.getAttribute("data-src")); });
    $("#gifts").addEventListener("click", function (e) {
      var b = e.target.closest("[data-copy]");
      if (!b) return;
      var txt = b.getAttribute("data-copy");
      var done = function () {
        var old = b.textContent;
        b.textContent = "Đã sao chép ✓";
        setTimeout(function () { b.textContent = old; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(done, done); else done();
    });
  }

  /* ---------- RSVP ---------- */
  var form = $("#rsvpForm"), status = $("#rsvpStatus");
  if (guest) form.elements.name.value = guest;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.elements.name.value.trim()) {
      status.textContent = "Bạn vui lòng nhập họ tên nhé.";
      form.elements.name.focus();
      return;
    }
    var btn = $("button[type=submit]", form);
    var data = new URLSearchParams(new FormData(form));
    data.append("invite", side || "chung");
    data.append("time", new Date().toISOString());
    var thanks = function () {
      status.textContent = form.elements.attend.value === "Có"
        ? "Cảm ơn bạn! Hẹn gặp bạn trong ngày vui của chúng tôi 💕"
        : "Cảm ơn lời chúc của bạn! 💕";
      form.reset();
      btn.disabled = false;
    };
    if (!W.rsvpEndpoint) {
      console.warn("[RSVP] Chưa cấu hình rsvpEndpoint trong config.js — dữ liệu chưa được lưu.", Object.fromEntries(data));
      thanks();
      return;
    }
    btn.disabled = true;
    status.textContent = "Đang gửi...";
    fetch(W.rsvpEndpoint, { method: "POST", mode: "no-cors", body: data })
      .then(thanks)
      .catch(function () {
        status.textContent = "Gửi chưa thành công, bạn thử lại giúp mình nhé.";
        btn.disabled = false;
      });
  });

  /* ---------- Nhạc nền ---------- */
  var audio = $("#bgm"), musicBtn = $("#musicBtn");
  if (W.music) {
    audio.src = W.music;
    audio.addEventListener("error", function () { musicBtn.hidden = true; });
    audio.addEventListener("play", function () { musicBtn.classList.add("playing"); });
    audio.addEventListener("pause", function () { musicBtn.classList.remove("playing"); });
    musicBtn.addEventListener("click", function () { audio.paused ? audio.play().catch(function () {}) : audio.pause(); });
  }

  /* ---------- Mở thiệp ---------- */
  var envelope = $("#envelope");
  $("#openBtn").addEventListener("click", function () {
    envelope.classList.add("opened");
    envelope.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
    if (W.music) {
      musicBtn.hidden = false;
      audio.play().catch(function () {});
    }
    setTimeout(function () { envelope.remove(); }, 1200);
  });

  /* ---------- Hiệu ứng xuất hiện ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Cánh hoa rơi ---------- */
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var petals = $(".petals");
    for (var i = 0; i < 14; i++) {
      var p = document.createElement("span");
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 9 + Math.random() * 9 + "s";
      p.style.animationDelay = -Math.random() * 18 + "s";
      p.style.setProperty("--s", (0.5 + Math.random() * 0.7).toFixed(2));
      petals.appendChild(p);
    }
  }
})();
