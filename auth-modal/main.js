let signinBtn = document.querySelector('.signinBtn');
let signupBtn = document.querySelector('.signupBtn');
let forgotBtn = document.querySelector('.forgotBtn');
let forgotSigninBtn = document.querySelector('.forgotSigninBtn');
let openModalBtns = document.querySelectorAll('.openModalBtn');
let closeModalBtns = document.querySelectorAll('.closeModalBtn');
let authModal = document.getElementById('authModal');
let passwordIcons = document.querySelectorAll('.togglePassword');

let body = document.querySelector('body');

signinBtn.onclick = function(event) {
    event.preventDefault(); 
    body.classList.add('slide');
}

signupBtn.onclick = function(event) {
    event.preventDefault();
    body.classList.remove('slide');
}

forgotBtn.onclick = function(event) {
    event.preventDefault();
    body.classList.add('slide-forgot');
}

forgotSigninBtn.onclick = function(event) {
    event.preventDefault();
    body.classList.remove('slide-forgot');
}

// Abrir el modal
openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        body.classList.remove('slide-forgot');
        if (btn.classList.contains('signInModal'))
            body.classList.add('slide');
        else
            body.classList.remove('slide');
        authModal.showModal();
    });
});

// Limpiar los inputs del modal
function cleanInputs() {
    let inputs = authModal.querySelectorAll('input');
    console.log(inputs);
    inputs.forEach(input => {
        if (input.getAttribute('type') !== 'submit')
            input.value = '';
    });
}

// Cerrar el modal con el botón "Close"
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        cleanInputs();
        authModal.close();
    });
});

// Cerrar el modal al hacer clic fuera del contenido
authModal.addEventListener('click', (event) => {
    const rect = authModal.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) {
        cleanInputs();
        authModal.close();
    }
});

passwordIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        const passwordInput = icon.previousElementSibling;
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        icon.innerHTML = type === 'password' ? "<i class='bx bx-low-vision'></i>" : "<i class='bx bxs-low-vision'></i>";
    });
});