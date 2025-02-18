/* eslint-disable no-console */
export default class UtilityBar {
  constructor(model, controller) {
    this.model = model;
    this.controller = controller;

    this.utilityToolbarElement = document.querySelector('#utility-toolbar');
    this.utilityInputElement = document.querySelector('#utility-input');
    this.utilityResultsElement = document.querySelector('#utility-results');
    this.addUtilityBarInputHandler();
  }

  addUtilityBarInputHandler() {
    this.utilityInputElement.addEventListener('input', (event) => {
      this.utilityResultsElement.classList.remove('hidden');
      this.utilityResultsElement.innerHTML = '';

      // if search is constrained to a sublist by prior input:
      // search for todos
      // add as todo
      const listConstraint = event.target.previousElementSibling || null;
      if (listConstraint?.querySelector('div[data-sublist-id]')) {
        const listId = listConstraint
          .querySelector('[data-list-id]')
          .getAttribute('data-list-id');
        const sublistId = listConstraint
          .querySelector('[data-sublist-id]')
          .getAttribute('data-sublist-id');
        this.populateResultsFrom(listId, sublistId, event.target.innerText);
        this.appendNewTodoOptionToResultsFrom(
          listId,
          sublistId,
          event.target.innerText
        );
      }
      // if input is constrained to a list by prior input:
      // search for sublists
      // search for todos
      // add as todo
      // if input starts with list symbol:
      // add as sublist
      else if (listConstraint) {
        const listId = listConstraint.getAttribute('data-list-id');
        this.populateResultsFrom(listId, null, event.target.innerText);
        this.appendNewTodoOptionToResultsFrom(
          listId,
          null,
          event.target.innerText
        );
        if (event.target.innerText.startsWith('/')) {
          this.appendNewSublistOptionToResultsFrom(
            listId,
            event.target.innerText.slice(1)
          ).bind(this);
        }
      }
      // if input starts with list symbol:
      // search for lists
      // search for sublists
      // add as list
      else if (event.target.innerText.startsWith('/')) {
        this.populateResultsFrom(null, null, event.target.innerText.slice(1));
        this.appendNewListOptionToResultsFrom(
          event.target.innerText.slice(1)
        ).bind(this);
      }
      // if input has no list symbol and no prior input
      // search for lists
      // search for sublists
      // search for todos
      // add as todo to first list in DOM
      else {
        this.populateResultsFrom(null, null, event.target.innerText);
        this.appendNewTodoOptionToResultsFrom(
          null,
          null,
          event.target.innerText
        );
      }
      // LATER: if list symbol comes after text input
    });
  }

  populateResultsFrom(listId, sublistId, inputFragment) {
    let listData = null;
    if (listId) {
      listData = this.model.find((list) => list.listId === listId);
      console.log('this LIST', listData);
    }
    let sublistData = null;
    if (sublistId) {
      sublistData = listData?.sublists.find(
        (sublist) => sublist.sublistId === sublistId
      );
    }
    let filteredLists = [];
    let filteredSublists = [];
    let filteredTodos = [];
    if (!listData) {
      filteredLists = this.model.filter((list) =>
        list.name.toLowerCase().startsWith(inputFragment.toLowerCase())
      );
      filteredSublists = this.model.flatMap((list) => [
        ...list.sublists.filter((sublist) =>
          sublist.name.toLowerCase().startsWith(inputFragment.toLowerCase())
        ),
      ]);
      filteredTodos = this.model.flatMap((list) => [
        ...list.todos.filter((todo) =>
          todo.name.toLowerCase().startsWith(inputFragment.toLowerCase())
        ),
        ...list.sublists.flatMap((sublist) =>
          sublist.todos.filter((todo) =>
            todo.name.toLowerCase().startsWith(inputFragment.toLowerCase())
          )
        ),
      ]);
    } else if (!sublistData) {
      filteredSublists = listData.sublists.filter((sublist) =>
        sublist.name.toLowerCase().startsWith(inputFragment.toLowerCase())
      );
      if (filteredSublists.length !== 0) {
        filteredTodos = listData.sublists.flatMap((sublist) => [
          ...sublist.todos.filter((todo) =>
            todo.name.toLowerCase().startsWith(inputFragment.toLowerCase())
          ),
        ]);
      } else {
        filteredTodos = listData.todos.filter((todo) =>
          todo.name.toLowerCase().startsWith(inputFragment.toLowerCase())
        );
      }
    } else {
      filteredTodos = sublistData.todos.filter((todo) =>
        todo.name.toLowerCase().startsWith(inputFragment.toLowerCase())
      );
    }
    filteredLists.forEach((list) => {
      const listOption = document.createElement('div');
      listOption.innerText = `/${list.name}`;
      listOption.dataset.listId = list.listId;
      listOption.classList.add('list-option', 'option');
      listOption.addEventListener(
        'click',
        this.handleClickSearchResult.bind(this)
      );
      this.utilityResultsElement.appendChild(listOption);
    });
    filteredSublists.forEach((sublist) => {
      const sublistOption = document.createElement('div');
      const parentListData = this.model.find(
        (list) => list.listId === sublist.listId
      );
      sublistOption.innerText = `/${parentListData.name}/${sublist.name}`;
      sublistOption.dataset.listId = parentListData.listId;
      sublistOption.dataset.sublistId = sublist.sublistId;
      sublistOption.classList.add('sublist-option', 'option');
      sublistOption.addEventListener(
        'click',
        this.handleClickSearchResult.bind(this)
      );
      this.utilityResultsElement.appendChild(sublistOption);
    });
    filteredTodos.forEach((todo) => {
      const todoOption = document.createElement('div');
      const parentListData = this.model.find(
        (list) => list.listId === todo.listId
      );
      const parentSublistData = parentListData.sublists.find(
        (sublist) => sublist.sublistId === todo.sublistId
      );
      const parentSublistText = parentSublistData
        ? `/${parentSublistData.name}`
        : '';
      todoOption.innerText = `/${parentListData.name}${parentSublistText}: ${todo.name}`;
      todoOption.dataset.listId = todo.listId;
      if (todo.sublistId) {
        todoOption.dataset.sublistId = todo.sublistId;
      }
      todoOption.dataset.todoId = todo.todoId;
      todoOption.classList.add('todo-option', 'option');
      todoOption.addEventListener(
        'click',
        this.handleClickSearchResult.bind(this)
      );
      this.utilityResultsElement.appendChild(todoOption);
    });
  }

