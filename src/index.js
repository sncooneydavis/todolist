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
          nextSession: '',
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
      name: 'The Odin Project JavaScript',
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
              type: 'subtask',
              isCompleted: false,
            },
            {
              subtaskId: 'subtask-11',
              name: 'image carousels',
              type: 'subtask',
              isCompleted: false,
            },
          ],
          notes:
            'https://www.theodinproject.com/lessons/node-path-javascript-dynamic-user-interface-interactions',
        },
      ],
      sublists: [],
    },
  ];
}

const init = () => {
  // LOGIN WITH EXISTING ACCOUNT FORM
  const loginForm = document.querySelector('#login-form');
  const email = loginForm.querySelector('input[type=email]');
  const emailError = loginForm.querySelector('.input-container').children[1];
  const password = loginForm.querySelector('input[type=password]');
  const passwordError = loginForm.querySelector('.input-container').children[3];
  const submitButton = loginForm.querySelector('#submit-existing-login');

  loginForm.addEventListener('input', () => {
    if (email.validity.valueMissing) {
      emailError.textContent = 'Email required';
      emailError.classList.remove('hidden');
    } else if (password.validity.valueMissing) {
      passwordError.textContent = 'Password required';
      passwordError.classList.remove('hidden');
    } else {
      submitButton.removeAttribute('disabled');
    }
  });

  loginForm.addEventListener('submit', () => {
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
      passwordError.classList.remove('hidden');
    }
  });

  // LOGIN WITH NEW ACCOUNT FORM
  const signupForm = document.querySelector('#signup-form');
  const submitNewLoginButton = signupForm.querySelector('#submit-new-login');

  const name = signupForm.querySelector('input[type=text]');
  const nameError = signupForm.querySelector('input-container').children[1];
  name.addEventListener('input', () => {
    if (name.validity.valueMissing) {
      nameError.classList.remove('hidden');
      name.validity.valid = false;
    } else {
      name.validity.valid = true;
    }
  });

  const newEmail = signupForm.querySelector('input[type=email]');
  const newEmailError =
    signupForm.querySelector('.input-container').children[3];
  newEmail.addEventListener('input', () => {
    if (!newEmail.validity.valid) {
      newEmailError.classList.remove('hidden');
      newEmail.validity.valid = false;
    } else {
      newEmail.validity.valid = true;
    }
  });

  const newPassword = signupForm.querySelector('input[type=password]');
  const passwordShortError =
    signupForm.querySelector('.input-container').children[5];
  const passwordNumberError =
    signupForm.querySelector('.input-container').children[6];
  const passwordLetterError =
    signupForm.querySelector('.input-container').children[7];
  newPassword.addEventListener('input', () => {
    if (newPassword.length < 6) {
      passwordShortError.classList.remove('hidden');
    }
    if (!/\d/.test(newPassword.value)) {
      passwordNumberError.classList.remove('hidden');
    }
    if (!/[a-zA-Z]/.test(newPassword.value)) {
      passwordLetterError.classList.remove('hidden');
    }
    if (
      newPassword.length > 5 &&
      /\d/.test(newPassword.value) &&
      /[a-zA-Z]/.test(newPassword.value)
    ) {
      newPassword.validity.valid = true;
    }
  });

  const newPasswordConfirmation = signupForm.querySelector('.confirm');
  const newPasswordConfirmationError =
    signupForm.querySelector('.input-container').children[9];
  newPasswordConfirmation.addEventListener('input', () => {
    if (newPasswordConfirmation.value !== newPassword.value) {
      newPasswordConfirmationError.classList.remove('hidden');
      newPasswordConfirmation.validity.valid = false;
    } else {
      newPasswordConfirmation.validity.valid = true;
    }
  });

  if (
    name.validity.valid &&
    newEmail.validity.valid &&
    newPassword.validity.valid &&
    newPasswordConfirmation.validity.valid
  ) {
    submitNewLoginButton.removeAttribute('disabled');
  }

  signupForm.addEventListener('submit', () => {
    // eslint-disable-next-line no-new
    const controller = new TodoPanelController(
      new User(email.value.toLowerCase(), password.value)
    );
    controller.saveToLocalStorage();
  });
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
