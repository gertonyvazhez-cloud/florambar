/* Florambar: fotos propias + temporada + agroproductos + contacto + SEO */
(function(){
'use strict';
const WA='527123294890', DISPLAY='712 329 4890', OLD='527121479122';
const MISSING=new Set([71,74,77,80,83,85,86,88,91,94,97,100,102,105,108,111,114,117,119,120,173]);
function localPhoto(id){id=Number(id);return id>=1&&id<=172&&!MISSING.has(id)?String(id).padStart(3,'0')+'.jpg':''}
function fixPlantImages(root=document){
 root.querySelectorAll('img[data-id]').forEach(img=>{const src=localPhoto(img.dataset.id);if(src&&img.getAttribute('src')!==src){img.setAttribute('src',src);img.dataset.real='1';}});
 root.querySelectorAll('img[data-cart-id]').forEach(img=>{const src=localPhoto(img.dataset.cartId);if(src&&img.getAttribute('src')!==src){img.setAttribute('src',src);img.dataset.real='1';}});
}
function fixContact(root=document){
 root.querySelectorAll('a[href*="wa.me"]').forEach(a=>{const raw=a.getAttribute('href')||'';if(raw.includes(OLD))a.setAttribute('href',raw.replace(OLD,WA));});
 root.querySelectorAll('body *').forEach(el=>{if(el.children.length===0&&el.textContent.includes('712 147 9122'))el.textContent=el.textContent.replace(/712 147 9122/g,DISPLAY)});
}
const nativeOpen=window.open.bind(window);window.open=function(url,target,features){if(typeof url==='string')url=url.replace(OLD,WA);return nativeOpen(url,target,features)};
function seo(){
 document.title='Florambar | Vivero, cempasúchil y plantas en Atlacomulco';
 const desc='Florambar, vivero y venta de plantas en San Lorenzo Tlacotepec, Atlacomulco, Estado de México. Cempasúchil de temporada, 173 variedades, plantas de interior, exterior, flor, frutales y agroproductos.';
 let m=document.querySelector('meta[name="description"]');if(m)m.content=desc;
 const set=(sel,attr,val)=>{let x=document.querySelector(sel);if(x)x.setAttribute(attr,val)};
 set('meta[property="og:title"]','content','Florambar | Cempasúchil y plantas en Atlacomulco');set('meta[property="og:description"]','content',desc);set('meta[property="og:image"]','content','https://gertonyvazhez-cloud.github.io/florambar/042.jpg');
}
function seasonal(){
 if(document.getElementById('temporada-destacada'))return;
 const hero=document.querySelector('.hero');if(!hero)return;
 let st=document.createElement('style');st.textContent=`.seasonal-hero{width:min(1240px,calc(100% - 34px));margin:15px auto 22px;border-radius:28px;overflow:hidden;position:relative;background:#123f27;box-shadow:0 16px 44px #163f2829;scroll-margin-top:125px}.seasonal-photo{min-height:520px;background:linear-gradient(90deg,rgba(4,46,25,.12),rgba(4,46,25,.78)),url('042.jpg') center/cover no-repeat;position:relative}.seasonal-copy{position:absolute;z-index:3;left:6%;top:50%;transform:translateY(-50%);width:min(500px,88%);color:#fff}.seasonal-kicker{display:inline-block;padding:8px 13px;border-radius:99px;background:#fff3d7;color:#8a4b08;font-weight:900;letter-spacing:1.4px;font-size:12px}.seasonal-copy h1{margin:14px 0 3px;font:italic 800 62px/.95 Georgia,serif;color:#ffad21;text-shadow:0 3px 16px #0006}.seasonal-copy h2{margin:0 0 14px;font:800 27px Georgia,serif}.seasonal-copy p{max-width:440px;font-size:14px;line-height:1.5}.seasonal-badges{display:flex;gap:8px;flex-wrap:wrap;margin:15px 0}.seasonal-badges span{padding:8px 11px;border-radius:99px;background:#ffffffdf;color:#16492e;font-size:11px;font-weight:800}.seasonal-actions{display:flex;gap:10px;flex-wrap:wrap}.seasonal-actions a{padding:13px 20px;border-radius:99px;text-decoration:none;font-weight:900}.seasonal-view{background:#ef7d10;color:#fff}.seasonal-wa{background:#0b9149;color:#fff}.seasonal-thumbs{position:absolute;z-index:4;right:3%;bottom:22px;display:flex;gap:8px}.seasonal-thumbs img{width:76px;height:76px;border:3px solid #fff;border-radius:16px;object-fit:cover;box-shadow:0 6px 18px #0004}.seasonal-note{position:absolute;right:3%;top:25px;background:#fff8e8;color:#16492e;padding:12px 15px;border-radius:18px;font:italic 800 17px Georgia,serif;transform:rotate(2deg)}@media(max-width:700px){.seasonal-hero{width:calc(100% - 20px);margin:10px auto 16px;border-radius:22px}.seasonal-photo{min-height:590px;background-position:center}.seasonal-photo:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(3,45,24,.93) 0%,rgba(3,45,24,.18) 72%)}.seasonal-copy{left:22px;right:22px;top:auto;bottom:28px;transform:none;width:auto;z-index:5}.seasonal-copy h1{font-size:47px}.seasonal-copy h2{font-size:21px}.seasonal-copy p{font-size:12px}.seasonal-thumbs,.seasonal-note{display:none}.seasonal-actions a{flex:1;text-align:center;font-size:12px}}`;
 document.head.appendChild(st);
 let s=document.createElement('section');s.id='temporada-destacada';s.className='seasonal-hero';s.innerHTML=`<div class="seasonal-photo"><div class="seasonal-copy"><span class="seasonal-kicker">🌼 PLANTAS DE TEMPORADA</span><h1>Cempasúchil</h1><h2>Directo del vivero Florambar</h2><p>Llena de color tus espacios esta temporada con cempasúchil cultivado en San Lorenzo Tlacotepec, Atlacomulco, Estado de México.</p><div class="seasonal-badges"><span>🌱 Producción de vivero</span><span>🚚 Mayoreo y menudeo</span><span>📍 Atlacomulco</span></div><div class="seasonal-actions"><a class="seasonal-view" href="#catalogo">Ver Cempasúchil →</a><a class="seasonal-wa" href="https://wa.me/${WA}?text=Hola%20Florambar%2C%20quiero%20informaci%C3%B3n%20sobre%20Cempas%C3%BAchil." target="_blank">💬 712 329 4890</a></div></div><div class="seasonal-note">Temporada de Cempasúchil 🌼</div><div class="seasonal-thumbs"><img src="042.jpg" alt="Cempasúchil Florambar"></div></div>`;
 hero.parentNode.insertBefore(s,hero);
 const nav=document.getElementById('nav');if(nav&&!nav.querySelector('a[href="#temporada-destacada"]')){let a=document.createElement('a');a.href='#temporada-destacada';a.textContent='🌼 Temporada';nav.insertBefore(a,nav.querySelector('a[href="#catalogo"]'))}
}
function agro(){
 if(document.getElementById('productos-cuidado'))return;
 const target=document.querySelector('.benefits')||document.getElementById('servicios');if(!target)return;
 const img='a_clean_well_lit_product_showcase_collage_adverti.png';
 let s=document.createElement('section');s.id='productos-cuidado';s.className='care-products';s.innerHTML='<div class="care-products-head"><span>AGROPRODUCTOS</span><h2>Productos para mantener tus plantas increíbles</h2><p>Nutrición, brillo y protección para tus plantas.</p></div><div class="care-products-card"><button id="agro-open" class="care-products-image-btn" type="button"><img src="'+img+'" alt="Agroproductos Florambar"></button><div class="care-products-copy"><h3>Todo para el cuidado de tus plantas</h3><p>Conoce nuestra línea de productos para complementar el cuidado de tu jardín.</p><a class="care-products-wa" href="https://wa.me/'+WA+'" target="_blank">💬 Consultar por WhatsApp</a></div></div>';
 target.parentNode.insertBefore(s,target);
 const nav=document.getElementById('nav');if(nav&&!nav.querySelector('a[href="#productos-cuidado"]')){let a=document.createElement('a');a.href='#productos-cuidado';a.textContent='🌿 Agroproductos';nav.insertBefore(a,nav.querySelector('a[href="#servicios"]'))}
}
function init(){
 try{seo();seasonal();agro();fixContact();fixPlantImages();}catch(e){console.error('Florambar enhancement:',e)}
 let queued=false;
 new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;try{fixContact();fixPlantImages()}catch(e){console.error(e)}})}).observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();