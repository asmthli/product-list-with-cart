async function getProducts() {
    const response = await fetch("./data.json");
    const products = await response.json();

    return products;
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

    const listElement = document.createElement("li");
    listElement.appendChild(nameElement);
    listElement.appendChild(categoryElement);
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
