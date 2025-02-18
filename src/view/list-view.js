/* eslint-disable no-console */
/* eslint-disable import/extensions */
import TodoView from './todo-view.js';
import listHTML from '../components/left-pane/items-views/1.todo-view/list-template.html';
import sublistHTML from '../components/left-pane/items-views/1.todo-view/sublist-template.html';
import mainPageHTML from '../components/main-page.html';

export default class ListView {
  constructor(modeller, controller) {
    this.todoController = controller;
    this.todoModeller = modeller;
    this.todoModel = modeller.todoModel;
    this.todoView = new TodoView(modeller, controller);

    this.renderView();
  }

  static SELECTORS = {
    readonlyTitle: '.readonly.title',
    editingTitle: '.editing-list-title',
    optionsPopover: '.options.popover',
    optionsListButton: '.options-list-button',
    todoContainer: '.todo.container',
    sublistContainer: '.sublist.container',
    bodyContainer: '.body.container',
    openListButton: '.open-list-button',
    tinyAddTodo: '.tiny-add-bar-todo',
    tinyAddList: '.tiny-add-bar-list',
    tinyAddSublist: '.tiny-add-bar-sublist',
  };

  renderView() {
    document.querySelector('body').innerHTML = mainPageHTML;
    const container = document.getElementById('todo-panel');
    this.todoModel.forEach((list) => {
      container.appendChild(this.renderList(list));
      // this is a hack; TDL: replace with default list
      if (list.listId === 'list-1') {
        list.toggleOpen();
        ListView.toggleListOpen(list);
      }
    });
    container.addEventListener(
      'change',
      this.todoController.handleInputChange.bind(this)
    );
  }

