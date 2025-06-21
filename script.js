// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, setData, getData, clearData } from "./storage.js";

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
    const userDropDown = document.getElementById("user-dropDown");
    const selectedUser = userDropDown.options[userDropDown.selectedIndex].value;
    console.log(selectedUser);
    // clearData(selectedUser)
    displayData(selectedUser);
  })
}[0]

function addDataToStorage(userId){
  const title = document.getElementById("title");
  const link = document.getElementById("link");
  const desc = document.getElementById("desc");
  const time = new Date(); // saves the date like "2025-06-21T14:30:00.000Z" later we need it for dateTime tag

  const dataToAdd = {
    title: title.value,
    link: link.value,
    desc: desc.value,
    time: time
  }
  const dataStorageUser = getData(userId) || [];

  dataStorageUser.push(dataToAdd);
  setData(userId, dataStorageUser)
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
    receivedUserData.sort((a, b) => a.time - b.time);
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

      time.dateTime = receivedUserData[i].time;
      time.textContent = `${year}-${month}-${day}`;

      li.append(title, decs, time);

      bookmarkList.appendChild(li);
    }
  }
}


window.onload = function () {
  const users = getUserIds();
  userDropdown(users);
};
