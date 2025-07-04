# Technical Assessment: Product Data Extraction Script

## Overview

This script extracts structured product data from a delayed-rendering HTML page using only vanilla JavaScript. The page dynamically renders product cards, including delayed fields such as prices and stock counts.

The goal was to inject a script that could be pasted into the browser console and log out all relevant product data.

## Thought Process

### Dealing with Render Delays

upon inspecting `index.html` I noticed:
-the page takes a while before loading so using querySelectorAll will not work unless we wait for the products page to load

# First Iteration (Before Refactor)

I focused on getting a working version by:

1. Listening for the `"load"` event
2. Delaying execution using `setTimeout(10000)`
3. Looping through `.product-card` elements and extracting:
   - `image`, `cardTitle`, `badge`
   - `pricePrefix`, dynamic price spans
4. Extracting stock data inside a second `setTimeout()` (8s delay) to account for staggered rendering of stock indicators

```js
window.addEventListener("load", () => {
  setTimeout(() => {
    const products = document.querySelectorAll(".product-card");

    products.forEach((product) => {
      const image = product.querySelector(".product-image")?.src;
      const cardTitle = product.querySelector(".product-title")?.textContent;
      const badge = product.querySelector(".badge")?.textContent;

      const productPrices = product.querySelector(".product-price");
      const pricePrefix =
        productPrices?.querySelector(".price-prefix")?.textContent;
      const priceSpans = productPrices?.querySelectorAll("span");

      const actualPrice = priceSpans?.[1]?.textContent;
      const originalPrice = priceSpans?.[2]?.textContent;

      console.log("Price Prefix:", pricePrefix);
      console.log("Reduced Price:", actualPrice);
      console.log("Original Price:", originalPrice);
      console.log("Image:", image);
      console.log("Title:", cardTitle);
      console.log("Badge:", badge);

      const stockContainer = product.querySelector(".product-stock");

      setTimeout(() => {
        const stockSpans = stockContainer?.querySelectorAll("span");
        const stockHTML = stockSpans?.[0]?.outerHTML;
        const stockLabel = stockSpans?.[1]?.textContent;
        const encodedStock = stockContainer?.getAttribute("data-count");
        const decodedStock = encodedStock ? atob(encodedStock) : "N/A";

        console.log("Stock HTML:", stockHTML);
        console.log("Stock Label:", stockLabel);
        console.log("Decoded Stock Count:", decodedStock);
      }, 8000);
    });
  }, 10000);
});
```

## after refactoring:

```js
window.addEventListener("load", () => {
  setTimeout(() => {
    const products = document.querySelectorAll(".product-card");
    console.log("---<>", products);

    const results = [];

    products.forEach((product) => {
      const stockConatiner = product.querySelector(".product-stock");
      const stockIndicator = stockConatiner?.querySelectorAll("span");
      const productPrices = product.querySelector(".product-price");
      const priceSpans = productPrices?.querySelectorAll("span");

      results.push({
        image: product.querySelector(".product-image")?.src,
        cardTitle: product.querySelector(".product-title")?.innerText,
        badge: product.querySelector(".badge")?.textContent || "no badge",
        pricePrefix: productPrices?.querySelector(".price-prefix")?.textContent,

        originalPrice: priceSpans?.[2]?.textContent,
        reducedPrice: priceSpans?.[1]?.textContent,
        stockIndicator:
          stockIndicator[0]?.classList[1] || stockIndicator[0]?.classList[0],
        stockIndicatorAmount:
          stockIndicator[0]?.nextElementSibling?.nextSibling?.data ||
          "no amount on page",
      });
    });

    console.log("results:", results);
  }, 19000);
});
```
# mmint
