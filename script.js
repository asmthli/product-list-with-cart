const TABLET_BREAKPOINT = "768px";
const DESKTOP_BREAKPOINT = "1024px";

var totalCartItems = 0;
var cartCostTotal = 0;
var productCounts = {};
var productIds = {};

async function getProducts() {
    const response = await fetch("./data.json");
    const products = await response.json();

    let productIndex = 1;
    for (let product of products) {
        productIds[product.name] = productIndex;
        productIndex++;
    }

    return products;
}

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

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(button);

    return buttonContainer;
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

    listElement.appendChild(picElement);
    listElement.appendChild(createButton());
    listElement.appendChild(categoryElement);
    listElement.appendChild(nameElement);
    listElement.appendChild(priceElement);

    productCounts[product.name] = 0;

    return listElement;
}

function createCartRow(product) {
    const container = document.createElement("div");
    container.classList.add("cart-row");

    const productName = product.querySelector(".product__name").textContent;
    container.id = `p${productIds[productName]}`;

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
        product.querySelector(".product__price").textContent;
    individualCost.classList.add("cart-row__individualPrice");
    container.appendChild(individualCost);

    const totalCost = document.createElement("p");
    totalCost.textContent =
        product.querySelector(".product__price").textContent;
    totalCost.classList.add("cart-row__combinedPrice");
    container.appendChild(totalCost);

    const removeButton = document.createElement("button");
    const buttonImg = document.createElement("img");
    buttonImg.setAttribute("src", "/assets/images/icon-remove-item.svg");
    removeButton.appendChild(buttonImg);
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

async function populateProductList() {
    const productList = document.getElementById("product-list");
    const productData = await getProducts();

    for (let product of productData) {
        const listElement = createListElement(product);
        productList.appendChild(listElement);
    }
}

function addProductToCart(e) {
    if (totalCartItems == 0) {
        setCartNonEmpty();
    }

    const targetProduct = e.target.parentNode.parentNode;
    const productName =
        targetProduct.querySelector(".product__name").textContent;

    if (productCounts[productName] == 0) {
        const cartRow = createCartRow(targetProduct);

        const cartElement = document.querySelector(".cart");
        const cartTotalElement = cartElement.querySelector(
            ".cart__total-price-section"
        );
        cartElement.insertBefore(cartRow, cartTotalElement);
    }

    // TODO: BUG: Possible to outline the button decoration.
    targetProduct.querySelector("img").classList.add("product--outlined");

    productCounts[productName]++;
    totalCartItems++;

    updateCart(targetProduct);
}

function setCartNonEmpty() {
    const cart = document.querySelector(".cart");

    cart.querySelector(".empty-cart-display").classList.add("hidden");

    const cartButtonElement = cart.querySelector("#confirm-order-button");
    cartButtonElement.classList.remove("hidden");

    cart.insertBefore(createCartTotalElement(), cartButtonElement);
}

function updateCart(product) {
    document.querySelector("#cart-quantity").textContent = totalCartItems;
    updateCartRow(product);
    updateBasketTotalCost(product);
}

function updateCartRow(product) {
    const productIndividualCost = product
        .querySelector(".product__price")
        .textContent.slice(1);
    const productName = product.querySelector(".product__name").textContent;
    const productTotalCost =
        Number(productIndividualCost) * productCounts[productName];

    document.querySelector(
        ".cart-row__quantity"
    ).textContent = `${productCounts[productName]}x`;
}

function updateBasketTotalCost(product) {
    const productCost = product.querySelector(".product__price").textContent;
    cartCostTotal += Number(productCost.slice(1));

    // Update cart total UI element
    const cartTotalElement = document.querySelector(".cart__total-price");
    cartTotalElement.innerText = `$${Number(cartCostTotal).toFixed(2)}`;
}

populateProductList();
