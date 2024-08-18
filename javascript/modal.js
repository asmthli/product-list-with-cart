import { productInfo } from "./main.js";
import { clearCart } from "./cart-manager.js";

export function modalSetup() {
    document.querySelector(".modal").addEventListener("close", () => {
        clearModalList();
    });

    document.querySelector(".modal__button").addEventListener("click", () => {
        document.querySelector(".modal").close();
        clearCart();
    });
}

export function populateModal() {
    const cartRows = document.querySelectorAll(".cart-row");
    const orderSummaryList = document.querySelector(".modal__order-list");

    for (let cartRow of cartRows) {
        orderSummaryList.appendChild(createSummaryRow(cartRow));
    }

    const orderTotalElement = document.querySelector(".modal__order-total");
    const cartTotalElement = document.querySelector(".cart__total-price");

    orderTotalElement.textContent = cartTotalElement.textContent;
}

function clearModalList() {
    const listItems = document.querySelectorAll(".modal-list-item");

    for (let item of listItems) {
        item.remove();
    }
}

function createSummaryRow(cartRow) {
    const nameElement = cartRow
        .querySelector(".cart-row__name")
        .cloneNode(true);
    nameElement.className = "modal-list-item__name";
    const quantityElement = cartRow
        .querySelector(".cart-row__quantity")
        .cloneNode(true);
    quantityElement.className = "modal-list-item__quantity";
    const individualCostElement = cartRow
        .querySelector(".cart-row__individual-price")
        .cloneNode(true);
    individualCostElement.className = "modal-list-item__individual-price";
    const combinedCostElement = cartRow
        .querySelector(".cart-row__combined-price")
        .cloneNode(true);
    combinedCostElement.className = "modal-list-item__combined-price";

    const thumbnailImg = document.createElement("img");
    thumbnailImg.className = "modal-list-item__thumbnail";
    const id = nameElement.textContent.replaceAll(" ", "_");
    thumbnailImg.src = productInfo[id].thumbnail;

    const row = document.createElement("li");
    row.className = "modal-list-item";
    row.append(thumbnailImg);
    row.append(nameElement);
    row.append(quantityElement);
    row.append(individualCostElement);
    row.append(combinedCostElement);

    return row;
}
