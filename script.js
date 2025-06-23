// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, setData, getData, clearData } from "./storage.js";
import { dateForDisplay } from "./common.js";

document.getElementById("data-form").style.display = "none";

function userDropdown(users){
  // const userForm = document.getElementById("user-form");
  const userDropDown = document.getElementById("user-dropDown");

  for(let i = 0; i < users.length; i++){
    let option = document.createElement("option");
    option.value = users[i];
    option.innerHTML = `User ${users[i]}`;
    userDropDown.appendChild(option);
  }

  userDropDown.addEventListener("change", ()=>{
    document.getElementById("data-form").style.display = "block";
    const selectedUser = userDropDown.options[userDropDown.selectedIndex].value;
    console.log(selectedUser);
    // clearData(selectedUser);
    displayData(selectedUser);
    
  })
}

function addDataToStorage(){
  
  const formData = document.getElementById("data-form");
  const btnSubmit = document.getElementById("btn-submit");

  btnSubmit.addEventListener("click", (e)=>{
    e.preventDefault();
    const userDropDown = document.getElementById("user-dropDown");
    const selectedUser = userDropDown.options[userDropDown.selectedIndex].value;

    const title = document.getElementById("title");
    const link = document.getElementById("link");
    const desc = document.getElementById("desc");
    const time = new Date().toISOString(); // saves the date like "2025-06-21T14:30:00.000Z" later we need it for dateTime tag

    const dataToAdd = {
    title: title.value,
    link: link.value,
    desc: desc.value,
    time: time
  }
  const dataStorageUser = getData(selectedUser) || [];

  dataStorageUser.push(dataToAdd);
  setData(selectedUser, dataStorageUser);
  displayData(selectedUser);
  formData.reset();
  })
  
}

function displayData(userId){
  const bookmarkList = document.getElementById("bookmarks-list");
  bookmarkList.innerHTML = "";

  const receivedUserData = getData(userId);
  console.log(receivedUserData);
  if(!receivedUserData || receivedUserData.length === 0){
    let li = document.createElement("li");
    li.innerHTML = "There is no bookmarks for this user";
    bookmarkList.appendChild(li);
  }
  else{
    receivedUserData.sort((a, b) => new Date(b.time) - new Date(a.time)); //sorting in reverse chronological order ,from newest to oldest
    for(let i = 0; i < receivedUserData.length; i++){
      let li = document.createElement("li");
      let title = document.createElement("h3");
      let decs = document.createElement("p");
      let link = document.createElement("a");
      let time = document.createElement("time")

      link.href = receivedUserData[i].link;
      link.innerHTML = receivedUserData[i].title;
      title.appendChild(link);

      decs.innerHTML = receivedUserData[i].desc;

      const dateObj = new Date(receivedUserData[i].time);

      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // add 1 & pad with zero
      const day = String(dateObj.getDate()).padStart(2, '0');
      console.log(dateObj, "dateObj")
      time.dateTime = receivedUserData[i].time;
      time.textContent = dateForDisplay(dateObj);

      li.append(title, decs, time);

      bookmarkList.appendChild(li);
    }
  }
}



window.onload = function () {
  const users = getUserIds();
  userDropdown(users);
  addDataToStorage();
};
