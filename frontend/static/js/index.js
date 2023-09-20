const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem('token');
    const showLoggedInDiv = document.querySelector('.auth-nav-logged-in');
    const hideLoggedOutDiv = document.querySelector('.auth-nav-logged-out');

    if (token) {
        showLoggedInDiv.style.display = 'block';
        hideLoggedOutDiv.style.display = 'none';
    } else {
        showLoggedInDiv.style.display = 'none';
        hideLoggedOutDiv.style.display = 'block';
    }
});

const logoutBtn = document.querySelector('#logout-btn');
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = "http://127.0.0.1:5000/login";
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => observer.observe(element))

const toggleElement = document.querySelector('#nav-bars')
const mainNav = document.querySelector('.main-nav')

toggleElement.addEventListener('click', () => {
    mainNav.style.display = (mainNav.style.display === 'block') ? 'none' : 'block';
})

const scrollDownBtn = document.querySelector('.scroll-btn')
scrollDownBtn.addEventListener('click', () => {
    window.scrollTo({top: window.innerHeight, behavior: 'smooth'});
})

const regDropDown = document.querySelector("#reg-dropdown")

