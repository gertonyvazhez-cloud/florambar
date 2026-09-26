(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);

/* Abrir ficha al tocar la foto. Solo click: evita el doble evento touchend + click en iPhone. */
function openFromCatalogImage(e){
 const img=e.target?.closest?.('#catalog-grid .product-image-wrap img[data-id]');
 if(!img)return;
 e.preventDefault();
 e.stopPropagation();
 const id=Number(img.dataset.id);
 if(Number.isFinite(id)&&typeof openModal==='function'){
  openModal(id);
  syncUI();
  requestAnimationFrame(positionProductNav);
 }
}
document.addEventListener('click',openFromCatalogImage,true);

function syncUI(){
 const open=$('#product-modal')?.classList.contains('show');
 const agro=$('#fl-agro-viewer')?.classList.contains('open');
 const menu=$('#menu-toggle');
 if(menu){if(open||agro){menu.style.setProperty('display','none','important');menu.style.setProperty('visibility','hidden','important')}else{menu.style.removeProperty('display');menu.style.removeProperty('visibility')}}
 document.body.classList.toggle('fl-product-open',!!open);
}

/* Una sola pareja de flechas, centradas verticalmente sobre la foto de la ficha. */
function buildCleanProductNav(){
 const modal=$('#product-modal'),box=modal?.querySelector('.modal-box');if(!box)return;
 if(!$('#fl-clean-nav-style')){const st=document.createElement('style');st.id='fl-clean-nav-style';st.textContent=`
 #catalog-grid .product-image-wrap img{cursor:pointer!important;touch-action:manipulation!important}
 #product-modal #ficha-navigation{display:none!important}
 body.fl-product-open .catalog-carousel-controls,body.fl-product-open .catalog-arrow{visibility:hidden!important;opacity:0!important;pointer-events:none!important}
 #product-modal .modal-box{position:relative!important}
 #product-modal #modal-image{position:relative!important;z-index:1!important}
 #fl-clean-prev,#fl-clean-next{position:absolute!important;width:50px!important;height:50px!important;border:0!important;border-radius:50%!important;background:rgba(255,255,255,.96)!important;color:#087247!important;font-size:35px!important;font-weight:900!important;line-height:1!important;z-index:10020!important;box-shadow:0 4px 18px #0004!important;display:flex!important;align-items:center!important;justify-content:center!important;padding:0 0 4px!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;transform:translateY(-50%)!important}
 #fl-clean-prev{left:14px!important}#fl-clean-next{right:14px!important}
 @media(max-width:700px){#fl-clean-prev,#fl-clean-next{width:46px!important;height:46px!important;font-size:32px!important}#fl-clean-prev{left:12px!important}#fl-clean-next{right:12px!important}}
 `;document.head.appendChild(st)}
 if(!$('#fl-clean-prev',box)){
  const prev=document.createElement('button'),next=document.createElement('button');prev.id='fl-clean-prev';next.id='fl-clean-next';prev.type=next.type='button';prev.textContent='‹';next.textContent='›';prev.setAttribute('aria-label','Variedad anterior');next.setAttribute('aria-label','Siguiente variedad');box.append(prev,next);
  const move=(dir,e)=>{e.preventDefault();e.stopPropagation();if(typeof cambiarFicha==='function')cambiarFicha(dir)};
  prev.addEventListener('click',e=>move(-1,e),true);next.addEventListener('click',e=>move(1,e),true);
 }
 positionProductNav();
}
function positionProductNav(){
 const box=$('#product-modal .modal-box'),img=$('#modal-image'),prev=$('#fl-clean-prev',box),next=$('#fl-clean-next',box);if(!box||!img||!prev||!next)return;
 const top=img.offsetTop+(img.offsetHeight/2);
 prev.style.setProperty('top',top+'px','important');next.style.setProperty('top',top+'px','important');
}
window.addEventListener('resize',positionProductNav,{passive:true});

