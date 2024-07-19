window.addEventListener('scroll' , reveal);
function reveal(){
    var reveal = document.querySelectorAll('.reveal');
    for(var i=0;i<reveal.length;i++){
        var windowheight = window.innerHeight;
        var revealtop = reveal[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if(revealtop < windowheight - revealpoint){
            reveal[i].classList.add('active');

        } else {
            reveal[i].classList.remove('active');
        }
    }
}

ScrollReveal({
    reset : true,
    distance : '60px',
    duration : 2500,
    
});

ScrollReveal().reveal('.hotel-img' , {origin : 'right'});

ScrollReveal().reveal('.about-hotel' , {origin : 'left'});

ScrollReveal().reveal('.news-letter' , {origin : 'left'});

let togglemenu = document.getElementById("menulist");
menulist.style.maxHeight = "0px";

function togglemenu(){
    if(menulist.style.maxHeight == "0px"){
        menulist.style.maxHeight = "300px";
    } else {
        menulist.style.maxHeight = "0px";
    }
}