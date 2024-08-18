import { productInfo } from "./main.js";

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

function createSummaryRow(cartRow) {
    const nameElement = cartRow
        .querySelector(".cart-row__name")
        .cloneNode(true);
    nameElement.className = "modal-list__name";
    const quantityElement = cartRow
        .querySelector(".cart-row__quantity")
        .cloneNode(true);
    quantityElement.className = "modal-list__quantity";
    const individualCostElement = cartRow
        .querySelector(".cart-row__individual-price")
        .cloneNode(true);
    individualCostElement.className = "modal-list__individual-price";
    const combinedCostElement = cartRow
        .querySelector(".cart-row__combined-price")
        .cloneNode(true);
    combinedCostElement.className = "modal-list__combined-price";

    const thumbnailImg = document.createElement("img");
    thumbnailImg.className = "modal-list__thumbnail";
    const id = nameElement.textContent.replaceAll(" ", "_");
    thumbnailImg.src = productInfo[id].thumbnail;

    const row = document.createElement("li");
    row.append(thumbnailImg);
    row.append(nameElement);
    row.append(quantityElement);
    row.append(individualCostElement);
    row.append(combinedCostElement);

    return row;
}
