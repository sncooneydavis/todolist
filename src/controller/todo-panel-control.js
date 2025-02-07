/* eslint-disable import/extensions */
/* eslint-disable no-console */

import ListView from '../view/list-view.js';
import TodoModeller from '../model/todo-model.js';
import { TodoData, SubtaskData } from '../model/item-classes.js';

export default class TodoPanelController {
  constructor(userInstance) {
    this.userInstance = userInstance;
    this.todoModeller = new TodoModeller(userInstance.storedLists, this);
    this.todoModel = this.todoModeller.todoModel;
    this.listView = new ListView(this.todoModeller, this);
  }

  savetoLocalStorage() {
    this.userInstance.storedLists = this.todoModel;
    localStorage.setItem(this.userInstance.email, this.userInstance);
  }

  static getIDsFromElement(element) {
    if (
      element.classList.contains('editing-list-title') ||
      element.classList.contains('title')
    ) {
      const listId = element.closest('.list').getAttribute('data-list-id');
      const sublistId = element
        .closest('.sublist')
        ?.getAttribute('data-sublist-id');
      return { listId, sublistId };
    }
    const listId = element.closest('.todo').getAttribute('data-list-id');
    const sublistId = element.closest('.todo').getAttribute('data-sublist-id');
    const todoId = element.closest('.todo').getAttribute('data-todo-id');
    const subtaskId = element
      .closest('.subtask')
      ?.getAttribute('data-subtask-id');
    return {
      listId,
      sublistId,
      todoId,
      subtaskId,
    };
  }

  getTodoData(element) {
    const ids = TodoPanelController.getIDsFromElement(element);
    const listData = this.todoModel.find((list) => list.listId === ids.listId);
    if (ids.sublistId && ids.sublistId !== 'null') {
      if (ids.todoId && ids.todoId !== 'null') {
        const todoData = listData.sublists
          .find((sublist) => sublist.sublistId === ids.sublistId)
          .todos.find((todo) => todo.todoId === ids.todoId);
        if (ids.subtaskId && ids.subtaskId !== 'null') {
          return todoData.find(
            (subtask) => todoData.checklist.subtaskId === subtask.subtaskId
          );
        }
        return todoData;
      }
      return listData.sublists.find(
        (sublist) => sublist.sublistId === ids.sublistId
      );
    }
    const todoData = listData.todos.find((todo) => todo.todoId === ids.todoId);
    if (ids.subtaskId && ids.subtaskId !== 'null') {
      return todoData.find(
        (subtask) => todoData.checklist.subtaskId === subtask.subtaskId
      );
    }
    return todoData;
  }

  handleInputChange(event) {
    if (!['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
    if (!event.target.classList.contains('blank')) {
      const ids = TodoPanelController.getIDsFromElement(event.target);
      this.todoModeller.updateFieldInModelAndStore(
        ids.listId,
        ids.sublistId,
        ids.todoId,
        ids.subtaskId,
        event.target.getAttribute('data-field'),
        event.target.value
      );
    }
  }

  appendToMiddleOfModelAndReturnBlankTodo(priorTodo) {
    const priorIds = TodoPanelController.getIDsFromElement(priorTodo);
    const newTodo = new TodoData({
      listId: priorIds.listId,
      sublistId: priorIds.sublistId,
    });
    // get place in todoModel
    const listData = this.todoModel.find(
      (list) => list.listId === priorIds.listId
    );
    if (priorIds.sublistId !== 'null') {
      const sublistData = listData.sublists.find(
        (sublist) => sublist.sublistId === priorIds.sublistId
      );
      const priorTodoIndex = sublistData.todos.findIndex(
        (todo) => todo.todoId === priorIds.todoId
      );
      sublistData.todos.splice(priorTodoIndex + 1, 0, newTodo);
    } else if (priorIds.listId) {
      const priorTodoIndex = listData.todos.findIndex(
        (todo) => todo.todoId === priorIds.todoId
      );
      listData.todos.splice(priorTodoIndex + 1, 0, newTodo);
    }
    this.todoModeller.saveToLocalStorage();
    return newTodo;
  }

  appendToStartOfListAndReturnBlankTodo(firstTodoELement) {
    const ids = TodoPanelController.getIDsFromElement(firstTodoELement);
    const newTodo = new TodoData({
      listId: ids.listId,
      sublistId: ids.sublistId,
    });
    const listData = this.todoModel.find((list) => list.listId === ids.listId);
    if (ids.sublistId !== 'null') {
      const sublistData = listData.sublists.find(
        (sublist) => sublist.sublistId === ids.sublistId
      );
      sublistData.todos.unshift(newTodo);
    } else if (ids.listId) {
      listData.todos.unshift(newTodo);
    }
    this.todoModeller.saveToLocalStorage();
    return newTodo;
  }

  addAndReturnNewSubtask(event) {
    const ids = TodoPanelController.getIDsFromElement(event.target);
    const newSubtask = new SubtaskData({
      name: event.target.value,
    });
    const listData = this.todoModel.find((list) => list.listId === ids.listId);
    if (ids.sublistId !== null && ids.sublistId !== 'null') {
      const sublistData = listData.sublists.find(
        (sublist) => sublist.sublistId === ids.sublistId
      );
      const todoData = sublistData.todos.find(
        (todo) => todo.todoId === ids.todoId
      );
      todoData.checklist.push(newSubtask);
    } else if (ids.listId) {
      const todoData = listData.todos.find(
        (todo) => todo.todoId === ids.todoId
      );
      todoData.checklist.push(newSubtask);
    }
    this.todoModeller.saveToLocalStorage();
    return newSubtask;
  }

  handleSubtaskDelete(event) {
    const ids = TodoPanelController.getIDsFromElement(event.target);
    const listData = this.todoModel.find((list) => list.listId === ids.listId);
    let todoData;
    if (ids.sublistId !== 'null') {
      const sublistData = listData.sublists.find(
        (sublist) => sublist.sublistId === ids.sublistId
      );
      todoData = sublistData.todos.find((todo) => todo.todoId === ids.todoId);
    } else {
      todoData = listData.todos.find((todo) => todo.todoId === ids.todoId);
    }
    const subtaskIndex = todoData.checklist.findIndex(
      (subtask) => subtask.subtaskId === ids.subtaskId
    );
    todoData.checklist.splice(subtaskIndex, 1);
    this.todoModeller.saveToLocalStorage();
    console.log(event.target);
    event.target.closest('.subtask').remove();
  }
}
