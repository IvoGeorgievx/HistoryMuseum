const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
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
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
})

const regDropDown = document.querySelector("#reg-dropdown")