  renderList(list) {
    const listTemplate = document.createElement('template');
    listTemplate.innerHTML = listHTML;
    const listClone = document.importNode(listTemplate.content, true);

    listClone.querySelector('.list').setAttribute('data-list-id', list.listId);
    const readonlyListTitleDiv = listClone.querySelector(
      ListView.SELECTORS.readonlyTitle
    );
    readonlyListTitleDiv.setAttribute('value', list.name);
    readonlyListTitleDiv.addEventListener(
      'click',
      this.readonlyListTitleClick.bind(this)
    );
    listClone
      .querySelector(ListView.SELECTORS.editingTitle)
      .setAttribute('value', list.name);

    const optionsListButton = listClone.querySelector(
      ListView.SELECTORS.optionsListButton
    );
    optionsListButton.addEventListener('click', ListView.optionsListClick);

    // tiny add bar (todo) fxy
    listClone
      .querySelector(ListView.SELECTORS.tinyAddTodo)
      .addEventListener('mouseover', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '+';
      });
    listClone
      .querySelector(ListView.SELECTORS.tinyAddTodo)
      .addEventListener('mouseout', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '';
      });
    listClone
      .querySelector(ListView.SELECTORS.tinyAddTodo)
      .addEventListener(
        'click',
        this.todoView.handleTinyAddBarInTodoContainerClick.bind(this.todoView)
      );

    // tiny add bar (sublist) fxy
    listClone
      .querySelector(ListView.SELECTORS.tinyAddSublist)
      .addEventListener('mouseover', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '+';
      });
    listClone
      .querySelector(ListView.SELECTORS.tinyAddSublist)
      .addEventListener('mouseout', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '';
      });
    listClone
      .querySelector(ListView.SELECTORS.tinyAddSublist)
      .addEventListener(
        'click',
        this.handleTinyAddBarInSublistContainerClick.bind(this)
      );

    // tiny add bar (list) fxy
    listClone
      .querySelector(ListView.SELECTORS.tinyAddList)
      .addEventListener('mouseover', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '+';
      });
    listClone
      .querySelector(ListView.SELECTORS.tinyAddList)
      .addEventListener('mouseout', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '';
      });
    listClone
      .querySelector(ListView.SELECTORS.tinyAddList)
      .addEventListener(
        'click',
        this.handleTinyAddBarBelowListClick.bind(this)
      );

    // Populate todo container
    list.todos.forEach((todo) => {
      const todoClone = this.todoView.renderTodo(todo);
      if (todoClone) {
        listClone
          .querySelector(ListView.SELECTORS.todoContainer)
          .appendChild(todoClone);
      }
    });

    // Populate sublist container
    const sublistContainer = listClone.querySelector(
      ListView.SELECTORS.sublistContainer
    );
    if (list.sublists.length !== 0) {
      list.sublists.forEach((sublist) => {
        const sublistClone = this.renderSublist(sublist);
        if (sublistClone) {
          sublistContainer.appendChild(sublistClone);
        }
      });
    } else {
      sublistContainer.classList.add('hidden');
    }
    return listClone;
  }

  readonlyListTitleClick(event) {
    const sublistId = event.target
      .closest('.sublist')
      ?.getAttribute('data-sublist-id');
    const listId = event.target.closest('.list').getAttribute('data-list-id');
    if (!sublistId) {
      this.todoModel.forEach((list) => {
        if (list.isOpen || list.listId === listId) {
          list.toggleOpen();
          ListView.toggleListOpen(list);
        }
      });
    } else {
      const listData = this.todoModel.find((list) => list.listId === listId);
      listData.sublists.forEach((sublist) => {
        if (sublist.isOpen || sublist.sublistId === sublistId) {
          sublist.toggleOpen();
          ListView.toggleListOpen(sublist);
        }
      });
    }
  }

  static optionsListClick(event) {
    const optionsPopover = event.currentTarget
      .closest('.heading')
      .nextElementSibling.querySelector(ListView.SELECTORS.optionsPopover);
    if (optionsPopover) {
      optionsPopover.classList.toggle('hidden');
    }
  }

  static toggleListOpen(list) {
    console.log('toggle the list', list.listId);
    let listDiv;
    if (list.sublistId) {
      listDiv = document.querySelector(
        `.sublist[data-sublist-id="${list.sublistId}"]`
      );
    } else if (list.listId) {
      listDiv = document.querySelector(`.list[data-list-id="${list.listId}"]`);
      console.log('list div being toggled', listDiv);
    }
    if (listDiv) {
      const bodyContainer = listDiv.querySelector(
        ListView.SELECTORS.bodyContainer
      );
      if (bodyContainer) {
        bodyContainer.classList.toggle('hidden');
      }

      const headingDiv = listDiv.querySelector('.heading');
      if (headingDiv) {
        if (list.isOpen) {
          headingDiv.style.borderBottomLeftRadius = '0px';
          headingDiv.style.borderBottomRightRadius = '0px';
        } else {
          headingDiv.style.borderBottomLeftRadius = '10px';
          headingDiv.style.borderBottomRightRadius = '10px';
        }
      }

      const openListButton = listDiv.querySelector(
        ListView.SELECTORS.openListButton
      );
      if (openListButton) {
        openListButton.classList.toggle('hidden');
      }

      const editingListTitle = listDiv.querySelector(
        ListView.SELECTORS.editingTitle
      );
      if (editingListTitle) {
        editingListTitle.classList.toggle('hidden');
      }

      const optionsButton = listDiv.querySelector(
        ListView.SELECTORS.optionsListButton
      );
      if (optionsButton) {
        optionsButton.classList.toggle('hidden');
      }
    }
  }

  renderSublist(sublist) {
    const sublistTemplate = document.createElement('template');
    sublistTemplate.innerHTML = sublistHTML;
    const sublistClone = document.importNode(sublistTemplate.content, true);

    const sublistDiv = sublistClone.querySelector('.sublist');
    sublistDiv.setAttribute('data-list-id', sublist.listId);
    sublistDiv.setAttribute('data-sublist-id', sublist.sublistId);
    const readonlySublistTitleDiv = sublistClone.querySelector(
      ListView.SELECTORS.readonlyTitle
    );
    readonlySublistTitleDiv.setAttribute('value', sublist.name);
    readonlySublistTitleDiv.addEventListener(
      'click',
      this.readonlyListTitleClick.bind(this)
    );
    sublistClone
      .querySelector(ListView.SELECTORS.editingTitle)
      .setAttribute('value', sublist.name);

    const optionsSublistButton = sublistClone.querySelector(
      ListView.SELECTORS.optionsListButton
    );
    optionsSublistButton.addEventListener('click', ListView.optionsListClick);

    // tiny add bar (todo) fxy
    sublistClone
      .querySelector(ListView.SELECTORS.tinyAddTodo)
      .addEventListener('mouseover', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '+';
      });
    sublistClone
      .querySelector(ListView.SELECTORS.tinyAddTodo)
      .addEventListener('mouseout', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '';
      });
    sublistClone
      .querySelector(ListView.SELECTORS.tinyAddTodo)
      .addEventListener(
        'click',
        this.handleTinyAddBarBelowSublistClick.bind(this.todoView)
      );

    // tiny add bar (sublist) fxy
    sublistClone
      .querySelector(ListView.SELECTORS.tinyAddSublist)
      .addEventListener('mouseover', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '+';
      });
    sublistClone
      .querySelector(ListView.SELECTORS.tinyAddSublist)
      .addEventListener('mouseout', (event) => {
        // eslint-disable-next-line no-param-reassign
        event.target.innerHTML = '';
      });
    sublistClone
      .querySelector(ListView.SELECTORS.tinyAddSublist)
      .addEventListener(
        'click',
        this.handleTinyAddBarBelowSublistClick.bind(this)
      );

    // Populate todo container
    sublist.todos.forEach((todo) => {
      const todoClone = this.todoView.renderTodo(todo);
      if (todoClone) {
        sublistClone
          .querySelector(ListView.SELECTORS.bodyContainer)
          .appendChild(todoClone);
      }
    });
    return sublistClone;
  }

  handleTinyAddBarBelowListClick(event) {
    const priorList = event.target.previousElementSibling;
    const listData =
      this.todoController.appendToMiddleOfModelAndReturnBlankListFrom(
        priorList
      );
    const listClone = this.renderList(listData);
    const { parentNode } = event.target;
    parentNode.insertBefore(listClone, event.target.nextSibling);
    const listTitleElement = parentNode.querySelector(
      `.list[data-list-id='${listData.listId}'] .editing-list-title`
    );
    listTitleElement.focus();
  }

  handleTinyAddBarInSublistContainerClick(event) {
    const sublistData =
      this.todoController.appendToStartOfModelAndReturnBlankSublistFrom(
        event.target.nextElementSibling
      );
    const sublistClone = this.renderSublist(sublistData);
    event.target.after(sublistClone);
    event.target.parentNode
      .querySelector(
        `.sublist[data-sublist-id='${sublistData.sublistId}'] .editing-list-title`
      )
      .focus();
  }

  handleTinyAddBarBelowSublistClick(event) {
    const priorSublist = event.target.previousElementSibling;
    const sublistData =
      this.todoController.appendToMiddleOfModelAndReturnBlankSublistFrom(
        priorSublist
      );
    const sublistClone = this.renderSublist(sublistData);
    const { parentNode } = event.target;
    parentNode.insertBefore(sublistClone, event.target.nextSibling);
    const sublistTitleElement = parentNode.querySelector(
      `.sublist[data-sublist-id='${sublistData.sublistId}'] .editing-list-title`
    );
    sublistTitleElement.focus();
  }
}
