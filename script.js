// ==========================================
// SMARTCARE HOSPITAL RECOMMENDATION SYSTEM
// Home Page JavaScript
// ==========================================


// =========================
// Smooth Scrolling
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});


// =========================
// Navbar Shadow on Scroll
// =========================

window.addEventListener("scroll", function(){

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){

        navbar.classList.add("sticky");

    }

    else{

        navbar.classList.remove("sticky");

    }

});


// =========================
// Reveal Animation
// =========================

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.2
});


document.querySelectorAll(".service-card,.stat-card,.step,.level-box,.about")
.forEach(item=>{

    item.classList.add("hidden");

    observer.observe(item);

});


// =========================
// Counter Animation
// =========================

const counters = document.querySelectorAll(".counter");

const speed = 100;

counters.forEach(counter=>{

    const updateCount = ()=>{

        const target = +counter.getAttribute("data-target");

        const count = +counter.innerText;

        const increment = target / speed;

        if(count < target){

            counter.innerText = Math.ceil(count + increment);

            setTimeout(updateCount,20);

        }

        else{

            counter.innerText = target;

        }

    };

    updateCount();

});


// =========================
// Button Ripple Effect
// =========================

document.querySelectorAll(".btn-primary,.btn-secondary").forEach(button=>{

    button.addEventListener("click",function(e){

        let x=e.clientX-e.target.offsetLeft;

        let y=e.clientY-e.target.offsetTop;

        let ripple=document.createElement("span");

        ripple.style.left=x+"px";

        ripple.style.top=y+"px";

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(()=>{

            ripple.remove();

        },600);

    });

});


// =========================
// Scroll To Top Button
// =========================

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.className="topBtn";

document.body.appendChild(topBtn);


window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topBtn.style.display="block";

    }

    else{

        topBtn.style.display="none";

    }

});


topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});


// =========================
// Active Navigation
// =========================

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const sectionTop=section.offsetTop-120;

        const sectionHeight=section.clientHeight;

        if(pageYOffset>=sectionTop){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });

});


// =========================
// Welcome Message
// =========================

window.onload=function(){

    console.log("Welcome to SmartCare");

};


// =========================
// Get Started Button
// =========================

const startBtn=document.querySelector(".btn-primary");

if(startBtn){

startBtn.addEventListener("click",function(){

    window.location.href="register.html";

});

}


// =========================
// Learn More Button
// =========================

const learnBtn=document.querySelector(".btn-secondary");

if(learnBtn){

learnBtn.addEventListener("click",function(e){

    e.preventDefault();

    document.querySelector("#services").scrollIntoView({

        behavior:"smooth"

    });

});

}


// =========================
// Floating Hero Image
// =========================

const heroImage=document.querySelector(".hero-right img");

if(heroImage){

setInterval(()=>{

    heroImage.classList.toggle("float");

},2000);

}