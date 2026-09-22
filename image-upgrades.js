/* Florambar — fotografías y correcciones revisadas para la rama de prueba. */
(function(){
  const manual={
    "Robelina":"Phoenix roebelenii",
    "Teléfonos":"Epipremnum aureum",
    "Zapitos":"Calceolaria",
    "Esqueletos":"Monstera adansonii",
    "Muñecas":"Fuchsia",
    "Espadas":"Dracaena trifasciata",
    "Elegantísimas":"Plerandra elegantissima",
    "Warneckii":"Dracaena fragrans Warneckii",
    "Violeta Imperial":"Streptocarpus ionanthus",
    "Violeta Africana Imperial":"Streptocarpus ionanthus",
    "Amores":"Portulaca grandiflora",
    "Agasania":"Gazania rigens",
    "Mosquito":"Lobelia erinus",
    "Llamarada":"Pyrostegia venusta",
    "Velo de Novia Blanco":"Gypsophila paniculata",
    "Velo de Novia Morado":"Cuphea hyssopifolia",
    "Dólar":"Eucalyptus cinerea",
    "Cepillo":"Callistemon citrinus",
    "Ficus Pintu":"Ficus benjamina variegata",
    "Ule":"Ficus elastica",
    "Bandera":"Clerodendrum thomsoniae",
    "Cedo":"Cedrus",
    "Rocíos":"Aptenia cordifolia",
    "Culantrillo":"Adiantum capillus-veneris",
    "Nido de Ave":"Asplenium nidus",
    "Pata de Conejo":"Davallia fejeensis",
    "Helecho Azul":"Phlebodium aureum",
    "Helecho Plumoso":"Asparagus setaceus",
    "Helecho Australiano":"Cyathea cooperi",
    "Helecho Cuero":"Rumohra adiantiformis",
    "Poto Neón":"Epipremnum aureum Neon",
    "Poto Mármol":"Epipremnum aureum Marble Queen",
    "Poto Satinado":"Scindapsus pictus",
    "Aglaonema Roja":"Aglaonema red cultivar",
    "Calathea Ornata":"Goeppertia ornata",
    "Calathea Medallion":"Goeppertia roseopicta Medallion",
    "Maranta Tricolor":"Maranta leuconeura erythroneura",
    "Peperomia Sandía":"Peperomia argyreia",
    "Planta Araña / Malamadre":"Chlorophytum comosum",
    "Bambú de la Suerte":"Dracaena sanderiana",
    "Singonio":"Syngonium podophyllum",
    "Dischidia":"Dischidia",
    "Begonia Rex":"Begonia rex",
    "Insulina":"Chamaecostus cuspidatus",
    "Muitle":"Justicia spicigera",
    "Árnica Mexicana":"Heterotheca inuloides",
    "Epazote de Zorrillo":"Dysphania graveolens",
    "Orégano Mexicano":"Lippia graveolens",
    "Hoja de Higuera":"Ficus carica",
    "Impatiens / Alegría":"Impatiens walleriana",
    "Julieta":"Epipremnum aureum",
    "Mariana":"Dieffenbachia",
    "Croto Petra":"Codiaeum variegatum Petra",
    "Planta Carnívora":"Dionaea muscipula",
    "Clavelina":"Dianthus chinensis",
    "Celosía":"Celosia argentea",
    "Viola":"Viola",
    "Huele de Noche":"Cestrum nocturnum",
    "Cissus":"Cissus rhombifolia",
    "Ciprés Italiano":"Cupressus sempervirens",
    "Tulia":"Thuja occidentalis"
  };

  const scientificCorrections={
    "Amores":"Portulaca grandiflora",
    "Mosquito":"Lobelia erinus",
    "Llamarada":"Pyrostegia venusta",
    "Dólar":"Eucalyptus cinerea",
    "Ule":"Ficus elastica",
    "Bandera":"Clerodendrum thomsoniae",
    "Rocíos":"Aptenia cordifolia",
    "Julieta":"Epipremnum aureum",
    "Mariana":"Dieffenbachia spp.",
    "Muñecas":"Fuchsia spp.",
    "Esqueletos":"Monstera adansonii",
    "Helecho Boston":"Nephrolepis exaltata 'Bostoniensis'"
  };

  const commonNames={
    "Amores":"Amor de un rato · Portulaca",
    "Mosquito":"Zulia · Lobelia · Flor de mosquito",
    "Llamarada":"Enredadera llamarada · Trompeta naranja",
    "Dólar":"Eucalipto dólar · Silver dollar",
    "Ule":"Hule · Árbol del caucho",
    "Bandera":"Bandera · Corazón sangrante · Clerodendro",
    "Rocíos":"Rocío · Aptenia",
    "Julieta":"Julieta · Potus",
    "Mariana":"Mariana · Dieffenbachia",
    "Muñecas":"Muñeca · Fucsia",
    "Esqueletos":"Esqueleto · Monstera adansonii",
    "Helecho Boston":"Helecho Boston"
  };

  function applyCorrections(){
    try{
      if(typeof productos==='undefined') return;
      productos.forEach(p=>{
        if(scientificCorrections[p.nombre]) p.cientifico=scientificCorrections[p.nombre];
        if(commonNames[p.nombre]) p.conocidoComo=commonNames[p.nombre];
      });
      if(typeof render==='function') render();
    }catch(e){console.warn('Florambar: no se pudieron aplicar correcciones',e)}
  }
  applyCorrections();
  window.addEventListener('DOMContentLoaded',applyCorrections,{once:true});

  const memory=new Map(),pending=new Map(),storageKey="florambar_real_photos_v4";let saved={};
  try{saved=JSON.parse(localStorage.getItem(storageKey)||"{}");}catch(e){}
  function candidate(p){return(manual[p.nombre]||p.cientifico||p.nombre).trim()}
  function remember(name,src){if(!src)return;memory.set(name,src);saved[name]=src;try{localStorage.setItem(storageKey,JSON.stringify(saved))}catch(e){}}
  async function summaryPhoto(title){
    const slug=encodeURIComponent(title.replace(/\s+/g,"_"));
    for(const lang of["es","en"]){
      try{
        const r=await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${slug}`,{headers:{Accept:"application/json"}});
        if(!r.ok)continue;
        const d=await r.json(),src=d.originalimage?.source||d.thumbnail?.source||"";
        if(src)return src;
      }catch(e){}
    }
    return"";
  }
  async function searchPhoto(q){
    for(const lang of["es","en"]){
      try{
        const r=await fetch(`https://${lang}.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrlimit=5&prop=pageimages&piprop=original%7Cthumbnail&pithumbsize=900&format=json&origin=*`);
        if(!r.ok)continue;
        const d=await r.json(),pages=Object.values(d.query?.pages||{}).sort((a,b)=>(a.index||99)-(b.index||99));
        const hit=pages.find(x=>x.original?.source||x.thumbnail?.source),src=hit?.original?.source||hit?.thumbnail?.source||"";
        if(src)return src;
      }catch(e){}
    }
    return"";
  }
  async function photoFor(p){
    const key=p.nombre;
    if(memory.has(key))return memory.get(key);
    if(saved[key]){memory.set(key,saved[key]);return saved[key]}
    if(pending.has(key))return pending.get(key);
    const task=(async()=>{
      const q=candidate(p);
      let src=await summaryPhoto(q);
      if(!src)src=await searchPhoto(q+" planta");
      if(!src&&q!==p.nombre)src=await searchPhoto(p.nombre+" planta");
      if(src)remember(key,src);
      return src;
    })();
    pending.set(key,task);
    const result=await task;pending.delete(key);return result;
  }
  window.cargarFoto=async function(p,img){
    if(!p||!img)return;
    const token=String(p.id||p.nombre);img.dataset.photoToken=token;img.classList.add("plant-photo-loading");
    const src=await photoFor(p);if(img.dataset.photoToken!==token)return;
    if(!src){img.classList.remove("plant-photo-loading");return}
    img.referrerPolicy="no-referrer";
    img.onload=()=>img.classList.remove("plant-photo-loading");
    img.onerror=()=>{img.classList.remove("plant-photo-loading");delete saved[p.nombre];memory.delete(p.nombre);try{localStorage.setItem(storageKey,JSON.stringify(saved))}catch(e){}};
    img.src=src;img.dataset.real="1";
  };

  function ensureCommonName(){
    const modal=document.getElementById('product-modal');
    const sci=document.getElementById('modal-scientific');
    const name=document.getElementById('modal-name');
    if(!modal||!sci||!name)return;
    let el=document.getElementById('modal-common-name');
    if(!el){
      el=document.createElement('p');el.id='modal-common-name';
      el.style.margin='6px 0 10px';el.style.color='#55715f';el.style.fontSize='.95rem';
      sci.insertAdjacentElement('afterend',el);
    }
    const p=typeof productos!=='undefined'?productos.find(x=>x.nombre===name.textContent.trim()):null;
    el.textContent=p?.conocidoComo?`También se conoce como: ${p.conocidoComo}`:'';
    el.hidden=!p?.conocidoComo;
  }
  document.addEventListener('click',e=>{if(e.target.closest?.('[data-view],#ficha-prev,#ficha-next'))setTimeout(ensureCommonName,40)},true);
  new MutationObserver(()=>{if(document.getElementById('product-modal')?.classList.contains('open'))ensureCommonName()}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();

/* Menú móvil. */
(function(){
  function closeMenu(){const nav=document.getElementById("nav"),btn=document.getElementById("menu-toggle");if(nav)nav.classList.remove("open");if(btn){btn.setAttribute("aria-expanded","false");btn.textContent="☰"}}
  document.addEventListener("click",function(e){const btn=e.target.closest&&e.target.closest("#menu-toggle"),nav=document.getElementById("nav");if(btn&&nav){e.preventDefault();e.stopImmediatePropagation();const opening=!nav.classList.contains("open");nav.classList.toggle("open",opening);btn.setAttribute("aria-expanded",opening?"true":"false");btn.textContent=opening?"×":"☰";return}if(e.target.closest&&e.target.closest("#nav a"))closeMenu()},true);
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});window.addEventListener("resize",()=>{if(innerWidth>700)closeMenu()});
})();

/* La foto del catálogo abre la ficha. */
(function(){
  function openFromImage(img){if(!img)return;const card=img.closest(".product-card");if(!card)return;const id=img.dataset.id,view=id?card.querySelector(`[data-view="${id}"]`):card.querySelector("[data-view]");if(view)view.click()}
  document.addEventListener("click",function(e){const img=e.target.closest(".product-image-wrap img");if(!img)return;e.preventDefault();openFromImage(img)});
  function prep(){document.querySelectorAll(".product-image-wrap img").forEach(img=>{img.style.cursor="pointer";img.setAttribute("role","button");img.setAttribute("tabindex","0")})}
  const grid=document.getElementById("catalog-grid");if(grid){prep();new MutationObserver(prep).observe(grid,{childList:true,subtree:true})}
})();

/* Misma foto en tarjeta y ficha. */
(function(){
  const photos=new Map();
  function rememberCards(){document.querySelectorAll('.product-card').forEach(card=>{const n=(card.querySelector('h3')?.textContent||'').trim(),img=card.querySelector('.product-image-wrap img');if(n&&img?.src)photos.set(n,img.src)})}
  function syncModal(){rememberCards();const n=(document.getElementById('modal-name')?.textContent||'').trim(),img=document.getElementById('modal-image'),src=photos.get(n);if(img&&src){img.src=src;img.alt=n}}
  document.addEventListener('load',e=>{if(e.target.matches?.('.product-image-wrap img,#modal-image'))syncModal()},true);
  document.addEventListener('click',e=>{if(e.target.closest?.('[data-view],#ficha-prev,#ficha-next')){setTimeout(syncModal,20);setTimeout(syncModal,250)}},true);
  const grid=document.getElementById('catalog-grid');if(grid)new MutationObserver(rememberCards).observe(grid,{childList:true,subtree:true,attributes:true,attributeFilter:['src']});
})();

/* Flechas de navegación de la ficha ancladas sobre la foto. */
(function(){
  function place(){
    const box=document.querySelector('#product-modal .modal-box'),img=document.getElementById('modal-image'),prev=document.getElementById('ficha-prev'),next=document.getElementById('ficha-next'),pos=document.getElementById('ficha-position');
    if(!box||!img||!prev||!next)return;
    if(prev.parentElement!==box)box.appendChild(prev);if(next.parentElement!==box)box.appendChild(next);if(pos&&pos.parentElement!==box)box.appendChild(pos);
    const br=box.getBoundingClientRect(),ir=img.getBoundingClientRect();if(ir.width<20||ir.height<20)return;
    [prev,next].forEach(b=>{b.style.setProperty('position','absolute','important');b.style.setProperty('z-index','999','important');b.style.setProperty('margin','0','important');b.style.setProperty('transform','translateY(-50%)','important');b.style.setProperty('pointer-events','auto','important')});
    const y=ir.top-br.top+(ir.height/2);prev.style.setProperty('top',y+'px','important');prev.style.setProperty('left',(ir.left-br.left+18)+'px','important');next.style.setProperty('top',y+'px','important');next.style.setProperty('left',(ir.right-br.left-68)+'px','important');
    if(pos){pos.style.setProperty('position','absolute','important');pos.style.setProperty('z-index','999','important');pos.style.setProperty('top',(ir.top-br.top+12)+'px','important');pos.style.setProperty('left',(ir.left-br.left+ir.width/2)+'px','important');pos.style.setProperty('transform','translateX(-50%)','important')}
  }
  function refresh(){requestAnimationFrame(place);setTimeout(place,80);setTimeout(place,300)}
  document.addEventListener('click',e=>{if(e.target.closest?.('[data-view],#ficha-prev,#ficha-next'))setTimeout(refresh,0)},true);
  document.addEventListener('load',e=>{if(e.target.id==='modal-image')refresh()},true);window.addEventListener('resize',place);
  new MutationObserver(()=>{if(document.getElementById('product-modal')?.classList.contains('open'))refresh()}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
