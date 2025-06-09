// Lưu phim
function saveMovie(id) {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
        alert("Bạn chưa đăng nhập.");
        return;
    }

    if (typeof id !== 'number') {
        alert("ID phim không hợp lệ.");
        return;
    }

    const savedKey = `savedMovies_${user.username}`;
    let saved = JSON.parse(localStorage.getItem(savedKey)) || [];

    if (!saved.includes(id)) {
        saved.push(id);
        localStorage.setItem(savedKey, JSON.stringify(saved));

        // Tìm tên phim từ danh sách phim
        const danhSachPhim = typeof window.danhSachPhim !== 'undefined' ? window.danhSachPhim : [];
        const newPhim = JSON.parse(localStorage.getItem("newPhim")) || [];

        const allPhim = [...danhSachPhim, ...newPhim];
        const phim = allPhim.find(p => p.id === id);
        const movieTitle = phim ? phim.ten : "Không rõ tên";

        alert("Đã lưu phim: " + movieTitle);
    } else {
        alert("Phim này đã được lưu trước đó!");
    }
}


function shareMovie() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert("Đã sao chép link phim: " + url);
    });
}

// Lưu vào lịch sử xem
function handleWatch(id, url) {
    // Lưu vào lịch sử
    let history = JSON.parse(localStorage.getItem("watchHistory")) || [];
    if (!history.includes(id)) {
        history.push(id);
        localStorage.setItem("watchHistory", JSON.stringify(history));
    }

    // Chuyển đến trang xem phim
    window.location.href = url;
}
