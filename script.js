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

function createListElement(product) {
    const nameElement = document.createElement("p");
    nameElement.textContent = product.name;
    nameElement.classList.add("product__name");

    const categoryElement = document.createElement("p");
    categoryElement.textContent = product.category;
    categoryElement.classList.add("product__category");

    const priceElement = document.createElement("p");
    priceElement.textContent = product.price;
    priceElement.classList.add("product__PRICE");

    const picElement = createPictureElement(product.image);

    const listElement = document.createElement("li");
    listElement.classList.add("product");

    listElement.appendChild(nameElement, categoryElement);
    listElement.appendChild(categoryElement);
    listElement.appendChild(priceElement);
    listElement.appendChild(picElement);

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
