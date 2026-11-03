/* Optional install shortcut; each app carries its own manifest ID and start URL. */
(function(){
'use strict';
if(window.matchMedia('(display-mode: standalone)').matches||navigator.standalone)return;
let event=null,button=null;
function show(){
 if(!event)return;
 if(!button){
   button=document.createElement('button');button.type='button';button.textContent='↓ Uygulamayı yükle';
   button.setAttribute('aria-label','Bu uygulamayı ayrı olarak telefona yükle');
   Object.assign(button.style,{position:'fixed',right:'14px',bottom:'14px',zIndex:'3000',background:'#ecfff4',color:'#14392a',font:'600 13px system-ui,sans-serif',padding:'10px 13px',border:'1px solid #79b59a',borderRadius:'999px',boxShadow:'0 4px 16px #0005',cursor:'pointer'});
   button.addEventListener('click',async()=>{if(!event)return;const current=event;event=null;button.hidden=true;try{await current.prompt();await current.userChoice}catch(e){console.warn('Yükleme istemi açılamadı',e)}});
   document.body.append(button);
 }
 button.hidden=false;
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();event=e;show()});
window.addEventListener('appinstalled',()=>{event=null;if(button)button.remove()});
})();
