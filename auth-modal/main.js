let signinBtn = document.querySelector('.signinBtn');
let signupBtn = document.querySelector('.signupBtn');
let forgotBtn = document.querySelector('.forgotBtn');
let forgotSigninBtn = document.querySelector('.forgotSigninBtn');

let body = document.querySelector('body');

signupBtn.onclick = function(event) {
    event.preventDefault(); 
    body.classList.add('slide');
}

signinBtn.onclick = function(event) {
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