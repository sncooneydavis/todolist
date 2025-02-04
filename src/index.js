/* eslint-disable import/extensions */
import './styles.css';
import dragbarHTML from './components/drag-bar-template.html';
import TodoPanelController from './controller/todo-panel-control.js';

// class MainFrameController {
//   static utilityInputElement = document.getElementById('utility-input');
// }

const init = () => {
  const dragDiv = document.querySelector('.dragbar');
  dragDiv.innerHTML += dragbarHTML;

  const todoPanelController = new TodoPanelController(
    document.getElementById('todo-panel')
  );
  todoPanelController.renderAllLists();

  // const mainFrameController = new MainFrameController();
  // MainFrameController.utilityInputElement.addEventListener('input', parseInput);
};

init();

// function updateClock() {
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();

//   requestAnimationFrame(updateClock); // Keep updating
// }

// updateClock();
