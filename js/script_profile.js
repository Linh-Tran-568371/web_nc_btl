document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        alert("Bạn chưa đăng nhập.");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("username").innerText = user.username;
    document.getElementById("email").innerText = user.email;

    // Load danh sách phim đã lưu
    const saved = JSON.parse(localStorage.getItem("savedMovies")) || [];
    const savedList = document.getElementById("savedList");
    let foundAny = false;

    saved.forEach(id => {
        const danhSachPhim = typeof window.danhSachPhim !== 'undefined' ? window.danhSachPhim : []; // lấy từ file phim.js
        const newPhim = JSON.parse(localStorage.getItem("newPhim")) || [];

        const allPhim = [...danhSachPhim, ...newPhim];
        const phim = allPhim.find(p => p.id === parseInt(id));
        if (phim) {
            foundAny = true;

            const li = document.createElement("li");
            li.className = "list-group-item bg-dark text-white";
            li.innerHTML = `
            <div class="d-flex align-items-center justify-content-between">
                <a href="thongtinphim.html?id=${phim.id}" class="text-white text-decoration-none d-flex align-items-center flex-grow-1">
                    <img src="${phim.anh}" alt="${phim.ten}" style="width: 50px; height: auto; margin-right: 10px; border-radius: 4px;">
                    <span>${phim.ten}</span>
                </a>
                <button class="btn btn-sm btn-danger ms-3 btn-delete">Xóa</button>
            </div>`;

            savedList.appendChild(li);

            const btnXoa = li.querySelector(".btn-delete");
            btnXoa.addEventListener("click", () => {
                if (confirm(`Bạn có chắc muốn xóa phim "${phim.ten}" khỏi danh sách đã lưu không?`)) {
                    let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
                    savedMovies = savedMovies.filter(savedId => parseInt(savedId) !== phim.id);
                    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
                    li.remove();
                
                }
            });
        }
    });


    // Load lịch sử xem
    const history = JSON.parse(localStorage.getItem("watchHistory")) || [];
    const historyList = document.getElementById("historyList");

    if (history.length === 0) {
        historyList.innerHTML = `<li class="list-group-item bg-dark text-white">Chưa có lịch sử xem.</li>`;
    } else {
        history.forEach(id => {
            const phim = allPhim.find(p => p.id === parseInt(id));
            if (phim) {
                const li = document.createElement("li");
                li.className = "list-group-item bg-dark text-white";
                li.innerHTML = `
                    <div class="d-flex align-items-center justify-content-between">
                        <a href="thongtinphim.html?id=${phim.id}" class="text-white text-decoration-none flex-grow-1">${phim.ten}</a>
                        <button class="btn btn-sm btn-danger ms-3">Xóa</button>
                    </div>
                `;

                // Thêm sự kiện xóa cho nút
                const btnXoa = li.querySelector("button");
                btnXoa.addEventListener("click", () => {
                    if (confirm(`Bạn có chắc muốn xóa phim "${phim.ten}" khỏi lịch sử xem không?`)) {
                        let watchHistory = JSON.parse(localStorage.getItem("watchHistory")) || [];

                        // Lọc bỏ phim được xóa khỏi mảng lịch sử
                        watchHistory = watchHistory.filter(wId => parseInt(wId) !== phim.id);

                        // Cập nhật lại localStorage
                        localStorage.setItem("watchHistory", JSON.stringify(watchHistory));

                        // Xóa phần tử khỏi DOM
                        li.remove();

                        // Nếu không còn phim nào thì hiện thông báo
                        if (watchHistory.length === 0) {
                            historyList.innerHTML = `<li class="list-group-item bg-dark text-white">Chưa có lịch sử xem.</li>`;
                        }
                    }
                });

                historyList.appendChild(li);
            }
        });
    }
});
