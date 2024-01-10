import {format} from 'date-fns';

function List(name, note, date, priority) {
    this.name = name;
    this.note = note;
    this.date = 'Due: ' + format(date, 'PP');
    this.priority = priority;
}

const content = document.getElementById('content');
const sidebar = document.getElementById('sidebar');
const sidebarUl = document.getElementById('sidebarUl');
const main = document.getElementById('main');

// sidebar functions

document.getElementById('newListBtn').addEventListener('click', (e) => {
    e.preventDefault();
    openForm();
});

// form functions

function openForm() {
    document.getElementById("myForm").style.display = 'block';
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}  

document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();
    newList();
    closeForm();
});

document.getElementById('closeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    closeForm();
});

// list functions

function newList() {

    var name = document.getElementById('nameInput').value;
    var note = document.getElementById('noteInput').value;
    var date = document.getElementById('dateInput').value.replace(/-/g, '\/');
    var priority = document.querySelector('input[name="priorityInput"]:checked').value;

    let list = new List(name, note, date, priority);

    const listName = document.createElement('h2');
    listName.textContent = list.name;
    listName.id = 'listName';
    main.appendChild(listName);

    const listNote = document.createElement('p');
    listNote.textContent = list.note;
    main.appendChild(listNote);

    const dueDate = document.createElement('p');
    dueDate.textContent = list.date;
    main.appendChild(dueDate);

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

    main.appendChild(addDiv);

    const ul = document.createElement('ul');
    ul.id = 'myList';
    main.appendChild(ul);
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
};
