const menu = document.querySelector(".menu");
let menuVisible = false;

const toggleMenu = command => {
  menu.style.display = command === "show" ? "block" : "none";
  menuVisible = !menuVisible;
};

const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  toggleMenu("show");
};

window.addEventListener("click", e => {
  if(menuVisible)toggleMenu("hide");
});

window.addEventListener("contextmenu", e => {
    const origin = {
        left: e.pageX,
        top: e.pageY
    };
    var targetElement = event.target
    if (targetElement.nodeName === "TD") {
        e.preventDefault();
       // console.log(targetElement)
        setPosition(origin);
    }

    return false;
});

