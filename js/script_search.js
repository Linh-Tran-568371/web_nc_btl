document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const tuKhoa = urlParams.get("query")?.toLowerCase() || "";

  const danhSachPhim = typeof window.danhSachPhim !== 'undefined' ? window.danhSachPhim : [];
  const newPhim = JSON.parse(localStorage.getItem("newPhim")) || [];

  const allPhim = [...danhSachPhim, ...newPhim];

  const ketQua = allPhim.filter(phim => {
    const tenPhim = phim.ten.toLowerCase();
    const theLoaiPhim = phim.theLoai.map(tl => tl.toLowerCase()).join(" ");
    return tenPhim.includes(tuKhoa) || theLoaiPhim.includes(tuKhoa);
  });

  const ketQuaPhimDiv = document.getElementById("ketQuaPhim");

  if (ketQua.length === 0) {
    ketQuaPhimDiv.innerHTML = `<p>Không tìm thấy phim nào với từ khóa: "<strong>${tuKhoa}</strong>"</p>`;
    return;
  }

  ketQua.forEach(phim => {
    const card = document.createElement("div");
    card.className = "card mb-3";

    card.innerHTML = `
      <a href="thongtinphim.html?id=${phim.id}" class="text-decoration-none text-dark">
        <img src="../${phim.anh}" alt="${phim.ten}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${phim.ten}</h5>
          <p class="card-text">Thể loại: ${phim.theLoai.join(", ")}</p>
        </div>
      </a>
    `;


    ketQuaPhimDiv.appendChild(card);
  });
});
