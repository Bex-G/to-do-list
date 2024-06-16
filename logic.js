function removeQuest() {
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

function comparator(a, b) { 
    if (a.dataset.date < b.dataset.date) 
        return -1; 
    if (a.dataset.date > b.dataset.date) 
        return 1; 
    return 0; 
} 

function sortByDate(q) { 
    var activeQuest = ".q-" + q;
    var dates = document.querySelectorAll(activeQuest, "[data-date]");
    var datesArray = Array.from(dates); 
    let sorted = datesArray.sort(comparator); 
    sorted.forEach(e => 
        document.querySelector("#" + "q" + q). 
        appendChild(e)); 
} 

function activateTab(t) { 

    // hide all tab content, then display active tab
    let listContent = document.getElementsByClassName("list-content");
    var i;
    for (i = 0; i < listContent.length; i++) {
    listContent[i].style.display = "none";
    };
    document.getElementById("t" + t).style.display = "block";

    // remove ".active" from all tabs, then make tab t "active"
    let els = document.querySelectorAll(".tab");
    var i;
    for (i = 0; i < els.length; i++) {
        els[i].classList.remove("active")
    };
    document.getElementById(t).classList.add("active");

    // clear input values when switching between tabs
    let addInput = "addInput-" + t;
    document.getElementById(addInput).value = null;
};

export { removeQuest, actionOff, sortByDate, activateTab };
