/* eslint-disable no-console */
/* eslint-disable import/extensions */
import todoHTML from '../components/left-pane/items-views/1.todo-view/2.task-template.html';
import subtaskHTML from '../components/left-pane/items-views/1.todo-view/subtask-template.html';
import createCalendarClone from '../utilities/date-picker.js';

export default class TodoView {
  constructor(modeller, controller) {
    this.todoModeller = modeller;
    this.todoModel = modeller.todoModel;
    this.todoController = controller;
  }

  // TDL: move all event handlers that affect both DOM and Model to the controller
  // TDL: all query selectors initialized first whenever action is taken on new todo
  static SELECTORS = {
    dateTimeTaskBarButton: '.nearest-datetime-button',
    toggleDetailsArrow: '.todo-details-on',
    todoEditDropdown: '.todo-edit-dropdown',
    todoDetailsDropdown: '.todo-details-dropdown',
    todoScheduleDropdown: '.todo-schedule-dropdown',
    extantSubtasks: '.extant-subtasks',
    subtaskTitle: '.subtask-title',
    subtaskCheckbox: '.subtask-checkbox',
    subtaskDelete: '.clear-subtask-button',
    notesContainer: '.notes.container',
    readonlyDatetime: '.readonly.datetime',
    changeDatetimeButton: '.nearest-datetime-button',
    workDate: '.open-edit-button .work-date',
    workTime: '.open-edit-button .work-time',
    addDateTimeButton: '.add-datetime-button',
    addDetailsButton: '.add-details-button',
    datetimeOnlyButton: '.datetime-only-button',
    datetimeAndDeadlineButton: '.add-deadline-button',
    scheduleCalendar: '.schedule-calendar',
    deleteButton: '.delete-button',
    tinyAdd: '.tiny-add-bar',
  };

  renderTodo(todo) {
    if (todo.isCompleted === false) {
      // TDL: put this in static initialization block
      const todoTemplate = document.createElement('template');
      todoTemplate.innerHTML = todoHTML;
      const todoClone = document.importNode(todoTemplate.content, true);
      todoClone.querySelector('.todo-title').setAttribute('value', todo.name);
      const todoDiv = todoClone.querySelector('.todo');
      todoDiv.setAttribute('data-list-id', todo.listId);
      todoDiv.setAttribute('data-sublist-id', todo.sublistId);
      todoDiv.setAttribute('data-todo-id', todo.todoId);
      todoDiv.setAttribute('data-todo-type', todo.type);

      // .todo-bar event listeners
      todoDiv.addEventListener('mouseover', TodoView.taskCheckboxMouseover);
      todoDiv.addEventListener(
        'mouseout',
        this.taskCheckboxMouseout.bind(this)
      );
      const taskCheckbox = todoDiv.querySelector('.task-checkbox');
      taskCheckbox.addEventListener('change', TodoView.removeCompletedTodo);
      todoClone
        .querySelector(TodoView.SELECTORS.toggleDetailsArrow)
        .addEventListener('click', TodoView.handleDropdownArrowClick);

      // .bottom-section event listeners
      todoClone
        .querySelector(TodoView.SELECTORS.deleteButton)
        .addEventListener('click', this.handleDeleteTodoElement.bind(this));
      todoClone
        .querySelector(TodoView.SELECTORS.addDateTimeButton)
        .addEventListener(
          'click',
          TodoView.toggleDetailsDatetimeDropdownsEvent
        );
      todoClone
        .querySelector(TodoView.SELECTORS.addDetailsButton)
        .addEventListener(
          'click',
          TodoView.toggleDetailsDatetimeDropdownsEvent
        );

      // tiny add bar functionality
      todoClone
        .querySelector(TodoView.SELECTORS.tinyAdd)
        .addEventListener('mouseover', (event) => {
          // eslint-disable-next-line no-param-reassign
          event.target.innerHTML = '+';
        });
      todoClone
        .querySelector(TodoView.SELECTORS.tinyAdd)
        .addEventListener('mouseout', (event) => {
          // eslint-disable-next-line no-param-reassign
          event.target.innerHTML = '';
        });
      todoClone
        .querySelector(TodoView.SELECTORS.tinyAdd)
        .addEventListener(
          'click',
          this.handleTinyAddBarBelowTaskClick.bind(this)
        );

      if (todo.nextSession) {
        // TODO: send to datetime-formatter.js and replace todo.workDate below with output
        const dateTimeTaskBarValue = todoClone.querySelector(
          TodoView.SELECTORS.readonlyDatetime
        );
        dateTimeTaskBarValue.setAttribute('value', todo.nextSession);
        todoClone
          .querySelector(TodoView.SELECTORS.changeDatetimeButton)
          .addEventListener('click', TodoView.handleDatetimeButtonClick);
        const calendarClone = createCalendarClone(new Date(todo.nextSession));
        todoClone
          .querySelector(TodoView.SELECTORS.scheduleCalendar)
          .appendChild(calendarClone);
      } else {
        todoClone
          .querySelector(TodoView.SELECTORS.readonlyDatetime)
          .classList.add('hidden');
        const calendarClone = createCalendarClone(new Date());
        todoClone
          .querySelector(TodoView.SELECTORS.scheduleCalendar)
          .appendChild(calendarClone);
      }

      // checklist event handlers and rendering
      const extantSubtasksContainer = todoClone.querySelector(
        TodoView.SELECTORS.extantSubtasks
      );
      if (todo.checklist) {
        todo.checklist.forEach((subtask) => {
          this.addSubtaskToDOMfromData(subtask, extantSubtasksContainer);
        });
      }
      todoClone
        .querySelector('.blank.subtask .subtask-title')
        .addEventListener('keypress', this.handleSubtaskAddOnEnter.bind(this));

      if (todo.notes) {
        const notesContainer = todoClone.querySelector(
          TodoView.SELECTORS.notesContainer
        );
        notesContainer.value = todo.notes;
      }
      return todoClone;
    }
    return null;
  }

