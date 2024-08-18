import { productInfo, productCounts } from "./main.js";
import { populateModal } from "./modal.js";
import {
    setProductSelected,
    setProductUnselected,
} from "./product-list-manager.js";

let totalCartItems = 0;
let cartCostTotal = 0;

export function addProductToCart(e) {
    if (totalCartItems == 0) {
        setCartNonEmpty();
    }

    const clickedProduct = e.target.closest(".product");
    const productName = clickedProduct
        .querySelector(".product__name")
        .textContent.replaceAll(" ", "_");

    if (!productCounts[productName]) {
        const cartRow = createCartRow(clickedProduct);

        const cartElement = document.querySelector(".cart");
        const cartTotalElement = cartElement.querySelector(
            ".cart__total-price-section"
        );
        cartElement.insertBefore(cartRow, cartTotalElement);
    }

    setProductSelected(clickedProduct);

    if (!productCounts[productName]) {
        productCounts[productName] = 1;
    } else {
        productCounts[productName]++;
    }

    updateCart(productName, 1);
}

export function removeItemFromCart(e) {
    const cartRow = e.target.closest(".cart-row");
    const productName = cartRow
        .querySelector(".cart-row__name")
        .textContent.replaceAll(" ", "_");

    updateCart(productName, -1 * productCounts[productName]);
    productCounts[productName] = 0;
    cartRow.remove();

    setProductUnselected(productName);
}

export function cartSetup() {
    const confirmButton = document.querySelector("#confirm-order-button");
    const modal = document.querySelector(".modal");
    confirmButton.addEventListener("click", () => {
        populateModal();
        modal.showModal();
    });
}

export function clearCart() {
    const removeButtons = document.querySelectorAll(".cart-remove-button");

    for (let button of removeButtons) {
        button.click();
    }
}

function createCartRow(productListItem) {
    const container = document.createElement("div");
    container.classList.add("cart-row");

    const productName =
        productListItem.querySelector(".product__name").textContent;
    container.id = `row-${productName.replaceAll(" ", "_")}`;

    const name = document.createElement("p");
    name.textContent = productName;
    name.classList.add("cart-row__name");
    container.appendChild(name);

    const quantity = document.createElement("p");
    quantity.textContent = "1x";
    quantity.classList.add("cart-row__quantity");
    container.appendChild(quantity);

    const individualCost = document.createElement("p");
    individualCost.textContent =
        productListItem.querySelector(".product__price").textContent;
    individualCost.classList.add("cart-row__individual-price");
    container.appendChild(individualCost);

    const totalCost = document.createElement("p");
    totalCost.textContent =
        productListItem.querySelector(".product__price").textContent;
    totalCost.classList.add("cart-row__combined-price");
    container.appendChild(totalCost);

    const removeButton = document.createElement("button");
    const buttonImg = document.createElement("img");
    buttonImg.setAttribute("src", "/assets/images/icon-remove-item.svg");
    removeButton.appendChild(buttonImg);
    removeButton.addEventListener("click", removeItemFromCart);
    removeButton.classList.add("cart-remove-button");

    container.appendChild(removeButton);

    return container;
}

function createCartTotalElement() {
    const text = document.createElement("p");
    text.textContent = "Order Total";
    text.classList.add("cart__total-price-text");

    const totalPrice = document.createElement("p");
    totalPrice.textContent = `$${Number(cartCostTotal).toFixed(2)}`;
    totalPrice.classList.add("cart__total-price");

    const container = document.createElement("div");
    container.classList.add("cart__total-price-section");
    container.appendChild(text);
    container.appendChild(totalPrice);

    return container;
}

function setCartEmpty() {
    const cart = document.querySelector(".cart");

    cart.querySelector(".empty-cart-display").classList.remove("hidden");

    const cartButtonElement = cart.querySelector("#confirm-order-button");
    cartButtonElement.classList.add("hidden");

    cart.querySelector(".cart__total-price-section").remove();
}

function setCartNonEmpty() {
    const cart = document.querySelector(".cart");

    cart.querySelector(".empty-cart-display").classList.add("hidden");

    const cartButtonElement = cart.querySelector("#confirm-order-button");
    cartButtonElement.classList.remove("hidden");

    cart.insertBefore(createCartTotalElement(), cartButtonElement);
}

export function updateCart(changedProductName, changeQuantity) {
    totalCartItems += changeQuantity;
    document.querySelector("#cart-quantity").textContent = totalCartItems;
    updateCartRow(changedProductName);

    const itemCost = productInfo[changedProductName].price;
    updateCartTotalCost(itemCost, changeQuantity);

    if (totalCartItems == 0) {
        setCartEmpty();
    }
}

function updateCartRow(productName) {
    const productIndividualCost = productInfo[productName].price;

    const productTotalCost =
        Number(productIndividualCost) * productCounts[productName];

    document.querySelector(
        `#row-${productName} .cart-row__combined-price`
    ).textContent = `$${productTotalCost.toFixed(2)}`;

    document.querySelector(
        `#row-${productName} .cart-row__quantity`
    ).textContent = `${productCounts[productName]}x`;
}

function updateCartTotalCost(itemCost, countDelta) {
    cartCostTotal += Number(itemCost) * countDelta;

    // Update cart total UI element
    const cartTotalElement = document.querySelector(".cart__total-price");
    cartTotalElement.innerText = `$${Number(cartCostTotal).toFixed(2)}`;
}
