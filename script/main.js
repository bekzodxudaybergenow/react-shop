let headOpenBtn = document.querySelector('.head-humburger--btn');
let headSidebar = document.querySelector('.head-sidebar');
let headShade = document.querySelector('.head-shade');
let sidebarCloseBtn = document.querySelector('.sidebar-closeBtn');



// Events
headOpenBtn.addEventListener('click', () => {
    headSidebar.classList.add('show');
    headShade.classList.add('show');
})
sidebarCloseBtn.addEventListener('click', () => {
    headSidebar.classList.remove('show');
    headShade.classList.remove('show');
})
headShade.addEventListener('click', () => {
    headSidebar.classList.remove('show');
    headShade.classList.remove('show');
})

