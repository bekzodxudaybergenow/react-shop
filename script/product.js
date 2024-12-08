let productsList = document.querySelector('.products-list');
let productCategoriesBtns = document.querySelectorAll('.product-categories--btn');


/* Api orqali mahsulotlarni olish */
let getProductsList = () => {

    fetch('https://fakestoreapi.com/products', {
        method: 'GET'
    })
    .then((res) => {return res.json()})
    .then((res) => {
        buildHtml(res);
        filterCategories(res);
    })
    .catch((err) => {console.log(err.message)});
}
getProductsList()

/* Mahsulotlarni htmlga joylashtirish */
let buildHtml = (tempProducts = products) => {
    productsList.innerHTML = '';
    tempProducts.forEach((product) => {
        productsList.innerHTML += `
            <li class="products-list--item">
                <img class="products-item--image" width="320" src="${product.image}" alt="">
                <h4 class="products-item--title">${product.title}</h4>
                <p class="products-item--desc">${product.description}</p>
                <div class="prducts-item--inner">
                    <button class="products-item--btn">Add To Card</button>
                    <span class="product-item--price">$ ${product.price}</span>
                </div>
            </li>
        `
    })
}

/* Categories */
let filterCategories = (products) => {
    productCategoriesBtns.forEach((el) => {
        el.addEventListener('click', (item) => {
            let filterProducts = products.filter((product) => {
                return product.category == item.target.textContent.toLowerCase();
            })
            item.target.textContent == 'All' ? buildHtml(products) : buildHtml(filterProducts);
        })
    })

}
