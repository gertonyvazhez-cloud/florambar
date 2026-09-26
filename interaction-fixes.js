(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);

/*
  Corrección puntual del catálogo:
  - tocar/click en la FOTO abre la ficha técnica;
  - el corazón conserva exclusivamente la función de favorito;
  - no se crean flechas adicionales: se usan #ficha-prev y #ficha-next de script.js.
*/
function getProductFromEvent(e){
 const target=e.target;
 if(!target||!target.closest)return null;
 const wrap=target.closest('#catalog-grid .product-image-wrap');
 if(!wrap)return null;
 if(target.closest('button,a,.favorite,.fav-btn,[data-fav],[data-favorite],[data-add],[data-view]'))return null;
 const img=wrap.querySelector('img[data-id]');
 if(!img)return null;
 const id=Number(img.dataset.id);
 return Number.isFinite(id)?id:null;
}

function openFromImage(e){
 const id=getProductFromEvent(e);
 if(id===null)return;
 e.preventDefault();
 e.stopPropagation();
 if(typeof e.stopImmediatePropagation==='function')e.stopImmediatePropagation();
 if(typeof openModal==='function'){
  openModal(id);
  syncMenuVisibility();
 }
}

/* click funciona en escritorio y también con el click sintetizado de iOS/Safari. */
document.addEventListener('click',openFromImage,true);

/* Evita que un gesto táctil sobre la foto termine activando el corazón por propagación. */
document.addEventListener('touchend',e=>{
 const id=getProductFromEvent(e);
 if(id===null)return;
 e.preventDefault();
 e.stopPropagation();
 if(typeof e.stopImmediatePropagation==='function')e.stopImmediatePropagation();
 if(typeof openModal==='function'){
  openModal(id);
  syncMenuVisibility();
 }
},{capture:true,passive:false});

function syncMenuVisibility(){
 const menu=$('#menu-toggle');
 if(!menu)return;
 const productOpen=$('#product-modal')?.classList.contains('show');
 const agroOpen=$('#fl-agro-viewer')?.classList.contains('open');
 if(productOpen||agroOpen){
  menu.style.setProperty('display','none','important');
  menu.style.setProperty('visibility','hidden','important');
  menu.style.setProperty('pointer-events','none','important');
 }else{
  menu.style.removeProperty('display');
  menu.style.removeProperty('visibility');
  menu.style.removeProperty('pointer-events');
 }
}

const AGRO_SRC='a_clean_well_lit_product_showcase_collage_adverti.png';
const AGRO=[
 {name:'AGR • ABONO',pos:'0% 0%'},
 {name:'AGR • BRILLO',pos:'50% 0%'},
 {name:'AGR • GARDEN',pos:'100% 0%'},
 {name:'AGR • FUNGICIDA',pos:'0% 100%'},
 {name:'AGR • ABONO Orgánico',pos:'50% 100%'},
 {name:'Todos los Agroproductos Florambar',all:true}
];
let viewer=null,index=0;

