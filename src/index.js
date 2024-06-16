import { addQuest, removeQuest } from "../dom";

document.getElementById("addQuestBtn").addEventListener("click", () => {
    addQuest();
})

document.getElementById("rmQuestBtn").addEventListener("click", () => {
    removeQuest();
})