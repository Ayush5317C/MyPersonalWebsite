//global variables
let menuIcon = document.querySelector(".menuIcon");
let homeS = document.querySelector("#homeSection");
let aboutS = document.querySelector("#aboutSection");
let projectS = document.querySelector("#projectSection");
let menuDict = { "home": 0, "about": homeS.clientHeight, "projects": homeS.clientHeight + aboutS.clientHeight, "contact": homeS.clientHeight + aboutS.clientHeight + projectS.clientHeight };
let navContent = document.querySelector(".navContent");
//main
menuIcon.addEventListener("click",()=>{
    toggleMenuForSmallDevices();
})
navBar();
setHomeAsActiveInitially();
adjustProjectHeight();
window.addEventListener("resize", adjustProjectHeight);

//functions
function setHomeAsActiveInitially(){
document.querySelector("#home").classList.add("active");
}
function navBar() {
    let sectTop = 0, windowTop;
    document.querySelectorAll(".navMenu").forEach(menu => {
        menu.addEventListener("click", () => {
            removeMenuActive();
            toggleMenuForSmallDevices();
            menu.classList.add("active");
        });
    });

    for (let [menu, sectionTop] of Object.entries(menuDict)) {
        document.addEventListener("scroll", () => {
            windowTop = window.scrollY;
            if (windowTop >= sectionTop) {
                removeMenuActive();
                document.querySelector(`#${menu}`).classList.add("active");
            }
        })
    }
    function removeMenuActive() {
        document.querySelectorAll(".navMenu").forEach(el => {
            el.classList.remove("active");
        });
    }
}
function adjustProjectHeight() {
    let projectWidth = parseInt(window.getComputedStyle(document.querySelector(".projects")).width);
    let aspectRatio = 16 / 9;
    document.querySelectorAll(".projects").forEach(el => { el.style.height = `${projectWidth / aspectRatio}px` });
}
function toggleMenuForSmallDevices(){
    menuIcon.classList.toggle("rotateLines");
    if(window.getComputedStyle(navContent).right == "-500px"){
        navContent.style.right = "0%";
    }
    else{
        navContent.style.right = "-500px";
    }
}