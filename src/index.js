// Create content structure

const content = document.getElementById('content');

const div = document.createElement('div');
div.id = 'div';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'myInput';
    div.appendChild(input);

    const addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.innerHTML = 'add'
    addBtn.addEventListener("click", newListItem);
    div.appendChild(addBtn);

const ul = document.createElement('ul');
ul.id = 'myList'

content.appendChild(div);
content.appendChild(ul);

// Create a "close" button and append it to each list item
let myNodelist = document.getElementsByTagName("li");
for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
    }

// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
    let div = this.parentElement;
    div.style.display = "none";
    }
}

// Create a new list item when clicking on the "Add" button

function newListItem() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("myInput").value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
      } else {
        document.getElementById("myList").appendChild(li);
      }
      document.getElementById("myInput").value = "";

      let span = document.createElement("span");
      let txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);
    
      for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
          let div = this.parentElement;
          div.style.display = "none";
        }
    }
}
