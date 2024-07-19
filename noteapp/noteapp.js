let userLogin = document.getElementById("userlogin");
let noteApp = document.getElementById("noteapp");

// noteApp.style.display = "none";

let createBtn = document.getElementById("createbtn");
let listContainer = document.getElementById("list-container");
let trashListContainer = document.createElement("div");
let trashListHeading = document.createElement("h2");
let trashListContainerElement = document.createElement("ul");
trashListContainerElement.id = "trash-list-container-element";
//trashListContainerElement.innerHTML = "trash list Container";

let searchBarElement = document.getElementById("search-input");
let searchBarBtn = document.getElementById("search-btn");

function getNoteListFromLocalStorage() {
  let initalNoteList = localStorage.getItem("noteList");
  //console.log(initalNoteList);
  let parsedNoteList = JSON.parse(initalNoteList);
  if (parsedNoteList === null) {
    return [];
  } else {
    return parsedNoteList;
  }
}

function getTrashListFromLocalStorage() {
  let initaltrashList = localStorage.getItem("trashListContainer");
  //console.log(initalNoteList);
  let parsedtrashList = JSON.parse(initaltrashList);
  if (parsedtrashList === null) {
    return [];
  } else {
    return parsedtrashList;
  }
}

function searchNoteLists(val) {
  let searchedResults = noteList.filter((item) => {
    return item.text.toLowerCase().includes(val);
  });
  localStorage.setItem("noteList", JSON.stringify(searchedResults));

  // for (let note of searchedResults) {
  //   displayNoteList(note);
  // }
}

let noteList = getNoteListFromLocalStorage();
//console.log(noteList);
let noteCount = noteList.length;
let trashList = getTrashListFromLocalStorage(); 

searchBarBtn.addEventListener("click", () => {
  let searchValue = searchBarElement.value;
  console.log(searchValue);
  searchNoteLists(searchValue);
});

function trashNoteList(note) {
  trashList.push(note);
  //console.log(note);
  //console.log(trashList);
  displayTrashList(note);
  localStorage.setItem("trashListContainer", JSON.stringify(trashList));
}

function onClickDeleteNote(id) {
  let deleteNoteElement = document.getElementById(id);
  listContainer.removeChild(deleteNoteElement);

  let deleteNoteIndex = noteList.findIndex((item) => item.id === id);
  //console.log(deleteNoteIndex);
  //console.log(noteList);
  let deletedNoteList = noteList.splice(deleteNoteIndex, 1);
  let [deletedNoteItem] = deletedNoteList;
  trashNoteList(deletedNoteItem);
  localStorage.setItem("noteList", JSON.stringify(noteList));
}

function onChangeSelectColor(color, id) {
  let coloredNoteItem = document.getElementById(id);
  coloredNoteItem.style.backgroundColor = color;

  let updatedNoteList = noteList.map((item) => {
    if (item.id === id) {
      return { ...item, bgColor: color };
    } else {
      return item;
    }
  });

  //console.log(updatedNoteList);

  localStorage.setItem("noteList", JSON.stringify(updatedNoteList));
}

function displayNoteList(note) {
  let listElement = document.createElement("li");
  listElement.id = note.id;
  let TextArea = document.createElement("textarea");
  TextArea.innerHTML = note.text;
  TextArea.classList.add("text-area");
  listElement.classList.add("list-Element");

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add(
    "fa",
    "fa-trash-alt",
    "delete-icon",
    "delete-icon-space"
  );

  deleteIcon.style.color = "darkgrey";

  let selectColor = document.createElement("select");

  const option1 = document.createElement("option");
  option1.value = "#FF5733";
  option1.text = "Red";

  const option2 = document.createElement("option");
  option2.value = "#00008B";
  option2.text = "Blue";

  const option3 = document.createElement("option");
  option3.value = "#8B8000";
  option3.text = "Yellow";

  selectColor.appendChild(option1);
  selectColor.appendChild(option2);
  selectColor.appendChild(option3);

  selectColor.addEventListener("change", (e) => {
    onChangeSelectColor(e.target.value, note.id);
  });

  listElement.style.backgroundColor = note.bgColor;

  listElement.appendChild(TextArea);
  listElement.appendChild(deleteIcon);
  listElement.appendChild(selectColor);
  listContainer.appendChild(listElement);

  deleteIcon.addEventListener("click", () => {
    onClickDeleteNote(note.id);
  });
}

function onClickCreateNoteBtn() {
  let noteInput = document.getElementById("note-input");
  const noteText = noteInput.value;
  noteCount = noteCount + 1;
  const noteObj = {
    id: noteCount,
    text: noteText,
    bgColor: "white",
  };
  noteList.push(noteObj);
  displayNoteList(noteObj);
  noteInput.value = "";
  localStorage.setItem("noteList", JSON.stringify(noteList));
}

createBtn.addEventListener("click", () => {
  onClickCreateNoteBtn();
});

for (let note of noteList) {
  displayNoteList(note);
}

function displayTrashList(note) {
  let listElement = document.createElement("li");
  listElement.id = note.id;
  let TextArea = document.createElement("textarea");
  TextArea.innerHTML = note.text;
  TextArea.classList.add("text-area");
  listElement.classList.add("list-Element");

  // let selectColor = document.createElement("select");

  // const option1 = document.createElement("option");
  // option1.value = "#FF5733";
  // option1.text = "Red";

  // const option2 = document.createElement("option");
  // option2.value = "#00008B";
  // option2.text = "Blue";

  // const option3 = document.createElement("option");
  // option3.value = "#8B8000";
  // option3.text = "Yellow";

  // selectColor.appendChild(option1);
  // selectColor.appendChild(option2);
  // selectColor.appendChild(option3);

  // selectColor.addEventListener("change", (e) => {
  //   onChangeSelectColor(e.target.value, note.id);
  // });

  listElement.style.backgroundColor = note.bgColor;
  trashListContainer.append(trashListHeading);
  trashListHeading.innerHTML = "Trash-list";
  trashListHeading.classList.add("trash-list-heading");
  listElement.appendChild(TextArea);
  //listElement.appendChild(selectColor);
  trashListContainerElement.appendChild(listElement);
  trashListContainerElement.classList.add("trash-list-container-element");
  trashListContainer.appendChild(trashListContainerElement);

  noteApp.appendChild(trashListContainer);
}

if (trashList.length > 0) {
  for (let note of trashList) {
    displayTrashList(note);
  }
}
