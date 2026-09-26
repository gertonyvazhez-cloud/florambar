(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
function openModal(m){ if(!m)return; m.classList.add('open'); document.body.classList.add('modal-open'); }
function closeModal(m){ if(!m)return; m.classList.remove('open'); document.body.classList.remove('modal-open'); }

// Make the whole plant image area open the same technical sheet as "Ver ficha".
document.addEventListener('click',e=>{
 const img=e.target.closest('.product-card .product-image, .product-card img, .card .product-image, .card img');
 if(!img)return;
 const card=img.closest('.product-card,.card'); if(!card)return;
 const ficha=card.querySelector('[data-open],.view-btn,.view-product,[data-action="view"],button');
 if(ficha){ e.preventDefault(); ficha.click(); }
});

// Cempasuchil hero/button: open catalog filtered to Cempasuchil, so photos and ficha are immediately visible.
document.addEventListener('click',e=>{
 const a=e.target.closest('a,button'); if(!a)return;
 const txt=(a.textContent||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 if(!txt.includes('ver cempasuchil'))return;
 e.preventDefault();
 const search=$('#catalog-search')||$('#header-search');
 if(search){ search.value='Cempasúchil'; search.dispatchEvent(new Event('input',{bubbles:true})); }
 const btn=$('#catalog-search-btn')||$('#header-search-btn'); if(btn)btn.click();
 const cat=$('#catalogo'); if(cat)cat.scrollIntoView({behavior:'smooth',block:'start'});
});

// Agroproduct images: clicking any image opens a lightweight viewer. Arrows cycle through all product images.
let viewer, viewerImg, viewerLabel, agroImgs=[], agroIndex=0;
function ensureViewer(){
 if(viewer)return;
 viewer=document.createElement('div'); viewer.id='agro-image-viewer'; viewer.innerHTML=`<div class="agro-viewer-box"><button class="agro-close" aria-label="Cerrar">×</button><button class="agro-prev" aria-label="Anterior">‹</button><img alt="Agroproducto Florambar"><button class="agro-next" aria-label="Siguiente">›</button><div class="agro-counter"></div></div>`;
 document.body.appendChild(viewer); viewerImg=$('img',viewer); viewerLabel=$('.agro-counter',viewer);
 $('.agro-close',viewer).onclick=()=>closeModal(viewer); viewer.onclick=e=>{if(e.target===viewer)closeModal(viewer)};
 $('.agro-prev',viewer).onclick=e=>{e.stopPropagation(); showAgro(agroIndex-1)}; $('.agro-next',viewer).onclick=e=>{e.stopPropagation(); showAgro(agroIndex+1)};
}
function collectAgro(){
 const root=$('#agroproductos')||$('.agroproductos')||$('[data-section="agroproductos"]')||$$('section').find(s=>/agroproductos|productos para mantenerlas|cuidado para tus plantas/i.test(s.textContent||''));
 agroImgs=root?$$('img',root).filter(i=>i.src):[];
}
function showAgro(i){ collectAgro(); if(!agroImgs.length)return; ensureViewer(); agroIndex=(i+agroImgs.length)%agroImgs.length; viewerImg.src=agroImgs[agroIndex].currentSrc||agroImgs[agroIndex].src; viewerImg.alt=agroImgs[agroIndex].alt||'Agroproducto Florambar'; viewerLabel.textContent=`${agroIndex+1} / ${agroImgs.length}`; openModal(viewer); }
document.addEventListener('click',e=>{
 const img=e.target.closest('img'); if(!img)return;
 collectAgro(); const i=agroImgs.indexOf(img); if(i<0)return;
 e.preventDefault(); e.stopPropagation(); showAgro(i);
},true);
document.addEventListener('keydown',e=>{ if(!viewer||!viewer.classList.contains('open'))return; if(e.key==='Escape')closeModal(viewer); if(e.key==='ArrowLeft')showAgro(agroIndex-1); if(e.key==='ArrowRight')showAgro(agroIndex+1); });
})();