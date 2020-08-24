let carts = document.querySelectorAll(".add-cart");
let products = [
  {
    name: "Black hoodie",
    tag: "blackhoodie",
    price: 12,
    inCart: 0,
  },
  {
    name: "Blue hoodie",
    tag: "bluehoodie",
    price: 11,
    inCart: 0,
  },
  {
    name: "Khakhi Green hoodie",
    tag: "Khakhigreenhoodie",
    price: 15,
    inCart: 0,
  },
  {
    name: "Pink hoodie",
    tag: "pinkhoodie",
    price: 12,
    inCart: 0,
  },
  {
    name: "White hoodie",
    tag: "whitehoodie",
    price: 16,
    inCart: 0,
  },
];
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function cartNumbers(product) {
  console.log("The product clicked is", product);
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".cart span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".cart span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = { ...cartItems, [product.tag]: product };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".cart span").textContent = productNumbers;
  }
}

function totalCost(product) {
  // console.log("The product price is",product .price);
  let cartCost = localStorage.getItem("totalCost");

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
  console.log(cartCost);
}

function displayCart() {
  console.log("Display cart is called");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem("totalCost");
  let productContainer = document.querySelector(".products");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
            <div class = "product">
                <i class="far fa-times-circle icon"></i>
                <img class="img" src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">₹ ${item.price}00</div>
            <div class="quantity">
            <i class="fas fa-chevron-circle-left"></i>
                <span>${item.inCart}</span>
            <i class="fas fa-chevron-circle-right"></i>
            </div>
            <div class="total">
            ₹ ${item.inCart*item.price}00
            </div>
            `;
    });

    productContainer.innerHTML+=`
     <div class="basketTotalContainer">
    <h4 class="basketTotalTitle">Basket Total: ₹ ${cartCost}00</h4>

    `
    
  }
}
onLoadCartNumbers();
displayCart();
