/* Florambar: Agroproductos */
(function(){
 function add(){
  var existing=document.getElementById('productos-cuidado');
  if(!existing){
   var target=document.querySelector('.benefits')||document.getElementById('servicios');
   if(!target)return;
   var css=document.createElement('style');
   css.textContent='.care-products{max-width:1180px;margin:44px auto;padding:0 20px;scroll-margin-top:130px}.care-products-head{text-align:center;margin-bottom:24px}.care-products-head span{font-size:12px;font-weight:800;letter-spacing:1.6px;color:#087443}.care-products-head h2{margin:7px 0 8px;font-size:clamp(28px,4vw,42px);color:#183b2b}.care-products-head p{margin:0 auto;max-width:680px;color:#617069;line-height:1.6}.care-products-card{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(280px,.75fr);overflow:hidden;border-radius:24px;background:#f5fbf7;box-shadow:0 14px 38px rgba(21,72,47,.12);border:1px solid #e0eee5}.care-products-image-btn{padding:0;border:0;background:#fff;cursor:zoom-in;display:block;width:100%;position:relative}.care-products-image-btn:after{content:"🔍 Toca para ampliar";position:absolute;right:14px;bottom:14px;background:rgba(255,255,255,.94);color:#17452e;border-radius:999px;padding:8px 12px;font-weight:800;font-size:12px;box-shadow:0 4px 15px rgba(0,0,0,.12)}.care-products-card img{width:100%;height:100%;min-height:390px;object-fit:cover;display:block;background:white}.care-products-copy{padding:38px;display:flex;flex-direction:column;justify-content:center}.care-products-copy h3{font-size:28px;margin:0 0 14px;color:#17452e}.care-products-copy p{color:#5e6d65;line-height:1.65;margin:0 0 18px}.care-products-tags{display:flex;flex-wrap:wrap;gap:9px;margin:0 0 24px}.care-products-tags span{background:#fff;border:1px solid #d7e8dc;border-radius:999px;padding:8px 12px;font-size:13px;font-weight:700;color:#326247}.care-products-wa{display:inline-flex;align-items:center;justify-content:center;align-self:flex-start;text-decoration:none;background:#087443;color:#fff;padding:13px 20px;border-radius:12px;font-weight:800}.agro-lightbox{position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:99999;display:none;align-items:center;justify-content:center;padding:18px}.agro-lightbox.open{display:flex}.agro-lightbox img{max-width:96vw;max-height:88vh;object-fit:contain;border-radius:14px;background:#fff}.agro-lightbox button{position:fixed;right:18px;top:18px;width:48px;height:48px;border:0;border-radius:50%;background:#fff;color:#173d2b;font-size:30px;line-height:1;box-shadow:0 5px 20px rgba(0,0,0,.25)}@media(max-width:760px){.care-products{margin:30px auto;padding:0 14px}.care-products-card{grid-template-columns:1fr}.care-products-card img{min-height:0;aspect-ratio:1/1;object-fit:contain}.care-products-copy{padding:24px 20px}.care-products-copy h3{font-size:23px}.care-products-wa{width:100%;box-sizing:border-box}}';
   document.head.appendChild(css);
   existing=document.createElement('section');existing.id='productos-cuidado';existing.className='care-products';
   existing.innerHTML='<div class="care-products-head"><span>AGROPRODUCTOS</span><h2>Productos para mantenerlas increíbles</h2><p>Complementa tus plantas Florambar con productos para nutrición, brillo, protección y mantenimiento.</p></div><div class="care-products-card"><button class="care-products-image-btn" id="agro-image-open" type="button" aria-label="Ampliar imagen de Agroproductos"><img src="a_clean_well_lit_product_showcase_collage_adverti.png" alt="Agroproductos disponibles en Florambar"></button><div class="care-products-copy"><h3>Todo para el cuidado de tus plantas</h3><p>Encuentra opciones de Agroservicios Integrales para complementar el cuidado de tu jardín y tus plantas.</p><div class="care-products-tags"><span>🌱 Abono</span><span>✨ Agro Brillo</span><span>🛡️ Insecticida</span><span>🌿 Fungicida</span><span>🍃 Nutrición orgánica</span></div><a class="care-products-wa" href="https://wa.me/527121479122?text=Hola%20Florambar%2C%20quiero%20informaci%C3%B3n%20sobre%20los%20Agroproductos." target="_blank" rel="noopener">💬 Consultar Agroproductos por WhatsApp</a></div></div>';
   target.parentNode.insertBefore(existing,target);
  }
  var nav=document.getElementById('nav');
  if(nav&&!nav.querySelector('a[href="#productos-cuidado"]')){
   var a=document.createElement('a');a.href='#productos-cuidado';a.textContent='Agroproductos';
   var servicios=nav.querySelector('a[href="#servicios"]');nav.insertBefore(a,servicios||null);
  }
  var bottom=document.querySelector('.mobile-bottom-nav');
  if(bottom&&!bottom.querySelector('a[href="#productos-cuidado"]')){
   var ba=document.createElement('a');ba.href='#productos-cuidado';ba.innerHTML='<span>🌱</span>Agroproductos';
   var bs=bottom.querySelector('a[href="#servicios"]');bottom.insertBefore(ba,bs||null);
  }
  if(!document.getElementById('agro-lightbox')){
   var lb=document.createElement('div');lb.id='agro-lightbox';lb.className='agro-lightbox';lb.setAttribute('aria-hidden','true');lb.innerHTML='<button type="button" id="agro-lightbox-close" aria-label="Cerrar">×</button><img src="a_clean_well_lit_product_showcase_collage_adverti.png" alt="Agroproductos Florambar ampliados">';document.body.appendChild(lb);
   function close(){lb.classList.remove('open');lb.setAttribute('aria-hidden','true');}
   var opener=document.getElementById('agro-image-open');if(opener)opener.onclick=function(){lb.classList.add('open');lb.setAttribute('aria-hidden','false');};
   document.getElementById('agro-lightbox-close').onclick=close;lb.onclick=function(e){if(e.target===lb)close();};document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  }
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',add);else add();window.addEventListener('load',add);
})();