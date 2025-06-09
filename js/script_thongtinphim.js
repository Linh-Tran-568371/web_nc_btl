document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const danhSachPhim = typeof window.danhSachPhim !== 'undefined' ? window.danhSachPhim : []; // lấy từ file phim.js
    const newPhim = JSON.parse(localStorage.getItem("newPhim")) || [];

    const phim1 = danhSachPhim[id]; // nếu phim lưu theo chỉ số
    const phim2 = newPhim.find(p => p.id == id); // nếu phim lưu theo id
    const phim = phim1 || phim2;

    const allPhim = [...danhSachPhim, ...newPhim];
    const content = document.getElementById("phim-content");

    if (phim) {
        content.innerHTML = `
      <div class="row align-items-center">
    <!-- Thông tin bên trái -->
    <div class="col-lg-6 mb-4">
      <h2 class="text-white">${phim.ten}</h2>
      <div class="mb-2">
        <span class="badge bg-success me-1">${phim.diem} ★</span>
        <span class="text-white-50">T18 | 2025 |</span>
      </div>

      <div class="mb-3">
        <span class="badge bg-light text-dark">${phim.theLoai[0]}</span>
        <span class="badge bg-light text-dark">${phim.theLoai[1]}</span>
        <span class="badge bg-light text-dark">${phim.theLoai[2]}</span>
      </div>

      <div class="mb-3">
        <button class="btn btn-success me-2" onclick="handleWatch(${phim.id}, 'xemphim.html?id=${phim.id}')">▶ Chiếu phát</button>
        <button class="btn btn-outline-light me-2" onclick="shareMovie()">📤 Chia sẻ</button>
        <button class="btn btn-outline-light me-2" onclick="saveMovie(${phim.id})">🔖 Lưu</button>
      </div>

      <div class="text-white">
        <p><strong>Đạo diễn:</strong> ${phim.daoDien}</p>
        <p><strong>Mô tả:</strong> ${phim.moTa}</p>
      </div>
    </div>

    <!-- Poster phim -->
    <div class="col-lg-6 text-center">
      <img src="../${phim.anh}" alt="Poster phim" class="img-fluid rounded shadow">
    </div>
  </div>
    `;
    } else {
        content.innerHTML = `<h2>Không tìm thấy phim.</h2><a href="index.html" class="btn btn-secondary">Quay về Trang Chủ</a>`;
    }
});