/* Agroproductos. */
const AGRO_SRC='a_clean_well_lit_product_showcase_collage_adverti.png';
const AGRO=[{name:'AGR • ABONO',pos:'0% 0%'},{name:'AGR • BRILLO',pos:'50% 0%'},{name:'AGR • GARDEN',pos:'100% 0%'},{name:'AGR • FUNGICIDA',pos:'0% 100%'},{name:'AGR • ABONO Orgánico',pos:'50% 100%'},{name:'Todos los Agroproductos Florambar',all:true}];
let viewer=null,index=0;
function buildViewer(){if(viewer)return;const st=document.createElement('style');st.textContent=`#fl-agro-viewer{display:none;position:fixed;inset:0;z-index:2147483647;background:rgba(3,20,12,.94);align-items:center;justify-content:center;padding:22px}#fl-agro-viewer.open{display:flex}.fl-agro-box{position:relative;width:min(390px,76vw);height:min(520px,65vh);background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 20px 60px #0007}.fl-agro-stage{position:absolute;inset:0;background:#fff center/contain no-repeat}.fl-agro-stage.single{background-image:url('${AGRO_SRC}');background-size:300% 200%;background-repeat:no-repeat}.fl-agro-stage.all{background-image:url('${AGRO_SRC}');background-size:contain;background-position:center;background-repeat:no-repeat}.fl-agro-close,.fl-agro-prev,.fl-agro-next{position:absolute;border:0;border-radius:50%;background:#fff;color:#075b38;box-shadow:0 3px 15px #0005;font-weight:900;z-index:3}.fl-agro-close{right:10px;top:10px;width:42px;height:42px;font-size:27px}.fl-agro-prev,.fl-agro-next{top:50%;transform:translateY(-50%);width:42px;height:42px;font-size:29px}.fl-agro-prev{left:8px}.fl-agro-next{right:8px}.fl-agro-label{position:absolute;left:50%;top:14px;transform:translateX(-50%);background:#fff;color:#075b38;padding:8px 14px;border-radius:99px;font-weight:900;z-index:2;white-space:nowrap;max-width:64%;overflow:hidden;text-overflow:ellipsis}.fl-agro-count{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);background:#075b38;color:#fff;padding:7px 12px;border-radius:99px;font-weight:900;z-index:2}@media(max-width:700px){.fl-agro-box{width:72vw;max-width:310px;height:54vh;max-height:480px;min-height:390px}}`;document.head.appendChild(st);viewer=document.createElement('div');viewer.id='fl-agro-viewer';viewer.innerHTML='<div class="fl-agro-box"><div class="fl-agro-stage"></div><div class="fl-agro-label"></div><button class="fl-agro-close" type="button">×</button><button class="fl-agro-prev" type="button">‹</button><button class="fl-agro-next" type="button">›</button><div class="fl-agro-count"></div></div>';document.body.appendChild(viewer);$('.fl-agro-close',viewer).onclick=()=>{viewer.classList.remove('open');syncUI()};$('.fl-agro-prev',viewer).onclick=e=>{e.stopPropagation();index=(index-1+AGRO.length)%AGRO.length;renderAgro()};$('.fl-agro-next',viewer).onclick=e=>{e.stopPropagation();index=(index+1)%AGRO.length;renderAgro()};viewer.onclick=e=>{if(e.target===viewer){viewer.classList.remove('open');syncUI()}}}
function renderAgro(){const item=AGRO[index],stage=$('.fl-agro-stage',viewer);stage.className='fl-agro-stage '+(item.all?'all':'single');stage.style.backgroundPosition=item.all?'center':item.pos;$('.fl-agro-label',viewer).textContent=item.name;$('.fl-agro-count',viewer).textContent=(index+1)+' / '+AGRO.length}
function bindAgro(){buildViewer();const b=$('#agro-open');if(!b||b.dataset.cleanBound==='1')return;b.dataset.cleanBound='1';b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();index=0;renderAgro();viewer.classList.add('open');syncUI()},true)}
function init(){bindAgro();buildCleanProductNav();syncUI();const mi=$('#modal-image');if(mi)mi.addEventListener('load',positionProductNav)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
new MutationObserver(()=>{bindAgro();buildCleanProductNav();syncUI();requestAnimationFrame(positionProductNav)}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','src']});
})();