/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
import './styles.css';
import mainPageContents from './components/main-page.html';
import TodoPanelController from './controller/todo-panel-control.js';

class User {
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  storedLists = [
    {
      listId: 'list-1',
      name: 'Todo List Project',
      isOpen: false,
      todos: [
        {
          listId: 'list-1',
          sublistId: null,
          todoId: 'todo-1',
          name: 'hover between tasks to add task',
          type: 'task',
          isDetailsOpen: false,
          isScheduleOpen: false,
          isCompleted: false,
          schedule: [
            {
              sessionId: 'session-1',
              startDate: '2025-02-11',
              startTime: null,
              endDate: '2025-02-11',
              endTime: null,
              isLogged: false,
              isPast: false,
            },
          ],
          nextSession: '2025-02-11',
          checklist: [
            {
              subtaskId: 'subtask-1',
              name: 'can complete tasks',
              isCompleted: false,
            },
            {
              subtaskId: 'subtask-2',
              name: 'can delete tasks',
              isCompleted: false,
            },
            {
              subtaskId: 'subtask-3',
              name: 'cannot duplicate tasks',
              isCompleted: false,
            },
          ],
          notes: null,
        },
        {
          listId: 'list-1',
          sublistId: null,
          todoId: 'todo-2',
          name: 'click the arrow to add date',
          type: 'task',
          isDetailsOpen: false,
          isScheduleOpen: false,
          isCompleted: false,
          schedule: [],
          nextSession: null,
          checklist: [
            {
              name: 'click the "schedule" button',
              subtaskId: 'subtask-4',
              isCompleted: false,
            },
            {
              name: '(lower left hand corner)',
              subtaskId: 'subtask-5',
              isCompleted: false,
            },
            {
              name: 'click on month and year to adjust',
              subtaskId: 'subtask-6',
              isCompleted: false,
            },
          ],
          notes: '',
        },
      ],
      sublists: [
        {
          listId: 'list-1',
          sublistId: 'sublist-1',
          name: 'Click to open sublist',
          isOpen: false,
          todos: [
            {
              listId: 'list-1',
              sublistId: 'sublist-1',
              todoId: 'todo-3',
              name: 'cannot add new (sub)lists',
              type: 'task',
              isDetailsOpen: false,
              isScheduleOpen: false,
              isCompleted: false,
              schedule: [
                {
                  sessionId: 'session-2',
                  startDate: '2025-02-11',
                  startTime: null,
                  endDate: '2025-02-11',
                  endTime: null,
                  isLogged: false,
                  isPast: false,
                },
              ],
              nextSession: '2025-02-11',
              checklist: [],
              notes: '',
            },
            {
              listId: 'list-1',
              sublistId: 'sublist-1',
              todoId: 'todo-4',
              name: 'can edit (sub)list name',
              type: 'task',
              isDetailsOpen: false,
              isScheduleOpen: false,
              isCompleted: false,
              schedule: [],
              nextSession: null,
              checklist: [],
              notes: '',
            },
          ],
        },
        {
          listId: 'list-1',
          sublistId: 'sublist-2',
          name: 'Details',
          isOpen: false,
          todos: [
            {
              listId: 'list-1',
              sublistId: 'sublist-2',
              todoId: 'todo-5',
              name: 'can add details',
              type: 'task',
              isDetailsOpen: false,
              isScheduleOpen: false,
              isCompleted: false,
              schedule: [],
              nextSession: null,
              checklist: [
                {
                  name: 'can add subtasks',
                  subtaskId: 'subtask-7',
                  isCompleted: false,
                },
                {
                  name: 'can complete subtasks',
                  subtaskId: 'subtask-8',
                  isCompleted: false,
                },
                {
                  name: 'can delete subtasks',
                  subtaskId: 'subtask-9',
                  isCompleted: false,
                },
              ],
              notes: 'can add notes!',
            },
          ],
        },
      ],
    },
    {
      listId: 'list-2',
      name: 'JavaScript in the Real World',
      isOpen: false,
      todos: [
        {
          listId: 'list-2',
          sublistId: null,
          todoId: 'todo-6',
          name: 'dynamic UI interactions',
          type: 'task',
          isDetailsOpen: false,
          isScheduleOpen: false,
          isCompleted: false,
          schedule: [],
          nextSession: null,
          checklist: [
            {
              subtaskId: 'subtask-10',
              name: 'drop down menus',
              isCompleted: false,
            },
            {
              subtaskId: 'subtask-11',
              name: 'image carousels',
              isCompleted: false,
            },
          ],
          notes:
            'https://www.theodinproject.com/lessons/node-path-javascript-dynamic-user-interface-interactions',
        },
        {
          listId: 'list-2',
          sublistId: null,
          todoId: 'todo-7',
          name: 'form validation',
          type: 'task',
          isDetailsOpen: false,
          isScheduleOpen: false,
          isCompleted: false,
          schedule: [],
          nextSession: null,
          checklist: [
            {
              subtaskId: 'subtask-12',
              name: 'login page',
              isCompleted: false,
            },
            {
              subtaskId: 'subtask-13',
              name: 'signup page',
              isCompleted: false,
            },
          ],
          notes: '',
        },
      ],
      sublists: [],
    },
    {
      listId: 'list-3',
      name: 'JavaScript ES6',
      isOpen: false,
      todos: [
        {
          listId: 'list-3',
          sublistId: null,
          todoId: 'todo-8',
          name: 'babel',
          type: 'task',
          isDetailsOpen: false,
          isScheduleOpen: false,
          isCompleted: false,
          schedule: [],
          nextSession: null,
          checklist: [],
          notes: '',
        },
      ],
      sublists: [],
    },
  ];
}

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
        document.querySelector('body').innerHTML = mainPageContents;
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
      document.querySelector('body').innerHTML = mainPageContents;
      const controller = new TodoPanelController(
        new User(newEmail.value.toLowerCase(), newPassword.value)
      );
      controller.saveToLocalStorage();
    }
  });
};

// eslint-disable-next-line no-unused-vars
const devInit = () => {
  document.querySelector('body').innerHTML = mainPageContents;
  const controller = new TodoPanelController(
    new User('default user', 'password1')
  );
  controller.saveToLocalStorage();
};

devInit();

// function updateClock() {
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();

//   requestAnimationFrame(updateClock); // Keep updating
// }

// updateClock();
