import { actionOff, sortByDate, activateTab } from "./logic";

const sidebar = document.getElementById("sidebar");
const listContainer = document.getElementById("listContainer");
const rmQuestBtn = document.getElementById("rmQuestBtn");
rmQuestBtn.textContent = " - Quests";

// QUEST BUILDER

let q = 0; // tracks quest (sidebar header) id numbers

function addQuest() {
    let x = document.querySelectorAll(".x-action");
    var i;
    for (i = 0; i < x.length; i++) {
        if (x[i].classList.contains("show")) {
            actionOff(document.getElementById("rmQuestBtn"));
        }
    }
    let questName = prompt("What is your quest?");
        if (questName != null && questName != "") {
            if (questName.length <= 12) {
                q++
                makeDropdown(q);
                makeArrow(q);
                makeQName(questName);
                makePlus(q);
                makeX(q);
            } else {
                alert("Oops! Please choose a name that is fewer than 12 characters long. :)");
            }
        }
}

function makeDropdown(q) {
    let dropdown = document.createElement("div");
    dropdown.id = ("d" + q);
    dropdown.classList = "dropdown";
    let dHead = document.createElement("div");
    dHead.id = ("dHead" + q);
    dHead.classList = "drop-header";
    let dContent = document.createElement("div");
    dContent.id = ("q" + q);
    dContent.classList.add("drop-content", "show");
    dropdown.appendChild(dHead);
    dropdown.appendChild(dContent);
    sidebar.appendChild(dropdown);
}

function makeArrow(q) {
    let arrow =  document.createElement("p")
    arrow.id = ("a" + q);
    arrow.classList = "arrow";
    arrow.addEventListener("click", () => {
    let dContent = document.getElementById("q" + q);
        if (dContent.children.length > 0) {
            dContent.classList.toggle("show");
            arrow.classList.toggle("down");
        }
    })
    document.getElementById("dHead" + q).appendChild(arrow);
}

function makeQName(questName) {
    let qName = document.createElement("h3"); 
    qName.textContent = questName;
    qName.contentEditable = "true";
    let maxLength = 12; 
    let minLength = 1;
    qName.addEventListener("keydown", (e) => { 
        let textLength = qName.textContent.length; 
        if (textLength >= maxLength && e.key !== "Backspace") { 
            alert("Character limit exceeded!");
            qName.blur(); 
        } else if (textLength === (minLength) && e.key === "Backspace") {
            alert("This must be at least 1 character long.")
            qName.blur();
        }
        if (e.key === "Enter") {
            qName.blur();
        }
    })
    qName.addEventListener("focusout", (e) => { 
        if (qName.textContent.length < 1) {
            qName.textContent = "untitled";
        }
    })
    document.getElementById("dHead" + q).appendChild(qName);
}

function makePlus(q) {
    let div = document.createElement("div");
    div.id = ("action" + q);
    let p = document.createElement("p");
    p.classList = "plus";
    p.textContent = "+";
    p.addEventListener("click", () => {
    let listName = prompt("What do you want to name your new list?");
        if (listName != null && listName != "") {
            if (listName.length <= 26) {
                addList(q, listName);
                document.getElementById("q" + q).classList.add("show");
                document.getElementById("a" + q).classList.add("down");
            } else {
                alert("Oops! Please choose a name that is fewer than 26 characters long. :)");
            }
        }
    })
    div.appendChild(p);
    document.getElementById("dHead" + q).appendChild(div);
}

function makeX(q) { // hidden until btn event toggles display
    let p = document.createElement("p");
    p.classList = "x-action";
    p.textContent = "X";
    p.addEventListener("click", () => {
        let result = confirm("Are you sure you want to delete this quest and all its content? (This can not be undone.)")
        if (result === true) {
            document.getElementById("d" + q).remove();
        }
        if (sidebar.children.length === 2) {
            actionOff();
        }
    })
    let dropdown = document.getElementById("d" + q);
    p.addEventListener("mouseover", () => {
        dropdown.classList.toggle("warning");
    })
    p.addEventListener("mouseout", () => {
        dropdown.classList.toggle("warning");
    })
    document.getElementById("action" + q).appendChild(p);
}

 // TAB + LIST BUILDER

let t = 0; // tracks tab id numbers

function addList(q, listName) {
    t++
    makeTab(q, t);
    makeInfo(q, t, listName);
    makeAdd(t);
    makeList(t);
    activateTab(t);
}

function makeTab(q, t) {
    let activeQuest = document.getElementById("q" + q);
    let tab = document.createElement("div");
    tab.id = t;
    tab.classList.add(("q-" + q), "tab");
    tab.setAttribute("data-date", null); // make default date = null for sorting purposes
    let tabBtn = document.createElement("p"); // leave empty for now... fill with listName value in makeLName();
    tabBtn.id = ("tb" + t);
    tabBtn.classList = "tab-btn";
    tab.appendChild(tabBtn);
    activeQuest.appendChild(tab);
}

function makeInfo(q, t, listName) {
    let listContent = document.createElement("div");
    listContent.id = ("t" + t);
    listContent.classList = "list-content";
    let header = document.createElement("div");
    header.classList = "list-header";
    let info = document.createElement("div");
    info.classList = "list-info";

    makeLName(header, t, listName);
    makeRemoveBtn(q, t);
    info.appendChild(header);
    makePriority(info, t);
    makeDate(info, q, t);
    makeNotes(info, t);
    listContent.appendChild(info);
    listContainer.appendChild(listContent);
}

