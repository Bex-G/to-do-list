import "./styles.css";
import { addQuest } from "./dom";
import { removeQuest } from "./logic";

document.getElementById("addQuestBtn").addEventListener("click", () => {
  addQuest();
});

document.getElementById("rmQuestBtn").addEventListener("click", () => {
  if (sidebar.children.length > 1) {
    removeQuest();
  }
});
