const box = document.querySelector(".box");
const dropdown = document.querySelector(".dropdown");
dropdown.addEventListener("click", ()=>{
    box.classList.toggle("display");
})