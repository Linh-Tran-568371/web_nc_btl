function registerUser(event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const role = "user"
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!username || !email || !password || !confirmPassword) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu không trùng khớp.");
        return;
    }

    const user1 = typeof window.user !== 'undefined' ? window.user : [];
    const user2 = JSON.parse(localStorage.getItem("users") || "[]");
    const users = [...user1, ...user2];
    
    const exists = users.find(user => user.username === username || user.email === email);
    if (exists) {
        alert("Tài khoản hoặc email đã tồn tại.");
        return;
    }

    users.push({ username, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công! Bạn có thể đăng nhập.");
    window.location.href = "login.html";
}