function buildViewer(){
 if(viewer)return;
 const st=document.createElement('style');
 st.textContent=`
 #fl-agro-viewer{display:none;position:fixed;inset:0;z-index:2147483647;background:rgba(3,20,12,.94);align-items:center;justify-content:center;padding:22px}
 #fl-agro-viewer.open{display:flex}
 body:has(#fl-agro-viewer.open) #menu-toggle,body:has(#product-modal.show) #menu-toggle{display:none!important;visibility:hidden!important;pointer-events:none!important}
 #catalog-grid .product-image-wrap,#catalog-grid .product-image-wrap img{cursor:pointer;touch-action:manipulation}
 .fl-agro-box{position:relative;width:min(390px,76vw);height:min(520px,65vh);background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 20px 60px #0007}
 .fl-agro-stage{position:absolute;inset:0;background:#fff center/contain no-repeat}
 .fl-agro-stage.single{background-image:url('${AGRO_SRC}');background-size:300% 200%;background-repeat:no-repeat}
 .fl-agro-stage.all{background-image:url('${AGRO_SRC}');background-size:contain;background-position:center;background-repeat:no-repeat}
 .fl-agro-close,.fl-agro-prev,.fl-agro-next{position:absolute;border:0;border-radius:50%;background:#fff;color:#075b38;box-shadow:0 3px 15px #0005;font-weight:900;z-index:3}
 .fl-agro-close{right:10px;top:10px;width:42px;height:42px;font-size:27px}
 .fl-agro-prev,.fl-agro-next{top:50%;transform:translateY(-50%);width:42px;height:42px;font-size:29px}
 .fl-agro-prev{left:8px}.fl-agro-next{right:8px}
 .fl-agro-label{position:absolute;left:50%;top:14px;transform:translateX(-50%);background:#fff;color:#075b38;padding:8px 14px;border-radius:99px;font-weight:900;z-index:2;white-space:nowrap;max-width:64%;overflow:hidden;text-overflow:ellipsis}
 .fl-agro-count{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);background:#075b38;color:#fff;padding:7px 12px;border-radius:99px;font-weight:900;z-index:2}
 @media(max-width:700px){.fl-agro-box{width:72vw;max-width:310px;height:54vh;max-height:480px;min-height:390px}.fl-agro-label{font-size:13px;top:11px;padding:7px 12px}.fl-agro-close{width:38px;height:38px;font-size:24px}.fl-agro-prev,.fl-agro-next{width:38px;height:38px;font-size:26px}.fl-agro-count{font-size:13px;padding:6px 10px}}
 `;
 document.head.appendChild(st);
 viewer=document.createElement('div');
 viewer.id='fl-agro-viewer';
 viewer.innerHTML='<div class="fl-agro-box"><div class="fl-agro-stage"></div><div class="fl-agro-label"></div><button class="fl-agro-close" type="button">×</button><button class="fl-agro-prev" type="button" aria-label="Anterior">‹</button><button class="fl-agro-next" type="button" aria-label="Siguiente">›</button><div class="fl-agro-count"></div></div>';
 document.body.appendChild(viewer);
 $('.fl-agro-close',viewer).onclick=()=>{viewer.classList.remove('open');syncMenuVisibility()};
 $('.fl-agro-prev',viewer).onclick=e=>{e.preventDefault();e.stopPropagation();index=(index-1+AGRO.length)%AGRO.length;renderAgro()};
 $('.fl-agro-next',viewer).onclick=e=>{e.preventDefault();e.stopPropagation();index=(index+1)%AGRO.length;renderAgro()};
 viewer.onclick=e=>{if(e.target===viewer){viewer.classList.remove('open');syncMenuVisibility()}};
}

function renderAgro(){
 const item=AGRO[index],stage=$('.fl-agro-stage',viewer);
 stage.className='fl-agro-stage '+(item.all?'all':'single');
 stage.style.backgroundPosition=item.all?'center':item.pos;
 $('.fl-agro-label',viewer).textContent=item.name;
 $('.fl-agro-count',viewer).textContent=(index+1)+' / '+AGRO.length;
}

function bindAgro(){
 buildViewer();
 const b=$('#agro-open');
 if(!b||b.dataset.cleanBound==='1')return;
 b.dataset.cleanBound='1';
 b.addEventListener('click',e=>{
  e.preventDefault();e.stopPropagation();
  index=0;renderAgro();viewer.classList.add('open');syncMenuVisibility();
 },true);
}

function removeLegacyDuplicateArrows(){
 $('#fl-product-prev')?.remove();
 $('#fl-product-next')?.remove();
}

function init(){bindAgro();removeLegacyDuplicateArrows();syncMenuVisibility()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
new MutationObserver(()=>{bindAgro();removeLegacyDuplicateArrows();syncMenuVisibility()}).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
})();