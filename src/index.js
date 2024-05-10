import {format} from 'date-fns';

const sidebar = document.getElementById('sidebar');
const listContainer = document.getElementById('listContainer');

document.getElementById('newListBtn').addEventListener('click', (e) => {
    e.preventDefault();
    openForm();
});

// FORM FUNCTIONS

function openForm() {
    document.getElementById("myForm").style.display = 'block';
};

function closeForm() {
    document.getElementById("myForm").style.display = "none";
};

function resetForm() {
    document.getElementById('nameInput').value = null;
    document.getElementById('dateInput').value = null;
};

// FORM EVENTS

let n = 0; // variable used to keep track of list/tab id numbers

document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (validateForm() != false){
    n++
    addTab(n);
    addList(n);
    addToSidebar(n);
    openTab(n);
    resetForm();
    closeForm();
    }
});

document.getElementById('closeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    resetForm();
    closeForm();
});

// TAB + LIST FUNCTIONS

function validateForm() {

    let name = document.getElementById('nameInput').value;
    if (name == "") {
        alert("List name is required!")
        return false;
    }
};

function addTab(n) {

    let name = document.getElementById('nameInput').value;
    let date = document.getElementById('dateInput').value;

    let tabContent = document.createElement('div');
    tabContent.classList = 'tab-content';
    tabContent.id = ('tab-' + n);

    let tabHead = document.createElement('div');
    tabHead.classList = 'tab-head';

    let listName = document.createElement('h2');
    listName.textContent = name;
    tabHead.appendChild(listName); 

    let editBtn = document.createElement('button');
    editBtn.innerHTML = '...';
    editBtn.addEventListener('click', (e) => {
        openForm(); // this isn't right... maybe it needs to be a different form completely?
        document.getElementById('nameInput').value = name;
        document.getElementById('dateInput').value = date;
        });
    tabHead.appendChild(editBtn);
    tabContent.appendChild(tabHead);

    let dateLine = document.createElement('div');
    dateLine.classList = ('date-line');

    let altDate = date.replace(/-/g, '\/');
    if (date != ""){
        let dueDate = document.createElement('p');
        dueDate.textContent = 'due: ' + format(altDate, 'PP');
        dateLine.appendChild(dueDate);
    };

    let label = document.createElement('label');
    label.for = 'priorityInput';
    label.innerHTML = 'main quest?'
    dateLine.appendChild(label);
    let priorityInput = document.createElement('input');
    priorityInput.type = 'checkbox';
    priorityInput.id = 'priorityInput';
    priorityInput.addEventListener('change' , (e) => {
        tabContent.classList.toggle('important');
    });
    dateLine.appendChild(priorityInput);
    tabContent.appendChild(dateLine);

    let notes = document.createElement('p');
    notes.textContent = 'notes:';
    notes.contentEditable = 'true';
    tabContent.appendChild(notes);

    listContainer.appendChild(tabContent);
};

function addList(n) {

    let tabContent = document.getElementById('tab-' + n);

    let div = document.createElement('div');
    div.id = ('addDiv');
    let addInput = document.createElement('input');
    addInput.type = 'text';
    addInput.id = ('addInput-' + n);
    div.appendChild(addInput);

    let addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.innerHTML = 'add'
    addBtn.id = ('addBtn-' + n);
    addBtn.addEventListener('click', (e) => {
        newListItem(e.target.id);
        });
    div.appendChild(addBtn);
    tabContent.appendChild(div);

    let ul = document.createElement('ul');
    ul.id = ('list-' + n)
    tabContent.appendChild(ul);
    listContainer.appendChild(tabContent);
};

function addToSidebar(n) {
    
    let sidebarUl = document.getElementById('sidebarUl');

    let li = document.createElement('button');
    li.classList = 'tabBtn';
    li.id =  (n);
    li.innerHTML = document.getElementById('nameInput').value;

    li.addEventListener('click', (e) => {
        openTab(e.target.id); // gets correct 'n' value
        });
    sidebarUl.appendChild(li);
    sidebar.appendChild(sidebarUl);
};

// create new li with 'add' button

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
        span.classList = 'close';
        span.appendChild(txt);
        li.appendChild(span);
    
      for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
          let div = this.parentElement;
          div.style.display = 'none';
        }
    }
};

// append 'close' button to each li
let myNodelist = document.getElementsByTagName('li');
var i;
for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement('span');
    let txt = document.createTextNode('\u00D7');
    span.classList = 'close';
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
    };

// enable close button to hide li
let close = document.getElementsByClassName('close');
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = 'none';
    }
};

// TAB MANAGEMENT FUNCTIONS

function openTab(n) { 

    // hide all tab content, then display active tab

    let tabContent = document.getElementsByClassName('tab-content');
    for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
    };
    document.getElementById('tab-' + n).style.display = 'block';

    // remove '.active' from all tabs, then make tab n 'active'

    let els = document.querySelectorAll('.tabBtn');
    for (i = 0; i < els.length; i++) {
        els[i].classList.remove('active')
    };
    document.getElementById(n).classList.add('active');

    // clear input values when switching between tabs
    
    let addInput = 'addInput-' + n;
    document.getElementById(addInput).value = null;
};
