document.querySelectorAll('.year').forEach(el=>el.textContent=new Date().getFullYear());
const button=document.querySelector('.menu-btn');const navMenu=document.querySelector('.nav');
if(button&&navMenu){button.addEventListener('click',()=>{const isOpen=navMenu.classList.toggle('open');button.setAttribute('aria-expanded',String(isOpen));});}
