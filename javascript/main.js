import { populateProductList } from "./product-list-manager.js";

export let productInfo = {};

async function loadProducts() {
    const response = await fetch("./data.json");
    const products = await response.json();

    return products;
}

function indexProducts(rawProducts) {
    for (let product of rawProducts) {
        productInfo[product.name.replaceAll(" ", "_")] = {
            category: product.category,
            price: product.price.toFixed(2),
            thumbnail: product.image.thumbnail,
        };
    }
}

const rawProductData = await loadProducts();
populateProductList(rawProductData);
indexProducts(rawProductData);
