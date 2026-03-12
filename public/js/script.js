////////// Make mobile navigation work //////////
const navBtnEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

navBtnEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

////////// Get date //////////

const yearEL = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEL.textContent = currentYear;

////////// Buy button //////////
const buyBtnEl = document.querySelectorAll(".buy-btn");
buyBtnEl.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const id = event.target.id;

    //Get value from amount
    const getAmount = event.target
      .closest(".product-card")
      .querySelector(".number").value;
    console.log(getAmount);
    console.log(id);
  });
});
