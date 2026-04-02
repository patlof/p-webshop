////////// Make mobile navigation work //////////
const navBtnEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

navBtnEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

////////// Get date for footer//////////
const yearEL = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEL.textContent = currentYear;

///////////////////////////////////////////
//////////////Header////////////////
///////////////////////////////////////////

//Make cart and number clickable and send to Checkoutpage´
const cartEl = document.querySelector(".cart");
cartEl.addEventListener("click", () => {
  window.location.href = "/checkout";
});

///////////////////////////////////////////
//////////////Product pages////////////////
///////////////////////////////////////////

//Check if there is products in cart, then update cart icon
const checkCart = JSON.parse(localStorage.getItem("cart"));
console.log(checkCart);
if (checkCart != null) {
  const cartNumber = document.querySelector(".cart-number");
  cartNumber.innerHTML = checkCart.length;
}

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

    addProduct(boughtProduct);
    const originalText = btn.innerHTML;
    btn.innerHTML = "Added! ✓";
    btn.classList.add("btn-success"); // Lägg till en CSS-klass för grön färg
    btn.style.pointerEvents = "none";

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.classList.remove("btn-success");
      btn.style.pointerEvents = "auto";
    }, 2000);
  });
});

//Add product to localStorage
function addProduct(product) {
  const dataLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
  dataLocalStorage.push(product);
  const cartNumber = document.querySelector(".cart-number");
  cartNumber.innerHTML = dataLocalStorage.length;
  localStorage.setItem("cart", JSON.stringify(dataLocalStorage));
  // alert("Product is put in cart!");
}

///////////////////////////////////////////
/////////////////CHECKOUT//////////////////
///////////////////////////////////////////

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
  presentation?.insertAdjacentHTML("afterbegin", headlines);

  //Loop out whole cart
  getLocalStorage.forEach((product) => {
    const totProdPrice = parseFloat(product.number * product.price);
    const showCart = `<p class="checkout-product left">${product.id}</p> <p class="checkout-product middle-left">${product.name}</p> <p class="checkout-product middle-right">${product.number}</p> <p class="checkout-product right">$ ${product.price}</p>`;
    presentation.insertAdjacentHTML("beforeend", showCart);

    sum += totProdPrice;
  });

  //Calculate sum and print it out
  const total = `<p class="checkout-sum right">Sum: $ ${sum.toFixed(2)}</p>`;
  const showResetButton =
    '<button class="right reset-btn btn">Reset cart</button>';

  presentation?.insertAdjacentHTML("beforeend", total);
  presentation?.insertAdjacentHTML("beforeend", showResetButton);
}
showCheckout();

//Reset cart/checkout
const resetBtn = document.querySelector(".reset-btn");
resetBtn?.addEventListener("click", () => {
  resetLocalStorage();
});

function resetLocalStorage() {
  localStorage.clear();
  location.reload();
}
