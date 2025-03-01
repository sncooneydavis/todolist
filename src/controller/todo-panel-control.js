/* eslint-disable import/extensions */
/* eslint-disable no-console */

import ListView from '../view/todo-view/list-view.js';
import TodoModeller from '../model/todo-model.js';
import {
  ListData,
  SublistData,
  TodoData,
  SubtaskData,
} from '../model/item-classes.js';
import UtilityBar from '../utilities/utility-bar.js';
import ProspectiveView from '../view/prospective-view.js';
import mainPageContents from '../components/main-page.html';

export default class TodoPanelController {
  constructor(userInstance) {
    document.querySelector('body').innerHTML = mainPageContents;

    this.userInstance = userInstance;
    this.todoModeller = new TodoModeller(userInstance.storedLists, this);
    this.todoModel = this.todoModeller.todoModel;
    this.listView = new ListView(this.todoModeller, this);
    this.utilityBar = new UtilityBar(this.todoModel, this);
    this.ProspectiveView = new ProspectiveView(this.todoModel);
  }

  saveToLocalStorage() {
    this.userInstance.storedLists = this.todoModel;
    const stringToSave = JSON.stringify(this.userInstance);
    localStorage.setItem(this.userInstance.email, stringToSave);
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

  appendToMiddleOfModelAndReturnBlankTodoFrom(priorTodo) {
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
    this.saveToLocalStorage();
    return newTodo;
  }

  appendToStartOfModelAndReturnBlankTodoFrom(firstTodoELement) {
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
    this.saveToLocalStorage();
    return newTodo;
  }

  appendToMiddleOfModelAndReturnBlankListFrom(priorList) {
    const priorIds = TodoPanelController.getIDsFromElement(priorList);
    const newList = new ListData();
    const priorListIndex = this.todoModel.findIndex(
      (list) => list.listId === priorIds.listId
    );
    this.todoModel.splice(priorListIndex + 1, 0, newList);
    this.saveToLocalStorage();
    return newList;
  }

  appendToMiddleOfModelAndReturnBlankSublistFrom(priorSublist) {
    const priorIds = TodoPanelController.getIDsFromElement(priorSublist);

    const newSublist = new SublistData({
      listId: priorIds.listId,
    });
    // get place in todoModel
    const listData = this.todoModel.find(
      (list) => list.listId === priorIds.listId
    );
    const priorSublistIndex = listData.sublists.findIndex(
      (sublist) => sublist.sublistId === priorIds.sublistId
    );
    listData.sublists.splice(priorSublistIndex + 1, 0, newSublist);
    this.saveToLocalStorage();
    return newSublist;
  }

  appendToStartOfModelAndReturnBlankSublistFrom(firstSublistElement) {
    const ids = TodoPanelController.getIDsFromElement(firstSublistElement);
    const newSublist = new SublistData({
      listId: ids.listId,
    });
    const listData = this.todoModel.find((list) => list.listId === ids.listId);
    listData.sublists.unshift(newSublist);
    this.saveToLocalStorage();
    return newSublist;
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
    this.saveToLocalStorage();
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
    this.saveToLocalStorage();
    console.log(event.target);
    event.target.closest('.subtask').remove();
  }
}
