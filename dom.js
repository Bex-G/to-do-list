import { Quest, Tab, removeActiveTab, removeQuestTabs, actionOff, sortByDate, activateTab } from "./logic";

const sidebar = document.getElementById("sidebar");
const tabContainer = document.getElementById("tabContainer");
const rmQuestBtn = document.getElementById("rmQuestBtn");
rmQuestBtn.textContent = " - Quests";

// STORAGE MANAGEMENT

let q = 0; // tracks quest id numbers
let t = 0; // tracks tab id numbers

window.addEventListener("load", () => {
    if (window.localStorage.length > 0) {
        getLocalQuests();
    }
})

function getLocalQuests() {
    var results = [];
    var i;
    for (i = 0; i < window.localStorage.length; i++) {
    let key = window.localStorage.key(i);
    if (key.slice(0,1) === "q") {
        results.push(JSON.parse(window.localStorage.getItem(key))); // makes array of localStorage items starting with "q"
    }}
    let sorted = results.sort(storageComparator); 
    let last = sorted[sorted. length - 1];
    sorted.forEach(result => {
        let quest = new Quest(result.id, result._name);
        makeDropdown(quest);
        makeArrow(quest);
        makeQName(quest);
        makePlus(quest);
        makeX(quest);
        getLocalTabs(quest);
        q = (last.id); // picks up where localstorage id numbers left off
    })
}

function getLocalTabs(quest) {
    var results = [];
    var i;
    for (i = 0; i < window.localStorage.length; i++) {
    let key = window.localStorage.key(i);
    if (key.slice(0,1) === "t") {
        results.push(JSON.parse(window.localStorage.getItem(key))); // makes array of localStorage items starting with "t"
    }} 
    let sorted = results.sort(storageComparator);
    let last = sorted[sorted. length - 1]; 
        sorted.forEach(result => {
            if (quest.id === result.quest) { // pairs tab objects with their matching quest folders
                let tab = new Tab(result.id, result.quest, result._name);
                makeTab(quest, tab);
                makeInfo(quest, tab);
                makeAdd(tab);
                makeList(tab);
                activateTab(tab);
                t = (last.id); // picks up where localstorage id numbers left off
            }
        }
    )
}

function storageComparator(a, b) {
    if (a.id < b.id) 
    return -1; 
    if (a.id > b.id) 
        return 1; 
    return 0; 
}

// QUEST BUILDER

function addQuest() {
    actionOff(); // toggles removeQuest display when new quest is added
    let questName = prompt("What is your quest?");
        if (questName != null && questName != "") {
            if (questName.length <= 12) {
                q++
                let quest = new Quest(q, questName);
                makeDropdown(quest);
                makeArrow(quest);
                makeQName(quest);
                makePlus(quest);
                makeX(quest);
                localStorage.setItem(("q" + quest.id), JSON.stringify(quest));
            } else {
                alert("Oops! Please choose a name that is fewer than 12 characters long. :)");
            }
        }
}

function makeDropdown(quest) {
    let dropdown = document.createElement("div");
    dropdown.id = ("d" + quest.id);
    dropdown.classList = "dropdown";
    let dHead = document.createElement("div");
    dHead.id = ("dHead" + quest.id);
    dHead.classList = "drop-header";
    let dContent = document.createElement("div");
    dContent.id = ("q" + quest.id);
    dContent.classList.add("drop-content", "show");
    dropdown.appendChild(dHead);
    dropdown.appendChild(dContent);
    sidebar.appendChild(dropdown);
}

function makeArrow(quest) {
    let arrow =  document.createElement("p")
    arrow.id = ("a" + quest.id);
    arrow.classList = "arrow";
    arrow.addEventListener("click", () => {
    let dContent = document.getElementById("q" + quest.id);
        if (dContent.children.length > 0) {
            dContent.classList.toggle("show");
            arrow.classList.toggle("down");
        }
    })
    document.getElementById("dHead" + quest.id).appendChild(arrow);
}

function makeQName(quest) {
    let qName = document.createElement("h3"); 
    qName.textContent = quest.name;
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
        quest.name = qName.textContent;
        localStorage.setItem(("q" + quest.id), JSON.stringify(quest));
    })
    document.getElementById("dHead" + quest.id).appendChild(qName);
}

