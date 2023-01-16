const fakeConsole = document.querySelector("#theConsole")   // fakeConsole.innerHTML += + "<br>"
const clearConsole = document.querySelector("#theConsoleClear")
clearConsole.addEventListener("click", function(){fakeConsole.innerHTML = ""}) 

const quotes = [
    "“A bad workman always blames his tools.”", 
    "“A bird in the hand is worth two in the bush.”", 
    "“If you are the smartest person in the room, then you are in the wrong room.” - Confucius", 
    "“Our greatest glory is not in never falling, but in rising every time we fall.” -Confucius", 
    "“Better a diamond with a flaw than a pebble without.” -Confucius",
    "“The fear of the Lord is the beginning of knowledge; fools despise wisdom and discipline.” Proverbs 1:7",
    "“Don’t rebuke a mocker, or he will hate you; rebuke the wise, and he will love you.” Proverbs 9:8",
    "“Before his downfall a person’s heart is proud, but humility comes before honor.” Proverbs 18:12",
    "“A gentle answer turns away anger, but a harsh word stirs up wrath.” Proverbs 15:1",
    "“A person’s heart plans his way, but the Lord determines his steps.” Proverbs 16:9",
    "“Iron sharpens iron, and one person sharpens another.” Proverbs 27:17",
    "“Those who cannot remember the past are condemned to repeat it.” - George Santayana",
    "“The haft of the arrow had been feathered with one of the eagle's own plumes. We often give our enemies the means of our own destruction.” - Aesop",
    "“I find the great thing in this world is not so much where we stand, as in what direction we are moving.” - Oliver Wendell Holmes",
    "“Do not wait to strike 'til the iron is hot; but make it hot by striking.” - William Butler Yeats",
    "“When pieces of bronze or gold or iron break, the metal-smith welds them together again in the fire, and the bond is established.” - Sri Guru Granth Sahib",
    "“There never was a good knife made of bad steel.” - Benjamin Franklin",
    "“Nothing is particularly hard if you divide it into small jobs.” -Henry Ford",
    "“Every great advance in science has issues from a new audacity of imagination.” -John Dewey",
    "“Wisdom and virtue are like the two wheels of a cart.” - Japanese Proverb",
    "“He who destroys a good book kills reason itself.” - John Milton"
]

const backgroundImages = [
    "images/AppBreweryWallpaper.png",
    "images/AppBreweryWallpaper1.png",
    "images/AppBreweryWallpaper2.png",
    "images/AppBreweryWallpaper3.png",
    "images/AppBreweryWallpaper4.png",
    "images/AppBreweryWallpaper6.png",
    // "images/AppBreweryWallpaper7.png",
    "images/AppBreweryWallpaper8.png",
    "images/AppBreweryWallpaper9.png"
]

var format12Hour = false
var carouselMinute = 0
var currentQuote = 0
var currentBackground = 0

function Logger() {
    const today = new Date();
    let h = today.getHours();
    let meridianGreeting = ""
    const Welcome = document.querySelector("#welcome")

    if (h<12)
        meridianGreeting = "morning"
    else if (h>=19)
        meridianGreeting ="evening"
    else if (h>=13)
        meridianGreeting = "afternoon"
    else
        meridianGreeting = "noon"

    Welcome.innerHTML = "Good " + meridianGreeting + " " + username + ", it's Momentin' time."
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    let meridiem = ""

    if (format12Hour) {
        if (h>12)
            meridiem = " PM"
        else
            meridiem = " AM"
        h %= 12;
    }
    carousel(m)
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('clockface').innerHTML =  h + ":" + m + ":" + s + meridiem;

    setTimeout(startTime, 1000);
  }

function checkTime(i) {
    if (i < 10)
        i = "0" + i  // add zero in front of numbers < 10
    return i;
}

function carousel(min) {
    if (carouselMinute !== min) {
        quoteDisplayer()
        backgroundChanger()
        carouselMinute = min
    }
}

function quoteDisplayer() {
    let quoteIndex = 0
    do {
        quoteIndex = Math.floor(Math.random()*quotes.length)
    } while (currentQuote === quoteIndex)

    const Quote = document.querySelector("#quote")
    Quote.innerHTML = quotes[quoteIndex]
    currentQuote = quoteIndex
}

function backgroundChanger() {
    let backgroundIndex = 0
    do {
        backgroundIndex = Math.floor(Math.random()*backgroundImages.length)
    } while (currentBackground === backgroundIndex)

    const BodyElement = document.querySelector("body")
    BodyElement.style.background = "url(" + backgroundImages[backgroundIndex] + ")";
    currentBackground = backgroundIndex
}

// fetching the username from the address bar
let url = new URL(window.location)
let username = url.searchParams.get("username")
if (username===null)
    username = "Bruh"


const clockFormat = document.querySelector("#clockformat")
clockFormat.addEventListener("click", function(){format12Hour = !format12Hour;fakeConsole.innerHTML += "Format 12H clock:" + format12Hour + "<br>"})
Logger()
startTime()


let toDoItems = []

function ToDo(description) {
    this.description = description
    this.complete = false
}

ToDo.prototype.completeToDo = function() {
        this.complete = !this.complete
}

function buildToDo(todo, index) {
    var toDoShell = document.createElement('div')
    toDoShell.className = 'toDoShell'
    
    var toDoText = document.createElement('span')
    toDoText.innerHTML = todo.description
    toDoText.id = index
    toDoText.addEventListener('click', function() {completeToDo(index);})

    let editButton = document.createElement('button')
    editButton.className = "ToDoButton"
    editButton.innerHTML = "✎"
    editButton.addEventListener('click', function () {editToDo(todo)})

    let deleteButton = document.createElement('button')
    deleteButton.className = "ToDoButton"
    deleteButton.id = "deleteButton"
    deleteButton.innerHTML = "╳"
    deleteButton.addEventListener('click', function () {deleteToDo(index)})

    if (todo.complete === true)
        toDoText.className = 'completeText'
    
    toDoShell.appendChild(toDoText)
    toDoShell.appendChild(editButton)
    toDoShell.appendChild(deleteButton)
    return toDoShell
}

function buildToDos(toDos) {
    const toDoArray = toDos.map(buildToDo);
    return toDoArray;
}

function displayToDos() {
    var toDoContainer = document.querySelector('#toDoContainer');
    toDoContainer.innerHTML = "";

    var arrayToDisplay = buildToDos(toDoItems);

    for (item of arrayToDisplay) {
        if (item.className === 'completeText')
            item.innerHTML = '<strike>' + item.innerHTML + '</strike>';
        toDoContainer.appendChild(item);
    }   
}

function editToDo (todo) {
    let newToDoDescription = prompt("Please input the edit below", "");
    if (newToDoDescription !== null && newToDoDescription !== "") {
        todo.description = newToDoDescription
    }
    displayToDos()
}

function deleteToDo (index) {
    toDoItems.splice(index, 1)
    displayToDos()
}

function addToDo() {
    var newToDo = document.querySelector('#toDoInput');
    if (newToDo.value !== "") {
        let ToDo_object = new ToDo(newToDo.value);
        toDoItems.push(ToDo_object);
        newToDo.value = "";
    }
    displayToDos();
}

const addButton = document.querySelector('#addButton');
addButton.addEventListener('click', addToDo);
 
function completeToDo(event) {
    toDoItems[event].completeToDo();
    displayToDos();
}

displayToDos();