  handleTinyAddBarBelowTaskClick(event) {
    const priorTodo = event.target.previousElementSibling;
    const todoData =
      this.todoController.appendToMiddleOfModelAndReturnBlankTodo(priorTodo);
    const todoClone = this.renderTodo(todoData);
    const { parentNode } = event.target;
    parentNode.insertBefore(todoClone, event.target.nextSibling);
    const todoTitleElement = parentNode.querySelector(
      `.todo[data-todo-id='${todoData.todoId}'] .todo-title`
    );
    todoTitleElement.focus();
    // TDL: show datetime button 'schedule task' then hide until datetime added
  }

  handleTinyAddBarBelowListClick(event) {
    const todoData = this.todoController.appendToStartOfListAndReturnBlankTodo(
      event.target.nextElementSibling
    );
    const todoClone = this.renderTodo(todoData);
    event.target.after(todoClone);
    event.target.parentNode
      .querySelector(`.todo[data-todo-id='${todoData.todoId}'] .todo-title`)
      .focus();
  }

  static removeCompletedTodo(event) {
    const todoDiv = event.target.closest('.todo');
    // eslint-disable-next-line no-param-reassign
    event.target.value = true;
    todoDiv.remove();
  }

  // TDL: move this and its event listener to the controller
  handleDeleteTodoElement(event) {
    const dataElementToDelete = this.todoController.getTodoData(
      event.currentTarget
    );
    this.todoModeller.deleteFromModelAndStore(dataElementToDelete);
    const todoDiv = event.target.closest('.todo');
    if (todoDiv.nextElementSibling.classList.contains('tiny-add-bar')) {
      todoDiv.nextElementSibling.remove();
    }
    todoDiv.remove();
  }

  // NEED TO REMOVE MODEL IN VIEW
  taskCheckboxMouseout(event) {
    const todoData = this.todoController.getTodoData(event.currentTarget);
    if (!todoData.isDetailsOpen && !todoData.isScheduleOpen) {
      event.currentTarget
        .querySelector('.task-checkbox.popover')
        .classList.add('hidden');
    }
  }

  static taskCheckboxMouseover(event) {
    event.currentTarget
      .querySelector('.task-checkbox.popover')
      .classList.remove('hidden');
  }

