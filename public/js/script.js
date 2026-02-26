////////// Make mobile navigation work //////////
const navBtnEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

navBtnEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

////////// Get date //////////

const yearEL = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEL.textContent = currentYear;
