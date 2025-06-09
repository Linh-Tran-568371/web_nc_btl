
  let currentIndex = 0;
  const slides = document.querySelectorAll(".banner-slide");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
    });
    slides[index].classList.add("active");
  }

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 1000); // đổi slide mỗi 5 giây

