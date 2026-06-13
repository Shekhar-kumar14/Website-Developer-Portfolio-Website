
gsap.registerPlugin(ScrollTrigger);

// CURSOR
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px'});
function animRing(){rx+=(mx-rx)*.1;ry+=(my-ry)*.1;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing)}
animRing();
document.querySelectorAll('a,.btn,.skill-card,.project-card,.cert-card,.contact-link').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.style.width='20px';cursor.style.height='20px';ring.style.width='55px';ring.style.height='55px';ring.style.borderColor='rgba(0,229,195,0.7)'});
  el.addEventListener('mouseleave',()=>{cursor.style.width='12px';cursor.style.height='12px';ring.style.width='36px';ring.style.height='36px';ring.style.borderColor='rgba(0,229,195,0.4)'});
});

// ID CARD — drop in on load
gsap.from('#idCard',{
  opacity:0,
  y:-80,
  duration:1.2,
  ease:'bounce.out',
  delay:1.5
});

// ID CARD — gentle idle swing (pauses when mouse is over)
const idleSwing = gsap.to('#idCard',{
  rotation:4,
  duration:3,
  ease:'sine.inOut',
  repeat:-1,
  yoyo:true,
  transformOrigin:'top center'
});

// ID CARD — 3D tilt follows mouse (desktop only)
const card = document.querySelector('.id-card');
const cardWrap = document.getElementById('idCard');
const isTouch = window.matchMedia('(hover:none) and (pointer:coarse)').matches;

if(!isTouch){
  document.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cardCX = rect.left + rect.width / 2;
    const cardCY = rect.top + rect.height / 2;
    const dx = e.clientX - cardCX;
    const dy = e.clientY - cardCY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const maxDist = 400;
    const factor = Math.min(dist / maxDist, 1);
    const rotX = -(dy / (rect.height / 2)) * 18 * factor;
    const rotY =  (dx / (rect.width  / 2)) * 18 * factor;
    gsap.to(card, {
      rotateX: rotX, rotateY: rotY,
      transformPerspective: 800,
      transformOrigin: 'center center',
      ease: 'power2.out', duration: 0.4, overwrite: 'auto'
    });
    const px = ((e.clientX - rect.left) / rect.width)  * 100;
    const py = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--gx', px + '%');
    card.style.setProperty('--gy', py + '%');
  });
  document.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX:0, rotateY:0, duration:0.8, ease:'elastic.out(1,0.5)' });
  });
  cardWrap.addEventListener('mouseenter', () => idleSwing.pause());
  cardWrap.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX:0, rotateY:0, duration:0.8, ease:'elastic.out(1,0.5)' });
    idleSwing.resume();
  });
}

// HERO ANIMATION
const name = "Shekhar  Jaiswar";
const heroNameEl = document.getElementById('heroName');
heroNameEl.innerHTML = '';
let line1 = document.createElement('div'); line1.style.overflow='hidden';
let line2 = document.createElement('div'); line2.style.overflow='hidden';
'Shekhar'.split('').forEach(c=>{
  let s=document.createElement('span');s.className='char';s.textContent=c==' '?'\u00a0':c;line1.appendChild(s);
});
'Jaiswar'.split('').forEach(c=>{
  let s=document.createElement('span');s.className='char';s.textContent=c==' '?'\u00a0':c;line2.appendChild(s);
});
heroNameEl.appendChild(line1);heroNameEl.appendChild(line2);

const tl = gsap.timeline({defaults:{ease:'power4.out'}});
tl.to('.hero-eyebrow',{opacity:1,y:0,duration:.8},0)
  .to('#heroName .char',{opacity:1,y:0,rotate:0,duration:.8,stagger:.04},0.2)
  .to('.hero-role',{opacity:1,y:0,duration:.7},.9)
  .to('.hero-desc',{opacity:1,y:0,duration:.7},1.1)
  .to('.hero-btns',{opacity:1,y:0,duration:.7},1.3);

// SCROLL ANIMATIONS — plays on enter, reverses on scroll back up
function reveal(selector, vars={}) {
  const els = document.querySelectorAll(selector);
  els.forEach((el, i) => {
    const fromY = vars.y ?? 30;
    const fromX = vars.x ?? 0;
    gsap.set(el, { opacity:0, y:fromY, x:fromX });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      end: 'top 30%',
      onEnter: () => gsap.to(el, { opacity:1, y:0, x:0, duration:.65, delay: i * (vars.stagger ?? .1), ease:'power3.out' }),
      onLeaveBack: () => gsap.to(el, { opacity:0, y:fromY, x:fromX, duration:.4, ease:'power2.in' }),
    });
  });
}
reveal('.skill-card');
reveal('.timeline-item', { x:-20 });
reveal('.project-card', { y:40, stagger:.12 });
reveal('.cert-card', { stagger:.08 });
reveal('.edu-card');

// PARALLAX on hero glows
gsap.to('.hero-glow',{scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1},y:-120});
gsap.to('.hero-glow2',{scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1},y:-60});

// HAMBURGER MENU
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks = document.querySelectorAll('.mob-link');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
  if(isOpen){
    gsap.fromTo(mobLinks,
      {opacity:0, y:30},
      {opacity:1, y:0, duration:.4, stagger:.07, ease:'power3.out', delay:.1}
    );
  }
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nav-links a');
sections.forEach(sec=>{
  ScrollTrigger.create({
    trigger:sec,start:'top 60%',end:'bottom 40%',
    onEnter:()=>setActive(sec.id),
    onEnterBack:()=>setActive(sec.id)
  });
});
function setActive(id){
  navLinks.forEach(a=>{
    a.style.color=a.getAttribute('href')==='#'+id?'var(--cyan)':'';
  });
}
