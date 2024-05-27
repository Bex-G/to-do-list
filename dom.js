import { activateTab } from "./logic";

const sidebar = document.getElementById("sidebar");
const tabContainer = document.getElementById("tabContainer");

let n = 0; // variable used to keep track of unique lists + .tab-btn id numbers

function createInfo(n) {
    let tabContent = document.createElement("div");
    tabContent.classList = "tab-content";
    tabContent.id = ("tab-" + n);
    
    let header = document.createElement("div");
    header.classList = "tab-header";
    let info = document.createElement("div");
    info.classList = "list-info";

    createName(header, n);
    createRemoveBtn(header, n);
    info.appendChild(header);
    createPriority(info, n);
    createDate(info, n);
    createNotes(info, n);
    tabContent.appendChild(info);
    tabContainer.appendChild(tabContent);
}

function createName(header, n) {
    let listName = document.createElement("h1");
    listName.textContent = ("Quest " + n);
    listName.id = ("name" + n);
    listName.contentEditable = "true";
    listName.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            listName.blur();
            if (listName.textContent.length >= 12) {
                listName.textContent.substring(0,12) + "...";
            } if (listName.textContent.length < 1) {
                document.getElementById(n).textContent = "...";
            } else (document.getElementById(n).textContent = listName.textContent);
        }  
    })
    listName.addEventListener("focusout", () => {
        if (listName.textContent.length >= 12) {
            listName.textContent.substring(0,12) + "...";
        } if (listName.textContent.length < 1) {
            document.getElementById(n).textContent = "...";
        } else (document.getElementById(n).textContent = listName.textContent);
    })
    header.appendChild(listName); 
}

function createRemoveBtn(header, n) {
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
}

function createPriority(info, n) {
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
        document.getElementById(n).classList.toggle("important"); // colors tab-btn
        document.getElementById("name" + n).classList.toggle("important"); // colors name header
    });
    p.appendChild(priorityInput);
    info.appendChild(p);
}

function comparator(a, b) { 
    if (a.dataset.date < b.dataset.date) 
        return -1; 
    if (a.dataset.date > b.dataset.date) 
        return 1; 
    return 0; 
} 

function sortByDate() { 
    var dates = 
        document.querySelectorAll("[data-date]"); 
    var datesArray = Array.from(dates); 
    let sorted = datesArray.sort(comparator); 
    sorted.forEach(e => 
        document.querySelector("#sidebarUl"). 
            appendChild(e)); 
} 

function createDate(info, n) {
    let d = document.createElement("div");
    d.id = "date";
    let dL = document.createElement("label");
    dL.htmlFor = ("dateInput" + n);
    dL.innerHTML = "due by: "
    d.appendChild(dL);
    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = ("dateInput" + n);
    dateInput.addEventListener("change", () => {
        document.getElementById(n).setAttribute("data-date", dateInput.value);
        sortByDate();
    });
    d.appendChild(dateInput);
    info.appendChild(d);
}

function createNotes(info, n) {
    let nb = document.createElement("div");
    nb.id = "notebook";
    let nbL = document.createElement("label");
    nbL.id = "notebookLabel";
    nbL.htmlFor = ("notes"  + n);
    nbL.innerHTML = "notes:";
    let notes = document.createElement("textarea");
    notes.id = ("notes"  + n);
    nb.appendChild(nbL);
    nb.appendChild(notes);
    info.appendChild(nb);
}

function createAdd(n) {
    let tabContent = document.getElementById("tab-" + n);

    let div = document.createElement("div");
    div.id = "add";
    let addInput = document.createElement("input");
    addInput.type = "text";
    addInput.id = ("addInput-" + n);
    addInput.classList = "add-input";
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
    addBtn.classList = "add-btn";
    addBtn.addEventListener("click", (e) => {
        newListItem(e.target.id);
        });
    div.appendChild(addBtn);
    tabContent.appendChild(div);

}

function newListItem(e) {

    let index = e.indexOf("-");
    let n = e.substring(index + 1); // makes n value match its given tab.

    let li = document.createElement("li");
    let input = document.getElementById("addInput-" + n).value;
    let t = document.createTextNode(input);
    li.appendChild(t);

    if (input !== "") {
        document.getElementById("list-" + n).appendChild(li);
        document.getElementById("addInput-" + n).value = "";
        createCloseBtn(li);
    }
}

function createCloseBtn(li) {

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

function createList(n) {
    let tabContent = document.getElementById("tab-" + n);

    let ul = document.createElement("ul");
    ul.id = ("list-" + n)
    ul.classList = "list-ul";
    tabContent.appendChild(ul);
    tabContainer.appendChild(tabContent);
}

function addToSidebar(n) {
    
    let sidebarUl = document.getElementById("sidebarUl");

    let li = document.createElement("button");
    li.classList = "tab-btn";
    li.id = n;
    li.innerHTML = ("Quest " + n);

    li.addEventListener("click", (e) => {
        activateTab(e.target.id); // gets correct "n" value
        });
    sidebarUl.appendChild(li);
    sidebar.appendChild(sidebarUl);
}

function addTab() {
    n++
    createInfo(n);
    createAdd(n);
    createList(n);
    addToSidebar(n);
    document.getElementById(n).setAttribute("data-date", null); // make default date = null for sorting purposes
    activateTab(n);
}

export default addTab;


