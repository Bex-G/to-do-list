import { sortByDate, activateTab } from "./logic";

const sidebar = document.getElementById("sidebar");
const tabContainer = document.getElementById("tabContainer");

let q = 0; // tracks id numbers for quests in sidebar

function addQuest() {
    q++
    createQuest(q);
}

function createQuest(q) {
    let quest = prompt("What is your quest?");
    if (quest != null && quest != "") {
        if (quest.length <= 12) {
            let dropdown = document.createElement("div");
            dropdown.classList = "dropdown";
            let dropHead = document.createElement("div");
            dropHead.id = ("dropHead" + q);
            dropHead.classList = "drop-head";
            let arrow =  document.createElement("p");
            arrow.id = ("a" + q);
            arrow.classList = "arrow";
            let name = document.createElement("h3"); 
            name.innerHTML = quest;
            name.style.textDecoration = "underline";
            let dropContent = document.createElement("div");
            dropContent.id = ("q" + q);
            dropContent.classList.add("drop-content", "show");
            arrow.addEventListener("click", () => {
                if (dropContent.children.length > 0) {
                dropContent.classList.toggle("show");
                arrow.classList.toggle("down");
                }
            })
            dropHead.appendChild(arrow);
            dropHead.appendChild(name);
            dropdown.appendChild(dropHead);
            dropdown.appendChild(dropContent);
            sidebar.appendChild(dropdown);
            createBtn(q);
        } else {
            alert("Oops! Please choose a name that is fewer than 12 characters long. :)");
        }
    }
}

function createBtn(q) {
    let div = document.createElement("div");
    let btn = document.createElement("p");
    btn.id = ("btn-" + q);
    btn.innerHTML = "+";
    btn.addEventListener("click", (e) => {
        let list = prompt("What do you want to name your new list?");
        if (list != null && list != "") {
            addList(q, list);
            document.getElementById("q" + q).classList.add("show");
            document.getElementById("a" + q).classList.add("down");
        }
    })
    div.appendChild(btn);
    document.getElementById("dropHead" + q).appendChild(div);
}


let l = 0; // tracks unique lists + .tab-btn id numbers

function addList(q, list) { // gets appropriate quest number
    l++
    addToSidebar(q, l, list);
    createInfo(q, l, list);
    createAdd(l);
    createList(l);
    activateTab(l);
}

function addToSidebar(q, l, list) {
    let div = document.getElementById("q" + q);
    let li = document.createElement("button");
    li.id = l;
    li.classList.add(("q-" + q), "tab-btn");
    li.setAttribute("data-date", null); // make default date = null for sorting purposes
    let txt = document.createTextNode(list);
    txt.id = ("tabTxt" + l);
    li.addEventListener("click", (e) => {
        activateTab(e.target.id); // gets correct "l" value
        });
    li.appendChild(txt);
    div.appendChild(li);
}

function createInfo(q, l, list) {
    let tabContent = document.createElement("div");
    tabContent.id = ("tab-" + l);
    tabContent.classList = "tab-content";
    
    let header = document.createElement("div");
    header.classList = "tab-header";
    let info = document.createElement("div");
    info.classList = "list-info";

    createName(header, l, list);
    createRemoveBtn(l);
    info.appendChild(header);
    createPriority(info, l);
    createDate(info, q, l);
    createNotes(info, l);
    tabContent.appendChild(info);
    tabContainer.appendChild(tabContent);
}

function createName(header, l, list) {
    let tabBtn = document.getElementById(l);
    if (list.length >= 12) {
        document.getElementById(l).textContent = list.substring(0,12) + "...";
    } else {
        document.getElementById(l).textContent = list;
    }
    let listName = document.createElement("h2");    
    listName.id = ("name" + l);
    listName.textContent = list;
    listName.contentEditable = "true";
    listName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        listName.blur();
        if (listName.textContent.length >= 12) {
            tabBtn.textContent = listName.textContent.substring(0,12) + "...";
            createRemoveBtn(l);
        } else if (listName.textContent.length < 1) {
            tabBtn.textContent = "...";
            createRemoveBtn(l);
        } else {
            tabBtn.textContent = listName.textContent;
            createRemoveBtn(l);
        }}  
    })
    listName.addEventListener("focusout", () => {
        if (listName.textContent.length >= 12) {
            tabBtn.textContent = listName.textContent.substring(0,12) + "...";
            createRemoveBtn(l);
        } else if (listName.textContent.length < 1) {
            tabBtn.textContent = "...";
            createRemoveBtn(l);
        } else {
            tabBtn.textContent = listName.textContent;
            createRemoveBtn(l);
        }}  
    )
    header.appendChild(listName); 
}

