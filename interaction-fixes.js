(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);

/* Una sola ruta: tocar la FOTO abre la ficha. El corazon conserva su propia accion. */
function imageTap(e){
 const img=e.target&&e.target.closest?e.target.closest('#catalog-grid .product-image-wrap > img[data-id]'):null;
 if(!img)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 const id=Number(img.dataset.id);
 if(Number.isFinite(id)&&typeof openModal==='function')openModal(id);
}
document.addEventListener('click',imageTap,true);

/* Agroproductos: el archivo disponible es un collage. Para no pixelarlo ni deformarlo,
   se muestra siempre completo a resolucion natural (sin zoom 300%). */
let viewer=null;
function buildViewer(){
 if(viewer)return;
 const st=document.createElement('style');
 st.textContent=`#fl-agro-viewer{display:none;position:fixed;inset:0;z-index:2147483647;background:rgba(3,20,12,.94);align-items:center;justify-content:center;padding:12px}#fl-agro-viewer.open{display:flex}.fl-agro-box{position:relative;width:min(900px,96vw);height:min(820px,88vh);background:#fff;border-radius:22px;overflow:hidden}.fl-agro-img{display:block;width:100%;height:100%;object-fit:contain;image-rendering:auto}.fl-agro-close{position:absolute;right:12px;top:12px;width:46px;height:46px;border:0;border-radius:50%;background:#fff;color:#075b38;box-shadow:0 3px 15px #0005;font-size:29px;font-weight:900}.fl-agro-label{position:absolute;left:14px;bottom:14px;background:#075b38;color:#fff;padding:9px 14px;border-radius:99px;font-weight:800}#catalog-grid .product-image-wrap>img[data-id]{cursor:pointer;touch-action:manipulation}`;
 document.head.appendChild(st);
 viewer=document.createElement('div');viewer.id='fl-agro-viewer';viewer.innerHTML='<div class="fl-agro-box"><img class="fl-agro-img" src="a_clean_well_lit_product_showcase_collage_adverti.png" alt="Agroproductos Florambar"><button class="fl-agro-close" type="button">×</button><div class="fl-agro-label">Agroproductos Florambar</div></div>';
 document.body.appendChild(viewer);$('.fl-agro-close',viewer).onclick=()=>viewer.classList.remove('open');viewer.onclick=e=>{if(e.target===viewer)viewer.classList.remove('open')};
}
function bindAgro(){
 buildViewer();const b=$('#agro-open');if(!b||b.dataset.cleanBound==='1')return;b.dataset.cleanBound='1';
 b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();viewer.classList.add('open')},true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindAgro,{once:true});else bindAgro();
new MutationObserver(bindAgro).observe(document.documentElement,{childList:true,subtree:true});
})();