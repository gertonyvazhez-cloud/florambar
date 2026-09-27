/* Florambar · mejoras de experiencia sin reemplazar la lógica existente */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

function productById(id){
  return (typeof productos!=='undefined' ? productos : []).find(p=>p.id===Number(id));
}
function cartTotal(){
  if(typeof carrito==='undefined') return 0;
  return Object.values(carrito).reduce((a,b)=>a+(Number(b)||0),0);
}
function pulse(el,cls='fx-pop'){
  if(!el)return;
  el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
  setTimeout(()=>el.classList.remove(cls),650);
}
function celebrateAdd(btn,id){
  const p=productById(id);
  if(btn){
    const old=btn.dataset.originalLabel||btn.innerHTML;
    btn.dataset.originalLabel=old;
    btn.classList.add('is-added');
    btn.innerHTML='✓ Agregado';
    setTimeout(()=>{ if(document.body.contains(btn)){btn.innerHTML=old;btn.classList.remove('is-added');}},1050);
  }
  pulse($('#open-cart'),'cart-bounce');
  pulse($('#cart-count'),'count-pop');
  if(typeof toast==='function') toast('✓ '+(p?p.nombre:'Planta')+' agregada al carrito');
}
function celebrateFav(btn,id){
  pulse(btn,'heart-pop');
  const active=typeof favoritos!=='undefined' && favoritos.has(Number(id));
  if(typeof toast==='function') toast(active?'♥ Guardada en favoritos':'Eliminada de favoritos');
  pulse($('#open-favorites'),'fav-bounce');
}
function makeSuggestions(input){
  if(!input || input.dataset.smartReady)return;
  input.dataset.smartReady='1';
  const wrap=input.parentElement;
  if(!wrap)return;
  wrap.classList.add('smart-suggest-wrap');
  const box=document.createElement('div'); box.className='search-suggestions'; box.hidden=true; wrap.appendChild(box);
  const close=()=>{box.hidden=true;box.innerHTML='';};
  input.addEventListener('input',()=>{
    const q=input.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    if(q.length<2 || typeof productos==='undefined')return close();
    const found=productos.filter(p=>[p.nombre,p.categoria,p.cientifico].join(' ').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').includes(q)).slice(0,6);
    if(!found.length)return close();
    box.innerHTML=found.map(p=>`<button type="button" data-suggest-id="${p.id}"><span>${iconFor(p.categoria)}</span><span><b>${p.nombre}</b><small>${p.categoria}</small></span></button>`).join('');
    box.hidden=false;
  });
  box.addEventListener('click',e=>{
    const b=e.target.closest('[data-suggest-id]'); if(!b)return;
    const p=productById(b.dataset.suggestId); if(!p)return;
    input.value=p.nombre; close();
    if(typeof setSearch==='function')setSearch(p.nombre);
  });
  document.addEventListener('click',e=>{if(!wrap.contains(e.target))close();});
}
function iconFor(cat){
  return ({'Interior':'🪴','Exterior':'🌳','Plantas con flor':'🌸','Medicinales y aromáticas':'🌿','Temporada':'🌼','Frutales':'🍊','Huerto':'🥬'})[cat]||'🌱';
}
function badgeFor(p){
  if(!p)return '';
  if(p.categoria==='Temporada')return '🌼 Temporada';
  if(p.categoria==='Interior')return '🏠 Ideal interior';
  if(p.categoria==='Plantas con flor')return '🌸 Con flor';
  if(p.categoria==='Medicinales y aromáticas')return '🌿 Aromática';
  if(p.categoria==='Frutales')return '🍊 Frutal';
  if(p.categoria==='Huerto')return '🥬 Huerto';
  return p.id<=8?'⭐ Destacada':'🌱 Disponible';
}
function decorateCards(){
  $$('.product-card').forEach(card=>{
    const add=card.querySelector('[data-add]'); const id=add&&Number(add.dataset.add); const p=productById(id); if(!p)return;
    card.dataset.category=p.categoria;
    const iw=card.querySelector('.product-image-wrap');
    if(iw&&!iw.querySelector('.experience-badge')){
      const b=document.createElement('span'); b.className='experience-badge'; b.textContent=badgeFor(p); iw.appendChild(b);
    }
    const img=card.querySelector('img'); if(img){img.decoding='async';img.fetchPriority='low';}
  });
}
function improveModal(){
  const m=$('#product-modal'); if(!m)return;
  const specs=m.querySelector('.specs'); if(specs) specs.classList.add('specs-polished');
  const add=$('#modal-add'); if(add) add.setAttribute('aria-label','Agregar esta planta al carrito');
}
function addSeasonBlock(){
  if($('#season-spotlight')||!$('#catalogo'))return;
  const season=(typeof productos!=='undefined')?productos.filter(p=>p.categoria==='Temporada').slice(0,3):[];
  if(!season.length)return;
  const sec=document.createElement('section'); sec.id='season-spotlight'; sec.className='season-spotlight';
  sec.innerHTML=`<div><span class="section-eyebrow">DE TEMPORADA</span><h2>Lo especial de esta temporada</h2><p>Variedades que vale la pena aprovechar ahora.</p></div><div class="season-chips">${season.map(p=>`<button type="button" data-season="${p.id}">${iconFor(p.categoria)} ${p.nombre}<span>Ver planta →</span></button>`).join('')}</div>`;
  $('#catalogo').before(sec);
  sec.addEventListener('click',e=>{const b=e.target.closest('[data-season]');if(b&&typeof openModal==='function')openModal(Number(b.dataset.season));});
}
function addNurseryPolish(){
  const contact=$('#contacto'); if(!contact||contact.querySelector('.nursery-proof'))return;
  const proof=document.createElement('div'); proof.className='nursery-proof';
  proof.innerHTML='<span>📍</span><div><b>Florambar · San Lorenzo Tlacotepec</b><small>Atlacomulco, Estado de México · Atención directa por WhatsApp</small></div>';
  contact.insertBefore(proof,contact.lastElementChild);
}
function observeCatalog(){
  const grid=$('#catalog-grid'); if(!grid)return;
  let raf=0; const run=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(decorateCards);};
  new MutationObserver(run).observe(grid,{childList:true}); run();
}
function enhanceWhatsApp(){
  const b=$('#whatsapp-cart'); if(!b)return;
  const sync=()=>{const n=cartTotal();b.innerHTML=n?`💬 Pedir ${n} ${n===1?'planta':'plantas'} por WhatsApp`:'💬 Pedir por WhatsApp';};
  sync();
  const count=$('#cart-count'); if(count)new MutationObserver(sync).observe(count,{childList:true,characterData:true,subtree:true});
}
function interactionEffects(){
  document.addEventListener('click',e=>{
    const add=e.target.closest('[data-add],#modal-add');
    if(add){const id=Number(add.dataset.add||add.dataset.id);setTimeout(()=>celebrateAdd(add,id),0);return;}
    const fav=e.target.closest('[data-fav]'); if(fav)setTimeout(()=>celebrateFav(fav,fav.dataset.fav),0);
  },true);
}
function reveal(){
  if(!('IntersectionObserver'in window))return;
  const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('revealed');io.unobserve(x.target);}}),{rootMargin:'80px'});
  $$('.service-grid article,.benefits>div,.store-highlights>div,.learn,.contact').forEach(x=>{x.classList.add('reveal-item');io.observe(x);});
}
function init(){
  makeSuggestions($('#catalog-search'));
  observeCatalog(); improveModal(); addSeasonBlock(); addNurseryPolish(); enhanceWhatsApp(); interactionEffects(); reveal();
  document.documentElement.classList.add('experience-ready');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();