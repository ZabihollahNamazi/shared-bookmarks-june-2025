// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, setData, getData, clearData } from "./storage.js";

function userDropdown(users){
  const userForm = document.getElementById("user-form");
  const userDropDown = document.getElementById("user-dropDown");

  for(let i = 0; i < users.length; i++){
    let option = document.createElement("option");
    option.value = users[i];
    option.innerHTML = `User ${users[i]}`;
    userDropDown.appendChild(option);
  }

  userForm.addEventListener("change", ()=>{
    const userDropDown = document.getElementById("user-dropDown");
    const selectedUser = userDropDown.options[userDropDown.selectedIndex].value;
    console.log(selectedUser);
    clearData(selectedUser)
    displayData(selectedUser);
  })
}

function addDataToStorage(){
  


}

function displayData(userId){
  const bookmarkList = document.getElementById("bookmarks-list");
  bookmarkList.innerHTML = "";

  const receivedUserData = getData(userId);
  console.log(receivedUserData);
  if(!receivedUserData){
    let li = document.createElement("li");
    li.innerHTML = "There is no bookmarks for this user";
    bookmarkList.appendChild(li);
  }
  else{
    let lii = document.createElement("li");
    lii.innerHTML = receivedUserData;
    bookmarkList.appendChild(lii);
  }
}


window.onload = function () {
  const users = getUserIds();
  userDropdown(users);
};
