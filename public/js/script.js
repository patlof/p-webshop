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
    //Retrieve the information from the attributes in <button>
    const boughtProduct = {
      id: parseInt(btn.getAttribute("data-id")),
      name: btn.getAttribute("data-name"),
      price: parseFloat(btn.getAttribute("data-price")),
      number: parseInt(
        event.target.closest(".product-card").querySelector(".number").value,
      ),
    };

    console.log(boughtProduct);
    addProduct(boughtProduct);
  });

  //Add product to localStorage
  function addProduct(product) {
    const dataLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    dataLocalStorage.push(product);

    localStorage.setItem("cart", JSON.stringify(dataLocalStorage));
  }
});

////////Show whats in cart on Checkoutpage////////
function showCheckout() {
  const getLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];

  const presentation = document.querySelector(".checkout-products");
  const headlines = `<p class="checkout-headline left">Art nr</p>
          <p class="checkout-headline middle-left">Product</p>
          <p class="checkout-headline middle-right">Quantity</p>
          <p class="checkout-headline right">Price</p>`;
  let sum = 0;

  //Show headlines
  presentation.insertAdjacentHTML("afterbegin", headlines);

  //Loop out whole cart
  getLocalStorage.forEach((product) => {
    const totProdPrice = parseFloat(product.number * product.price);
    const showCart = `<p class="checkout-product left">${product.id}</p> <p class="checkout-product middle-left">${product.name}</p> <p class="checkout-product middle-right">${product.number}</p> <p class="checkout-product right">$ ${product.price}</p>`;
    presentation.insertAdjacentHTML("beforeend", showCart);

    sum += totProdPrice;
  });

  //Calculate sum and print it out
  const total = `<p class="checkout-sum right">Sum: $ ${sum.toFixed(2)}</p>`;
  const showResetButton = '<button class="right reset-btn">Reset cart</button>';

  presentation.insertAdjacentHTML("beforeend", total);
  presentation.insertAdjacentHTML("beforeend", showResetButton);
}
showCheckout();

//Reset cart/checkout
const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", () => {
  resetLocalStorage();
});

function resetLocalStorage() {
  localStorage.clear();
  location.reload();
}
