/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import { getDaysInMonth, getDay } from 'date-fns';
import calendarHTML from '../components/left-pane/datetime-picker.html';

class SelectedDate {
  constructor(date) {
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.monthName = date.toLocaleString('en-US', { month: 'short' });
    this.day = date.getDate();
  }

  static get currentYear() {
    return new Date().getFullYear();
  }

  changeMonthEvent(event) {
    const todoElement = event.target.closest('.todo');
    const newDate = new Date(this.year, event.target.value, this.day);
    // eslint-disable-next-line no-use-before-define
    const newClone = createCalendarClone(newDate);
    event.target.closest('.schedule-calendar').replaceChildren(newClone);
    const datetimeElement = todoElement.querySelector('.readonly.datetime');
    datetimeElement.setAttribute(
      'value',
      `${this.year}-${event.target.value}-${this.day}`
    );
    datetimeElement.dispatchEvent(new Event('change', { bubbles: true }));
  }

  changeYearEvent(event) {
    const todoElement = event.target.closest('.todo');
    const newDate = new Date(event.target.value, this.month, this.day);
    // eslint-disable-next-line no-use-before-define
    const newClone = createCalendarClone(newDate);
    event.target.closest('.schedule-calendar').replaceChildren(newClone);
    const datetimeElement = todoElement.querySelector('.readonly.datetime');
    datetimeElement.setAttribute(
      'value',
      `${event.target.value}-${this.month + 1}-${this.day}`
    );
    datetimeElement.dispatchEvent(new Event('change', { bubbles: true }));
  }

  changeDayEvent(event) {
    const todoElement = event.target.closest('.todo');
    const newDate = new Date(
      this.year,
      this.month,
      event.target.getAttribute('data-number')
    );
    // eslint-disable-next-line no-use-before-define
    const newClone = createCalendarClone(newDate);
    event.target.closest('.schedule-calendar').replaceChildren(newClone);
    const datetimeElement = todoElement.querySelector('.readonly.datetime');
    datetimeElement.classList.remove('hidden');
    datetimeElement.setAttribute(
      'value',
      `${this.year}-${this.month + 1}-${event.target.getAttribute('data-number')}`
    );
    datetimeElement.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

export default function createCalendarClone(date) {
  const calendarTemplate = document.createElement('template');
  calendarTemplate.innerHTML = calendarHTML;
  const calendarClone = document.importNode(calendarTemplate.content, true);
  const selectedDate = new SelectedDate(date);
  const yearDropdown = calendarClone.querySelector('.year');
  for (let i = 0; i < 5; i++) {
    yearDropdown.innerHTML += `
    <option value="${SelectedDate.currentYear + i}">
      ${SelectedDate.currentYear + i}
    </option>`;
  }
  calendarClone.querySelector(
    `.year > [value="${selectedDate.year}"]`
  ).selected = true;
  calendarClone.querySelector(
    `.month > [value="${selectedDate.month}"]`
  ).selected = true;

  // fill grid with empty buttons for day of the previous month
  const dayOfWeekNumber = getDay(
    new Date(selectedDate.year, selectedDate.month, 1)
  );
  for (let i = 0; i < dayOfWeekNumber; i++) {
    calendarClone.querySelector('.date-numbers').innerHTML +=
      '<button class="empty-date-number" disabled></button>';
  }

  // fill in date number buttons for each day of month
  const daysOfSelectedMonth = getDaysInMonth(date);
  for (let i = 1; i <= daysOfSelectedMonth; i++) {
    calendarClone.querySelector('.date-numbers').innerHTML += `
      <button class="date-number selectable" data-number="${i}">${i}</button>`;
  }
  if (selectedDate.day) {
    const chosenDateButton = calendarClone.querySelector(
      `.date-numbers > [data-number="${selectedDate.day}"]`
    );
    chosenDateButton.disabled = true;
    chosenDateButton.classList.add('selected');
  }

  // Change Month Handler
  calendarClone
    .querySelector('.month')
    // eslint-disable-next-line no-use-before-define
    .addEventListener(
      'change',
      selectedDate.changeMonthEvent.bind(selectedDate)
    );

  // Change Year Handler
  calendarClone
    .querySelector('.year')
    // eslint-disable-next-line no-use-before-define
    .addEventListener(
      'change',
      selectedDate.changeYearEvent.bind(selectedDate)
    );

  // Change Day Handler
  const allDateNumberButtons = calendarClone.querySelectorAll('.date-number');
  allDateNumberButtons.forEach((button) =>
    button.addEventListener(
      'click',
      selectedDate.changeDayEvent.bind(selectedDate)
    )
  );

  return calendarClone;
}
