let productsList = document.querySelector('.products-list');
let productCategoriesBtns = document.querySelectorAll('.product-categories--btn');
let headCard = document.querySelector('.head-card');
let sidebarCloseBtn = document.querySelector('.sidebar-close--btn');
let sidebar = document.querySelector('.sidebar');
let sidebarList = document.querySelector('.sidebar-list');
let headCardCount = document.querySelector('.head-card--count');
let sidebarCountCoun = document.querySelector('.sidebar-count--coun');
let sidebarSum = document.querySelector('.sidebar-sum');
let loader = document.querySelector('.loader');

let headOpenBtnn = document.querySelector('.head-humburger--btn');
let headSidebarr = document.querySelector('.head-sidebar');
let headShadee = document.querySelector('.head-shade');
let sidebarCloseBtnn = document.querySelector('.sidebar-closeBtn');
let headSidebarShade = document.querySelector('.head-sidebar--shade');
let headCategoryBtn = document.querySelector('.head-category--btn');
let productsCategories = document.querySelector('.products-categories');

let globalProducts;
let myProducts = [];
let sidebarTotalSum = 0;



/* Events */
headCard.addEventListener('click', () => {
    sidebar.classList.add('active');
    headSidebarShade.classList.add('active');
})
sidebarCloseBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    headSidebarShade.classList.remove('active');
})
headSidebarShade.addEventListener('click', () => {
    sidebar.classList.remove('active');
    headSidebarShade.classList.remove('active');
})

headCategoryBtn.addEventListener('click', () => {
    productsCategories.classList.toggle('active');
})

headOpenBtnn.addEventListener('click', () => {
    headSidebarr.classList.add('active');
    headShadee.classList.add('active');
})
sidebarCloseBtnn.addEventListener('click', () => {
    headSidebarr.classList.remove('active');
    headShadee.classList.remove('active');
})
headShadee.addEventListener('click', () => {
    headSidebarr.classList.remove('active');
    headShadee.classList.remove('active');
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
    .catch((err) => {console.log(err.message)})
    .finally(() => {loader.style.display = 'none'})
}
initApp()

/* Mahsulotlarni htmlga joylashtirish */
let buildHtml = (tempProducts = globalProducts) => {
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
        
        sidebarTotalSum += getProductObj.price;
        sidebarSum.textContent = sidebarTotalSum;
        headCardCount.textContent++;
        buildSidebarHTML(myProducts);
    }
}

/*  Mahsulotlarni Sidebar joylashtirish */
let buildSidebarHTML = (myProducts) => {
    sidebarList.innerHTML = '';
    myProducts.forEach((myProduct) => {
        sidebarList.innerHTML += `
         <li class="sidebar-list--item">
            <div class="sidebar-item--inner">
                <img class="sidebar-item--image" src="${myProduct.image}" alt="">
                <div class="sidebar-item--row">
                <h4 class="sidebar-item--title">${myProduct.title}</h4>
                <span class="sidebar-item--price">$${myProduct.price}</span>
                </div>
            </div>
            <div class="sidebar-count">
                <div class="sidebar-count--inner">
                    <button class="sidebar-count--decriment" onclick="decrimentBtn(${myProduct.id})">-</button>
                    <span class="sidebar-count--count">${myProduct.count}</span>
                    <button class="sidebar-count--increment" onclick="incrementBtn(${myProduct.id})">+</button>
                </div>
                <button class="sidebar-count--remove" onclick="removetBtn(${myProduct.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
            </li>
        `
    })
}

let incrementBtn = (myProductId) => {
    let findObj = myProducts.find((el) => el.id === myProductId);
    if(findObj.count < findObj.rating.count) {
        findObj.count++;
        sidebarTotalSum += findObj.price;
        sidebarSum.textContent = sidebarTotalSum.toFixed(2);
    }
    buildSidebarHTML(myProducts);
}

let decrimentBtn = (myProductId) => {
    let findObj = myProducts.find((el) => el.id === myProductId);
    if(findObj.count > 1) {
        findObj.count--;
        sidebarTotalSum -= findObj.price;
        sidebarSum.textContent = sidebarTotalSum.toFixed(2);
    }
    else {
        return findObj.count;
    }
    
    buildSidebarHTML(myProducts);
}

let removetBtn = (myProductId) => {
    let sidebarProductObj = myProducts.find((el) => el.id === myProductId);
    let sidebarProductIdx = myProducts.findIndex((el) => el.id === myProductId);

    
    if(sidebarProductObj.count == 1) {
        myProducts.splice(sidebarProductIdx, 1);
        headCardCount.textContent--;
        
        sidebarTotalSum -= sidebarProductObj.price
        sidebarSum.textContent = sidebarTotalSum.toFixed(2);
    
        buildSidebarHTML(myProducts);
    }
    else if(sidebarProductObj.count > 1) {
        myProducts.splice(sidebarProductIdx, 1);
        headCardCount.textContent--;
        
        sidebarTotalSum -= (sidebarProductObj.price * sidebarProductObj.count) 
        sidebarSum.textContent = sidebarTotalSum.toFixed(2);
    
        buildSidebarHTML(myProducts);
    }
}

