
document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.body.className = btn.dataset.theme;
        localStorage.setItem('theme', btn.dataset.theme);
    });
});


const savedTheme = localStorage.getItem('theme');
if (savedTheme) document.body.className = savedTheme;


document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        
        document.querySelectorAll('.nav a, .section').forEach(element => {
            element.classList.remove('active');
        });
        
        link.classList.add('active');
        document.querySelector(targetId).classList.add('active');
        
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.nav a[href="#calculator"]').click();
});


document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso!');
    e.target.reset();
});