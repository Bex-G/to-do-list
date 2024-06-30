import { Quest, Tab, removeActiveTab, removeQuestTabs, removeTabLists, actionOff, sortByDate, activateTab, List } from "./logic";

const sidebar = document.getElementById("sidebar");
const tabContainer = document.getElementById("tabContainer");

let q = 0; // tracks quest id numbers
let t = 0; // tracks tab id numbers
let l = 0; //tracks list id numbers

// // STORAGE MANAGEMENT

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
    let last = sorted[sorted.length - 1];
    sorted.forEach(result => {
        let quest = new Quest(result.id, result._name);
        makeDropdown(quest);
        makeArrow(quest);
        makeQName(quest);
        makePlus(quest);
        makeX(quest);
        getLocalTabs(quest); // sends quest to locally-stored tabs to associate the two
        q = (last.id); // picks up where localstorage id numbers left off
    })
}

function getLocalTabs(quest) {
    var results = [];
    var i;
    for (i = 0; i < window.localStorage.length; i++) {
    let key = window.localStorage.key(i);
    if (key.slice(0,1) === "t") {
        results.push(JSON.parse(window.localStorage.getItem(key)));
    }} 
    let sorted = results.sort(storageComparator);
    let last = sorted[sorted.length - 1]; 
        sorted.forEach(result => {
            if (quest.id === result.quest) {
                let tab = new Tab(result.id, result.quest, result._name, result.priority, result.date, result.notes);
                makeTab(quest, tab);
                makeInfo(quest, tab);
                makeAdd(tab);
                makeListContainer(tab);
                t = (last.id);
                getTabContent(quest, tab);
                document.getElementById("a" + quest.id).classList.add("down");
                getListContent(tab);
            }
        }
    )
}

function getTabContent(quest, tab) {
    if (tab.priority === "true") {
        document.getElementById(tab.id).classList.toggle("important");
        document.getElementById("priorityInput" + tab.id).checked = true;
    }
    if (tab.date != undefined) {
    document.getElementById(tab.id).setAttribute("data-date", tab.date);
    sortByDate(quest);
    document.getElementById("dateInput" + tab.id).value = tab.date;
    }
    if (tab.notes != undefined) {
    document.getElementById("notes" + tab.id).value = tab.notes;
    }
}

