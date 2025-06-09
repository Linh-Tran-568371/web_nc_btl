document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const danhSachPhim = typeof window.danhSachPhim !== 'undefined' ? window.danhSachPhim : [];
    const newPhim = JSON.parse(localStorage.getItem("newPhim")) || [];

    const phim1 = danhSachPhim[id]; // nếu phim lưu theo chỉ số
    const phim2 = newPhim.find(p => p.id == id); // nếu phim lưu theo id
    const phim = phim1 || phim2;

    const allPhim = [...danhSachPhim, ...newPhim];
    const content = document.getElementById("phim-watch");

    if (phim) {
        // Lấy 5 phim bất kỳ khác với phim đang xem
        const phimDeXuat = shuffleArray(allPhim.filter(p => p.id != phim.id)).slice(0, 5);

        const deXuatHTML = phimDeXuat.map(p => `
            <li class="list-group-item bg-dark text-white border-secondary d-flex align-items-center">
              <img src="../${p.anh}" class="me-2 rounded" style="width: 50px; height: 70px; object-fit: cover;" />
              <a href="xemphim.html?id=${p.id}" class="text-white text-decoration-none">${p.ten}</a>
            </li>
        `).join('');

        content.innerHTML = `
        <div class="container mt-4">
            <div class="row">
                <!-- Video Player 9/12 -->
                <div class="col-lg-9 mb-4">
                    <div class="ratio ratio-16x9 bg-black rounded shadow">
                        <iframe src="${phim.video}" 
                                title="Video Phim" 
                                allowfullscreen 
                                class="rounded"></iframe>
                    </div>

                    <div class="mt-3 text-white">
                        <h3>${phim.ten}</h3>
                        <span class="badge bg-success me-2">⭐ ${phim.diem}</span>
                        <span class="text-white-50">T18 | 2025 |</span>
                        <div class="mb-3">
                            ${phim.theLoai.map(loai => `<span class="badge bg-light text-dark me-1">${loai}</span>`).join('')}
                        </div>
                    </div>
                </div>

                <!-- Đề xuất phim 3/12 -->
                <div class="col-lg-3">
                    <h5 class="text-white mb-3">🎞️ Đề xuất phim</h5>
                    <ul class="list-group list-group-flush bg-dark text-white">
                        ${deXuatHTML}
                    </ul>
                </div>
            </div>
        </div>
        `;
    } else {
        content.innerHTML = `<h2>Không tìm thấy phim.</h2><a href="index.html" class="btn btn-secondary">Quay về Trang Chủ</a>`;
    }

    function shuffleArray(array) {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
});
