/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable max-classes-per-file */

export class SubtaskData {
  static #counter = 1;

  static get counter() {
    return this.#counter;
  }

  static incrementCounter() {
    return this.#counter++;
  }

  constructor({ name, isCompleted = false }) {
    this.subtaskId = `subtask-${SubtaskData.incrementCounter()}`;
    this.name = name;
    this.isCompleted = isCompleted;
  }
}

export class SessionData {
  static #counter = 1;

  static get counter() {
    return this.#counter;
  }

  static incrementCounter() {
    return this.#counter++;
  }

  constructor({
    startDate = null,
    startTime = null,
    endDate = null,
    endTime = null,
    isLogged = false,
    isPast = false,
  } = {}) {
    // defaults to empty session if no vals
    this.sessionId = `session-${SessionData.incrementCounter()}`;
    this.startDate = startDate;
    this.startTime = startTime;
    this.endDate = endDate;
    this.endTime = endTime;
    this.isLogged = isLogged;
    this.isPast = isPast;
  }
}

export class TodoData {
  static #counter = 1;

  static get counter() {
    return this.#counter;
  }

  static incrementCounter() {
    return this.#counter++;
  }

  #isDetailsOpen;

  #isScheduleOpen;

  constructor({
    listId = '',
    sublistId = '',
    name = '',
    type = 'task',
    isDetailsOpen = false,
    isScheduleOpen = false,
    isCompleted = false,
    schedule = [],
    nextSession = null,
    checklist = [],
    notes = '',
  } = {}) {
    this.listId = listId;
    this.sublistId = sublistId;
    this.todoId = `todo-${TodoData.incrementCounter()}`;
    this.name = name;
    this.type = type;
    this.#isDetailsOpen = isDetailsOpen;
    this.#isScheduleOpen = isScheduleOpen;
    this.isCompleted = isCompleted;
    this.schedule = Array.isArray(schedule)
      ? schedule.map((session) =>
          session instanceof SessionData ? session : new SessionData(session)
        )
      : [];
    this.nextSession = nextSession;
    this.checklist = Array.isArray(checklist)
      ? checklist.map((subtask) => new SubtaskData(subtask))
      : [];
    this.notes = notes;
  }

  get isScheduleOpen() {
    return this.#isScheduleOpen;
  }

  get isDetailsOpen() {
    return this.#isDetailsOpen;
  }

  toggleScheduleOpen() {
    this.#isScheduleOpen = !this.#isScheduleOpen;
  }

  toggleDetailsOpen() {
    this.#isDetailsOpen = !this.#isDetailsOpen;
  }

  checkIfNextSession(sessionToCheck) {
    if (!(sessionToCheck instanceof SessionData)) {
      throw new Error('Invalid session passed to checkIfNextSession.');
    }
    if (this.schedule.length === 0) {
      this.nextSession = sessionToCheck;
    } else if (
      this.nextSession.startDate > sessionToCheck.startDate ||
      (this.nextSession.startDate === sessionToCheck.startDate &&
        this.nextSession.startTime > sessionToCheck.startTime)
    ) {
      this.nextSession = sessionToCheck;
    }
  }
}

export class SublistData {
  static #counter = 1;

  static get counter() {
    return this.#counter;
  }

  static incrementCounter() {
    return this.#counter++;
  }

  #isOpen;

  constructor({ name, isOpen = false, todos = [] }) {
    this.sublistId = `sublist-${SublistData.incrementCounter()}`;
    this.name = name;
    this.#isOpen = isOpen;
    this.todos = Array.isArray(todos)
      ? todos.map((todo) =>
          todo instanceof TodoData ? todo : new TodoData(todo)
        )
      : [];
  }

  get isOpen() {
    return this.#isOpen;
  }

  toggleOpen() {
    this.#isOpen = !this.#isOpen;
  }
}

export class ListData {
  static #counter = 1;

  static get counter() {
    return this.#counter;
  }

  static incrementCounter() {
    return this.#counter++;
  }

  #isOpen;

  constructor({ name, isOpen = false, todos = [], sublists = [] }) {
    this.listId = `list-${ListData.incrementCounter()}`;
    this.name = name;
    this.#isOpen = isOpen;
    this.todos = Array.isArray(todos)
      ? todos.map((todo) =>
          todo instanceof TodoData ? todo : new TodoData(todo)
        )
      : [];
    this.sublists = Array.isArray(sublists)
      ? sublists.map((sublist) =>
          sublist instanceof SublistData ? sublist : new SublistData(sublist)
        )
      : [];
  }

  get isOpen() {
    return this.#isOpen;
  }

  toggleOpen() {
    this.#isOpen = !this.#isOpen;
  }
}
