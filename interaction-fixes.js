(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);

/* Tocar la FOTO de una planta abre su ficha; el corazon mantiene su propia accion. */
function imageTap(e){
 const img=e.target&&e.target.closest?e.target.closest('#catalog-grid .product-image-wrap > img[data-id]'):null;
 if(!img)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 const id=Number(img.dataset.id);
 if(Number.isFinite(id)&&typeof openModal==='function')openModal(id);
}
document.addEventListener('click',imageTap,true);

/* Agroproductos: 5 productos uno por uno y, al final, el collage completo. */
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
 st.textContent=`#fl-agro-viewer{display:none;position:fixed;inset:0;z-index:2147483647;background:rgba(3,20,12,.94);align-items:center;justify-content:center;padding:12px}#fl-agro-viewer.open{display:flex}.fl-agro-box{position:relative;width:min(760px,96vw);height:min(820px,88vh);background:#fff;border-radius:24px;overflow:hidden}.fl-agro-stage{position:absolute;inset:0;background:#fff center/contain no-repeat}.fl-agro-stage.single{background-image:url('${AGRO_SRC}');background-size:300% 200%;background-repeat:no-repeat}.fl-agro-stage.all{background-image:url('${AGRO_SRC}');background-size:contain;background-position:center;background-repeat:no-repeat}.fl-agro-close,.fl-agro-prev,.fl-agro-next{position:absolute;border:0;border-radius:50%;background:#fff;color:#075b38;box-shadow:0 3px 15px #0005;font-weight:900;z-index:3}.fl-agro-close{right:12px;top:12px;width:48px;height:48px;font-size:30px}.fl-agro-prev,.fl-agro-next{top:50%;transform:translateY(-50%);width:54px;height:54px;font-size:36px}.fl-agro-prev{left:12px}.fl-agro-next{right:12px}.fl-agro-label{position:absolute;left:50%;top:16px;transform:translateX(-50%);background:#fff;color:#075b38;padding:10px 18px;border-radius:99px;font-weight:900;z-index:2;white-space:nowrap;max-width:70%;overflow:hidden;text-overflow:ellipsis}.fl-agro-count{position:absolute;left:50%;bottom:14px;transform:translateX(-50%);background:#075b38;color:#fff;padding:9px 14px;border-radius:99px;font-weight:900;z-index:2}#catalog-grid .product-image-wrap>img[data-id]{cursor:pointer;touch-action:manipulation}`;
 document.head.appendChild(st);
 viewer=document.createElement('div');viewer.id='fl-agro-viewer';viewer.innerHTML='<div class="fl-agro-box"><div class="fl-agro-stage"></div><div class="fl-agro-label"></div><button class="fl-agro-close" type="button">×</button><button class="fl-agro-prev" type="button" aria-label="Anterior">‹</button><button class="fl-agro-next" type="button" aria-label="Siguiente">›</button><div class="fl-agro-count"></div></div>';
 document.body.appendChild(viewer);
 $('.fl-agro-close',viewer).onclick=()=>viewer.classList.remove('open');
 $('.fl-agro-prev',viewer).onclick=e=>{e.stopPropagation();index=(index-1+AGRO.length)%AGRO.length;renderAgro()};
 $('.fl-agro-next',viewer).onclick=e=>{e.stopPropagation();index=(index+1)%AGRO.length;renderAgro()};
 viewer.onclick=e=>{if(e.target===viewer)viewer.classList.remove('open')};
}
function renderAgro(){
 const item=AGRO[index],stage=$('.fl-agro-stage',viewer);
 stage.className='fl-agro-stage '+(item.all?'all':'single');
 stage.style.backgroundPosition=item.all?'center':item.pos;
 $('.fl-agro-label',viewer).textContent=item.name;
 $('.fl-agro-count',viewer).textContent=(index+1)+' / '+AGRO.length;
}
function bindAgro(){
 buildViewer();const b=$('#agro-open');if(!b||b.dataset.cleanBound==='1')return;b.dataset.cleanBound='1';
 b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();index=0;renderAgro();viewer.classList.add('open')},true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindAgro,{once:true});else bindAgro();
new MutationObserver(bindAgro).observe(document.documentElement,{childList:true,subtree:true});
})();