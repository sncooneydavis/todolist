/* eslint-disable no-console */
import dayCalendarHTML from '../components/right-pane/days-calendar.html';
// import taskBlockHTML from '../components/right-pane/todo-view-elements/task-block.html';
import todoLineHTML from '../components/right-pane/todo-view-elements/todo-line.html';

export default class ProspectiveView {
  constructor(todoModel) {
    this.todoModel = todoModel;
    this.renderInitialDaysCalendar();
  }

  getTodoLineElementsInRange(currentDate, futureDate) {
    function findTodos(list) {
      return [
        ...list.todos
          .map((todo) => {
            let todoDate = todo.nextSession ? new Date(todo.nextSession) : null;
            if (
              todoDate &&
              todoDate >= new Date(currentDate) &&
              todoDate <= new Date(futureDate)
            ) {
              // eslint-disable-next-line prefer-destructuring
              todoDate = todoDate.toISOString().split('T')[0];
              const todoLineClone = document
                .createRange()
                .createContextualFragment(todoLineHTML);
              const todoLineElement = todoLineClone.firstElementChild;
              todoLineElement.setAttribute('data-todo-id', todo.todoId);
              todoLineElement.setAttribute('data-list-id', todo.listId);
              if (todo.sublistId) {
                todoLineElement.setAttribute('data-sublist-id', todo.sublistId);
              }
              todoLineElement.querySelector('.readonly-title').value =
                todo.name;
              if (todo.isCompleted) {
                todoLineElement.querySelector('.cal-checkbox').checked = true;
              }
              todoLineElement.addEventListener(
                'click',
                ProspectiveView.handleTodoLineClick
              );
              return { date: todoDate, clone: todoLineClone };
            }
            return null;
          })
          .filter(Boolean),
        ...(list.sublists?.flatMap(findTodos) ?? []),
      ];
    }
    return this.todoModel.flatMap(findTodos);
  }

  static handleTodoLineClick(event) {
    const todoId = event.currentTarget.getAttribute('data-todo-id');
    const sublistId = event.currentTarget.getAttribute('data-sublist-id');
    const listId = event.currentTarget.getAttribute('data-list-id');

    const listElement = document.querySelector(
      `#left-pane [data-list-id="${listId}"]`
    );
    if (
      listElement.querySelector('.body.container').classList.contains('hidden')
    ) {
      listElement.querySelector('.readonly.title').click();
    }
    if (sublistId) {
      const sublistElement = document.querySelector(
        `#left-pane [data-sublist-id="${sublistId}"]`
      );
      if (
        sublistElement
          .querySelector('.body.container')
          .classList.contains('hidden')
      ) {
        sublistElement.querySelector('.readonly.title').click();
      }
    }
    console.log(
      'hello',
      document.querySelector(
        `#left-pane [data-todo-id="${todoId}"] .todo-details-on`
      )
    );
    document
      .querySelector(`#left-pane [data-todo-id="${todoId}"] .todo-details-on`)
      .click();
  }

  renderInitialDaysCalendar() {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split('T')[0];
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 14);

    const todosWithinRange = this.getTodoLineElementsInRange(
      formattedCurrentDate,
      futureDate
    );
    while (currentDate <= futureDate) {
      const dayClone = document
        .createRange()
        .createContextualFragment(dayCalendarHTML);
      const formattedDate = currentDate.toISOString().split('T')[0];
      dayClone.firstElementChild.setAttribute('data-date', formattedDate);
      dayClone
        .querySelector('.readonly-date')
        .setAttribute('value', formattedDate);
      const todosToAddToDay = todosWithinRange.filter(
        (todo) => todo.date === formattedDate
      );
      todosToAddToDay.forEach((todo) => {
        dayClone.querySelector('.top').appendChild(todo.clone);
      });
      document.querySelector('#right-pane').appendChild(dayClone);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
}
