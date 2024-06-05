const carrossel = document.querySelector('.carrossel');
  const slides = document.querySelectorAll('.carrossel .secao');

  let index = 0;

  function nextSlide() {
    index++;
    if (index === slides.length) {
      index = 0;
    }
    updateSlide();
  }

  function updateSlide() {
    const translateValue = -index * 30 + '%';
    carrossel.style.transform = 'translateX(' + translateValue + ')';
  }

  setInterval(nextSlide, 3000); 