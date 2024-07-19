let formContainer = document.getElementById("form-container");

let userLogin = document.getElementById("userlogin");
// let noteApp = document.getElementById("noteapp");
// noteApp.style.display = "none";

// let createBtn = document.getElementById("createbtn");
// let listContainer = document.getElementById("list-container");

formContainer.addEventListener("submit", async (e) => {
  e.preventDefault();
  let userName = document.getElementById("username");
  let userPassword = document.getElementById("userpassword");
  let providedUserName = userName.value;
  let providedPassword = userPassword.value;
  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ providedUserName, providedPassword }),
  });
  const data = await res.json();
  console.log(data)
  if (res.ok) {
    console.log(data.title);
    userLogin.style.display = "none";
    // noteApp.style.display = "block";
    window.location.href = "/noteapp";
  } else {
    const errorElement = document.createElement("p");
    errorElement.innerHTML = data.title;
    errorElement.classList.add("error-style")
    formContainer.appendChild(errorElement);
  }
});

// function getNoteListFromLocalStorage() {
//   let iniitalNoteList = localStorage.getItem("noteList");
//   let parsedNoteList = JSON.parse(iniitalNoteList);
//   if (parsedNoteList === null) {
//     return [];
//   } else {
//     return parsedNoteList;
//   }
// }

// let noteList = getNoteListFromLocalStorage();
// let noteCount = noteList.length;

// function onClickDeleteNote(id) {
//   let deleteNoteElement = document.getElementById(id);
//   listContainer.removeChild(deleteNoteElement);

//   let deleteNoteIndex = noteList.findIndex((item) => item.id === id);
//   console.log(deleteNoteIndex);
//   console.log(noteList);
//   noteList.splice(deleteNoteIndex, 1);
//   localStorage.setItem("noteList", JSON.stringify(noteList));
// }

// function displayNoteList(note) {
//   let listElement = document.createElement("li");
//   listElement.id = note.id;
//   let TextArea = document.createElement("textarea");
//   TextArea.innerHTML = note.text;

//   let deleteIcon = document.createElement("i");
//   deleteIcon.classList.add("fa", "fa-trash-alt", "delete-icon");

//   listElement.appendChild(TextArea);
//   listElement.appendChild(deleteIcon);
//   listContainer.appendChild(listElement);

//   deleteIcon.addEventListener("click", () => {
//     onClickDeleteNote(note.id);
//   });
// }

// function onClickCreateNoteBtn() {
//   let noteInput = document.getElementById("note-input");
//   const noteText = noteInput.value;
//   noteCount = noteCount + 1;
//   const noteObj = {
//     id: noteCount,
//     text: noteText,
//   };
//   noteList.push(noteObj);
//   displayNoteList(noteObj);
//   noteInput.value = "";
//   localStorage.setItem("noteList", JSON.stringify(noteList));
// }

// createBtn.addEventListener("click", () => {
//   onClickCreateNoteBtn();
// });
