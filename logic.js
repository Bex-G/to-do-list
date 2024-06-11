function comparator(a, b) { 
    if (a.dataset.date < b.dataset.date) 
        return -1; 
    if (a.dataset.date > b.dataset.date) 
        return 1; 
    return 0; 
} 

function sortByDate(q) { 
    var activeQ = ".q-" + q;
    var dates = document.querySelectorAll(activeQ, "[data-date]");
    var datesArray = Array.from(dates); 
    let sorted = datesArray.sort(comparator); 
    sorted.forEach(e => 
        document.querySelector("#" + "q" + q). 
        appendChild(e)); 
} 

function activateTab(l) { 

    // hide all tab content, then display active tab
    let tabContent = document.getElementsByClassName("tab-content");
    var i;
    for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
    };
    document.getElementById("tab-" + l).style.display = "block";

    // remove ".active" from all tabs, then make tab l "active"
    let els = document.querySelectorAll(".tab-btn");
    var i;
    for (i = 0; i < els.length; i++) {
        els[i].classList.remove("active")
    };
    document.getElementById(l).classList.add("active");

    // clear input values when switching between tabs
    let addInput = "addInput-" + l;
    document.getElementById(addInput).value = null;
};

export { sortByDate, activateTab };
