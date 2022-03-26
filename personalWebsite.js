navBar();
adjustProjectHeight();
window.addEventListener("resize", adjustProjectHeight);

function navBar() {
    let homeS = document.querySelector("#homeSection");
    let aboutS = document.querySelector("#aboutSection");
    let projectS = document.querySelector("#projectSection");
    let menuDict = { "home": 0, "about": homeS.clientHeight, "projects": homeS.clientHeight + aboutS.clientHeight, "contact": homeS.clientHeight + aboutS.clientHeight + projectS.clientHeight };
    let sectTop = 0, windowTop;
    document.querySelectorAll(".navMenu").forEach(menu => {
        menu.addEventListener("click", () => {
            removeMenuActive();
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