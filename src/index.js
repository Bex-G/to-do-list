import {format} from 'date-fns';

const sidebar = document.getElementById('sidebar');
const listContainer = document.getElementById('listContainer');

document.getElementById('newListBtn').addEventListener('click', (e) => {
    e.preventDefault();
    openForm();
});

// form functions

function openForm() {
    document.getElementById("myForm").style.display = 'block';
};

function closeForm() {
    document.getElementById("myForm").style.display = "none";
};

function resetForm() {
    document.getElementById('nameInput').value = null;
    document.getElementById('noteInput').value = null;
    document.getElementById('dateInput').value = null;
    document.querySelector('input[name="priorityInput"]').value = null;
};

let n = 0; // variable used to keep track of list/tab id nbers

document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();
    n++
    addTab(n);
    addList(n);
    addToSidebar(n);
    openTab(n);
    resetForm();
    closeForm();
});

document.getElementById('closeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    resetForm();
    closeForm();
});

// list functions

function addTab(n) {

    let name = document.getElementById('nameInput').value;
    let note = document.getElementById('noteInput').value;
    let date = document.getElementById('dateInput').value.replace(/-/g, '\/');
    let formattedDate = 'Due: ' + format(date, 'PP');
    let priority = document.querySelector('input[name="priorityInput"]:checked').value;

    let tabContent = document.createElement('div');
    tabContent.classList = 'tab-content';
    tabContent.setAttribute('id', 'tab-' + n);

    let listName = document.createElement('h2');
    listName.textContent = name;
    tabContent.appendChild(listName);

    let listNote = document.createElement('p');
    listNote.textContent = note;
    tabContent.appendChild(listNote);

    let listDate = document.createElement('p');
    listDate.textContent = formattedDate;
    tabContent.appendChild(listDate);

    let listPriority = document.createElement('p');
    listPriority.textContent = priority;
    tabContent.appendChild(listPriority);

    listContainer.appendChild(tabContent);
};

function addList(n) {

    let tabContent = document.getElementById('tab-' + n);

    let addDiv = document.createElement('addDiv');
    let addInput = document.createElement('input');
    addInput.type = 'text';
    addInput.setAttribute('id', 'addInput-' + n);
    addDiv.appendChild(addInput);

    let addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.innerHTML = 'add'
    addBtn.setAttribute('id', 'addBtn-' + n);
    addBtn.addEventListener('click', (e) => {
        newListItem(e.target.id);
        });
    addDiv.appendChild(addBtn);
    tabContent.appendChild(addDiv);

    let ul = document.createElement('ul');
    ul.setAttribute('id', 'list-' + n)
    tabContent.appendChild(ul);
    listContainer.appendChild(tabContent);
};

function addToSidebar(n) {
    
    let sidebarUl = document.getElementById('sidebarUl');

    let li = document.createElement('button');
    li.classList = 'tab-link';
    li.setAttribute('id', n);
    li.innerHTML = document.getElementById('nameInput').value;
    li.addEventListener('click', (e) => {
        openTab(e.target.id);
        });
    sidebarUl.appendChild(li);
    sidebar.appendChild(sidebarUl);
};

// Create a new list item when clicking on the 'Add' button

function newListItem(event) {

    let index = event.indexOf('-');
    let n = event.substring(index + 1);

    let li = document.createElement('li');
    let inputValue = document.getElementById('addInput-' + n).value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);

    if (inputValue === '') {
        alert('You must write something!');
        } else {
        document.getElementById('list-' + n).appendChild(li);
        }
        document.getElementById('addInput-' + n).value = '';

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
};

// Create a 'close' button and append it to each list item
let myNodelist = document.getElementsByTagName('li');
var i;
for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement('span');
    let txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
    };

// Click on a close button to hide the current list item
let close = document.getElementsByClassName('close');
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = 'none';
    }
};

// tab management

function openTab(n) { 

    let activeTab = 'tab-' + n;

    let tabContent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
    }

    document.getElementById(activeTab).style.display = 'block';
};