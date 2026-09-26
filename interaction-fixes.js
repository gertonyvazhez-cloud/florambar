(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);

/* PLANTAS: la imagen abre ficha; SOLO el corazon modifica favoritos. */
function plantImage(e){
 const t=e.target;
 return t&&t.closest?t.closest('#catalog-grid .product-image-wrap > img[data-id]'):null;
}
function openPlant(img,e){
 if(!img)return false;
 if(e){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();}
 const id=Number(img.dataset.id);
 if(Number.isFinite(id)&&typeof openModal==='function')openModal(id);
 return true;
}
/* Captura temprana en iPhone: bloquea el click fantasma antes de que llegue al favorito. */
document.addEventListener('touchend',e=>{const img=plantImage(e);if(img)openPlant(img,e)}, {capture:true,passive:false});
document.addEventListener('pointerup',e=>{if(e.pointerType==='touch')return;const img=plantImage(e);if(img)openPlant(img,e)},true);
document.addEventListener('click',e=>{const img=plantImage(e);if(img)openPlant(img,e)},true);

/* AGROPRODUCTOS: mostramos la imagen completa, sin estirarla ni hacer zoom 300%. */
let agroViewer=null,agroStage=null,agroImg=null,agroCount=null,agroIndex=0;
const agroSrc='a_clean_well_lit_product_showcase_collage_adverti.png';
/* El archivo actual es un collage. Los cinco primeros pasos enfocan cada panel,
   manteniendo contain para evitar deformacion; el ultimo muestra el collage completo. */
const agroSlides=[
 {title:'AGR • ABONO',x:'16.7%',y:'25%'},
 {title:'AGR • BRILLO',x:'50%',y:'25%'},
 {title:'AGR • GARDEN',x:'83.3%',y:'25%'},
 {title:'AGR • FUNGICIDA',x:'16.7%',y:'75%'},
 {title:'AGR • ABONO ORGÁNICO',x:'50%',y:'75%'},
 {title:'Todos los Agroproductos Florambar',all:true}
];
function buildAgroViewer(){
 if(agroViewer)return;
 const style=document.createElement('style');
 style.textContent=`#fl-agro-viewer{display:none;position:fixed;inset:0;z-index:2147483647;background:rgba(3,20,12,.94);align-items:center;justify-content:center;padding:12px}#fl-agro-viewer.open{display:flex}.fl-agro-box{position:relative;width:min(760px,96vw);height:min(820px,86vh);background:#f7f7f2;border-radius:22px;overflow:hidden}.fl-agro-stage{position:absolute;inset:0;overflow:hidden;background:#f7f7f2}.fl-agro-stage img{position:absolute;max-width:none;max-height:none;user-select:none;-webkit-user-drag:none}.fl-agro-stage.all img{width:100%;height:100%;object-fit:contain;inset:0}.fl-agro-title{position:absolute;top:14px;left:14px;z-index:3;background:#fff;color:#075b38;padding:8px 13px;border-radius:99px;font-weight:900}.fl-agro-close,.fl-agro-prev,.fl-agro-next{position:absolute;z-index:4;border:0;border-radius:50%;background:#fff;color:#075b38;box-shadow:0 3px 15px #0005}.fl-agro-close{right:12px;top:12px;width:44px;height:44px;font-size:28px}.fl-agro-prev,.fl-agro-next{top:50%;transform:translateY(-50%);width:50px;height:50px;font-size:38px}.fl-agro-prev{left:8px}.fl-agro-next{right:8px}.fl-agro-count{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);z-index:3;background:#075b38;color:#fff;padding:8px 14px;border-radius:99px;font-weight:800}#catalog-grid .product-image-wrap>img[data-id]{cursor:pointer;touch-action:manipulation}`;
 document.head.appendChild(style);
 agroViewer=document.createElement('div');agroViewer.id='fl-agro-viewer';
 agroViewer.innerHTML='<div class="fl-agro-box"><div class="fl-agro-title"></div><button class="fl-agro-close" type="button">×</button><button class="fl-agro-prev" type="button">‹</button><div class="fl-agro-stage"><img alt="Agroproducto Florambar"></div><button class="fl-agro-next" type="button">›</button><div class="fl-agro-count"></div></div>';
 document.body.appendChild(agroViewer);agroStage=$('.fl-agro-stage',agroViewer);agroImg=$('.fl-agro-stage img',agroViewer);agroCount=$('.fl-agro-count',agroViewer);agroImg.src=agroSrc;
 $('.fl-agro-close',agroViewer).onclick=()=>agroViewer.classList.remove('open');
 $('.fl-agro-prev',agroViewer).onclick=()=>{agroIndex=(agroIndex-1+agroSlides.length)%agroSlides.length;paintAgro()};
 $('.fl-agro-next',agroViewer).onclick=()=>{agroIndex=(agroIndex+1)%agroSlides.length;paintAgro()};
 agroViewer.addEventListener('click',e=>{if(e.target===agroViewer)agroViewer.classList.remove('open')});
}
function paintAgro(){
 buildAgroViewer();const s=agroSlides[agroIndex];
 agroStage.classList.toggle('all',!!s.all);
 if(!s.all){
   /* El collage es 3 columnas x 2 filas. Escalamos exactamente al panel y centramos
      el producto elegido; object-fit no deforma el archivo. */
   agroImg.style.width='300%';agroImg.style.height='200%';agroImg.style.objectFit='fill';
   const col=[16.7,50,83.3].indexOf(parseFloat(s.x));
   const left=col===0?'0%':col===1?'-100%':'-200%';
   const top=parseFloat(s.y)<50?'0%':'-100%';
   agroImg.style.left=left;agroImg.style.top=top;
 }else{
   agroImg.style.width='100%';agroImg.style.height='100%';agroImg.style.left='0';agroImg.style.top='0';agroImg.style.objectFit='contain';
 }
 $('.fl-agro-title',agroViewer).textContent=s.title;agroCount.textContent=`${agroIndex+1} / ${agroSlides.length}`;agroViewer.classList.add('open');
}
function openAgro(){agroIndex=0;paintAgro()}
function bindAgro(){const b=$('#agro-open');if(!b||b.dataset.fixedAgro==='1')return;b.dataset.fixedAgro='1';b.onclick=e=>{e.preventDefault();e.stopPropagation();openAgro()}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{buildAgroViewer();bindAgro()},{once:true});else{buildAgroViewer();bindAgro()}
new MutationObserver(bindAgro).observe(document.documentElement,{childList:true,subtree:true});
})();