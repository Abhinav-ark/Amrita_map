const sandwich = document.querySelector('.sandwich');
const navbar = document.querySelector('.mobile-nav');;
const scroller = document.querySelector('.scroller');

sandwich.addEventListener('click', closenav);

function closenav()
{
    sandwich.classList.toggle('is-active');
    navbar.classList.toggle('is-active');
    scroller.classList.toggle('fixed');
}