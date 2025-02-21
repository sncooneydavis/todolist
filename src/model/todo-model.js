/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
import { ListData } from './item-classes.js';

export default class TodoModeller {
  constructor(rawUserListData, controller) {
    this.todoModel = rawUserListData.map((list) => new ListData(list));
    this.controller = controller;
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
    this.controller.saveToLocalStorage();
  }

  deleteTodoFromModelAndStore(dataElement) {
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
    this.controller.saveToLocalStorage();
  }
}
