// for onloading page

window.addEventListener("load", () => {
  setTimeout(() => {
    const products = document.querySelectorAll(".product-card");
    console.log("--->", products);

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

/*
paste this fucntion in the console for demo
*/

// function extractProductData() {
//   const products = document.querySelectorAll(".product-card");
//   console.log("---<>", products);

//   const results = [];

//   products.forEach((product) => {
//     const stockConatiner = product.querySelector(".product-stock");
//     const stockIndicator = stockConatiner?.querySelectorAll("span");
//     const productPrices = product.querySelector(".product-price");
//     const priceSpans = productPrices?.querySelectorAll("span");
//     results.push({
//       image: product.querySelector(".product-image")?.src,
//       cardTitle: product.querySelector(".product-title")?.innerText,
//       badge: product.querySelector(".badge")?.textContent,
//       pricePrefix: productPrices?.querySelector(".price-prefix")?.textContent,
//       originalPrice: priceSpans?.[2]?.textContent,
//       reducedPrice: priceSpans?.[1]?.textContent,
//       stockIndicator: stockIndicator[0]?.classList[1] || stockIndicator[0]?.classList[0],
//       stockIndicatorAmount: stockIndicator[0]?.nextElementSibling?.nextSibling?.data,

//     });
//   });
//   console.log("actual results:", results);
// }

// setTimeout(extractProductData, 10000);
