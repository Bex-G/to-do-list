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

function activateTab(n) { 

    // hide all tab content, then display active tab
    let tabContent = document.getElementsByClassName("tab-content");
    var i;
    for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
    };
    document.getElementById("tab-" + n).style.display = "block";

    // remove ".active" from all tabs, then make tab n "active"
    let els = document.querySelectorAll(".tab-btn");
    var i;
    for (i = 0; i < els.length; i++) {
        els[i].classList.remove("active")
    };
    document.getElementById(n).classList.add("active");

    // clear input values when switching between tabs
    let addInput = "addInput-" + n;
    document.getElementById(addInput).value = null;
};

export { sortByDate, activateTab };
