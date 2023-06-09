import { menuArray } from "./data.js";

const mainsection = document.getElementById("main-section");
const orderlayout = document.getElementById("order-layout");
let totalPrice = document.getElementById("total-price");
const orderDetails = document.getElementById("order");
const paymentBtn = document.getElementById("pay-btn");
const paymentModal = document.getElementById("payment-modal");
const closeButton = document.getElementById("close-btn");
const completeOrder = document.getElementById("complete-order-btn");
const inputNameValue = document.getElementById("name");
const confirmationMsg = document.getElementById("confirmation-msg");
const messageDisplay = document.getElementById("message-display");
const removeButton = document.querySelectorAll("remove-btn");
document.addEventListener("click", (e) => {
  if (e.target.dataset.add) {
    handleAddItem(Number(e.target.dataset.add));
  } else if (e.target.dataset.remove) {
    handleRemoveItem(Number(e.target.dataset.remove));
  }
});

completeOrder.addEventListener("click", (e) => {
  paymentModal.style.display = "flex";
});

closeButton.addEventListener("click", () => {
  paymentModal.style.display = "none";
});

paymentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let value = inputNameValue.value;
  paymentModal.style.display = "none";
  confirmationMsg.style.display = "flex";
  orderDetails.style.display = "none";
  messageDisplay.innerText = `Thanks, ${value}! your order is on its way`;
  confirmationMsg.append(paragraph);
});

let orderedItems = [];
function handleRemoveItem(id) {
  orderedItems.forEach((item, i) => {
    if (id === item.id) {
      orderedItems.splice(i, 1);
    }
  });
  localStorage.setItem("orderData", JSON.stringify(orderedItems));
  renderItems();
  calculateTotal();
}

orderedItems.length < 1 && orderDetails.classList.add("hide");
function handleAddItem(id) {
  menuArray.forEach((item) => {
    if (item.id === id) {
      orderedItems.push(item);
    }
  });
  localStorage.setItem("orderData", JSON.stringify(orderedItems));
  renderItems();
  calculateTotal();
}

function calculateTotal() {
  let storedData = JSON.parse(localStorage.getItem("orderData"));
  let value =
    orderedItems && storedData.reduce((acc, obj) => acc + obj.price, 0);
  totalPrice.innerText = value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  value < 1 && orderDetails.classList.add("hide");
  value > 0 && orderDetails.classList.remove("hide");
}

function renderItems() {
  let storedData = JSON.parse(localStorage.getItem("orderData"));

  let itemsOrdered = ``;
  if (orderedItems) {
    storedData.forEach((item) => {
      itemsOrdered += `
          <section class="order-details">
          <div class="item-list">
            <p>${item.name}</p>
            <button class="remove-btn" data-remove=${Number(
              item.id
            )}>remove</button>
          </div>
          <p>${item.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}</p>
        </section>`;
    });
  }
  orderlayout.innerHTML = itemsOrdered;
  render();
}

function getFeedHtml() {
  let feedHtml = ``;
  menuArray.forEach((item) => {
    feedHtml += `
    <section class="item" >
    <section class="sub-item">
      <img id="image" class="image" src="${item.img}"/>
      <section class="sub-item-details">
        <section>
          <p class="item-name">${item.name}</p>
          <p id="ingredients" class="ingredients">
            ${item.ingredients}
          </p>
        </section>
        <p id="price" class="price">${item.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}</p>
      </section>
    </section>
    <button id="class-btn" class="add-btn" data-add=${Number(
      item.id
    )}>+</button>
  </section>
  <hr />
    `;
  });

  return feedHtml;
}

function render() {
  mainsection.innerHTML = getFeedHtml();
}

render();
