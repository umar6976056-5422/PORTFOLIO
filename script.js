document.querySelectorAll('.year').forEach(el=>el.textContent=new Date().getFullYear());
const button=document.querySelector('.menu-btn');const navMenu=document.querySelector('.nav');
if(button&&navMenu){button.addEventListener('click',()=>{const isOpen=navMenu.classList.toggle('open');button.setAttribute('aria-expanded',String(isOpen));});}

const lb=document.querySelector('.lightbox');
if(lb){const im=lb.querySelector('img'),cap=lb.querySelector('p'),x=lb.querySelector('.lb-close');
let from=null;const close=()=>{lb.hidden=true;im.src='';if(from)from.focus();};
document.querySelectorAll('[data-full]').forEach(b=>b.addEventListener('click',()=>{from=b;im.src=b.dataset.full;im.alt=b.dataset.title;cap.textContent=b.dataset.title;lb.hidden=false;x.focus();}));
lb.addEventListener('click',e=>{if(e.target!==im)close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)close();});}
