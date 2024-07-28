//active hamburger menu
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist")
menuIcon.addEventListener("click",()=>{
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});


navlist.addEventListener("click",()=>{
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
})
//rotate text
let text = document.querySelector(".text p");

text.innerHTML = text.innerHTML.split("").map((char,i)=>
    `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`
).join("");

//switch between about button
const buttons = document.querySelectorAll('.about-btn button');
const contents = document.querySelectorAll('.content');

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    contents.forEach(content => content.style.display = 'none');
    contents[index].style.display = 'block';
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

//project filters ----------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const boxes = document.querySelectorAll('.project-box');
    let isAnimating = false;

    function filterProjects(filter) {
        if (isAnimating) return;
        isAnimating = true;

        boxes.forEach(box => {
            box.classList.remove('show', 'hide');
            void box.offsetWidth; // Trigger reflow to reset animation

            if (filter === 'all' || box.classList.contains(filter.substring(1))) {
                box.classList.add('show');
            } else {
                box.classList.add('hide');
            }
        });

        setTimeout(() => {
            isAnimating = false;
        }, 500); // Total animation duration
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('mixitup-control-active'));
            this.classList.add('mixitup-control-active');
            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });

    // Show all projects initially
    filterProjects('all');
});

//skill progressd bar
const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");

window.addEventListener("scroll",()=>{
    if(!skillsPlayed)
    skillsCounter();
})


function hasReached(el){
    let topPosition = el.getBoundingClientRect().top;
    if(window.innerHeight >= topPosition + el.offsetHeight)return true;
    return false;
}

function updateCount(num,maxNum){
    let currentNum = +num.innerText;
    
    if(currentNum < maxNum){
        num.innerText = currentNum + 1;
        setTimeout(()=>{
            updateCount(num,maxNum)
        },12)
    }
}


let skillsPlayed = false;

function skillsCounter(){
    if(!hasReached(first_skill))return;
    skillsPlayed = true;
    sk_counters.forEach((counter,i)=>{
        let target = +counter.dataset.target;
        let strokeValue = 465 - 465 * (target / 100);

        progress_bars[i].style.setProperty("--target",strokeValue);

        setTimeout(()=>{
            updateCount(counter,target);
        },400)
    });

    progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}

// side progress bar 

let calcScrollValue = ()=>{
  let scrollProgress = document.getElementById("progress");
  let pos = document.documentElement.scrollTop;

  let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100)/calcHeight);
  
  if(pos > 100){
      scrollProgress.style.display = "grid";
  }else{
      scrollProgress.style.display = "none";
  }

  scrollProgress.addEventListener("click",()=>{
      document.documentElement.scrollTop = 0;
  });

  scrollProgress.style.background = `conic-gradient(#fff ${scrollValue}%,#e6006d ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// active menu 

let menuLi = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll('section');

function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){}
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}
activeMenu();
window.addEventListener("scroll",activeMenu);

// scroll reveal

ScrollReveal({ 
    distance:"90px",
    duration:2000,
    delay:200,
    // reset: true 
});
 

ScrollReveal().reveal('.hero-info,.main-text,.headings,.heading', { origin: "top" });
ScrollReveal().reveal('.about-image,.filter-buttons,.contact-info', { origin: "left" });
ScrollReveal().reveal('.about-content,.skills', { origin: "right" });
ScrollReveal().reveal('.project-gallery,footer,.image-hero', { origin: "bottom" });

function submits(event) {
    event.preventDefault();
    let name = document.getElementById('name');
    let last = document.getElementById('last');
    let sub = document.getElementById('sub');
    let email = document.getElementById('email');
    let text = document.getElementById('text');
    if (name.value === "" ||email.value==""|| text.value === "") {
        alert("Please enter details");
    } else {
        alert('Hi, ' + name.value + '. Thank you for connecting with us.');
        name.value = "";
        last.value = "";
        sub.value = "";
        email.value = "";
        text.value = "";
    }
}
