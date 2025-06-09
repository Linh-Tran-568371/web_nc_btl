document.addEventListener("DOMContentLoaded", () => {
  const movieTableBody = document.querySelector("#movie-table tbody");
  const userTableBody = document.querySelector("#user-table tbody");

  // Lấy danh sách phim
  const newPhim = JSON.parse(localStorage.getItem("newPhim")) || [];
  newPhim.forEach((phim, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${phim.id}</td>
      <td><img src="${phim.anh}" alt="Phim" style="width: 100px; height: 50px;"></td>
      <td>${phim.ten}</td>
      <td>${phim.theLoai.join(", ")}</td>
      <td>${phim.diem}</td>
      <td><button onclick="deletePhim(${index})">Xóa</button></td>
    `;
    movieTableBody.appendChild(row);
  });

  // Lấy danh sách người dùng
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index}</td>
      <td>${user.username || "Không rõ"}</td>
      <td>${user.email || "Không rõ"}</td>
      <td>${user.role || "Không rõ"}</td>
      <td><button onclick="deleteUser(${index})">Xóa</button></td>
    `;
    userTableBody.appendChild(row);
  });
});

// Xóa phim
function deletePhim(index) {
  const newPhim = JSON.parse(localStorage.getItem("newPhim")) || [];
  newPhim.splice(index, 1);
  localStorage.setItem("newPhim", JSON.stringify(newPhim));
  location.reload();
}

// Xóa người dùng
function deleteUser(index) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
}

// Thêm phim mới
document.getElementById("addMovieForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const ten = document.getElementById("tenPhim").value.trim();
  const theLoai = document.getElementById("theLoaiPhim").value.split(",").map(t => t.trim());
  const diem = parseFloat(document.getElementById("diemPhim").value);
  const video = document.getElementById("videoPhim").value.trim();
  const anh = document.getElementById("anhPhim").value.trim();

  const newPhim = JSON.parse(localStorage.getItem("newPhim")) || [];
  const id = Date.now(); // sinh ID ngẫu nhiên
  const phim = { id, ten, theLoai, diem, video, anh };
  newPhim.push(phim);
  localStorage.setItem("newPhim", JSON.stringify(newPhim));
  alert("Đã thêm phim mới!");
  location.reload();
});

// Thêm người dùng mới
document.getElementById("addUserForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("tenUser").value.trim();
  const email = document.getElementById("emailUser").value.trim();
  const password = document.getElementById("passUser").value;
  const role = document.getElementById("roleUser").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.find(u => u.username === username || u.email === email);
  if (exists) {
    alert("Tài khoản hoặc email đã tồn tại.");
    return;
  }

  users.push({ username, email, password, role });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Đã thêm người dùng mới!");
  location.reload();
});
