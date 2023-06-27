const sandwich = document.querySelector('.sandwich');
const navbar = document.querySelector('.mobile-nav');;

sandwich.addEventListener('click', function() {
    sandwich.classList.toggle('is-active');
    navbar.classList.toggle('is-active');
});