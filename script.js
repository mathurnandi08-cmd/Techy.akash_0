const classInput = document.querySelectorAll("input")[0];
const subjectInput = document.querySelectorAll("input")[1];
const timeInput = document.querySelectorAll("input")[2];
const addBtn = document.querySelector("button");
const studyList = document.querySelector("ul");

// Load studies
window.onload = () => {
  const studies = JSON.parse(localStorage.getItem("studies")) || [];
  studies.forEach((study, index) => addStudyToUI(study, index));
};

addBtn.addEventListener("click", () => {
  const className = classInput.value;
  const subject = subjectInput.value;
  const time = timeInput.value;

  if (!className || !subject || !time) {
    alert("Please fill all fields");
    return;
  }

  const study = {
    className,
    subject,
    time,
    done: false
  };

  const studies = JSON.parse(localStorage.getItem("studies")) || [];
  studies.push(study);
  localStorage.setItem("studies", JSON.stringify(studies));

  addStudyToUI(study, studies.length - 1);

  classInput.value = "";
  subjectInput.value = "";
  timeInput.value = "";
});

// UI function
function addStudyToUI(study, index) {
  const li = document.createElement("li");

  const text = document.createElement("span");
  text.textContent = `Class ${study.className} - ${study.subject} at ${study.time}`;

  if (study.done) {
    text.style.textDecoration = "line-through";
    text.style.color = "green";
  }

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.style.marginLeft = "10px";

  doneBtn.onclick = () => toggleDone(index);

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.style.marginLeft = "5px";

  delBtn.onclick = () => deleteStudy(index);

  li.appendChild(text);
  li.appendChild(doneBtn);
  li.appendChild(delBtn);
  studyList.appendChild(li);
}

// Toggle done
function toggleDone(index) {
  const studies = JSON.parse(localStorage.getItem("studies"));
  studies[index].done = !studies[index].done;
  localStorage.setItem("studies", JSON.stringify(studies));
  refreshUI();
}

// Delete study
function deleteStudy(index) {
  const studies = JSON.parse(localStorage.getItem("studies"));
  studies.splice(index, 1);
  localStorage.setItem("studies", JSON.stringify(studies));
  refreshUI();
}

// Refresh UI
function refreshUI() {
  studyList.innerHTML = "";
  const studies = JSON.parse(localStorage.getItem("studies")) || [];
  studies.forEach((study, index) => addStudyToUI(study, index));
}