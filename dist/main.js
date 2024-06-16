(()=>{"use strict";function e(e,t){return e.dataset.date<t.dataset.date?-1:e.dataset.date>t.dataset.date?1:0}function t(e){let t=document.getElementsByClassName("list-content");for(d=0;d<t.length;d++)t[d].style.display="none";document.getElementById("t"+e).style.display="block";let n=document.querySelectorAll(".tab");var d;for(d=0;d<n.length;d++)n[d].classList.remove("active");document.getElementById(e).classList.add("active");let l="addInput-"+e;document.getElementById(l).value=null}const n=document.getElementById("sidebar"),d=document.getElementById("listContainer");let l=0;let a=0,o=0;function c(e){o++;let t=document.createElement("li"),n=document.createElement("label");n.htmlFor="li"+o;let d=document.createElement("span");d.textContent=document.getElementById("addInput-"+e).value;let l=document.createElement("input");l.type="checkbox",l.id="li"+o,n.appendChild(l),n.appendChild(d),t.appendChild(n),""!==d.textContent&&(document.getElementById("list-"+e).appendChild(t),document.getElementById("addInput-"+e).value="",function(e){let t=document.createElement("span");t.classList="close";let n=document.createTextNode("×");for(t.appendChild(n),t.addEventListener("mouseover",(()=>{e.classList.toggle("hover")})),t.addEventListener("mouseout",(()=>{e.classList.toggle("hover")})),e.appendChild(t),m=0;m<s.length;m++)s[m].onclick=function(){this.parentElement.style.display="none"}}(t))}let i=document.getElementsByTagName("li");for(m=0;m<i.length;m++){let e=document.createElement("span"),t=document.createTextNode("×");e.classList="close",e.appendChild(t),i[m].appendChild(e)}let s=document.getElementsByClassName("close");var m;for(m=0;m<s.length;m++)s[m].onclick=function(){this.parentElement.style.display="none"};document.getElementById("newFolderBtn").addEventListener("click",(()=>{!function(){let o=prompt("What is your quest?");null!=o&&""!=o&&(o.length<=12?(l++,function(e,t){let d=document.createElement("div");d.classList="dropdown";let l=document.createElement("div");l.id="dHead"+e,l.classList="drop-header";let a=document.createElement("p");a.id="a"+e,a.classList="arrow",a.addEventListener("click",(()=>{c.children.length>0&&(c.classList.toggle("show"),a.classList.toggle("down"))}));let o=document.createElement("h3");o.textContent=t,o.style.textDecoration="underline",o.contentEditable="true",o.addEventListener("keydown",(e=>{let t=o.textContent.length;t>=12&&"Backspace"!==e.key?(alert("Character limit exceeded!"),o.blur()):1===t&&"Backspace"===e.key&&(alert("This must be at least 1 character long."),o.blur()),"Enter"===e.key&&o.blur()})),o.addEventListener("focusout",(e=>{o.textContent.length<1&&(o.textContent="untitled")}));let c=document.createElement("div");c.id="q"+e,c.classList.add("drop-content","show"),l.appendChild(a),l.appendChild(o),d.appendChild(l),d.appendChild(c),n.appendChild(d)}(l,o),function(n){let l=document.createElement("div"),o=document.createElement("p");o.textContent="+",o.addEventListener("click",(()=>{let l=prompt("What do you want to name your new list?");null!=l&&""!=l&&(l.length<=26?(function(n,l){a++,function(e,t){let n=document.getElementById("q"+e),d=document.createElement("div");d.id=t,d.classList.add("q-"+e,"tab"),d.setAttribute("data-date",null);let l=document.createElement("p");l.id="tb"+t,l.classList="tab-btn",d.appendChild(l),n.appendChild(d)}(n,a),function(n,l,a){let o=document.createElement("div");o.id="t"+l,o.classList="list-content";let c=document.createElement("div");c.classList="list-header";let i=document.createElement("div");i.classList="list-info",function(e,n,d){let l=document.getElementById("tb"+n);d.length>=12?l.textContent=d.substring(0,12)+"...":l.textContent=d;let a=document.createElement("h2");a.id="name"+n,a.textContent=d,a.contentEditable="true",a.addEventListener("keydown",(e=>{"Enter"===e.key&&a.blur()})),a.addEventListener("focusout",(()=>{a.textContent.length>=12?l.textContent=a.textContent.substring(0,12)+"...":a.textContent.length<1?(a.textContent="untitled",l.textContent="untitled"):l.textContent=a.textContent})),a.addEventListener("keydown",(e=>{a.textContent.length>=26&&"Backspace"!==e.key&&(alert("Character limit exceeded!"),a.blur())})),l.addEventListener("click",(()=>{t(n)})),e.appendChild(a)}(c,l,a),function(e,t){let n=document.createElement("p"),d=document.createTextNode("×");n.appendChild(d),n.addEventListener("click",(()=>{!0===confirm("Are you sure you want to delete this list? (This can not be undone.)")&&(document.getElementById("t"+t).remove(),document.getElementById(t).remove()),document.getElementById("q"+e).children.length<1&&document.getElementById("a"+e).classList.remove("down")})),document.getElementById(t).appendChild(n)}(n,l),i.appendChild(c),function(e,t){let n=document.createElement("div");n.id="priority";let d=document.createElement("label");d.htmlFor="priorityInput"+t,d.textContent="main quest?",n.appendChild(d);let l=document.createElement("input");l.type="checkbox",l.id="priorityInput"+t,l.addEventListener("change",(()=>{document.getElementById(t).classList.toggle("important"),document.getElementById("name"+t).classList.toggle("important")})),n.appendChild(l),e.appendChild(n)}(i,l),function(t,n,d){let l=document.createElement("div");l.id="date";let a=document.createElement("label");a.htmlFor="dateInput"+d,a.textContent="due by: ",l.appendChild(a);let o=document.createElement("input");o.type="date",o.id="dateInput"+d,o.addEventListener("change",(()=>{document.getElementById(d).setAttribute("data-date",o.value),function(t){var n=".q-"+t,d=document.querySelectorAll(n,"[data-date]");Array.from(d).sort(e).forEach((e=>document.querySelector("#q"+t).appendChild(e)))}(n)})),l.appendChild(o),t.appendChild(l)}(i,n,l),function(e,t){let n=document.createElement("div");n.id="notebook";let d=document.createElement("label");d.id="notebookLabel",d.htmlFor="notes"+t,d.textContent="notes:";let l=document.createElement("textarea");l.id="notes"+t,n.appendChild(d),n.appendChild(l),e.appendChild(n)}(i,l),o.appendChild(i),d.appendChild(o)}(n,a,l),function(e){let t=document.getElementById("t"+e),n=document.createElement("div");n.id="add";let d=document.createElement("input");d.type="text",d.id="addInput-"+e,d.classList="add-input",d.addEventListener("keydown",(t=>{"Enter"===t.key&&c(e)})),n.appendChild(d);let l=document.createElement("button");l.type="submit",l.textContent="add",l.id="addBtn-"+e,l.classList="add-btn",l.addEventListener("click",(()=>{c(e)})),n.appendChild(l),t.appendChild(n)}(a),function(e){let t=document.getElementById("t"+e),n=document.createElement("ul");n.id="list-"+e,n.classList="list-ul",t.appendChild(n),d.appendChild(t)}(a),t(a)}(n,l),document.getElementById("q"+n).classList.add("show"),document.getElementById("a"+n).classList.add("down")):alert("Oops! Please choose a name that is fewer than 26 characters long. :)"))})),l.appendChild(o),document.getElementById("dHead"+n).appendChild(l)}(l)):alert("Oops! Please choose a name that is fewer than 12 characters long. :)"))}()}))})();