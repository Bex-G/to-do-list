// content

const content = document.getElementById('content');

const div = document.createElement('div');
div.setAttribute('id', 'div');

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'myInput';
    div.appendChild(input);

    const addBtn = document.createElement('button');
    addBtn.type = 'submit';
    addBtn.innerHTML = 'submit'
    addBtn.addEventListener("click", newListItem);
    div.appendChild(addBtn);

const ul = document.createElement('ul');
ul.id = 'myList'

content.appendChild(div);
content.appendChild(ul);

// functions

function newListItem() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
      } else {
        document.getElementById("myList").appendChild(li);
      }
      document.getElementById("myInput").value = "";
}
