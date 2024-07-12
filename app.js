

document.getElementById('cart-icon').addEventListener('click', function() {
    if (window.innerWidth < 1200) {
        window.location.href = 'cart.html';
    } else {
        const cart = document.getElementById('cart');
        const header = document.getElementById('header');
        const maincontent = document.getElementById('main-content');
        const items = document.getElementById('items');
        if (cart.style.display === 'none' || cart.style.display === '') {
            cart.style.display = 'block';
            header.style.right = '300px';
            maincontent.style.marginRight = '300px';
            items.style.gridTemplateColumns = 'repeat(4 ,1fr)';
        } else {
            cart.style.display = 'none';
            header.style.right = '0';
            maincontent.style.marginRight = '0';
            items.style.gridTemplateColumns = 'repeat(5 ,1fr)';
        }
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth >= 1200) {
        const cart = document.getElementById('cart');
        const header = document.getElementById('header');
        const maincontent = document.getElementById('main-content');
        const items = document.getElementById('items');
        cart.style.display = 'none';
        header.style.right = '0';
        maincontent.style.marginRight = '0';
        items.style.gridTemplateColumns = 'repeat(5 ,1fr)';
    }
});

document.getElementById('navbar-toggler').addEventListener('click',function(){
    const header = document.getElementById('header');
    if(header.style.top = '200px'){
        header.style.top = '200px';
        console.log("ok-02");
    }
})

document.getElementById('navbar-toggler').addEventListener('dblclick',function(){
    const header = document.getElementById('header');
    if(header.style.top = '200px'){
        header.style.top = '60px';
        console.log("ok-02");
    }
})









