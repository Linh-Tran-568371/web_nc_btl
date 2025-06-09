function loadComments() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
        commentForm.innerHTML = `
      <div class="alert alert-warning text-center">
        Vui lòng <a href="login.html" class="text-decoration-underline">đăng nhập</a> để nhận xét!
      </div>`;
        return;
    }
    else {
        commentForm.innerHTML = `
      <div class="mb-3">
      <label class="form-label text-white">Tên của bạn</label>
      <input type="text" class="form-control" id="commentName" placeholder="Nhập tên..." required>
    </div>
    <div class="mb-3">
      <label class="form-label text-white">Nội dung nhận xét</label>
      <textarea class="form-control" rows="3" id="commentContent" placeholder="Cảm nhận của bạn..." required></textarea>
    </div>
    <button type="submit" class="btn btn-light">Gửi nhận xét</button>`;

    }
    const nameInput = document.getElementById("commentName");

    if (currentUser && nameInput) {
        nameInput.value = currentUser.username; // Chỉ tự động điền
        // Không readonly, người dùng có thể sửa nếu muốn
        nameInput.readOnly = true;
    }

    if (typeof loadComments === "function") {
        loadComments();
    };
}