function makePlus(quest) {
    let div = document.createElement("div");
    div.id = ("action" + quest.id);
    let p = document.createElement("p");
    p.classList = "plus";
    p.textContent = "+";
    p.addEventListener("click", () => {
    let tabName = prompt("What do you want to name your new list?");
    let dContent = document.getElementById("q" + quest.id);
    let arrow = document.getElementById("a" + quest.id);
        if (tabName != null && tabName != "") {
            if (tabName.length <= 26) {
                addTab(quest, tabName);
                dContent.classList.add("show");
                arrow.classList.add("down");
            } else {
                alert("Oops! Please choose a name that is fewer than 26 characters long. :)");
            }
        }
    })
    div.appendChild(p);
    document.getElementById("dHead" + quest.id).appendChild(div);
}

function makeX(quest) { // hidden until btn event toggles display
    let p = document.createElement("p");
    p.classList = "x-action";
    p.textContent = "X";
    p.addEventListener("click", () => {
        let result = confirm("Are you sure you want to delete this quest and all its content? (This can not be undone.)")
        if (result === true) {
            removeActiveTab(quest);
            removeQuestTabs(quest);
        }
        if (sidebar.children.length === 2) {
            actionOff();
        }
    })
    let dropdown = document.getElementById("d" + quest.id);
    p.addEventListener("mouseover", () => {
        let dContent = document.getElementById("q" + quest.id);
        let arrow = document.getElementById("a" + quest.id);
        dropdown.classList.toggle("warning");
        if (dContent.children.length > 0) {
            dContent.classList.add("show");
            arrow.classList.add("down");
        }
    })
    p.addEventListener("mouseout", () => {
        dropdown.classList.toggle("warning");
    })
    document.getElementById("action" + quest.id).appendChild(p);
}

 // TAB + LIST BUILDER

function addTab(quest, tabName) {
    t++
    let tab = new Tab(t, q, tabName);
    localStorage.setItem(("t" + tab.id), JSON.stringify(tab));
    makeTab(quest, tab);
    makeInfo(quest, tab);
    makeAdd(tab);
    makeList(tab);
    activateTab(tab);
}

function makeTab(quest, tab) {
    let activeQuest = document.getElementById("q" + quest.id);
    let div = document.createElement("div");
    div.id = tab.id;
    div.classList.add(("q-" + quest.id), "tab");
    div.setAttribute("data-date", null); // make default date = null for sorting purposes
    let tabBtn = document.createElement("p"); // leave empty for now... fill with tabName value in makeTName();
    tabBtn.id = ("tb" + tab.id);
    tabBtn.classList = "tab-btn";
    div.appendChild(tabBtn);
    activeQuest.appendChild(div);
}

function makeInfo(quest, tab) {
    let tabContent = document.createElement("div");
    tabContent.id = ("t" + tab.id);
    tabContent.classList = "tab-content";
    let header = document.createElement("div");
    header.classList = "tab-header";
    let info = document.createElement("div");
    info.classList = "tab-info";

    makeTName(header, tab);
    makeRemoveBtn(quest, tab);
    info.appendChild(header);
    makePriority(info, tab);
    makeDate(info, quest, tab);
    makeNotes(info, tab);
    tabContent.appendChild(info);
    tabContainer.appendChild(tabContent);
}

function makeTName(header, tab) {
    let tabBtn = document.getElementById("tb" + tab.id);
        if (tab.name.length >= 12) {
            tabBtn.textContent = tab.name.substring(0,12) + "...";
        } else {
            tabBtn.textContent = tab.name;
        }
    let tabHeader = document.createElement("h2");    
    tabHeader.id = ("name" + tab.id);
    tabHeader.textContent = tab.name;
    tabHeader.contentEditable = "true";
    tabHeader.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            tabHeader.blur();
        }
    })
    let maxLength = 26; 
    tabHeader.addEventListener("keydown", (e) => { 
        let textLength = tabHeader.textContent.length; 
        if (textLength >= maxLength && e.key !== "Backspace") { 
            alert("Character limit exceeded!"); 
            tabHeader.blur();
        }
    })
    tabHeader.addEventListener("focusout", () => {
        if (tabHeader.textContent.length >= 12) {
            tabBtn.textContent = tabHeader.textContent.substring(0,12) + "...";
        } else if (tabHeader.textContent.length < 1) {
            tabHeader.textContent = "untitled";
            tabBtn.textContent = "untitled";
        } else {
            tabBtn.textContent = tabHeader.textContent;
        }
        tab.name = tabHeader.textContent;
        localStorage.setItem(("t" + tab.id), JSON.stringify(tab));
    })
    tabBtn.addEventListener("click", () => {
        activateTab(tab);
    })
    header.appendChild(tabHeader); 
}

