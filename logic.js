class Quest {
    constructor(q, name) {
        this.id = q;
        this._name = name;
    }
        get name() {
        return this._name;
    }
        set name(updatedName) {
        this._name = updatedName;
    }
}

class Tab {
    constructor(t, q, name, priority, date, notes) { // everything but name and id are added after initialization
        this.id = t;
        this.quest = q;
        this._name = name;
        this.priority = priority;
        this.date = date,
        this.notes = notes;
    }
        get name() {
        return this._name;
    }
        set name(updatedName) {
        this._name = updatedName;
    }
}

class List {
    constructor(l, t, content, checked) {
        this.id = l;
        this.tab = t;
        this.content = content;
        this.checked = checked;
    }
}

function removeQuest() { // toggles display and enables user to delete quests
    if (rmQuestBtn.textContent === " - Quests") {
        actionOn();
      } else {
        actionOff();
      }
}

function actionOn() {
    let x = document.querySelectorAll(".x-action");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].classList.add("show")
    }
    let plus = document.querySelectorAll(".plus");
    var i;
    for (i = 0; i < plus.length; i++) {
        plus[i].style.display = "none";
    }
    let remove = document.querySelectorAll(".remove-tab");
    var i;
    for (i = 0; i < remove.length; i++) {
        remove[i].style.display = "none";
    }
    rmQuestBtn.style.backgroundColor = "red";
    rmQuestBtn.style.color = "white";
    rmQuestBtn.textContent = "Finish";
}

function actionOff() {
    rmQuestBtn.textContent = " - Quests";
    let x = document.querySelectorAll(".x-action");
    var i;
    for (i = 0; i < x.length; i++) {
        x[i].classList.remove("show")
    }
    let plus = document.querySelectorAll(".plus");
    var i;
    for (i = 0; i < plus.length; i++) {
        plus[i].style.display = "flex";
    }
    let remove = document.querySelectorAll(".remove-tab");
    var i;
    for (i = 0; i < remove.length; i++) {
        remove[i].style.display = "flex";
    }
    rmQuestBtn.style.backgroundColor = "transparent";
    rmQuestBtn.style.color = "black";
}

function removeActiveTab(quest) { // removes any active tabs from tabContainer display when quests are deleted
    var classes = []; 
    var children = document.getElementById("q" + quest.id).children;
    for (var i = 0, len = children.length ; i < len; i++) {
        classes.push(children[i].classList);
        }
    for (var i = 0, len = classes.length ; i < len; i++) {
        if (classes[i].contains("active")) {
            tabContainer.innerHTML = "";
            }
        }
}

function removeQuestTabs(quest) { // removes all tabs in a deleted quest
    var ids = [];
    var children = document.getElementById("q" + quest.id).children;
    for (var i = 0, len = children.length; i < len; i++) {
        ids.push(children[i].id);
    }
    for (var i = 0, len = ids.length ; i < len; i++) {
        localStorage.removeItem("t" + (ids[i]));
    }
    localStorage.removeItem("q" + quest.id);
    document.getElementById("d" + quest.id).remove();
}

function removeTabLists(tab) {
    var ids = [];
    var children = document.getElementById("list" + tab.id).children;
    for (var i = 0, len = children.length; i < len; i++) {
        localStorage.removeItem("l" + (ids[i]));
    }
    for (var i = 0, len = ids.length ; i < len; i++) {
        localStorage.removeItem("l" + (ids[i]));
    }
    localStorage.removeItem("l" + tab.id);
    document.getElementById("list" + tab.id).remove();
}

function dateComparator(a, b) { // compares existing data-date entries
    if (a.dataset.date < b.dataset.date) 
        return -1; 
    if (a.dataset.date > b.dataset.date) 
        return 1; 
    return 0; 
} 

function sortByDate(quest) { // called whenever a data-date value is added to a tab
    var activeQuest = ".q-" + quest.id;
    var dates = document.querySelectorAll(activeQuest, "[data-date]");
    var datesArray = Array.from(dates); 
    let sorted = datesArray.sort(dateComparator); 
    sorted.forEach(e => 
        document.querySelector("#" + "q" + quest.id). 
        appendChild(e)); 
} 

function activateTab(tab) { 

    // hide all tab content, then display active tab
    let tabContent = document.getElementsByClassName("tab-content");
    var i;
    for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
    };
    document.getElementById("t" + tab.id).style.display = "block";

    // remove ".active" from all tabs, then make tab t "active"
    let els = document.querySelectorAll(".tab");
    var i;
    for (i = 0; i < els.length; i++) {
        els[i].classList.remove("active")
    };
    document.getElementById(tab.id).classList.add("active");

    // clear input values when switching between tabs
    let addInput = "addInput-" + tab.id;
    document.getElementById(addInput).value = null;
};

export { Quest, Tab, List, removeQuest, removeActiveTab, removeQuestTabs, removeTabLists, actionOff, sortByDate, activateTab };