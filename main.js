const url = "https://randomuser.me/api?results=30";
const img = "https://dog.ceo/api/breeds/image/random/30";
const firstnameElement = document.getElementById("firstname");
const savecodeElement = document.getElementById("numberSave");
const imageElement = document.getElementById("image");
const sbutton = document.getElementById("saveButton");
const obutton = document.getElementById("Openbutton");
const rbutton = document.getElementById("randomuser");

const database = firebase.database();

sbutton.addEventListener("click",updateDB);
obutton.addEventListener("click",openDB);
rbutton.addEventListener("click",resetfunc);

let name;
let gender;
let users;
let dimage;


fetch(img)
 .then(function(response) {
   return response.json();
})
 .then(function(myJson) {
   dimage = myJson;
   imain(dimage);
});




fetch(url)
 .then(function(response) {
   return response.json();
})
 .then(function(myJson) {
   users = myJson;
   umain(users);
});




function umain() {
    gender = users.results[Math.floor(Math.random() * users.results.length)].gender;
    name = users.results[Math.floor(Math.random() * users.results.length)].name.first;   
    firstnameElement.innerText = "This is " + name +". " + name + " is a "+ gender + ".";//user name
} 

function imain(){
    imageElement.src = dimage.message[Math.floor(Math.random() * dimage.message.length)];//image surce
}

function resetfunc(){
    imain();
    umain();
}



//Retirve the data
function openDB(){
    const savecode           = savecodeElement.value;
    database.ref('cats' + savecode).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            const url = snapshot.val()["catUrl"];
            console.log(url);
            imageElement.src = url;
        }
    });
    database.ref('cats' + savecode).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            const pname = snapshot.val()["NAME"];
            console.log(pname);
            name = pname;
        }
    });
    database.ref('cats' + savecode).once('value').then(function(snapshot) {
        if (snapshot.exists()) {
            const pgender = snapshot.val()["gender"];
            console.log(pgender);
            gender = pgender;
        }
    });
    firstnameElement.innerText = "This is " + name +". " + name + " is a "+ gender + ".";
}

//Sends the data
function updateDB(event){

    event.preventDefault();
    const savecode           = savecodeElement.value;
    const photo              = imageElement.src;
  //    const firstname        = firstnameElement.value;
  //    const url        = imageElement.value;
  
    savecodeElement.value = "";
  
  //Update database here
  const value = {
    NAME: firstname,
    GENDER: gender,
    catUrl: photo
  };
    database.ref("cats" + savecode).set(value); 
}
  







//Set database object here




/**
* Updates the database with the username and message.
*/











/**
* Updates the database with the username and message.
*/