function createRemoveBtn(l) {
    let removeBtn = document.createElement("p");
    removeBtn.id = "removeBtn";
    let txt = document.createTextNode("\u00D7");
    removeBtn.appendChild(txt);
    removeBtn.addEventListener("click", () => {
        let result = confirm("Are you sure you want to delete this list? (This can not be undone.)")
        if (result === true) {
        document.getElementById("tab-" + l).remove();
        document.getElementById(l).remove();
        }
    });
    document.getElementById(l).appendChild(removeBtn);
}


function createPriority(info, l) {
    let p = document.createElement("div");
    p.id = "priority";
    let pL = document.createElement("label");
    pL.htmlFor = ("priorityInput" + l);
    pL.innerHTML = "main quest?"
    p.appendChild(pL);
    let priorityInput = document.createElement("input");
    priorityInput.type = "checkbox";
    priorityInput.id = ("priorityInput" + l);
    priorityInput.addEventListener("change" , (e) => {
        document.getElementById(l).classList.toggle("important"); // colors tab-btn
        document.getElementById("name" + l).classList.toggle("important"); // colors name header
    });
    p.appendChild(priorityInput);
    info.appendChild(p);
}

function createDate(info, q, l) {
    let d = document.createElement("div");
    d.id = "date";
    let dL = document.createElement("label");
    dL.htmlFor = ("dateInput" + l);
    dL.innerHTML = "due by: "
    d.appendChild(dL);
    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = ("dateInput" + l);
    dateInput.addEventListener("change", () => {
        document.getElementById(l).setAttribute("data-date", dateInput.value);
        sortByDate(q);
    });
    d.appendChild(dateInput);
    info.appendChild(d);
}

function createNotes(info, l) {
    let nb = document.createElement("div");
    nb.id = "notebook";
    let nbL = document.createElement("label");
    nbL.id = "notebookLabel";
    nbL.htmlFor = ("notes"  + l);
    nbL.innerHTML = "notes:";
    let notes = document.createElement("textarea");
    notes.id = ("notes"  + l);
    nb.appendChild(nbL);
    nb.appendChild(notes);
    info.appendChild(nb);
}

function createAdd(l) {
    let tabContent = document.getElementById("tab-" + l);
    let div = document.createElement("div");
    div.id = "add";
    let addInput = document.createElement("input");
    addInput.type = "text";
    addInput.id = ("addInput-" + l);
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
    addBtn.id = ("addBtn-" + l);
    addBtn.classList = "add-btn";
    addBtn.addEventListener("click", (e) => {
        newListItem(e.target.id);
        });
    div.appendChild(addBtn);
    tabContent.appendChild(div);

}

let liCounter = 0; // tracks li id numbers

function newListItem(e) {
    let index = e.indexOf("-");
    let l = e.substring(index + 1); // makes l value match the active tab's input.
    liCounter++;

    let li = document.createElement("li");
    let liL = document.createElement("label");
    liL.htmlFor = ("li" + liCounter);
    let span = document.createElement("span");
    span.innerHTML = document.getElementById("addInput-" + l).value;
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = ("li" + liCounter);
    liL.appendChild(checkbox);
    liL.appendChild(span);
    li.appendChild(liL);

    if (span.innerHTML !== "") {
        document.getElementById("list-" + l).appendChild(li);
        document.getElementById("addInput-" + l).value = "";
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

function createList(l) {
    let tabContent = document.getElementById("tab-" + l);
    let ul = document.createElement("ul");
    ul.id = ("list-" + l)
    ul.classList = "list-ul";
    tabContent.appendChild(ul);
    tabContainer.appendChild(tabContent);
}

export { addQuest };