function makeRemoveBtn(quest, tab) {
    let btn = document.createElement("p");
    btn.classList = "remove-tab";
    let txt = document.createTextNode("\u00D7");
    btn.appendChild(txt);
    btn.addEventListener("click", () => {
    let tabContent = document.getElementById("t" + tab.id);
    let result = confirm("Are you sure you want to delete this list? (This can not be undone.)")
        if (result === true) {
            document.getElementById(tab.id).remove();
            tabContent.remove();
            localStorage.removeItem("t" + tab.id);
        }
    let dContent = document.getElementById("q" + quest.id);
    let arrow = document.getElementById("a" + quest.id);
        if (dContent.children.length < 1) {
            arrow.classList.remove("down");
        }
    })
    document.getElementById(tab.id).appendChild(btn);
}

function makePriority(info, tab) {
    let p = document.createElement("div");
    p.id = "priority";
    let pL = document.createElement("label");
    pL.htmlFor = ("priorityInput" + tab.id);
    pL.textContent = "main quest?"
    p.appendChild(pL);
    let priorityInput = document.createElement("input");
    priorityInput.type = "checkbox";
    priorityInput.id = ("priorityInput" + tab.id);
    priorityInput.addEventListener("change" , () => {
        let header = document.getElementById("name" + tab.id);
        document.getElementById(tab.id).classList.toggle("important");
        header.classList.toggle("important"); // colors name header
        if (priorityInput.checked) {
            tab.priority = "true";
        } else {
            tab.priority = "false";
        }
        localStorage.setItem(("t" + tab.id), JSON.stringify(tab));
    })
    p.appendChild(priorityInput);
    info.appendChild(p);
}

function makeDate(info, quest, tab) {
    let div = document.createElement("div");
    div.id = "date";
    let dL = document.createElement("label");
    dL.htmlFor = ("dateInput" + tab.id);
    dL.textContent = "due by: "
    div.appendChild(dL);
    let dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = ("dateInput" + tab.id);
    dateInput.addEventListener("change", () => {
        document.getElementById(tab.id).setAttribute("data-date", dateInput.value);
        sortByDate(quest);
        tab.date = dateInput.value;
        localStorage.setItem(("t" + tab.id), JSON.stringify(tab));
    })
    div.appendChild(dateInput);
    info.appendChild(div);
}

function makeNotes(info, tab) {
    let nb = document.createElement("div");
    nb.id = "notebook";
    let nbL = document.createElement("label");
    nbL.id = "notebookLabel";
    nbL.htmlFor = ("notes"  + tab.id);
    nbL.textContent = "notes:";
    let notes = document.createElement("textarea");
    notes.id = ("notes"  + tab.id);
    notes.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            notes.blur();
        }
    })
    notes.addEventListener("change", () => {
        tab.notes = notes.value;
        localStorage.setItem(("t" + tab.id), JSON.stringify(tab));
    })
    nb.appendChild(nbL);
    nb.appendChild(notes);
    info.appendChild(nb);
}

function makeAdd(tab) {
    let tabContent = document.getElementById("t" + tab.id);
    let div = document.createElement("div");
    div.id = "add";
    let addInput = document.createElement("input");
    addInput.type = "text";
    addInput.id = ("addInput-" + tab.id);
    addInput.classList = "add-input";
    addInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            newListItem(tab);
        }
    })
    div.appendChild(addInput);

    let addBtn = document.createElement("button");
    addBtn.type = "submit";
    addBtn.textContent = "add"
    addBtn.id = ("addBtn-" + tab.id);
    addBtn.classList = "add-btn";
    addBtn.addEventListener("click", () => {
        newListItem(tab.id);
        })
    div.appendChild(addBtn);
    tabContent.appendChild(div);
}

// LIST ITEM BUILDER

let l = 0; // tracks li id numbers

function newListItem(tab) {
    l++;
    let li = document.createElement("li");
    let liL = document.createElement("label");
    liL.htmlFor = ("li" + l);
    let span = document.createElement("span");
    span.textContent = document.getElementById("addInput-" + tab.id).value;
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = ("li" + l);
    liL.appendChild(checkbox);
    liL.appendChild(span);
    li.appendChild(liL);

    if (span.textContent !== "") {
        document.getElementById("list-" + tab.id).appendChild(li);
        document.getElementById("addInput-" + tab.id).value = "";
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

function makeList(tab) {
    let tabContent = document.getElementById("t" + tab.id);
    let ul = document.createElement("ul");
    ul.id = ("list-" + tab.id)
    ul.classList = "list-ul";
    tabContent.appendChild(ul);
    tabContainer.appendChild(tabContent);
}

export { addQuest };