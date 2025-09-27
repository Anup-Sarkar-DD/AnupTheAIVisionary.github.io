document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const text = this.getAttribute('data-copy');
    navigator.clipboard.writeText(text)
      .then(() => {
        this.classList.add('copied');
        setTimeout(() => this.classList.remove('copied'), 1450);
      })
      .catch(() => {
        // fallback for older browsers
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = text;
        tempInput.focus();
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        this.classList.add('copied');
        setTimeout(() => this.classList.remove('copied'), 1450);
      });
  });
});
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
