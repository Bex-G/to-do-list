// import {format} from "date-fns";

// const { intlFormat } = require("date-fns");

const sidebar = document.getElementById("sidebar");
const tabContainer = document.getElementById("tabContainer");

document.getElementById("newListBtn").addEventListener("click", (e) => {
    n++
    addTab(n);
    addList(n);
    addToSidebar(n);
    openTab(n);
})

let n = 0; // variable used to keep track of list/tab id numbers

function addTab(n) {

    let tabContent = document.createElement("div");
    tabContent.classList = "tab-content";
    tabContent.id = ("tab-" + n);

    let info = document.createElement("div");
    info.classList = "list-info";

    let header = document.createElement("div");
    header.classList = "tab-header";

    let listName = document.createElement("h1");
    listName.textContent = ("Quest " + n);
    listName.id = ("name" + n);
    listName.contentEditable = "true";
    listName.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            listName.blur();
            document.getElementById(n).textContent = (listName.textContent.length <= 12) 
            ? listName.textContent 
            : (listName.textContent.substring(0,12)) + "...";
        }
    })
    listName.addEventListener("focusout", () => {
        document.getElementById(n).textContent = (listName.textContent.length <= 12) 
        ? listName.textContent 
        : (listName.textContent.substring(0,12)) + "...";
    })
    header.appendChild(listName); 

    let r = document.createElement("div");
    r.id = "headerR";

    let removeBtn = document.createElement("button");
    removeBtn.id = "removeBtn";
    let txt = document.createTextNode("\u00D7");
    removeBtn.appendChild(txt);
    removeBtn.addEventListener("click", () => {
        let result = confirm("Are you sure you want to delete this list? (This can not be undone.)")
        if (result === true) {
        document.getElementById("tab-" + n).remove();
        document.getElementById(n).remove();
        }
    });
    r.appendChild(removeBtn);

    header.appendChild(r);
    info.appendChild(header);

    let p = document.createElement("div");
    p.id = "priority";
    let pL = document.createElement("label");
    pL.htmlFor = ("priorityInput" + n);
    pL.innerHTML = "main quest?"
    p.appendChild(pL);
    let priorityInput = document.createElement("input");
    priorityInput.type = "checkbox";
    priorityInput.id = ("priorityInput" + n);
    priorityInput.addEventListener("change" , (e) => {
        info.classList.toggle("important");
    });
    p.appendChild(priorityInput);

    let d = document.createElement("div");
    d.id = "date";
    let dL = document.createElement("label");
    dL.htmlFor = ("dateInput" + n);
    dL.innerHTML = "due by: "
    d.appendChild(dL);
    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = ("dateInput" + n);
    d.appendChild(dateInput);

    let notes = document.createElement("p");
    notes.id = "notes";
    notes.textContent = "notes:";
    notes.contentEditable = "true";

    info.appendChild(p);
    info.appendChild(d);
    info.appendChild(notes);
    tabContent.appendChild(info);
    tabContainer.appendChild(tabContent);
}

// function formatDate() {
//     let date = document.getElementById("dateInput" + n).value.replace(/-/g, "\/");
// }

function addList(n) {

    let tabContent = document.getElementById("tab-" + n);

    let div = document.createElement("div");
    let addInput = document.createElement("input");
    addInput.type = "text";
    addInput.id = ("addInput-" + n);
    addInput.classList = "addInput";
    addInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            newListItem(e.target.id);
        }
    });
    div.appendChild(addInput);

    let addBtn = document.createElement("button");
    addBtn.type = "submit";
    addBtn.innerHTML = "add"
    addBtn.id = ("addBtn-" + n);
    addBtn.addEventListener("click", (e) => {
        newListItem(e.target.id);
        });
    div.appendChild(addBtn);
    tabContent.appendChild(div);

    let ul = document.createElement("ul");
    ul.id = ("list-" + n)
    ul.classList = "listUl";
    tabContent.appendChild(ul);
    tabContainer.appendChild(tabContent);
}

function addToSidebar(n) {
    
    let sidebarUl = document.getElementById("sidebarUl");

    let li = document.createElement("button");
    li.classList = "tab-btn";
    li.id =  (n);
    li.innerHTML = ("Quest " + n);

    li.addEventListener("click", (e) => {
        openTab(e.target.id); // gets correct "n" value
        });
    sidebarUl.appendChild(li);
    sidebar.appendChild(sidebarUl);
}

// create new li with "add" button

function newListItem(event) {

    let index = event.indexOf("-");
    let n = event.substring(index + 1);

    let li = document.createElement("li");
    let input = document.getElementById("addInput-" + n).value;
    let t = document.createTextNode(input);
    li.appendChild(t);

    if (input === "") {
        alert("You must write something!");
        } else {
        document.getElementById("list-" + n).appendChild(li);
        }

    document.getElementById("addInput-" + n).value = "";

    let span = document.createElement("span");
    span.classList = "close";
    let txt = document.createTextNode("\u00D7");
    span.appendChild(txt);
    span.addEventListener("mouseover", () => {
        li.classList.toggle("hover");
    });
    span.addEventListener("mouseout", () => {
        li.classList.toggle("hover");
    });
    li.appendChild(span);
    
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
        let div = this.parentElement;
        div.style.display = "none";
    }}
}

// append "close" button to each li
let myNodelist = document.getElementsByTagName("li");
var i;
for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.classList = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
    }

// enable close button to hide li
let close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
    }
}

// TAB MANAGEMENT FUNCTIONS

function openTab(n) { 

    // hide all tab content, then display active tab

    let tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
    };
    document.getElementById("tab-" + n).style.display = "block";

    // remove ".active" from all tabs, then make tab n "active"

    let els = document.querySelectorAll(".tab-btn");
    for (i = 0; i < els.length; i++) {
        els[i].classList.remove("active")
    };
    document.getElementById(n).classList.add("active");

    // clear input values when switching between tabs
    
    let addInput = "addInput-" + n;
    document.getElementById(addInput).value = null;

    // manage form

    // if (form.classList.contains("open")) {
    // closeForm();
    // };
};