  static handleDropdownArrowClick(event) {
    const todoBarDiv = event.currentTarget.closest('.todo-bar');
    const todoElement = event.currentTarget.closest('.todo');
    const editingDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoEditDropdown
    );
    const detailsDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoDetailsDropdown
    );
    const detailsViewButton = todoElement.querySelector(
      TodoView.SELECTORS.addDetailsButton
    );
    const scheduleDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoScheduleDropdown
    );
    const scheduleViewButton = todoElement.querySelector(
      TodoView.SELECTORS.addDateTimeButton
    );
    const arrowsElement = todoElement.querySelector('.todo-details-on');
    // details dropdown is open
    if (!detailsDropdownElement.classList.contains('hidden')) {
      todoBarDiv.style.borderBottomLeftRadius = '10px';
      todoBarDiv.style.borderBottomRightRadius = '10px';
      detailsDropdownElement.classList.add('hidden');
      scheduleViewButton.classList.add('hidden');

      // schedule dropdown is open
    } else if (!scheduleDropdownElement.classList.contains('hidden')) {
      todoBarDiv.style.borderBottomLeftRadius = '10px';
      todoBarDiv.style.borderBottomRightRadius = '10px';
      scheduleDropdownElement.classList.add('hidden');
      detailsViewButton.classList.add('hidden');

      // both are closed, so open details dropdown
    } else if (editingDropdownElement.classList.contains('hidden')) {
      detailsDropdownElement.classList.remove('hidden');
      todoBarDiv.style.borderBottomLeftRadius = '0px';
      todoBarDiv.style.borderBottomRightRadius = '0px';
      scheduleViewButton.classList.remove('hidden');
    }
    editingDropdownElement.classList.toggle('hidden');
    TodoView.toggleDropdownArrows(arrowsElement);
  }

  static handleDatetimeButtonClick(event) {
    const todoBarDiv = event.currentTarget.closest('.todo-bar');
    const todoElement = event.currentTarget.closest('.todo');
    const editingDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoEditDropdown
    );
    const detailsDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoDetailsDropdown
    );
    const detailsViewButton = todoElement.querySelector(
      TodoView.SELECTORS.addDetailsButton
    );
    const scheduleDropdownElement = todoElement.querySelector(
      TodoView.SELECTORS.todoScheduleDropdown
    );
    const arrowsElement = todoElement.querySelector('.todo-details-on');

    // details dropdown is open
    if (!detailsDropdownElement.classList.contains('hidden')) {
      TodoView.toggleDetailsDatetimeDropdownsEvent(event);

      // schedule dropdown is open
    } else if (!scheduleDropdownElement.classList.contains('hidden')) {
      TodoView.toggleDropdownArrows(arrowsElement);
      todoBarDiv.style.borderBottomLeftRadius = '10px';
      todoBarDiv.style.borderBottomRightRadius = '10px';
      detailsViewButton.classList.add('hidden');
      scheduleDropdownElement.classList.add('hidden');
      editingDropdownElement.classList.add('hidden');

      // both are closed
    } else {
      TodoView.toggleDropdownArrows(arrowsElement);
      todoBarDiv.style.borderBottomLeftRadius = '0px';
      todoBarDiv.style.borderBottomRightRadius = '0px';
      detailsViewButton.classList.remove('hidden');
      scheduleDropdownElement.classList.remove('hidden');
      editingDropdownElement.classList.remove('hidden');
    }
  }

  static toggleDropdownArrows(arrowsElement) {
    arrowsElement
      .querySelector(':scope > :first-child')
      .classList.toggle('hidden');
    arrowsElement
      .querySelector(':scope > :nth-child(2)')
      .classList.toggle('hidden');
  }

  // when buttons in edit-dropdown clicked
  static toggleDetailsDatetimeDropdownsEvent(event) {
    const todoDiv = event.currentTarget.closest('.todo');
    todoDiv
      .querySelector(TodoView.SELECTORS.todoScheduleDropdown)
      .classList.toggle('hidden');
    todoDiv
      .querySelector(TodoView.SELECTORS.todoDetailsDropdown)
      .classList.toggle('hidden');
    todoDiv
      .querySelector(TodoView.SELECTORS.addDateTimeButton)
      .classList.toggle('hidden');
    todoDiv
      .querySelector(TodoView.SELECTORS.addDetailsButton)
      .classList.toggle('hidden');
  }

  handleSubtaskAddOnEnter(event) {
    if (event.key === 'Enter') {
      if (event.target.value !== '') {
        const newSubtaskData =
          this.todoController.addAndReturnNewSubtask(event);
        // eslint-disable-next-line no-param-reassign
        event.target.value = '';
        const extantSubtasksContainer = event.target
          .closest('.todo')
          .querySelector(TodoView.SELECTORS.extantSubtasks);
        this.addSubtaskToDOMfromData(newSubtaskData, extantSubtasksContainer);
      }
    }
  }

  static toggleShowDeleteSubtaskButton(event) {
    event.target
      .closest('.subtask')
      .querySelector('.clear-subtask-button')
      ?.classList.toggle('hidden');
  }

  addSubtaskToDOMfromData(subtask, extantSubtasksContainer) {
    const subtaskTemplate = document.createElement('template');
    subtaskTemplate.innerHTML = subtaskHTML;
    const subtaskClone = document.importNode(subtaskTemplate.content, true);
    subtaskClone.firstElementChild.setAttribute(
      'data-subtask-id',
      subtask.subtaskId
    );
    subtaskClone
      .querySelector(TodoView.SELECTORS.subtaskTitle)
      .setAttribute('value', subtask.name);
    if (subtask.isCompleted) {
      subtaskClone.querySelector(TodoView.SELECTORS.subtaskCheckbox).checked =
        true;
    } else {
      subtaskClone.querySelector(TodoView.SELECTORS.subtaskCheckbox).checked =
        false;
    }
    ['focusin', 'focusout'].forEach((eventType) => {
      subtaskClone
        .querySelector('.subtask')
        .addEventListener(eventType, (event) => {
          setTimeout(() => {
            if (
              !document.activeElement.classList.contains(
                TodoView.SELECTORS.subtaskDelete
              )
            ) {
              TodoView.toggleShowDeleteSubtaskButton(event);
            }
          }, 100);
        });
    });

    subtaskClone
      .querySelector('.clear-subtask-button')
      .addEventListener(
        'click',
        this.todoController.handleSubtaskDelete.bind(this)
      );
    extantSubtasksContainer.appendChild(subtaskClone);
  }
}
