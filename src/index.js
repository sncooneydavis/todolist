/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import './styles.css';
import TodoPanelController from './controller/todo-panel-control.js';
import User from './model/users.js';
import './utilities/googleAuth.js';

// eslint-disable-next-line no-unused-vars
const init = () => {
  // LOGIN WITH EXISTING ACCOUNT FORM
  const loginForm = document.querySelector('#login-form');
  const email = loginForm.querySelector('input[type=email]');
  const emailError = loginForm.querySelector('.login.input-container')
    .children[1];
  const password = loginForm.querySelector('input[type=password]');
  const passwordError = loginForm.querySelector('.login.input-container')
    .children[3];

  email.addEventListener('input', (event) => {
    if (!email.validity.valid) {
      emailError.textContent = 'Email required';
      emailError.classList.remove('hidden');
      event.target.style.border = '2px solid var(--red-orange-lighter)';
    } else {
      emailError.classList.add('hidden');
      event.target.style.border = 'none';
    }
  });
  password.addEventListener('input', (event) => {
    if (password.validity.tooShort) {
      passwordError.textContent = 'Password required';
      passwordError.classList.remove('hidden');
      event.target.style.border = '2px solid var(--red-orange-lighter)';
    } else {
      passwordError.classList.add('hidden');
      event.target.style.border = 'none';
    }
  });

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (email.validity.valid && password.validity.valid) {
      const id = email.value.toLowerCase();
      const storedData = JSON.parse(localStorage.getItem(id)) || null;
      if (storedData.email === id && storedData.password === password.value) {
        // eslint-disable-next-line no-new
        new TodoPanelController(storedData);
      } else if (storedData === null) {
        email.error.textContent = 'Email not found';
        email.error.classList.remove('hidden');
      } else if (
        storedData.email === id &&
        storedData.password !== password.value
      ) {
        passwordError.textContent = 'Wrong password';
        event.target.style.border = '2px solid var(--red-orange-lighter)';
        passwordError.classList.remove('hidden');
      }
    }
  });

  // LOGIN WITH NEW ACCOUNT FORM
  const signupForm = document.querySelector('#signup-form');

  const name = signupForm.querySelector('input[type=text]');
  const nameError = signupForm.querySelector('.signup.input-container')
    .children[1];
  name.addEventListener('input', (event) => {
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+) *$/.test(name.value)) {
      nameError.classList.remove('hidden');
      event.target.style.border = '2px solid var(--red-orange-lighter)';
    } else {
      nameError.classList.add('hidden');
      event.target.style.border = 'none';
    }
  });

  const newEmail = signupForm.querySelector('input[type=email]');
  const newEmailError = signupForm.querySelector('.signup.input-container')
    .children[3];
  newEmail.addEventListener('input', (event) => {
    if (!newEmail.validity.valid) {
      newEmailError.classList.remove('hidden');
      event.target.style.border = '2px solid var(--red-orange-lighter)';
    } else {
      newEmailError.classList.add('hidden');
      event.target.style.border = 'none';
    }
  });

  const newPassword = signupForm.querySelector('input[type=password]');
  const passwordShortError = signupForm.querySelector('.signup.input-container')
    .children[5];
  const passwordNumberError = signupForm.querySelector(
    '.signup.input-container'
  ).children[6];
  const passwordLetterError = signupForm.querySelector(
    '.signup.input-container'
  ).children[7];
  newPassword.addEventListener('input', (event) => {
    if (newPassword.value.length < 6) {
      passwordShortError.classList.remove('hidden');
      event.target.style.border = '2px solid var(--red-orange-lighter)';
    } else {
      passwordShortError.classList.add('hidden');
      event.target.style.border = 'none';
    }
    if (!/\d/.test(newPassword.value)) {
      passwordNumberError.classList.remove('hidden');
      event.target.style.border = '2px solid var(--red-orange-lighter)';
    } else {
      passwordNumberError.classList.add('hidden');
      event.target.style.border = 'none';
    }
    if (!/[a-zA-Z]/.test(newPassword.value)) {
      passwordLetterError.classList.remove('hidden');
      event.target.style.border = '2px solid var(--red-orange-lighter)';
    } else {
      passwordLetterError.classList.add('hidden');
      event.target.style.border = 'none';
    }
  });

  const newPasswordConfirmation = signupForm.querySelector('.confirm');
  const newPasswordConfirmationError = signupForm.querySelector(
    '.signup.input-container'
  ).children[9];
  newPasswordConfirmation.addEventListener('input', (event) => {
    if (newPasswordConfirmation.value !== newPassword.value) {
      newPasswordConfirmationError.classList.remove('hidden');
      event.target.style.border = '2px solid var(--red-orange-lighter)';
    } else {
      newPasswordConfirmationError.classList.add('hidden');
      event.target.style.border = 'none';
    }
  });

  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (
      name.validity.valid &&
      newEmail.validity.valid &&
      newPassword.validity.valid &&
      newPasswordConfirmation.validity.valid
    ) {
      const controller = new TodoPanelController(
        new User(newEmail.value.toLowerCase(), newPassword.value)
      );
      controller.saveToLocalStorage();
    }
  });
};

// eslint-disable-next-line no-unused-vars
const devInit = () => {
  const controller = new TodoPanelController(
    new User('default user', 'password1')
  );
  controller.saveToLocalStorage();
};

init();

// function updateClock() {
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();

//   requestAnimationFrame(updateClock); // Keep updating
// }

// updateClock();
