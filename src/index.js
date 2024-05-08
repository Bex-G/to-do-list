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
    document.getElementById('noteInput').value = null;
    document.getElementById('dateInput').value = null;
    document.getElementById('priorityInput').checked = 0;
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
    let note = document.getElementById('noteInput').value;
    let date = document.getElementById('dateInput').value.replace(/-/g, '\/');

    let tabContent = document.createElement('div');
    tabContent.classList = 'tab-content';
    tabContent.setAttribute('id', 'tab-' + n);

    let listName = document.createElement('h2');
    listName.textContent = name;
    tabContent.appendChild(listName);

    let listNote = document.createElement('p');
    listNote.textContent = note;
    tabContent.appendChild(listNote);

    if (date != ""){
        let listDate = document.createElement('p');
        listDate.textContent = 'Due: ' + format(date, 'PP');
        tabContent.appendChild(listDate);
    };

    if (document.getElementById('priorityInput').checked == 1){
        tabContent.classList.add('important');
    };

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
    li.setAttribute('id', n);
    li.classList = 'tabBtn';
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

// append 'close' button to each li
let myNodelist = document.getElementsByTagName('li');
var i;
for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement('span');
    let txt = document.createTextNode('\u00D7');
    span.className = 'close';
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
    for (var i = 0; i < els.length; i++) {
        els[i].classList.remove('active')
    };
    document.getElementById(n).classList.add('active');

    // clear input values when switching between tabs
    
    let addInput = 'addInput-' + n;
    document.getElementById(addInput).value = null;
};
