import {format} from 'date-fns';

const content = document.getElementById('content');

// Create form

const form = document.createElement('form');

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.id = 'nameInput';
const nameLabel = document.createElement('label');
nameLabel.setAttribute('for', 'nameInput');
nameLabel.innerHTML = 'List Name:';
form.appendChild(nameLabel);
form.appendChild(nameInput);

const noteInput = document.createElement('input');
noteInput.type = 'text';
noteInput.id = 'noteInput';
const noteLabel = document.createElement('label');
noteLabel.setAttribute('for', 'noteInput');
noteLabel.innerHTML = 'Notes:';
form.appendChild(noteLabel);
form.appendChild(noteInput);

const dateInput = document.createElement('input');
dateInput.type = 'date';
dateInput.id = 'dateInput';
const dateLabel = document.createElement('label');
dateLabel.setAttribute('for', 'dateInput');
dateLabel.innerHTML = 'Due by:';
form.appendChild(dateLabel);
form.appendChild(dateInput);

const priorityInput = document.createElement('fieldset');
const p1 = document.createElement('input');
p1.type = 'radio';
p1.name = 'priorityInput'
p1.id = 'p1';
p1.value = 'main quest';
const p1L = document.createElement('label');
p1L.setAttribute('for', 'p1');
p1L.innerHTML = 'Main Quest:';
priorityInput.appendChild(p1L);
priorityInput.appendChild(p1);
const p2 = document.createElement('input');
p2.type = 'radio';
p2.name = 'priorityInput'
p2.id = 'p2';
p2.value = 'side quest';
const p2L = document.createElement('label');
p2L.setAttribute('for', 'p2');
p2L.innerHTML = 'Side Quest:';
priorityInput.appendChild(p2L);
priorityInput.appendChild(p2);
form.appendChild(priorityInput);

const submitBtn = document.createElement('button');
submitBtn.type = 'submit';
form.setAttribute('method', 'get');
submitBtn.innerHTML = 'New List'
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    newList();
});
form.appendChild(submitBtn);

content.appendChild(form);

// Create a new list using form values

function newList() {
    const listName = document.createElement('h2');
    listName.textContent = document.getElementById('nameInput').value;
    content.appendChild(listName);

    const listNotes = document.createElement('p');
    listNotes.textContent = document.getElementById('noteInput').value;
    content.appendChild(listNotes);

    const dueDate = document.createElement('p');
    let fixedDate = document.getElementById('dateInput').value.replace(/-/g, '\/');
    let formattedDate = format(fixedDate, 'PP');
    dueDate.textContent = 'Due: ' + formattedDate;
    content.appendChild(dueDate);

    const addDiv = document.createElement('div');
    addDiv.id = 'addDiv';
    const addInput = document.createElement('input');
    addInput.type = 'text';
    addInput.id = 'addInput';
    addDiv.appendChild(addInput);

    const addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.innerHTML = 'add'
    addBtn.addEventListener('click', newListItem);
    addDiv.appendChild(addBtn);

    content.appendChild(addDiv);

    const ul = document.createElement('ul');
    ul.id = 'myList';
    content.appendChild(ul);
}

// Create a new list item when clicking on the 'Add' button

function newListItem() {
    let li = document.createElement('li');
    let inputValue = document.getElementById('addInput').value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert('You must write something!');
      } else {
        document.getElementById('myList').appendChild(li);
      }
      document.getElementById('addInput').value = '';

      let span = document.createElement('span');
      let txt = document.createTextNode('\u00D7');
      span.className = 'close';
      span.appendChild(txt);
      li.appendChild(span);
    
      for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
          let div = this.parentElement;
          div.style.display = 'none';
        }
    }
}

// Create a 'close' button and append it to each list item
let myNodelist = document.getElementsByTagName('li');
var i;
for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement('span');
    let txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
    }

// Click on a close button to hide the current list item
let close = document.getElementsByClassName('close');
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = 'none';
    }
}
