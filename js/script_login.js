
// Hàm đăng nhập
function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const user1 = typeof window.user !== 'undefined' ? window.user : [];

  const user2 = JSON.parse(localStorage.getItem("users") || "[]");

  const users = [...user1, ...user2];
  const user = users.find(u => (u.username === username || u.email === username) && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Đăng nhập thành công!");

    const referrer = document.referrer;
    if (referrer && !referrer.includes("login.html") && !referrer.includes("register.html")) {
      window.location.href = referrer;
    } else {
      window.location.href = "index.html";
    }
  } else {
    alert("Sai tên đăng nhập hoặc mật khẩu.");
  }
}

// Hàm đăng xuất
function logoutUser() {
  const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất không?");
  if (confirmLogout) {
    localStorage.removeItem("currentUser");
    alert("Đã đăng xuất.");
    window.location.href = "index.html";
  }
}


// Tự động hiển thị tên người dùng nếu đã đăng nhập
function showCurrentUser() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    const userBox = document.getElementById("currentUser");
    if (userBox) {
      userBox.innerText = `Xin chào, ${user.username}`;
    }
  }
}

// Thay nút Đăng nhập bằng nút "Tôi" nếu đã đăng nhập
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const loginBtn = document.getElementById("loginButton");

  if (user && loginBtn) {
    // Tạo icon người dùng với dropdown
    let menuHTML = `
      <div class="dropdown">
        <a class="nav-link dropdown-toggle text-white d-flex align-items-center" href="#" role="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fas fa-user-circle fa-lg me-1"></i> ${user.username}
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
          <li><a class="dropdown-item" href="profile.html">Thông tin cá nhân</a></li>`;

    if (user.role === "admin") {
      menuHTML += `<li><a class="dropdown-item" href="../html/index.html">Quản lý website</a></li>`;
    }

    menuHTML += `
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" onclick="logoutUser()">Đăng xuất</a></li>
        </ul>
      </div>`;

    // Thay thế nút đăng nhập bằng user icon dropdown
    loginBtn.outerHTML = menuHTML;
  }
});

