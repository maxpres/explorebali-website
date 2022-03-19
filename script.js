let controller = new ScrollMagic.Controller();

let timeline = new TimelineMax();

// === OVERLAY=== //

TweenMax.to('.bg', 3.5, {
  delay: 2.75,
  // top: "0%",
  opacity: 1,
  ease: Expo.easeInOut,
});

// === SVG ANIMATION DASH BERECHNUNG == //

const logo = document.querySelectorAll('#logo path');
const logo2 = document.querySelectorAll('#logo2 path');

for (let i = 0; i < logo.length; i++) {
  // console.log(`letter ${i} is ${logo[i].getTotalLength()}`);
}

// === ELEMTE FLIEGEN EIN === //

TweenMax.staggerTo(
  'nav ul li',
  0.7,
  {
    delay: 4.75,
    y: 0,
    ease: Expo.easeInOut,
    opacity: 1,
  },
  0.27
);

TweenMax.staggerTo(
  '.social-media i',
  1,
  {
    delay: 5.75,
    opacity: 1,
    y: 30,
    ease: Expo.easeInOut,
  },
  0.27
);

TweenMax.to('.bars', 1, {
  delay: 4.75,
  opacity: 1,
  y: 5,
  ease: Expo.easeInOut,
});

TweenMax.to('.scrolldown', 2, {
  delay: 6,
  opacity: 0,
  y: -50,
  opacity: 1,
  margin: 'auto',
  ease: Expo.easeInOut,
});

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.second-title',
    start: '-100%',
    end: '20%',
    scrub: 1.5,
  },
});

tl.fromTo('.social-media', { right: '5%' }, { right: '5%', opacity: 0 });

let tl6 = gsap.timeline({
  scrollTrigger: {
    trigger: '.second-title',
    start: '-100%',
    end: '20%',
    scrub: 1.5,
  },
});

tl6.fromTo('.scrolldown', { bottom: '5%' }, { bottom: '5%', opacity: 0 });

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: 'nav', //Startpunkt
    start: 'top',
    end: '20%',
    scrub: 1.5, //Geschwindigkeit der Elemente
  },
});

tl3.fromTo('.main-title', { x: '0' }, { x: '150', skewX: '10deg', opacity: 0 });

let tl4 = gsap.timeline({
  scrollTrigger: {
    trigger: 'nav', //Startpunkt
    start: 'top',
    end: '20%',
    scrub: 1.5, //Geschwindigkeit der Elemente
  },
});

tl4.fromTo(
  '.second-title',
  { x: '0' },
  { x: '-150', skewX: '-10deg', opacity: 0 }
);

const bars = document.querySelector('.bars');
const navLinks = document.querySelectorAll('.ulhide li');
const ulhide = document.querySelector('.ulhide');

const navSlide = () => {
  ulhide.classList.toggle('nav-active');
  bars.classList.toggle('toggle');
};

bars.onclick = function () {
  bars.classList.toggle('active');
  navSlide();
};

document.onclick = function (e) {
  if (e.target.id !== 'barsid' && e.target.id !== 'ullist') {
    ulhide.classList.remove('nav-active');
    bars.classList.remove('active');
  }
};

const swiper = new Swiper('.swiper-container', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  coverflowEffect: {
    rotate: 20,
    stretch: 0,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: '.swiper-pagination',
  },
});

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset > sectionTop - sectionHeight / 16) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.classList.contains(current)) {
      link.classList.add('active');
    }
  });
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

//=====COUNTER=====///

const observer = new IntersectionObserver(onIntersection, {
  root: null,
  threshold: 0.5,
});
let oberserverindex = 0;

observer.observe(document.querySelector('.info-section'));

function onIntersection(entries) {
  const [entry] = entries;
  // console.log(entry);

  if (entry.isIntersecting) {
    oberserverindex++;
    console.log(oberserverindex);
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
      counter.innerText = '0';

      const updateCounter = () => {
        const target = +counter.getAttribute('data-target');

        const c = +counter.innerText;

        const increment = target / 400;

        if (c < target) {
          counter.innerText = `${Math.ceil(c + increment)}`;
          setTimeout(updateCounter, 1);
        } else {
          counter.innerText = target;
        }
      };
      updateCounter();
    });
  } else if (oberserverindex === 1) {
    observer.unobserve(entry.target);
  }
}

//===========================================================//
const navHeight = nav.getBoundingClientRect().height;
const scroll = document.querySelector('.scrollTop');

// console.log(navHeight); //55.927
const navobserver = new IntersectionObserver(onNavIntersection, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

navobserver.observe(document.querySelector('.container'));

function onNavIntersection(entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
    scroll.classList.add('active');
  } else {
    nav.classList.remove('sticky');
    scroll.classList.remove('active');
  }
}

//===============Reveal Section============================//

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.35,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section-hidden');
});

//=========SCROLL TO SECTION====

const navlinks = document.querySelectorAll('.navlink');

navlinks.forEach(function (navlink) {
  navlink.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  });
});
