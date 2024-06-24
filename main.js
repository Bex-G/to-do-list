(()=>{"use strict";class e{constructor(e,t){this.id=e,this._name=t}get name(){return this._name}set name(e){this._name=e}}class t{constructor(e,t,n,d,l,a){this.id=e,this.quest=t,this._name=n,this.priority=d,this.date=l,this.notes=a}get name(){return this._name}set name(e){this._name=e}}function n(){rmQuestBtn.textContent=" - Quests";let e=document.querySelectorAll(".x-action");for(d=0;d<e.length;d++)e[d].classList.remove("show");let t=document.querySelectorAll(".plus");for(d=0;d<t.length;d++)t[d].style.display="flex";let n=document.querySelectorAll(".remove-tab");var d;for(d=0;d<n.length;d++)n[d].style.display="flex";rmQuestBtn.style.backgroundColor="transparent",rmQuestBtn.style.color="black"}function d(e,t){return e.dataset.date<t.dataset.date?-1:e.dataset.date>t.dataset.date?1:0}function l(e){var t=".q-"+e.id,n=document.querySelectorAll(t,"[data-date]");Array.from(n).sort(d).forEach((t=>document.querySelector("#q"+e.id).appendChild(t)))}function a(e){let t=document.getElementsByClassName("tab-content");for(d=0;d<t.length;d++)t[d].style.display="none";document.getElementById("t"+e.id).style.display="block";let n=document.querySelectorAll(".tab");var d;for(d=0;d<n.length;d++)n[d].classList.remove("active");document.getElementById(e.id).classList.add("active");let l="addInput-"+e.id;document.getElementById(l).value=null}const i=document.getElementById("sidebar"),o=document.getElementById("tabContainer");document.getElementById("rmQuestBtn").textContent=" - Quests";let c=0,s=0;function r(e,t){return e.id<t.id?-1:e.id>t.id?1:0}function m(e){let t=document.createElement("div");t.id="d"+e.id,t.classList="dropdown";let n=document.createElement("div");n.id="dHead"+e.id,n.classList="drop-header";let d=document.createElement("div");d.id="q"+e.id,d.classList.add("drop-content","show"),t.appendChild(n),t.appendChild(d),i.appendChild(t)}function u(e){let t=document.createElement("p");t.id="a"+e.id,t.classList="arrow",t.addEventListener("click",(()=>{let n=document.getElementById("q"+e.id);n.children.length>0&&(n.classList.toggle("show"),t.classList.toggle("down"))})),document.getElementById("dHead"+e.id).appendChild(t)}function p(e){let t=document.createElement("h3");t.textContent=e.name,t.contentEditable="true",t.addEventListener("keydown",(e=>{let n=t.textContent.length;n>=12&&"Backspace"!==e.key?(alert("Character limit exceeded!"),t.blur()):1===n&&"Backspace"===e.key&&(alert("This must be at least 1 character long."),t.blur()),"Enter"===e.key&&t.blur()})),t.addEventListener("focusout",(n=>{t.textContent.length<1&&(t.textContent="untitled"),e.name=t.textContent,localStorage.setItem("q"+e.id,JSON.stringify(e))})),document.getElementById("dHead"+e.id).appendChild(t)}function h(e){let n=document.createElement("div");n.id="action"+e.id;let d=document.createElement("p");d.classList="plus",d.textContent="+",d.addEventListener("click",(()=>{let n=prompt("What do you want to name your new list?"),d=document.getElementById("q"+e.id),l=document.getElementById("a"+e.id);null!=n&&""!=n&&(n.length<=26?(function(e,n){s++;let d=new t(s,e.id,n);localStorage.setItem("t"+d.id,JSON.stringify(d)),y(e,d),E(e,d),C(d),b(d),a(d)}(e,n),d.classList.add("show"),l.classList.add("down")):alert("Oops! Please choose a name that is fewer than 26 characters long. :)"))})),n.appendChild(d),document.getElementById("dHead"+e.id).appendChild(n)}function g(e){let t=document.createElement("p");t.classList="x-action",t.textContent="X",t.addEventListener("click",(()=>{!0===confirm("Are you sure you want to delete this quest and all its content? (This can not be undone.)")&&(function(e){for(var t=[],n=document.getElementById("q"+e.id).children,d=0,l=n.length;d<l;d++)t.push(n[d].classList);for(d=0,l=t.length;d<l;d++)t[d].contains("active")&&(tabContainer.innerHTML="")}(e),function(e){for(var t=[],n=document.getElementById("q"+e.id).children,d=0,l=n.length;d<l;d++)t.push(n[d].id);for(d=0,l=t.length;d<l;d++)localStorage.removeItem("t"+t[d]);localStorage.removeItem("q"+e.id),document.getElementById("d"+e.id).remove()}(e)),2===i.children.length&&n()}));let d=document.getElementById("d"+e.id);t.addEventListener("mouseover",(()=>{let t=document.getElementById("q"+e.id),n=document.getElementById("a"+e.id);d.classList.toggle("warning"),t.children.length>0&&(t.classList.add("show"),n.classList.add("down"))})),t.addEventListener("mouseout",(()=>{d.classList.toggle("warning")})),document.getElementById("action"+e.id).appendChild(t)}function y(e,t){let n=document.getElementById("q"+e.id),d=document.createElement("div");d.id=t.id,d.classList.add("q-"+e.id,"tab"),d.setAttribute("data-date",null);let l=document.createElement("p");l.id="tb"+t.id,l.classList="tab-btn",d.appendChild(l),n.appendChild(d)}function E(e,t){let n=document.createElement("div");n.id="t"+t.id,n.classList="tab-content";let d=document.createElement("div");d.classList="tab-header";let i=document.createElement("div");i.classList="tab-info",function(e,t){let n=document.getElementById("tb"+t.id);t.name.length>=12?n.textContent=t.name.substring(0,12)+"...":n.textContent=t.name;let d=document.createElement("h2");d.id="name"+t.id,d.textContent=t.name,d.contentEditable="true",d.addEventListener("keydown",(e=>{"Enter"===e.key&&d.blur()}));d.addEventListener("keydown",(e=>{d.textContent.length>=26&&"Backspace"!==e.key&&(alert("Character limit exceeded!"),d.blur())})),d.addEventListener("focusout",(()=>{d.textContent.length>=12?n.textContent=d.textContent.substring(0,12)+"...":d.textContent.length<1?(d.textContent="untitled",n.textContent="untitled"):n.textContent=d.textContent,t.name=d.textContent,localStorage.setItem("t"+t.id,JSON.stringify(t))})),n.addEventListener("click",(()=>{a(t)})),e.appendChild(d)}(d,t),function(e,t){let n=document.createElement("p");n.classList="remove-tab";let d=document.createTextNode("×");n.appendChild(d),n.addEventListener("click",(()=>{let n=document.getElementById("t"+t.id);!0===confirm("Are you sure you want to delete this list? (This can not be undone.)")&&(document.getElementById(t.id).remove(),n.remove(),localStorage.removeItem("t"+t.id));let d=document.getElementById("q"+e.id),l=document.getElementById("a"+e.id);d.children.length<1&&l.classList.remove("down")})),document.getElementById(t.id).appendChild(n)}(e,t),i.appendChild(d),function(e,t){let n=document.createElement("div");n.id="priority";let d=document.createElement("label");d.htmlFor="priorityInput"+t.id,d.textContent="main quest?",n.appendChild(d);let l=document.createElement("input");l.type="checkbox",l.id="priorityInput"+t.id,l.addEventListener("change",(()=>{document.getElementById(t.id).classList.toggle("important");var e=l.checked;t.priority=!0===e?"true":"false",localStorage.setItem("t"+t.id,JSON.stringify(t))})),n.appendChild(l),e.appendChild(n)}(i,t),function(e,t,n){let d=document.createElement("div");d.id="date";let a=document.createElement("label");a.htmlFor="dateInput"+n.id,a.textContent="due by: ",d.appendChild(a);let i=document.createElement("input");i.type="date",i.id="dateInput"+n.id,i.addEventListener("change",(()=>{document.getElementById(n.id).setAttribute("data-date",i.value),l(t),n.date=i.value,localStorage.setItem("t"+n.id,JSON.stringify(n))})),d.appendChild(i),e.appendChild(d)}(i,e,t),function(e,t){let n=document.createElement("div");n.id="notebook";let d=document.createElement("label");d.id="notebookLabel",d.htmlFor="notes"+t.id,d.textContent="notes:";let l=document.createElement("textarea");l.id="notes"+t.id,l.addEventListener("keydown",(e=>{"Enter"===e.key&&l.blur()})),l.addEventListener("change",(()=>{t.notes=l.value,localStorage.setItem("t"+t.id,JSON.stringify(t))})),n.appendChild(d),n.appendChild(l),e.appendChild(n)}(i,t),n.appendChild(i),o.appendChild(n)}function C(e){let t=document.getElementById("t"+e.id),n=document.createElement("div");n.id="add";let d=document.createElement("input");d.type="text",d.id="addInput-"+e.id,d.classList="add-input",d.addEventListener("keydown",(t=>{"Enter"===t.key&&v(e)})),n.appendChild(d);let l=document.createElement("button");l.type="submit",l.textContent="add",l.id="addBtn-"+e.id,l.classList="add-btn",l.addEventListener("click",(()=>{v(e.id)})),n.appendChild(l),t.appendChild(n)}window.addEventListener("load",(()=>{window.localStorage.length>0&&function(){var n,d=[];for(n=0;n<window.localStorage.length;n++){let e=window.localStorage.key(n);"q"===e.slice(0,1)&&d.push(JSON.parse(window.localStorage.getItem(e)))}let a=d.sort(r),i=a[a.length-1];a.forEach((n=>{let d=new e(n.id,n._name);m(d),u(d),p(d),h(d),g(d),function(e){var n,d=[];for(n=0;n<window.localStorage.length;n++){let e=window.localStorage.key(n);"t"===e.slice(0,1)&&d.push(JSON.parse(window.localStorage.getItem(e)))}let a=d.sort(r),i=a[a.length-1];a.forEach((n=>{if(e.id===n.quest){let d=new t(n.id,n.quest,n._name,n.priority,n.date,n.notes);y(e,d),E(e,d),C(d),b(d),s=i.id,function(e,t){"true"===t.priority&&(document.getElementById(t.id).classList.toggle("important"),document.getElementById("priorityInput"+t.id).checked=!0),null!=t.date&&(document.getElementById(t.id).setAttribute("data-date",t.date),l(e),document.getElementById("dateInput"+t.id).value=t.date),null!=t.notes&&(document.getElementById("notes"+t.id).value=t.notes)}(e,d),document.getElementById("a"+e.id).classList.add("down")}}))}(d),c=i.id}))}()}));let f=0;function v(e){f++;let t=document.createElement("li"),n=document.createElement("label");n.htmlFor="li"+f;let d=document.createElement("span");d.textContent=document.getElementById("addInput-"+e.id).value;let l=document.createElement("input");l.type="checkbox",l.id="li"+f,n.appendChild(l),n.appendChild(d),t.appendChild(n),""!==d.textContent&&(document.getElementById("list-"+e.id).appendChild(t),document.getElementById("addInput-"+e.id).value="",function(e){let t=document.createElement("span");t.classList="close";let n=document.createTextNode("×");for(t.appendChild(n),t.addEventListener("mouseover",(()=>{e.classList.toggle("hover")})),t.addEventListener("mouseout",(()=>{e.classList.toggle("hover")})),e.appendChild(t),B=0;B<L.length;B++)L[B].onclick=function(){this.parentElement.style.display="none"}}(t))}let I=document.getElementsByTagName("li");for(B=0;B<I.length;B++){let e=document.createElement("span"),t=document.createTextNode("×");e.classList="close",e.appendChild(t),I[B].appendChild(e)}let L=document.getElementsByClassName("close");var B;for(B=0;B<L.length;B++)L[B].onclick=function(){this.parentElement.style.display="none"};function b(e){let t=document.getElementById("t"+e.id),n=document.createElement("ul");n.id="list-"+e.id,n.classList="list-ul",t.appendChild(n),o.appendChild(t)}document.getElementById("addQuestBtn").addEventListener("click",(()=>{!function(){n();let t=prompt("What is your quest?");if(null!=t&&""!=t)if(t.length<=12){c++;let n=new e(c,t);m(n),u(n),p(n),h(n),g(n),localStorage.setItem("q"+n.id,JSON.stringify(n))}else alert("Oops! Please choose a name that is fewer than 12 characters long. :)")}()})),document.getElementById("rmQuestBtn").addEventListener("click",(()=>{sidebar.children.length>2&&(" - Quests"===rmQuestBtn.textContent?function(){let e=document.querySelectorAll(".x-action");for(d=0;d<e.length;d++)e[d].classList.add("show");let t=document.querySelectorAll(".plus");for(d=0;d<t.length;d++)t[d].style.display="none";let n=document.querySelectorAll(".remove-tab");var d;for(d=0;d<n.length;d++)n[d].style.display="none";rmQuestBtn.style.backgroundColor="red",rmQuestBtn.style.color="white",rmQuestBtn.textContent="Finish"}():n())}))})();