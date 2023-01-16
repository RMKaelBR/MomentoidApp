const fakeConsole = document.querySelector("#theConsole")
// fakeConsole.innerHTML = + "<br>"
const clearConsole = document.querySelector("#theConsoleClear")
clearConsole.addEventListener("click", function(){fakeConsole.innerHTML = ""}) 

fakeConsole.innerHTML = "hello world!" + "<br>"
