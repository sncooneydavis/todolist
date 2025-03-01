export default class User {
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
              startDate: '2025-02-23',
              startTime: null,
              endDate: '2025-02-23',
              endTime: null,
              isLogged: false,
              isPast: false,
            },
          ],
          nextSession: '2025-02-23',
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
          nextSession: '2025-02-26',
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
                  startDate: '2025-02-22',
                  startTime: null,
                  endDate: '2025-02-22',
                  endTime: null,
                  isLogged: false,
                  isPast: false,
                },
              ],
              nextSession: '2025-02-22',
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
              nextSession: '2025-02-25',
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
              nextSession: '2025-02-22',
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
          nextSession: '2025-02-22',
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
          nextSession: '2025-02-21',
          checklist: [],
          notes: '',
        },
      ],
      sublists: [],
    },
  ];
}
