import { addProductToCart, updateCart } from "./cart-manager.js";
import { productCounts } from "./main.js";

const TABLET_BREAKPOINT = "768px";
const DESKTOP_BREAKPOINT = "1024px";

export async function populateProductList(productData) {
    const productList = document.getElementById("product-list");

    for (let product of productData) {
        const listElement = createListElement(product);
        productList.appendChild(listElement);
    }
}

function createListElement(product) {
    const nameElement = document.createElement("p");
    nameElement.textContent = product.name;
    nameElement.classList.add("product__name");

    const categoryElement = document.createElement("p");
    categoryElement.textContent = product.category;
    categoryElement.classList.add("product__category");

    const priceElement = document.createElement("p");
    priceElement.textContent = `$${product.price.toFixed(2)}`;
    priceElement.classList.add("product__price");

    const picElement = createPictureElement(product.image);

    const listElement = document.createElement("li");
    listElement.classList.add("product");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(createButton());

    listElement.appendChild(picElement);
    listElement.appendChild(buttonContainer);
    listElement.appendChild(categoryElement);
    listElement.appendChild(nameElement);
    listElement.appendChild(priceElement);

    return listElement;
}

// Components for a product list element.
function createPictureElement(imageSources) {
    const mobileSrc = document.createElement("source");
    mobileSrc.setAttribute("srcset", imageSources.mobile);

    const tabletSrc = document.createElement("source");
    tabletSrc.setAttribute("media", `(min-width: ${TABLET_BREAKPOINT})`);
    tabletSrc.setAttribute("srcset", imageSources.tablet);

    const desktopSrc = document.createElement("source");
    desktopSrc.setAttribute("media", `(min-width: ${DESKTOP_BREAKPOINT})`);
    desktopSrc.setAttribute("srcset", imageSources.desktop);

    const img = document.createElement("img");
    img.setAttribute("src", imageSources.desktop);

    const picElement = document.createElement("picture");
    picElement.appendChild(desktopSrc);
    picElement.appendChild(tabletSrc);
    picElement.appendChild(mobileSrc);
    picElement.appendChild(img);

    return picElement;
}

function createButton() {
    const cartImage = document.createElement("img");
    cartImage.setAttribute("src", "/assets/images/icon-add-to-cart.svg");

    const button = document.createElement("button");

    button.innerText = "Add to Cart";
    button.appendChild(cartImage);
    button.classList.add("add-to-cart-button");
    button.addEventListener("click", addProductToCart);

    return button;
}

function createIncrementorButtons() {
    const incrementorDiv = document.createElement("div");
    incrementorDiv.classList.add("incrementor-button");

    const decreaseButton = document.createElement("button");
    decreaseButton.classList.add("incrementor-button__button");
    decreaseButton.addEventListener("click", decrementProductQuantity);
    const decreaseImg = document.createElement("img");
    decreaseImg.src = "assets/images/icon-decrement-quantity.svg";
    decreaseButton.appendChild(decreaseImg);

    const productQuantityElement = document.createElement("p");
    productQuantityElement.classList.add("incrementor-button__quantity");
    productQuantityElement.textContent = "1";

    const increaseButton = document.createElement("button");
    increaseButton.classList.add("incrementor-button__button");
    increaseButton.addEventListener("click", incrementProductQuantity);
    const increaseImg = document.createElement("img");
    increaseImg.src = "assets/images/icon-increment-quantity.svg";
    increaseButton.appendChild(increaseImg);

    incrementorDiv.appendChild(decreaseButton);
    incrementorDiv.appendChild(productQuantityElement);
    incrementorDiv.appendChild(increaseButton);

    return incrementorDiv;
}

export function setProductSelected(product) {
    product.querySelector("img").classList.add("product--outlined");
    setSelectedButton(product);
}

function incrementProductQuantity(buttonClickEvent) {
    const productElement = buttonClickEvent.target.closest(".product");
    const productName =
        productElement.querySelector(".product__name").textContent;
    const productId = productName.replaceAll(" ", "_");

    productCounts[productId]++;
    productElement.querySelector(".incrementor-button__quantity").textContent =
        productCounts[productId];
    updateCart(productId, 1);
}

function decrementProductQuantity(buttonClickEvent) {
    const productElement = buttonClickEvent.target.closest(".product");
    const productName =
        productElement.querySelector(".product__name").textContent;
    const productId = productName.replaceAll(" ", "_");

    productCounts[productId]--;
    productElement.querySelector(".incrementor-button__quantity").textContent =
        productCounts[productId];
    updateCart(productId, -1);
}

function setSelectedButton(product) {
    const buttonContainer = product.querySelector(".button-container");
    buttonContainer.querySelector(".add-to-cart-button").remove();

    const incrementorButtons = createIncrementorButtons();
    buttonContainer.appendChild(incrementorButtons);
}

export function setProductUnselected(productName) {
    const productListItems = document.querySelectorAll(".product");

    for (let item of productListItems) {
        if (
            item.querySelector(".product__name").textContent ==
            productName.replaceAll("_", " ")
        ) {
            item.querySelector("img").classList.remove("product--outlined");

            const buttonContainer = item.querySelector(".button-container");
            buttonContainer.querySelector(".incrementor-button").remove();
            buttonContainer.appendChild(createButton());
            break;
        }
    }
}
