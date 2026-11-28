document.querySelectorAll('.year').forEach(el=>el.textContent=new Date().getFullYear());

const button=document.querySelector('.menu-btn');
const navMenu=document.querySelector('.nav');
if(button&&navMenu){
  button.addEventListener('click',()=>{
    const isOpen=navMenu.classList.toggle('open');
    button.setAttribute('aria-expanded',String(isOpen));
    button.setAttribute('aria-label',isOpen?'Close menu':'Open menu');
  });
  navMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    navMenu.classList.remove('open');
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-label','Open menu');
  }));
}

const lb=document.querySelector('.lightbox');
if(lb){
  const im=lb.querySelector('img'),cap=lb.querySelector('p'),x=lb.querySelector('.lb-close');
  let from=null;
  const close=()=>{lb.hidden=true;im.src='';if(from)from.focus();};
  document.querySelectorAll('[data-full]').forEach(b=>b.addEventListener('click',()=>{
    from=b;im.src=b.dataset.full;im.alt=b.dataset.title;cap.textContent=b.dataset.title;lb.hidden=false;x.focus();
  }));
  lb.addEventListener('click',e=>{if(e.target!==im)close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)close();});
}

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header=document.querySelector('.header');
const progress=document.createElement('div');
progress.className='scroll-progress';
progress.innerHTML='<span></span>';
document.body.prepend(progress);
const progressBar=progress.firstElementChild;
const topButton=document.createElement('button');
topButton.className='back-to-top';
topButton.type='button';
topButton.setAttribute('aria-label','Back to top');
topButton.textContent='↑';
document.body.append(topButton);
topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:reduceMotion?'auto':'smooth'}));

const updateScrollUI=()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  const ratio=max>0?window.scrollY/max:0;
  progressBar.style.transform='scaleX('+ratio+')';
  header?.classList.toggle('scrolled',window.scrollY>12);
  topButton.classList.toggle('visible',window.scrollY>500);
};
window.addEventListener('scroll',updateScrollUI,{passive:true});
updateScrollUI();

if(!reduceMotion&&'IntersectionObserver' in window){
  const revealTargets=document.querySelectorAll('.hero-copy,.hero-visual,.metric-grid>div,.section-heading,.intro-grid,.cert-card,.project-card,.page-hero,.contact-hero,.split-section,.values-grid article,.timeline article,.skill-card,.contact-layout,.language-strip,.feature-inner');
  document.body.classList.add('reveal-ready');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
    });
  },{threshold:.12,rootMargin:'0px 0px -35px 0px'});
  revealTargets.forEach((el,i)=>{
    el.dataset.reveal='';
    el.style.transitionDelay=(i%4)*75+'ms';
    observer.observe(el);
  });
}
