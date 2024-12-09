let productsList = document.querySelector('.products-list');
let productCategoriesBtns = document.querySelectorAll('.product-categories--btn');
let headCard = document.querySelector('.head-card');
let sidebarCloseBtn = document.querySelector('.sidebar-close--btn');
let sidebar = document.querySelector('.sidebar');
let sidebarList = document.querySelector('.sidebar-list');
let headCardCount = document.querySelector('.head-card--count');
let sidebarCountCoun = document.querySelector('.sidebar-count--coun');

let globalProducts;
let myProducts = [];



/* Events */
headCard.addEventListener('click', () => {
    sidebar.classList.add('active')
})
sidebarCloseBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
})


/* Api orqali mahsulotlarni olish */
let initApp = () => {

    fetch('https://fakestoreapi.com/products', {
        method: 'GET'
    })
    .then((res) => {return res.json()})
    .then((res) => {
        buildHtml(res);
        filterCategories(res);
        globalProducts = res;
    })
    .catch((err) => {console.log(err.message)});
}
initApp()

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
                    <button class="products-item--btn" onclick="addProduct(${product.id})">Add To Card</button>
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

/* Add Product */
let addProduct = (productId) => {
    let getProductObj = globalProducts.find((el) => el.id === productId);
    if(!(myProducts.some((item) => item.id === productId))) {
        myProducts.push({...getProductObj, count: 1});
    
        headCardCount.textContent++;
        buildSidebarHTML(myProducts);
    }
}

let buildSidebarHTML = (myProducts) => {
    sidebarList.innerHTML = '';
    myProducts.forEach((myProduct) => {
        sidebarList.innerHTML += `
         <li class="sidebar-list--item">
            <img class="sidebar-item--image" src="${myProduct.image}" alt="">
            <div class="sidebar-count">
                <button class="sidebar-count--decriment">-</button>
                <span class="sidebar-count--count">${myProduct.count}</span>
                <button class="sidebar-count--increment">+</button>
            </div>
        </li>
        `
    })
}



