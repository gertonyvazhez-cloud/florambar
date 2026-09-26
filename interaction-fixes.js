(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
function openFromCatalogImage(e){const img=e.target?.closest?.('#catalog-grid .product-image-wrap img[data-id]');if(!img)return;e.preventDefault();e.stopPropagation();const id=Number(img.dataset.id);if(Number.isFinite(id)&&typeof openModal==='function'){openModal(id);syncUI();requestAnimationFrame(positionProductNav)}}
document.addEventListener('click',openFromCatalogImage,true);
function syncUI(){const open=$('#product-modal')?.classList.contains('show');const agro=$('#fl-agro-viewer')?.classList.contains('open');const menu=$('#menu-toggle');if(menu){if(open||agro){menu.style.setProperty('display','none','important');menu.style.setProperty('visibility','hidden','important')}else{menu.style.removeProperty('display');menu.style.removeProperty('visibility')}}document.body.classList.toggle('fl-product-open',!!open)}
function buildCleanProductNav(){const modal=$('#product-modal'),box=modal?.querySelector('.modal-box');if(!box)return;if(!$('#fl-clean-nav-style')){const st=document.createElement('style');st.id='fl-clean-nav-style';st.textContent=`#catalog-grid .product-image-wrap img{cursor:pointer!important;touch-action:manipulation!important}#product-modal #ficha-navigation{display:none!important}body.fl-product-open .catalog-carousel-controls,body.fl-product-open .catalog-arrow{visibility:hidden!important;opacity:0!important;pointer-events:none!important}#product-modal .modal-box{position:relative!important}#product-modal #modal-image{position:relative!important;z-index:1!important}#fl-clean-prev,#fl-clean-next{position:absolute!important;width:50px!important;height:50px!important;border:0!important;border-radius:50%!important;background:rgba(255,255,255,.96)!important;color:#087247!important;font-size:35px!important;font-weight:900!important;line-height:1!important;z-index:10020!important;box-shadow:0 4px 18px #0004!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0 0 4px!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;transform:translateY(-50%)!important}#fl-clean-prev{left:14px!important}#fl-clean-next{right:14px!important}@media(max-width:700px){#fl-clean-prev,#fl-clean-next{width:46px!important;height:46px!important;font-size:32px!important}#fl-clean-prev{left:12px!important}#fl-clean-next{right:12px!important}}`;document.head.appendChild(st)}if(!$('#fl-clean-prev',box)){const prev=document.createElement('button'),next=document.createElement('button');prev.id='fl-clean-prev';next.id='fl-clean-next';prev.type=next.type='button';prev.textContent='‹';next.textContent='›';prev.setAttribute('aria-label','Variedad anterior');next.setAttribute('aria-label','Siguiente variedad');box.append(prev,next);const move=(dir,e)=>{e.preventDefault();e.stopPropagation();if(typeof cambiarFicha==='function')cambiarFicha(dir)};prev.addEventListener('click',e=>move(-1,e),true);next.addEventListener('click',e=>move(1,e),true)}positionProductNav()}
function positionProductNav(){const box=$('#product-modal .modal-box'),img=$('#modal-image'),prev=$('#fl-clean-prev',box),next=$('#fl-clean-next',box);if(!box||!img||!prev||!next)return;const top=img.offsetTop+(img.offsetHeight/2);prev.style.setProperty('top',top+'px','important');next.style.setProperty('top',top+'px','important')}
window.addEventListener('resize',positionProductNav,{passive:true});

/* Visor premium de Agroproductos: conserva el collage original, mejora presentación y navegación. */
const AGRO_SRC='a_clean_well_lit_product_showcase_collage_adverti.png';
const AGRO=[
 {name:'AGR • ABONO',benefit:'Fertiliza y favorece una mejor floración',pos:'0% 0%'},
 {name:'AGR • BRILLO',benefit:'Realza el aspecto natural de tus plantas',pos:'50% 0%'},
 {name:'AGR • GARDEN',benefit:'Cuidado práctico para jardín y plantas',pos:'100% 0%'},
 {name:'AGR • FUNGICIDA',benefit:'Apoyo para la protección de tus plantas',pos:'0% 100%'},
 {name:'AGR • ABONO Orgánico',benefit:'Nutrición para un crecimiento saludable',pos:'50% 100%'},
 {name:'Todos los Agroproductos Florambar',benefit:'Conoce nuestra línea para el cuidado de tus plantas',all:true}
];
let viewer=null,index=0,touchX=null;
function buildViewer(){
 if(viewer)return;
 const st=document.createElement('style');st.id='fl-agro-premium-style';st.textContent=`
 #fl-agro-viewer{display:none;position:fixed;inset:0;z-index:2147483647;background:rgba(1,24,15,.88);backdrop-filter:blur(5px);-webkit-backdrop-filter:blur(5px);align-items:center;justify-content:center;padding:18px}
 #fl-agro-viewer.open{display:flex}
 .fl-agro-card{position:relative;width:min(92vw,430px);max-height:88vh;background:#fff;border-radius:26px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.48);display:flex;flex-direction:column}
 .fl-agro-media{position:relative;width:100%;aspect-ratio:4/5;background:#eef4ef;overflow:hidden;flex:0 1 auto;min-height:0}
 .fl-agro-stage{position:absolute;inset:0;background:#fff center/contain no-repeat;transition:opacity .16s ease}
 .fl-agro-stage.single{background-image:url('${AGRO_SRC}');background-size:300% 200%;background-repeat:no-repeat}
 .fl-agro-stage.all{background-image:url('${AGRO_SRC}');background-size:contain;background-position:center;background-repeat:no-repeat}
 .fl-agro-close{position:absolute;right:12px;top:12px;width:40px;height:40px;border:0;border-radius:50%;background:rgba(255,255,255,.94);color:#075b38;box-shadow:0 3px 14px #0003;font-size:25px;font-weight:900;z-index:5;display:grid;place-items:center}
 .fl-agro-prev,.fl-agro-next{position:absolute;top:50%;transform:translateY(-50%);width:42px;height:42px;border:0;border-radius:50%;background:rgba(255,255,255,.88);color:#087247;box-shadow:0 3px 13px #0003;font-size:29px;font-weight:900;z-index:4;display:grid;place-items:center;line-height:1}
 .fl-agro-prev{left:10px}.fl-agro-next{right:10px}
 .fl-agro-info{padding:15px 18px 17px;background:#fff;text-align:left}
 .fl-agro-label{font-size:20px;line-height:1.15;color:#075b38;font-weight:900;margin:0 0 5px}
 .fl-agro-benefit{font-size:13px;line-height:1.35;color:#5e6c64;margin:0 0 11px}
 .fl-agro-bottom{display:flex;align-items:center;justify-content:space-between;gap:12px}
 .fl-agro-dots{display:flex;align-items:center;gap:6px;min-height:20px}
 .fl-agro-dot{width:7px;height:7px;border:0;border-radius:50%;padding:0;background:#c7d5cd;transition:.2s}
 .fl-agro-dot.active{width:20px;border-radius:10px;background:#087247}
 .fl-agro-wa{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;border-radius:999px;background:#087247;color:#fff;padding:10px 14px;font-size:12px;font-weight:900;white-space:nowrap}
 @media(max-width:700px){#fl-agro-viewer{padding:14px}.fl-agro-card{width:min(92vw,390px);max-height:84vh;border-radius:23px}.fl-agro-media{aspect-ratio:1/1.18}.fl-agro-prev,.fl-agro-next{width:38px;height:38px;font-size:26px;background:rgba(255,255,255,.82)}.fl-agro-prev{left:8px}.fl-agro-next{right:8px}.fl-agro-close{width:38px;height:38px;right:10px;top:10px}.fl-agro-info{padding:13px 16px 15px}.fl-agro-label{font-size:18px}.fl-agro-benefit{font-size:12.5px;margin-bottom:10px}.fl-agro-wa{padding:9px 12px;font-size:11.5px}}
 @media(max-height:700px){.fl-agro-card{max-height:91vh}.fl-agro-media{aspect-ratio:1/1}.fl-agro-info{padding-top:10px;padding-bottom:11px}}
 `;document.head.appendChild(st);
 viewer=document.createElement('div');viewer.id='fl-agro-viewer';viewer.innerHTML=`<div class="fl-agro-card"><div class="fl-agro-media"><div class="fl-agro-stage"></div><button class="fl-agro-close" type="button" aria-label="Cerrar">×</button><button class="fl-agro-prev" type="button" aria-label="Anterior">‹</button><button class="fl-agro-next" type="button" aria-label="Siguiente">›</button></div><div class="fl-agro-info"><div class="fl-agro-label"></div><p class="fl-agro-benefit"></p><div class="fl-agro-bottom"><div class="fl-agro-dots"></div><a class="fl-agro-wa" href="https://wa.me/527123294890?text=Hola%20Florambar,%20me%20interesa%20un%20agroproducto" target="_blank" rel="noopener">💬 Pedir por WhatsApp</a></div></div></div>`;
 document.body.appendChild(viewer);
 $('.fl-agro-close',viewer).onclick=closeAgro;
 $('.fl-agro-prev',viewer).onclick=e=>{e.stopPropagation();moveAgro(-1)};
 $('.fl-agro-next',viewer).onclick=e=>{e.stopPropagation();moveAgro(1)};
 viewer.onclick=e=>{if(e.target===viewer)closeAgro()};
 const media=$('.fl-agro-media',viewer);
 media.addEventListener('touchstart',e=>{touchX=e.changedTouches[0].clientX},{passive:true});
 media.addEventListener('touchend',e=>{if(touchX===null)return;const dx=e.changedTouches[0].clientX-touchX;touchX=null;if(Math.abs(dx)>45)moveAgro(dx<0?1:-1)},{passive:true});
}
function closeAgro(){viewer?.classList.remove('open');syncUI()}
function moveAgro(dir){index=(index+dir+AGRO.length)%AGRO.length;renderAgro()}
function renderAgro(){
 const item=AGRO[index],stage=$('.fl-agro-stage',viewer);
 stage.className='fl-agro-stage '+(item.all?'all':'single');stage.style.backgroundPosition=item.all?'center':item.pos;
 $('.fl-agro-label',viewer).textContent=item.name;$('.fl-agro-benefit',viewer).textContent=item.benefit;
 const dots=$('.fl-agro-dots',viewer);dots.innerHTML=AGRO.map((_,i)=>`<button class="fl-agro-dot${i===index?' active':''}" type="button" aria-label="Ver producto ${i+1}" data-agro-dot="${i}"></button>`).join('');
 dots.querySelectorAll('[data-agro-dot]').forEach(b=>b.onclick=e=>{e.stopPropagation();index=Number(b.dataset.agroDot);renderAgro()});
 const wa=$('.fl-agro-wa',viewer);wa.href='https://wa.me/527123294890?text='+encodeURIComponent('Hola Florambar, me interesa '+item.name+'. ¿Me pueden dar información?');
}
function bindAgro(){buildViewer();const b=$('#agro-open');if(!b||b.dataset.cleanBound==='1')return;b.dataset.cleanBound='1';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();index=0;renderAgro();viewer.classList.add('open');syncUI()},true)}
function init(){bindAgro();buildCleanProductNav();syncUI();const mi=$('#modal-image');if(mi)mi.addEventListener('load',positionProductNav)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
new MutationObserver(()=>{bindAgro();buildCleanProductNav();syncUI();requestAnimationFrame(positionProductNav)}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','src']});
})();