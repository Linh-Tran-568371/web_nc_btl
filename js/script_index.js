document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('movieListNew'); // Thẻ chứa danh sách phim (phần danh sách mới)
    const danhSach = JSON.parse(localStorage.getItem('newPhim')) || [];

    if (danhSach.length === 0) {
        container.innerHTML = '<p class="text-white">Chưa có phim nào.</p>';
    } else {
        const maxPhim = 5; // Giới hạn số phim hiển thị
        let count = 0;

        for (let i = danhSach.length - 1; i >= 0 && count < maxPhim; i--, count++) {
            const movie = danhSach[i];
            const div = document.createElement('div');
            div.className = 'd-flex align-items-center gap-3 mb-3';

            div.innerHTML = `
        <a href="thongtinphim.html?id=${movie.id}" class="d-flex text-decoration-none align-items-center gap-3">
            <img src="../${movie.anh}" alt="Phim" style="width: 80px; height: 100px; object-fit: cover;" class="rounded shadow">
            <div class="movie-info">
                <h6 class="mb-1" style="color: white">${movie.ten}</h6>
                <small class="text-light" style="color: white">${movie.theLoai.join(', ')}</small>
                <p class="mb-0" style="font-size: 0.85rem; max-height: 3em; overflow: hidden; text-overflow: ellipsis; color: white;">${movie.moTa || 'Chưa có mô tả!'}</p>
            </div>
        </a>
        `;
            container.appendChild(div);
        }
    }


    const mainContainer = document.getElementById('mainContainer');

    // Gom nhóm theo thể loại
    const theLoaiMap = {};
    const danhSachPhim = typeof window.danhSachPhim !== 'undefined' ? window.danhSachPhim : [];
    const newPhim = JSON.parse(localStorage.getItem("newPhim")) || [];
    const allPhim = [...danhSachPhim, ...newPhim];

    const container2 = document.getElementById('movieListHot'); // Thẻ chứa danh sách phim (phần danh sách hot)

