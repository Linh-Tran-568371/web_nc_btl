const commentForm = document.getElementById('commentForm');
const commentList = document.getElementById('commentList');

function getMovieIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

const MOVIE_TITLE = getMovieIdFromURL();

function loadComments() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const comments = JSON.parse(localStorage.getItem('comments_' + MOVIE_TITLE) || '[]');
  commentList.innerHTML = '';

  comments.forEach((c, index) => {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'bg-dark p-3 rounded text-white mb-3 comment-item';

    // Tạo phần phản hồi (replies)
    let repliesHtml = '<div class="ms-4 mt-2">';
    if (c.replies && c.replies.length > 0) {
      c.replies.forEach((r, rIndex) => {
        repliesHtml += `
            <div class="bg-secondary p-2 rounded mb-1 position-relative">
              <strong>${r.name}</strong> <span class="text-muted">- ${timeAgo(r.timestamp)}</span>
              <p>${r.content}</p>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-danger btn-delete-reply" data-comment-index="${index}" data-reply-index="${rIndex}">Xóa</button>
                <button class="btn btn-sm btn-warning btn-report-reply">Báo cáo</button>
              </div>
            </div>
        `;
      });
    }
    repliesHtml += '</div>';

    commentDiv.innerHTML = `
      <strong>${c.name}</strong> <span class="text-muted">- ${timeAgo(c.timestamp)}</span>
      <p>${c.content}</p>
      <div class="d-flex gap-2 mb-2">
        <button class="btn btn-sm btn-danger btn-delete">Xóa</button>
        <button class="btn btn-sm btn-info btn-reply">Phản hồi</button>
        <button class="btn btn-sm btn-warning btn-report">Báo cáo</button>
      </div>
      <div class="reply-form-container"></div>
      ${repliesHtml}
    `;

    // Xóa comment chính
    commentDiv.querySelector('.btn-delete').addEventListener('click', () => {
      if (confirm('Bạn có chắc muốn xóa nhận xét này?')) {
        comments.splice(index, 1);
        localStorage.setItem('comments_' + MOVIE_TITLE, JSON.stringify(comments));
        loadComments();
      }
    });

    // Báo cáo comment chính
    commentDiv.querySelector('.btn-report').addEventListener('click', () => {
      alert('Báo cáo đã được gửi. Cảm ơn bạn đã phản hồi!');
    });

    // Phản hồi comment chính
    commentDiv.querySelector('.btn-reply').addEventListener('click', () => {
      const container = commentDiv.querySelector('.reply-form-container');
      if (container.innerHTML.trim() !== '') {
        container.innerHTML = '';
        return;
      }
      container.innerHTML = `
        <textarea class="form-control mb-2" rows="2" placeholder="Viết phản hồi..."></textarea>
        <button class="btn btn-sm btn-primary btn-send-reply">Gửi phản hồi</button>
        <button class="btn btn-sm btn-secondary btn-cancel-reply ms-2">Hủy</button>
      `;

      const sendBtn = container.querySelector('.btn-send-reply');
      const cancelBtn = container.querySelector('.btn-cancel-reply');
      const textarea = container.querySelector('textarea');

      cancelBtn.addEventListener('click', () => {
        container.innerHTML = '';
      });

      sendBtn.addEventListener('click', () => {
        const replyContent = textarea.value.trim();
        if (!replyContent) {
          alert('Vui lòng nhập nội dung phản hồi!');
          return;
        }
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const replyName = currentUser ? currentUser.username : 'Khách';

        if (!comments[index].replies) {
          comments[index].replies = [];
        }
        comments[index].replies.push({
          name: replyName,
          content: replyContent,
          timestamp: Date.now()
        });

        localStorage.setItem('comments_' + MOVIE_TITLE, JSON.stringify(comments));
        loadComments();
      });
    });

    commentList.appendChild(commentDiv);
  });

  // Vì các nút đó sinh ra động, nên xử lý sau khi đã append vào DOM
  document.querySelectorAll('.btn-delete-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      const cIndex = parseInt(btn.getAttribute('data-comment-index'));
      const rIndex = parseInt(btn.getAttribute('data-reply-index'));
      if (confirm('Bạn có chắc muốn xóa phản hồi này?')) {
        const comments = JSON.parse(localStorage.getItem('comments_' + MOVIE_TITLE) || '[]');
        comments[cIndex].replies.splice(rIndex, 1);
        localStorage.setItem('comments_' + MOVIE_TITLE, JSON.stringify(comments));
        loadComments();
      }
    });
  });

  document.querySelectorAll('.btn-report-reply').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Báo cáo phản hồi đã được gửi. Cảm ơn bạn đã phản hồi!');
    });
  });
}


// Chuyển timestamp thành thời gian tương đối
function timeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days} ngày trước`;
  if (hours > 0) return `${hours} giờ trước`;
  if (minutes > 0) return `${minutes} phút trước`;
  return 'Vừa xong';
}

// Gửi nhận xét
commentForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('commentName').value.trim();
  const content = document.getElementById('commentContent').value.trim();
  if (!name || !content) {
    alert('Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  const comments = JSON.parse(localStorage.getItem('comments_' + MOVIE_TITLE) || '[]');
  comments.unshift({
    name: name,
    content: content,
    timestamp: Date.now()
  });

  localStorage.setItem('comments_' + MOVIE_TITLE, JSON.stringify(comments));
  document.getElementById("commentContent").value = "";
  loadComments();
});


document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const nameInput = document.getElementById("commentName");

  if (currentUser && nameInput) {
    nameInput.value = currentUser.username; // Chỉ tự động điền
    // Không readonly, người dùng có thể sửa nếu muốn
    nameInput.readOnly = true;
  }

  if (typeof loadComments === "function") {
    loadComments();
  }
});

document.addEventListener("DOMContentLoaded", loadComments()); 

