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

let counter = 0;

document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();
    counter++
    addTab(counter);
    addList(counter);
    addToSidebar(counter);
    openTab(counter);
    resetForm();
    closeForm();
});

document.getElementById('closeBtn').addEventListener('click', (e) => {
    e.preventDefault();
    resetForm();
    closeForm();
});

// list functions

function addTab(counter) {

    let name = document.getElementById('nameInput').value;
    let note = document.getElementById('noteInput').value;
    let date = document.getElementById('dateInput').value.replace(/-/g, '\/');
    let formattedDate = 'Due: ' + format(date, 'PP');
    let priority = document.querySelector('input[name="priorityInput"]:checked').value;

    const tabContent = document.createElement('div');
    tabContent.classList = 'tab-content';
    tabContent.setAttribute('id', 'list-' + counter);

    const listName = document.createElement('h2');
    listName.textContent = name;
    tabContent.appendChild(listName);

    const listNote = document.createElement('p');
    listNote.textContent = note;
    tabContent.appendChild(listNote);

    const listDate = document.createElement('p');
    listDate.textContent = formattedDate;
    tabContent.appendChild(listDate);

    const listPriority = document.createElement('p');
    listPriority.textContent = priority;
    tabContent.appendChild(listPriority);

    listContainer.appendChild(tabContent);
};

function addList(counter) {

    const tabContent = document.getElementById('list-' + counter);

    const addDiv = document.createElement('addDiv');
    const addInput = document.createElement('input');
    addInput.type = 'text';
    addInput.setAttribute('id', 'addInput-' + counter)
    addDiv.appendChild(addInput);

    const addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.innerHTML = 'add'
    addBtn.addEventListener('click', newListItem(counter));
    addDiv.appendChild(addBtn);
    tabContent.appendChild(addDiv);

    const ul = document.createElement('ul');
    ul.id = 'myList';
    tabContent.appendChild(ul);
    listContainer.appendChild(tabContent);
};

function addToSidebar(counter) {
    
    const sidebarUl = document.getElementById('sidebarUl');
    const li = document.createElement('button');
    li.classList = 'tab-link';
    li.setAttribute('id', counter)
    li.innerHTML = document.getElementById('nameInput').value;
    li.addEventListener('click', (e) => {
        openTab(e.target.id);
        });
    sidebarUl.appendChild(li);
    sidebar.appendChild(sidebarUl);
};

// Create a new list item when clicking on the 'Add' button

function newListItem(counter) {
    console.log(counter);

    // let li = document.createElement('li');
    // let inputValue = document.getElementById(counter).value;
    // let t = document.createTextNode(inputValue);
    // li.appendChild(t);
    // if (inputValue === '') {
    //     alert('You must write something!');
    //   } else {
    //     document.getElementById('myList').appendChild(li);
    //   }
    //   document.getElementById(counter).value = '';

    //   let span = document.createElement('span');
    //   let txt = document.createTextNode('\u00D7');
    //   span.className = 'close';
    //   span.appendChild(txt);
    //   li.appendChild(span);
    
    //   for (i = 0; i < close.length; i++) {
    //     close[i].onclick = function() {
    //       let div = this.parentElement;
    //       div.style.display = 'none';
    //     }
    // }
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

function openTab(counter) { 

    let activeList = 'list-' + counter;

    const tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
    }

    const tabLinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    document.getElementById(activeList).style.display = "block";
    // evt.currentTarget.className += " active";
};
