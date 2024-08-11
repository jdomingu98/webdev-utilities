const aside = document.getElementById('aside'),
        menu = document.getElementById('menu'),
        options = document.querySelectorAll('.options div');

menu.onclick = () => aside.classList.toggle('active');

options.forEach(option => {
    option.onclick = () => {
        options.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
    };
});