  emptyAllUtilityElements() {
    while (this.utilityInputElement.firstChild) {
      this.utilityInputElement.removeChild(this.utilityInputElement.firstChild);
    }
    while (this.utilityResultsElement.firstChild) {
      this.utilityResultsElement.removeChild(
        this.utilityResultsElement.firstChild
      );
    }
    this.utilityToolbarElement
      .querySelectorAll('.option')
      .forEach((option) => option.remove());
    this.utilityResultsElement.classList.add('hidden');
  }

  emptyResultsElementsAndHide() {
    while (this.utilityResultsElement.firstChild) {
      this.utilityResultsElement.removeChild(
        this.utilityResultsElement.firstChild
      );
    }
    this.utilityResultsElement.classList.add('hidden');
  }

  handleClickSearchResult(event) {
    const targetOption = event.target;
    if (this.utilityInputElement.querySelector('.option')) {
      document
        .querySelector(
          `.todo[data-todo-id='${targetOption.getAttribute('data-todo-id')}'] button.todo-details-on`
        )
        .click();
      this.emptyAllUtilityElements();
    } else {
      if (targetOption.hasAttribute('data-list-id')) {
        const listId = targetOption.getAttribute('data-list-id');
        const listData = this.model.find((list) => list.listId === listId);
        if (!listData.isOpen) {
          document
            .querySelector(`.list[data-list-id='${listId}'] .readonly.title`)
            .click();
        }
        this.utilityInputElement.textContent = '';
        this.utilityToolbarElement.prepend(targetOption);
        this.emptyResultsElementsAndHide();
        this.utilityInputElement.focus();
      }
      if (targetOption.hasAttribute('data-sublist-id')) {
        const sublistId = targetOption.getAttribute('data-sublist-id');
        document
          .querySelector(
            `.sublist[data-sublist-id='${sublistId}'] button.open-list-button`
          )
          .click();
        this.utilityInputElement.textContent = '';
        this.utilityToolbarElement.removeChild(
          this.utilityToolbarElement.firstChild
        );
        this.utilityToolbarElement.prepend(targetOption);
        this.emptyResultsElementsAndHide();
        this.utilityInputElement.focus();
      }
      if (targetOption.hasAttribute('data-todo-id')) {
        document
          .querySelector(
            `.todo[data-todo-id='${targetOption.getAttribute('data-todo-id')}'] button.todo-details-on`
          )
          .click();
        this.emptyAllUtilityElements();
      }
    }
  }

  appendNewListOptionToResultsFrom(inputFragment) {
    const newListOption = document.createElement('div');
    newListOption.innerText = `+ /${inputFragment} list`;
    newListOption.addEventListener('click', () => {
      document.querySelector(`#todo-panel`).lastElementChild.click();
      this.emptyAllUtilityElements();
    });
    this.utilityResultsElement.appendChild(newListOption);
  }

  appendNewSublistOptionToResultsFrom(listId, inputFragment) {
    const listData = this.model.find((list) => list.listId === listId);
    const listName = listData?.name || null;
    const newSublistOption = document.createElement('div');
    newSublistOption.innerText = `+ /${inputFragment} sublist to /${listName}`;
    newSublistOption.addEventListener('click', () => {
      document
        .querySelector(`.list[data-list-id="${listId}"] .sublist.container`)
        .lastElementChild.click();
      this.emptyAllUtilityElements();
    });
    this.utilityResultsElement.appendChild(newSublistOption);
  }

  appendNewTodoOptionToResultsFrom(listId, sublistId, inputFragment) {
    const listData = this.model.find((list) => list.listId === listId);
    const listName = listData?.name || null;
    let sublistName = null;
    if (sublistId) {
      sublistName = listData.sublists.find(
        (sublist) => sublist.sublistId === sublistId
      ).name;
    }
    let listIdOrFirstList = listId;
    if (!listId) {
      listIdOrFirstList = 'list-1';
    }
    const newTodoOption = document.createElement('div');
    const listText = listName
      ? `/${listName}`
      : document.querySelector('.list .readonly.title').getAttribute('value');
    const sublistText = sublistName ? `/${sublistName}` : '';
    newTodoOption.innerText = `+ ${inputFragment} to ${listText}${sublistText}`;
    newTodoOption.addEventListener('click', () => {
      // this clicks the 'add new todo' button that is the sibling of the last todo contained in the list
      if (sublistId) {
        document
          .querySelector(
            `.list[data-list-id="${listId}"] .sublist[data-sublist-id="${sublistId}"] .body.container`
          )
          .lastElementChild.click();
      } else {
        document
          .querySelector(
            `.list[data-list-id="${listIdOrFirstList}"] .todo.container`
          )
          .lastElementChild.click();
      }
      document.activeElement.value = inputFragment;
      this.emptyAllUtilityElements();
    });
    this.utilityResultsElement.appendChild(newTodoOption);
  }
}
