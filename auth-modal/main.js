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

function validateInput(input) {
    const errorMessage = input.nextElementSibling;
    const value = input.value.trim();
    let isValid = true;

    if (value === '') {
        errorMessage.textContent = 'This field is mandatory';
        isValid = false;
    } else if (input.getAttribute('type') === 'password') { // Validación específica para la contraseña
        /*const password = input.getAttribute('id') === 'password' ? input : document.getElementById('password');
        const confirmPassword = input.getAttribute('id') === 'confirmPassword' ? input : document.getElementById('confirmPassword');
        
        if (password.value.length < 8) {
            errorMessage.textContent = 'Password must be at least 8 characters long';
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            errorMessage.textContent = 'Passwords do not match';
            isValid = false;
        }*/
    }
    else if (input.getAttribute('type') === 'email' && !value.includes('@')) { // Validación específica para el email
        errorMessage.textContent = 'Invalid email format';
        isValid = false;
    } else if (input.getAttribute('type') === 'text') { // Validación específica para el usuario
        if (value === 'jdomingu') {
            errorMessage.textContent = 'Username already exists';
            isValid = false;
        } else if (value.length < 3) {
            errorMessage.textContent = 'Username must be at least 3 characters long';
            isValid = false;
        }
    }

    if (!isValid) {
        input.classList.add('input-error');
        errorMessage.style.display = 'block';
    }

    return isValid;
}

// Añade el evento de submit a los formularios
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        let isValid = true;

        // Valida todos los inputs en el formulario
        const inputsForm = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
        inputsForm.forEach(input => {
            if (!validateInput(input))
                isValid = false;
        });

        // Si todos los inputs son válidos, aquí podrías proceder a enviar el formulario
        if (isValid)
            console.log('Formulario enviado'); // Aquí puedes manejar el envío del formulario
    });
});


const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');

inputs.forEach(input => {
    input.addEventListener('change', () => input.classList.remove('input-error'));
});