(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];

/* PLANTAS: tocar exactamente la foto abre la misma ficha que Ver ficha.
   Captura antes de otros listeners para que nunca active Favoritos. */
document.addEventListener('click',function(e){
 const img=e.target.closest('#catalog-grid .product-image-wrap > img[data-id]');
 if(!img)return;
 e.preventDefault();
 e.stopPropagation();
 e.stopImmediatePropagation();
 const card=img.closest('.product-card');
 const view=card&&card.querySelector('[data-view]');
 if(view){ view.click(); }
},true);

document.addEventListener('touchend',function(e){
 const img=e.target.closest&&e.target.closest('#catalog-grid .product-image-wrap > img[data-id]');
 if(!img)return;
 e.preventDefault();
 const card=img.closest('.product-card');
 const view=card&&card.querySelector('[data-view]');
 if(view)view.click();
},{capture:true,passive:false});

/* AGROPRODUCTOS: visor independiente, no depende de clases del catálogo. */
let agroViewer=null, agroStage=null, agroCount=null, agroIndex=0;
const agroSrc='a_clean_well_lit_product_showcase_collage_adverti.png';
const agroSlides=[
 {title:'AGR • ABONO',size:'300% 200%',pos:'0% 0%'},
 {title:'AGR • BRILLO',size:'300% 200%',pos:'50% 0%'},
 {title:'AGR • GARDEN',size:'300% 200%',pos:'100% 0%'},
 {title:'AGR • FUNGICIDA',size:'300% 200%',pos:'0% 100%'},
 {title:'AGR • ABONO',size:'300% 200%',pos:'50% 100%'},
 {title:'Todos los Agroproductos Florambar',size:'contain',pos:'center'}
];
function buildAgroViewer(){
 if(agroViewer)return;
 const style=document.createElement('style');
 style.textContent=`#fl-agro-viewer{display:none;position:fixed;inset:0;z-index:2147483647;background:rgba(3,20,12,.94);align-items:center;justify-content:center;padding:12px}#fl-agro-viewer.open{display:flex}.fl-agro-box{position:relative;width:min(760px,96vw);height:min(800px,86vh);background:#fff;border-radius:22px;overflow:hidden}.fl-agro-stage{width:100%;height:100%;background-color:#fff;background-repeat:no-repeat}.fl-agro-title{position:absolute;top:14px;left:14px;z-index:3;background:#fff;color:#075b38;padding:8px 13px;border-radius:99px;font-weight:900}.fl-agro-close,.fl-agro-prev,.fl-agro-next{position:absolute;z-index:4;border:0;border-radius:50%;background:#fff;color:#075b38;box-shadow:0 3px 15px #0005}.fl-agro-close{right:12px;top:12px;width:44px;height:44px;font-size:28px}.fl-agro-prev,.fl-agro-next{top:50%;transform:translateY(-50%);width:50px;height:50px;font-size:38px}.fl-agro-prev{left:8px}.fl-agro-next{right:8px}.fl-agro-count{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);z-index:3;background:#075b38;color:#fff;padding:8px 14px;border-radius:99px;font-weight:800}#productos-cuidado .care-products-image-btn,#productos-cuidado .care-products-image-btn img{cursor:pointer;touch-action:manipulation}`;
 document.head.appendChild(style);
 agroViewer=document.createElement('div');
 agroViewer.id='fl-agro-viewer';
 agroViewer.innerHTML='<div class="fl-agro-box"><div class="fl-agro-title"></div><button class="fl-agro-close" type="button">×</button><button class="fl-agro-prev" type="button">‹</button><div class="fl-agro-stage"></div><button class="fl-agro-next" type="button">›</button><div class="fl-agro-count"></div></div>';
 document.body.appendChild(agroViewer);
 agroStage=$('.fl-agro-stage',agroViewer); agroCount=$('.fl-agro-count',agroViewer);
 $('.fl-agro-close',agroViewer).onclick=()=>agroViewer.classList.remove('open');
 $('.fl-agro-prev',agroViewer).onclick=()=>{agroIndex=(agroIndex-1+agroSlides.length)%agroSlides.length;paintAgro()};
 $('.fl-agro-next',agroViewer).onclick=()=>{agroIndex=(agroIndex+1)%agroSlides.length;paintAgro()};
 agroViewer.addEventListener('click',e=>{if(e.target===agroViewer)agroViewer.classList.remove('open')});
}
function paintAgro(){
 buildAgroViewer(); const s=agroSlides[agroIndex];
 agroStage.style.backgroundImage=`url("${agroSrc}")`;
 agroStage.style.backgroundSize=s.size; agroStage.style.backgroundPosition=s.pos;
 $('.fl-agro-title',agroViewer).textContent=s.title;
 agroCount.textContent=`${agroIndex+1} / ${agroSlides.length}`;
 agroViewer.classList.add('open');
}
function openAgro(){agroIndex=0;paintAgro()}
function bindAgro(){
 const b=$('#agro-open'); if(!b||b.dataset.fixedAgro==='1')return;
 b.dataset.fixedAgro='1';
 b.onclick=function(e){e.preventDefault();e.stopPropagation();openAgro()};
 const im=$('img',b); if(im)im.onclick=function(e){e.preventDefault();e.stopPropagation();openAgro()};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{buildAgroViewer();bindAgro()},{once:true});else{buildAgroViewer();bindAgro()}
new MutationObserver(bindAgro).observe(document.documentElement,{childList:true,subtree:true});
document.addEventListener('keydown',e=>{if(!agroViewer||!agroViewer.classList.contains('open'))return;if(e.key==='Escape')agroViewer.classList.remove('open');if(e.key==='ArrowLeft'){agroIndex=(agroIndex-1+agroSlides.length)%agroSlides.length;paintAgro()}if(e.key==='ArrowRight'){agroIndex=(agroIndex+1)%agroSlides.length;paintAgro()}});
})();