if (allPhim.length === 0) {
    container2.innerHTML = '<p class="text-white">Chưa có phim nào.</p>';
} else {
    const maxPhim = 7; // Giới hạn số phim hiển thị
    container2.innerHTML = ''; // Xóa nội dung cũ

    // Hàm lấy ngẫu nhiên n phần tử từ mảng, không lặp lại
    function getRandomMovies(arr, count) {
        const shuffled = arr.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }

    const randomMovies = getRandomMovies(allPhim, Math.min(maxPhim, allPhim.length));

    randomMovies.forEach(movie => {
        const div = document.createElement('div');
        div.className = 'd-flex align-items-center gap-3 mb-3';

        div.innerHTML = `
            <a href="thongtinphim.html?id=${movie.id}" class="d-flex text-decoration-none align-items-center gap-3">
                <img src="../${movie.anh}" alt="Phim" style="width: 80px; height: 100px; object-fit: cover;" class="rounded shadow">
                <div class="movie-info">
                    <h6 class="text-light mb-1">${movie.ten}</h6>
                    <small class="text-light">${movie.theLoai.join(', ')}</small>
                    <p class="text-light mb-0" style="font-size: 0.85rem; max-height: 3em; overflow: hidden; text-overflow: ellipsis;">${movie.moTa || ''}</p>
                </div>
            </a>
        `;
        container2.appendChild(div);
    });
}

    allPhim.forEach(phim => {
        phim.theLoai.forEach(tl => {
            if (!theLoaiMap[tl]) theLoaiMap[tl] = [];
            theLoaiMap[tl].push(phim);
        });
    });

    const PHIM_MOI_TRANG = 4; // số phim hiển thị mỗi lần

    // Hàm tạo section thể loại với phân trang
    function taoSectionTheLoai(theLoai, danhSach) {
        const section = document.createElement('div');
        section.className = 'mb-5';

        const tieuDe = document.createElement('h4');
        tieuDe.className = 'text-white mb-3';
        tieuDe.textContent = theLoai;
        section.appendChild(tieuDe);

        // Container tổng có flex ngang, căn giữa, rộng 100%
        const container = document.createElement('div');
        container.className = 'd-flex align-items-center';
        container.style.gap = '10px';
        container.style.width = '100%';

        // Nút điều hướng trái
        const btnPrev = document.createElement('button');
        btnPrev.className = 'btn btn-outline-light d-flex align-items-center justify-content-center';
        btnPrev.style.flex = '0 0 auto';
        btnPrev.style.width = '30px';              // Chiều ngang vừa phải
        btnPrev.style.height = '50px';
        btnPrev.style.fontSize = '1.5rem';         // Chữ vừa phải
        btnPrev.style.borderRadius = '0.5rem';     // Bo góc nhẹ
        btnPrev.style.cursor = 'pointer';
        btnPrev.style.alignSelf = 'center';
        btnPrev.innerHTML = '<i class="bi bi-chevron-left fs-4"></i>';

        // Wrapper chứa phim, flex ngang, ko wrap
        const phimWrapper = document.createElement('div');
        phimWrapper.className = 'd-flex flex-row flex-nowrap';
        phimWrapper.style.flex = '1 1 auto';
        phimWrapper.style.overflow = 'hidden';

        // Nút điều hướng phải
        const btnNext = document.createElement('button');
        btnNext.className = 'btn btn-outline-light d-flex align-items-center justify-content-center';
        btnNext.style.width = '30px';
        btnNext.style.height = '50px';
        btnNext.style.fontSize = '1.5rem';
        btnNext.style.borderRadius = '0.5rem';
        btnNext.style.cursor = 'pointer';
        btnNext.style.alignSelf = 'center';         // Căn giữa dọc
        btnNext.innerHTML = '<i class="bi bi-chevron-right fs-4"></i>';

        // Thêm vào container
        container.appendChild(btnPrev);
        container.appendChild(phimWrapper);
        container.appendChild(btnNext);

        section.appendChild(container);

        let currentPage = 0;
        const totalPage = Math.ceil(danhSach.length / PHIM_MOI_TRANG);

        function renderPage(page) {
            phimWrapper.innerHTML = '';

            const start = page * PHIM_MOI_TRANG;
            const end = start + PHIM_MOI_TRANG;
            const slicePhim = danhSach.slice(start, end);

            slicePhim.forEach(movie => {
                const col = document.createElement('div');
                col.className = 'movie-card'; // giữ class để áp dụng CSS nếu có
                col.style.flex = '0 0 23%'; // chiếm ~23% chiều rộng (4 phim + khoảng cách)
                col.style.marginRight = '3%'; // khoảng cách giữa các phim
                col.style.boxSizing = 'border-box';

                col.innerHTML = `
        <a href="thongtinphim.html?id=${movie.id}" class="text-decoration-none d-block">
            <img src="../${movie.anh}" alt="Phim" class="img-fluid rounded shadow" 
                style="width: 190px; height: 90px; object-fit: cover;">
            <div class="movie-info mt-2">
                <h6 class="text-white mb-0" style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${movie.ten}</h6>
                <small class="text-white">${movie.theLoai.join(', ')}</small>
            </div>
        </a>
    `;

                phimWrapper.appendChild(col);
            });

            // Ẩn/hiện nút
            btnPrev.style.visibility = (page === 0) ? 'hidden' : 'visible';
            btnNext.style.visibility = (page >= totalPage - 1) ? 'hidden' : 'visible';
        }

        btnPrev.onclick = () => {
            if (currentPage > 0) {
                currentPage--;
                renderPage(currentPage);
            }
        };

        btnNext.onclick = () => {
            if (currentPage < totalPage - 1) {
                currentPage++;
                renderPage(currentPage);
            }
        };

        renderPage(currentPage);

        return section;
    }

    // Xóa hết nội dung cũ nếu có
    mainContainer.innerHTML = '';

    // Tạo và append section cho từng thể loại
    for (const theLoai in theLoaiMap) {
        const section = taoSectionTheLoai(theLoai, theLoaiMap[theLoai]);
        mainContainer.appendChild(section);
    }
});
