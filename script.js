const TABLET_BREAKPOINT = "768px";
const DESKTOP_BREAKPOINT = "1024px";

async function getProducts() {
    const response = await fetch("./data.json");
    const products = await response.json();

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
    const basketImage = document.createElement("img");
    basketImage.setAttribute("src", "/assets/images/icon-add-to-cart.svg");

    const button = document.createElement("button");

    button.innerText = "Add to Cart";
    button.appendChild(basketImage);
    button.classList.add("add-to-cart-button");

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

    return listElement;
}

async function populateProductList() {
    const productList = document.getElementById("product-list");
    const productData = await getProducts();

    for (let product of productData) {
        const listElement = createListElement(product);
        productList.appendChild(listElement);
    }
}

populateProductList();