function getListContent(tab) {
    var results = [];
    var i;
    for (i = 0; i < window.localStorage.length; i++) {
    let key = window.localStorage.key(i);
    if (key.slice(0,1) === "l") {
        results.push(JSON.parse(window.localStorage.getItem(key)));
    }}
    let sorted = results.sort(storageComparator);
    let last = sorted[sorted.length - 1]; 
    sorted.forEach(result => {
        if (tab.id === result.tab) {
            let list = new List(result.id, result.tab, result.content);
            makeList(tab, list);
            l = (last.id);
            if (result.checked === "true") {
                document.getElementById("li" + list.id).checked = true;
            }
    }})
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
            if (questName.length <= 17) {
                q++
                let quest = new Quest(q, questName);
                makeDropdown(quest);
                makeArrow(quest);
                makeQName(quest);
                makePlus(quest);
                makeX(quest);
                localStorage.setItem(("q" + quest.id), JSON.stringify(quest));
            } else {
                alert("Oops! Please choose a name that is fewer than 17 characters long. :)");
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
    let qName = document.createElement("p"); 
    qName.textContent = quest.name;
    qName.contentEditable = "true";
    let maxLength = 17; 
    let minLength = 1;
    qName.addEventListener("keydown", (e) => { 
        let textLength = qName.textContent.length; 
        if (textLength >= maxLength && e.key !== "Backspace") { 
            alert("Character limit exceeded!");
            qName.blur(); 
        } else if (textLength === (minLength) && e.key === "Backspace") {
            alert("This must be at least 1 character long.")
            qName.textContent = "untitled";
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
            if (tabName.length <= 30) {
                addTab(quest, tabName);
                dContent.classList.add("show");
                arrow.classList.add("down");
            } else {
                alert("Oops! Please choose a name that is fewer than 30 characters long. :)");
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

 // TAB BUILDER

function addTab(quest, tabName) {
    t++
    let tab = new Tab(t, quest.id, tabName);
    localStorage.setItem(("t" + tab.id), JSON.stringify(tab));
    makeTab(quest, tab);
    makeInfo(quest, tab);
    makeAdd(tab);
    makeListContainer(tab);
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
    let left = document.createElement("div");
    let right = document.createElement("div");

    makeTName(header, tab);
    makeRemoveBtn(quest, tab);
    tabContent.appendChild(header);
    makePriority(left, tab);
    makeDate(left, quest, tab);
    makeNotes(right, tab);
    info.appendChild(left);
    info.appendChild(right);
    tabContent.appendChild(info);
    tabContainer.appendChild(tabContent);
}

function makeTName(header, tab) {
    let tabBtn = document.getElementById("tb" + tab.id);
        if (tab.name.length > 22) {
            tabBtn.textContent = tab.name.substring(0,22) + "...";
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
    let maxLength = 30; 
    tabHeader.addEventListener("keydown", (e) => { 
        let textLength = tabHeader.textContent.length; 
        if (textLength >= maxLength && e.key !== "Backspace") { 
            alert("Character limit exceeded!"); 
            tabHeader.blur();
        }
    })
    tabHeader.addEventListener("focusout", () => {
        if (tabHeader.textContent.length > 22) {
            tabBtn.textContent = tabHeader.textContent.substring(0,22) + "...";
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
    let txt = document.createElement("p");
    txt.textContent = "X";
    txt.addEventListener("mouseover", () => {
        txt.style.color = "red";
    })
    txt.addEventListener("mouseout", () => {
        txt.style.color = "white";
    })
    btn.appendChild(txt);
    btn.addEventListener("click", () => {
    let tabContent = document.getElementById("t" + tab.id);
    let result = confirm("Are you sure you want to delete this list? (This can not be undone.)")
        if (result === true) {
            removeTabLists(tab);
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

function makePriority(left, tab) {
    let p = document.createElement("div");
    p.id = "priority";
    let pL = document.createElement("label");
    pL.htmlFor = ("priorityInput" + tab.id);
    pL.textContent = "main quest?"
    p.appendChild(pL);
    let priorityInput = document.createElement("input");
    priorityInput.type = "checkbox";
    priorityInput.id = ("priorityInput" + tab.id);
    priorityInput.addEventListener("change", () => {
        document.getElementById(tab.id).classList.toggle("important");
        var isChecked = priorityInput.checked;
        if (isChecked === true) {
            tab.priority = "true";
        } else {
            tab.priority = "false";
        }
        localStorage.setItem(("t" + tab.id), JSON.stringify(tab));
    })
    p.appendChild(priorityInput);
    left.appendChild(p);
}

function makeDate(left, quest, tab) {
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
    left.appendChild(div);
}

function makeNotes(right, tab) {
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
    right.appendChild(nb);
}

function makeAdd(tab) {
    let tabContent = document.getElementById("t" + tab.id);
    let div = document.createElement("div");
    div.id = "add";
    var addInput = document.createElement("input");
    addInput.type = "text";
    addInput.id = ("addInput-" + tab.id);
    addInput.classList = "add-input";
    addInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && addInput.value != "") {
            l++;
            let list = new List(l, tab.id, addInput.value);
            localStorage.setItem(("l" + list.id), JSON.stringify(list));
            makeList(tab, list);
            addInput.value = "";
        }
    })
    div.appendChild(addInput);

    let addBtn = document.createElement("button");
    addBtn.type = "submit";
    addBtn.textContent = "add"
    addBtn.id = ("addBtn-" + tab.id);
    addBtn.classList = "add-btn";
    addBtn.addEventListener("click", () => {
        if (addInput.value != "") {
            l++;
            let list = new List(l, tab.id, addInput.value);
            localStorage.setItem(("l" + list.id), JSON.stringify(list));
            makeList(tab, list);
            addInput.value = "";
            }
        })
    div.appendChild(addBtn);
    tabContent.appendChild(div);
}

function makeListContainer(tab) {
    let tabContent = document.getElementById("t" + tab.id);
    let div = document.createElement("div");
    div.id = ("list" + tab.id)
    div.classList = "ul";
    tabContent.appendChild(div);
    tabContainer.appendChild(tabContent);
}

// LIST BUILDER

function makeList(tab, list) {
    let li = document.createElement("li");
    li.id = ("l" + list.id);
    let liL = document.createElement("label");
    liL.htmlFor = ("li" + list.id);
    let span = document.createElement("span");
    span.textContent = list.content;
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = ("li" + list.id);
    checkbox.addEventListener("change", () => {
        var isChecked = checkbox.checked;
        if (isChecked === true) {
            list.checked = "true";
        } else {
            list.checked = "false";
        }
        localStorage.setItem(("l" + list.id), JSON.stringify(list));
    })
    liL.appendChild(checkbox);
    liL.appendChild(span);
    li.appendChild(liL);
    document.getElementById("list" + tab.id).appendChild(li);
    createCloseBtn(list, li);
}

function createCloseBtn(list, li) {
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
    span.addEventListener("click", ()  => {
        li.remove();
        localStorage.removeItem("l" + list.id);
    })
    li.appendChild(span);
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

export { addQuest };