function makeLName(header, t, listName) {
    let tabBtn = document.getElementById("tb" + t);
        if (listName.length >= 12) {
            tabBtn.textContent = listName.substring(0,12) + "...";
        } else {
            tabBtn.textContent = listName;
        }
    let listHeader = document.createElement("h2");    
    listHeader.id = ("name" + t);
    listHeader.textContent = listName;
    listHeader.contentEditable = "true";
    listHeader.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            listHeader.blur();
        }
    })
    listHeader.addEventListener("focusout", () => {
        if (listHeader.textContent.length >= 12) {
            tabBtn.textContent = listHeader.textContent.substring(0,12) + "...";
        } else if (listHeader.textContent.length < 1) {
            listHeader.textContent = "untitled";
            tabBtn.textContent = "untitled";
        } else {
            tabBtn.textContent = listHeader.textContent;
        }
    })
    let maxLength = 26; 
    listHeader.addEventListener("keydown", (e) => { 
        let textLength = listHeader.textContent.length; 
        if (textLength >= maxLength && e.key !== "Backspace") { 
            alert("Character limit exceeded!"); 
            listHeader.blur();
        }
    })
    tabBtn.addEventListener("click", () => {
        activateTab(t);
    })
    header.appendChild(listHeader); 
}

function makeRemoveBtn(q, t) {
    let btn = document.createElement("p");
    btn.classList = "remove-tab";
    let txt = document.createTextNode("\u00D7");
    btn.appendChild(txt);
    btn.addEventListener("click", () => {
    let result = confirm("Are you sure you want to delete this list? (This can not be undone.)")
        if (result === true) {
            document.getElementById("t" + t).remove();
            document.getElementById(t).remove();
        }
    let dContent = document.getElementById("q" + q);
        if (dContent.children.length < 1) {
            document.getElementById("a" + q).classList.remove("down");
        }
    })
    document.getElementById(t).appendChild(btn);
}

function makePriority(info, t) {
    let p = document.createElement("div");
    p.id = "priority";
    let pL = document.createElement("label");
    pL.htmlFor = ("priorityInput" + t);
    pL.textContent = "main quest?"
    p.appendChild(pL);
    let priorityInput = document.createElement("input");
    priorityInput.type = "checkbox";
    priorityInput.id = ("priorityInput" + t);
    priorityInput.addEventListener("change" , () => {
        document.getElementById(t).classList.toggle("important"); // colors tab-btn
        document.getElementById("name" + t).classList.toggle("important"); // colors name header
    })
    p.appendChild(priorityInput);
    info.appendChild(p);
}

function makeDate(info, q, t) {
    let div = document.createElement("div");
    div.id = "date";
    let dL = document.createElement("label");
    dL.htmlFor = ("dateInput" + t);
    dL.textContent = "due by: "
    div.appendChild(dL);
    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = ("dateInput" + t);
    dateInput.addEventListener("change", () => {
        document.getElementById(t).setAttribute("data-date", dateInput.value);
        sortByDate(q);
    })
    div.appendChild(dateInput);
    info.appendChild(div);
}

function makeNotes(info, t) {
    let nb = document.createElement("div");
    nb.id = "notebook";
    let nbL = document.createElement("label");
    nbL.id = "notebookLabel";
    nbL.htmlFor = ("notes"  + t);
    nbL.textContent = "notes:";
    let notes = document.createElement("textarea");
    notes.id = ("notes"  + t);
    nb.appendChild(nbL);
    nb.appendChild(notes);
    info.appendChild(nb);
}

function makeAdd(t) {
    let listContent = document.getElementById("t" + t);
    let div = document.createElement("div");
    div.id = "add";
    let addInput = document.createElement("input");
    addInput.type = "text";
    addInput.id = ("addInput-" + t);
    addInput.classList = "add-input";
    addInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            newListItem(t);
        }
    })
    div.appendChild(addInput);

    let addBtn = document.createElement("button");
    addBtn.type = "submit";
    addBtn.textContent = "add"
    addBtn.id = ("addBtn-" + t);
    addBtn.classList = "add-btn";
    addBtn.addEventListener("click", () => {
        newListItem(t);
        })
    div.appendChild(addBtn);
    listContent.appendChild(div);
}

// LIST ITEM BUILDER

let l = 0; // tracks li id numbers

function newListItem(t) {
    l++;
    let li = document.createElement("li");
    let liL = document.createElement("label");
    liL.htmlFor = ("li" + l);
    let span = document.createElement("span");
    span.textContent = document.getElementById("addInput-" + t).value;
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = ("li" + l);
    liL.appendChild(checkbox);
    liL.appendChild(span);
    li.appendChild(liL);

    if (span.textContent !== "") {
        document.getElementById("list-" + t).appendChild(li);
        document.getElementById("addInput-" + t).value = "";
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
    })
    span.addEventListener("mouseout", () => {
        li.classList.toggle("hover");
    })
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

function makeList(t) {
    let listContent = document.getElementById("t" + t);
    let ul = document.createElement("ul");
    ul.id = ("list-" + t)
    ul.classList = "list-ul";
    listContent.appendChild(ul);
    listContainer.appendChild(listContent);
}

export { addQuest };