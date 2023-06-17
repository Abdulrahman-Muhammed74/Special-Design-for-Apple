let mainColor = localStorage.getItem("color-options");
let backgroundInterval;
let backgroundOption = true
let backgroundLocalItem = localStorage.getItem("background-option");
const settingBox = document.querySelector(".settings-box")

if (mainColor !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    mainColor
  );
}
// toogle setting's icon
document.querySelector(".round-settings .fa-gear ").onclick = function () {
  this.classList.toggle("fa-spin");

  settingBox.classList.toggle("open-settings");
};
// close setting navBar while clicking on the page
document.addEventListener('click', function (event) {
  const targetElement = event.target;

  if (!settingBox.contains(targetElement)) {
    settingBox.classList.remove("open-settings");
  }
})

//switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-options", e.target.dataset.color);

    // put active class on current element

    handlingActiveClass(e);
  });
});
//swich background options
const randomBackground = document.querySelectorAll(".random-backgrounds span");

randomBackground.forEach((span) => {
  span.addEventListener("click", (e) => {
    // put active class on current element

    handlingActiveClass(e);


    if (e.target.dataset.background === 'yes') {
      backgroundOption = true
      randomizeImgs();
      localStorage.setItem("background-option", true)
    } else {
      backgroundOption = false
      clearInterval(backgroundInterval)
      localStorage.setItem("background-option", false)

    }
  });
});


if (backgroundLocalItem !== null) {

  if (backgroundLocalItem === 'true') {
    backgroundOption = true
  } else {
    backgroundOption = false
  }
  document.querySelectorAll(".random-backgrounds span").forEach(el => {
    el.classList.remove("active")
  })

  if (backgroundLocalItem === 'true') {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

let landingPage = document.querySelector(".landingPage");
// get array of imgs
let imgsArr = [
  "Apple_iPhone-13.jpg",
  "Apple.jpg.jpg",
  "iphone14.jpg",
  "wp4810861.jpg",
  "table.jpg",
];

// function to randomize images
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNum = Math.floor(Math.random() * imgsArr.length);
      landingPage.style.backgroundImage =
        'url("images/' + imgsArr[randomNum] + '")';
    }, 5000);
  }
}
const yes = document.querySelector(".yes")
const no = document.querySelector(".no")

randomizeImgs();

// select  categories selector

let ourCategories = document.querySelector(".categories")

window.onscroll = function () {
  let categoriesOffsetTop = ourCategories.offsetTop

  //get outer height
  let categoriesOuterHeight = ourCategories.offsetHeight

  let windowHeight = this.innerHeight

  let windwoScrollTop = this.scrollY
  if (windwoScrollTop > (categoriesOffsetTop + categoriesOuterHeight - windowHeight)) {
    let allCategories = document.querySelectorAll(".categories-box .sales-progress span");
    allCategories.forEach(cat => {
      cat.style.width = cat.dataset.progress
    })
  }
}

// create popup with imgs
let ourGallery = document.querySelectorAll(".gallery img")

ourGallery.forEach(img => {
  img.addEventListener("click", (e) => {

    // create overlay
    let overlay = document.createElement("div");
    overlay.className = 'popup-overlay';

    document.body.appendChild(overlay);

    let popUpBox = document.createElement("div");
    popUpBox.className = "popup-box";

    let popUpImage = document.createElement("img");
    //SET image src
    popUpImage.src = img.src;

    popUpBox.appendChild(popUpImage);

    document.body.appendChild(popUpBox);

    if (img.alt !== null) {
      let imgHeader = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeader.appendChild(imgText);
      popUpBox.appendChild(imgHeader);
    }

    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);

    closeButton.className = 'close';
    popUpBox.appendChild(closeButton);
  });
});

// close popup

document.addEventListener("click", (e) => {
  if (e.target.className == 'close') {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove()
  }
})

// tooltips

const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".landingPage .header-area .links");



function scrolling(elements) {
  elements.forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth"
      })
    })
  })
}

scrolling(allBullets);
scrolling(allLinks);


function handlingActiveClass(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocal = localStorage.getItem("bullets-option");

if (bulletsLocal !== null) {
  bulletsSpan.forEach(span => {
    span.classList.remove("acitve");
  })

  if (bulletsLocal === 'block') {
    bulletsContainer.style.display = 'block';
    document.querySelector(".bullets-option .yes").classList.add("active")

  } else {
    bulletsContainer.style.display = 'none'
    document.querySelector(".bullets-option .no").classList.add("active")

  }
}

bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === 'show') {
      bulletsContainer.style.display = 'block'
      localStorage.setItem("bullets-option", 'block')
    } else {
      bulletsContainer.style.display = 'none'
      localStorage.setItem("bullets-option", 'none')

    };
    handlingActiveClass(e);
  })
})

document.querySelector(".reset").onclick = function () {
  localStorage.clear();
  window.location.reload();
}