/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { ListData } from './item-classes.js';

export default class TodoModeller {
  constructor() {
    this.todoModel = this.loadData();
  }

  loadData() {
    // STORAGE EMPTY => POPULATE DEMO DATA
    if (localStorage.length === 0) {
      // eslint-disable-next-line no-use-before-define
      this.todoModel = demoData.map((list) => new ListData(list));
      this.saveToLocalStorage();
      return this.todoModel;
    }
    const storedData = localStorage.getItem('storedLists');
    return JSON.parse(storedData).map((list) => new ListData(list)); // converts raw objects to class instances
  }

  saveToLocalStorage() {
    localStorage.setItem('storedLists', JSON.stringify(this.todoModel));
  }

  updateFieldInModelAndStore(
    listId,
    sublistId,
    todoId,
    subtaskId,
    field,
    value
  ) {
    const list = this.todoModel.find((listData) => listData.listId === listId);
    const sublist = list.sublists.find(
      (sublistData) => sublistData.sublistId === sublistId
    );
    // checkbox change events on todo's only send todoId and field
    // this finds the todo even without listId so its isCompleted status can be toggled
    let todo;
    if (sublist) {
      todo = sublist.todos.find((todoData) => todoData.todoId === todoId);
    } else if (list) {
      todo = list.todos.find((todoData) => todoData.todoId === todoId);
    } else {
      const flatTodos = [
        ...this.todoModel.flatMap((flatList) => [
          ...flatList.todos,
          ...flatList.sublists.flatMap((flatSublist) => flatSublist.todos),
        ]),
      ];
      todo = flatTodos.find((todoData) => todoData.todoId === todoId);
    }
    const subtask = todo?.checklist?.find(
      (subtaskData) => subtaskData.subtaskId === subtaskId
    );

    // set values in model and save
    if (subtask) {
      if (field === 'isCompleted') {
        subtask.isCompleted = !subtask.isCompleted;
      } else {
        subtask[field] = value;
      }
    } else if (todo) {
      if (field === 'isCompleted') {
        todo.isCompleted = !todo.isCompleted;
      } else {
        todo[field] = value;
      }
    } else if (sublist) {
      sublist[field] = value;
    } else if (list) {
      list[field] = value;
    }
    this.saveToLocalStorage();
  }

  deleteFromModelAndStore(dataElement) {
    const list = this.todoModel.find(
      (listData) => listData.listId === dataElement.listId
    );
    const sublist = list?.sublists.find(
      (sublistData) => sublistData.sublistId === dataElement.sublistId
    );
    let todo;
    if (sublist) {
      todo = sublist.todos.find(
        (todoData) => todoData.todoId === dataElement.todoId
      );
    } else if (list) {
      todo = list.todos.find(
        (todoData) => todoData.todoId === dataElement.todoId
      );
    }
    const subtask = todo?.checklist.find(
      (subtaskData) => subtaskData.subtaskId === dataElement.subtaskId
    );

    // delete element from model and save
    if (subtask) {
      const index = todo.checklist.findIndex(
        (subtaskData) => subtaskData.subtaskId === subtask.subtaskId
      );
      todo.checklist.splice(index, 1);
    } else if (sublist) {
      const index = sublist.todos.findIndex(
        (todoData) => todoData.todoId === todo.todoId
      );
      sublist.todos.splice(index, 1);
    } else if (list) {
      const index = list.todos.findIndex(
        (todoData) => todoData.todoId === todo.todoId
      );
      list.todos.splice(index, 1);
    }
    this.saveToLocalStorage();
  }
}

// FOR DEMO PURPOSE ONLY - WILL DELETE
const demoData = [
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
