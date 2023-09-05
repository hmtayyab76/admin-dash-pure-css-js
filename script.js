const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

let main = document.getElementById("main");
let dashboard = document.getElementById("dashboard");
let store = document.getElementById("store");
let analytics = document.getElementById("analytics");
let messages = document.getElementById("messages");
let team = document.getElementById("team");

dashboard.style.display = "block";
store.style.display = "none";
analytics.style.display = "none";
messages.style.display = "none";
team.style.display = "none";
let clickdash = document.getElementById("mydashboard");
clickdash.addEventListener("click", () => {
  dashboard.style.display = "block";
  store.style.display = "none";
  analytics.style.display = "none";
  messages.style.display = "none";
  team.style.display = "none";
});
let clickstore = document.getElementById("mystore");
clickstore.addEventListener("click", () => {
  store.style.display = "block";
  dashboard.style.display = "none";
  analytics.style.display = "none";
  messages.style.display = "none";
  team.style.display = "none";
});
let clickanalytic = document.getElementById("myanalytics");
clickanalytic.addEventListener("click", () => {
  analytics.style.display = "block";
  dashboard.style.display = "none";
  store.style.display = "none";
  messages.style.display = "none";
  team.style.display = "none";
});
let clickmsg = document.getElementById("mymessages");
clickmsg.addEventListener("click", () => {
  messages.style.display = "block";
  dashboard.style.display = "none";
  analytics.style.display = "none";
  store.style.display = "none";
  team.style.display = "none";
});
let clickteam = document.getElementById("myteam");
clickteam.addEventListener("click", () => {
  team.style.display = "block";
  dashboard.style.display = "none";
  analytics.style.display = "none";
  store.style.display = "none";
  messages.style.display = "none";
});

let product_items = [];
(() => {
  try {
    fetch("https://fakestoreapi.com/products")
      .then(async (response) => {
        product_items = await response.json();
        // console.log(product_items);
        writedata(product_items);

        // addtocart(product_items);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
})();
console.log(product_items);

function writedata(data) {
  //   console.log(data);
  document.getElementById("root").innerHTML = data
    .map((item, index) => {
      // console.log(item.category)
      if (item.category.toUpperCase() === "MEN'S CLOTHING") {
        // console.log(item.category);
      }
      var { id, image, title, price, category } = item;
      return `
    <div class="product">
            <div class="img-box">
            <img class="images" src=${image} alt=""></div>
            <div>
            <div class="id">${id} ${category.toUpperCase()}</div>
            <div class="title">${title}</div>
            <div class="price">$${price}</div>
            </div>
            <div class="add_product" onclick="addtocart(${
              item.id
            })">Add to cart</div>
        </div>
        `;
    })
    .join("");
}
let cart = [];

function addtocart(id) {
  let dataitem = product_items[id - 1];
  let cartitem = document.getElementById("cartitem");
  let totalprice = 0;
  if (cartitem) {
    let existingItem = cart.find((item) => item.id === dataitem.id);
    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalprice = existingItem.quantity * existingItem.price;
    } else {
      dataitem.quantity = 1;
      dataitem.totalPrice = dataitem.price;
      cart.push(dataitem);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    cartitem.innerHTML = cart
      .map((item) => {
        totalprice = item.quantity * item.price + totalprice;
        return `
            <div class="crat_content">
              <img class="cart_img" src=${item.image} width="50px" alt="">
              <div class="cart_about">
              <div class="id">ID No. ${item.id} ${item.category}</div>
              <div class="price pt">$${item.price} x ${item.quantity}</div>
              </div>
              <button class="x_btn" onclick="removeFromCart(${item.id})">
                <i class="fa-sharp fa-solid fa-xmark"></i>
              </button>
            </div>
          `;
      })
      .join("");
    document.getElementById("count").textContent = cart.length;
    document.getElementById("total").textContent = `$${totalprice.toFixed(2)}`;
  }
}
window.addEventListener("load", () => {
  const data = localStorage.getItem("cart");
  let totalprice = 0;
  let set = JSON.stringify(data);
  cart = JSON.parse(data);
  let cartitem = document.getElementById("cartitem");
  cartitem.innerHTML = cart
    .map((item) => {
      var { image, id, category, price } = item;
      console.log(item.price);
      totalprice = item.quantity * item.price + totalprice;
      return `
    <div class="crat_content">
      <img class="cart_img" src=${item.image} width="50px" alt="">
      <div class="cart_about">
      <div class="id">ID No. ${item.id} ${item.category}</div>
      <div class="price pt">$${item.price} x ${item.quantity}</div>
      </div>
      <button class="x_btn" onclick="removeFromCart(${item.id})">
      <i class="fa-sharp fa-solid fa-xmark"></i>
      </button>
    </div>
  `;
    })
    .join("");
  document.getElementById("count").textContent = cart.length;
  document.getElementById("total").textContent = `$${totalprice.toFixed(2)}`;
});

function removeFromCart(id) {
  let index = cart.findIndex((item) => item.id === id);
  let totalprice = 0;
  if (index !== -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    let cartitem = document.getElementById("cartitem");
    cartitem.innerHTML = cart

      .map((item) => {
        totalprice = item.quantity * item.price + totalprice;

        return `
            <div class="crat_content">
              <img class="cart_img" src=${item.image} width="50px" alt="">
              <div class="cart_about">
              <div class="id">ID No. ${item.id} ${item.category}</div>
              <div class="price pt">$${item.price} x ${item.quantity}</div>
              </div>
              <button class="x_btn" onclick="removeFromCart(${item.id})">
              <i class="fa-sharp fa-solid fa-xmark"></i>
              </button>
            </div>
          `;
      })
      .join("");
    document.getElementById("count").textContent = cart.length;
    document.getElementById("total").textContent = `$${totalprice.toFixed(2)}`;
  }
}
let searchBtn = document.getElementById("search_btn");
let searchInput = document.getElementById("search");
let searchResults = document.getElementById("root");

searchBtn.addEventListener("click", () => {
  let searchValue = searchInput.value.toLowerCase();
  let filteredProducts = product_items.filter((item) =>
    item.category.toLowerCase().includes(searchValue)
  );

  searchResults.innerHTML = "";

  if (filteredProducts.length > 0) {
    filteredProducts.map((item) => {
      let productElement = `
        <div class="product">
          <div class="img-box">
            <img class="images" src=${item.image} alt="">
          </div>
          <div>
            <div class="id">${item.id} ${item.category.toUpperCase()}</div>
            <div class="title">${item.title}</div>
            <div class="price">$${item.price}</div>
          </div>
          <div class="add_product" onclick="addtocart(${
            item.id
          })">Add to cart</div>
        </div>
      `;
      searchResults.innerHTML += productElement;
    });
  } else {
    searchResults.innerHTML = `<p>"${searchValue}" No products found.</p>`;
  }
});
