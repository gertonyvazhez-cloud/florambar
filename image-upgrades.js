/* Florambar — carga robusta de fotografías reales.
   Intenta Wikipedia REST y después MediaWiki; conserva la foto encontrada. */
(function(){
  const manual={
    "Robelina":"Phoenix roebelenii","Teléfonos":"Tradescantia zebrina","Zapitos":"Calceolaria","Esqueletos":"Euphorbia tithymaloides","Muñecas":"Fuchsia","Espadas":"Dracaena trifasciata","Elegantísimas":"Chamaedorea elegans","Warneckii":"Dracaena fragrans","Violeta Imperial":"Streptocarpus ionanthus","Violeta Africana Imperial":"Streptocarpus ionanthus","Amores":"Impatiens walleriana","Agasania":"Gazania rigens","Mosquito":"Cuphea hyssopifolia","Llamarada":"Celosia argentea","Velo de Novia Blanco":"Gypsophila paniculata","Velo de Novia Morado":"Gypsophila paniculata","Dólar":"Plectranthus verticillatus","Cepillo":"Callistemon citrinus","Ficus Pintu":"Ficus benjamina","Ule":"Ficus elastica","Bandera":"Codiaeum variegatum","Cedo":"Cedrus","Rocíos":"Aptenia cordifolia","Culantrillo":"Adiantum raddianum","Nido de Ave":"Asplenium nidus","Pata de Conejo":"Davallia fejeensis","Helecho Azul":"Phlebodium aureum","Helecho Plumoso":"Asparagus setaceus","Helecho Australiano":"Cyathea cooperi","Helecho Cuero":"Rumohra adiantiformis","Poto Neón":"Epipremnum aureum","Poto Mármol":"Epipremnum aureum","Poto Satinado":"Scindapsus pictus","Aglaonema Roja":"Aglaonema","Calathea Ornata":"Goeppertia ornata","Calathea Medallion":"Goeppertia roseopicta","Maranta Tricolor":"Maranta leuconeura","Peperomia Sandía":"Peperomia argyreia","Planta Araña / Malamadre":"Chlorophytum comosum","Bambú de la Suerte":"Dracaena sanderiana","Singonio":"Syngonium podophyllum","Dischidia":"Dischidia","Begonia Rex":"Begonia rex","Insulina":"Cissus verticillata","Muitle":"Justicia spicigera","Árnica Mexicana":"Heterotheca inuloides","Epazote de Zorrillo":"Dysphania graveolens","Orégano Mexicano":"Lippia graveolens","Hoja de Higuera":"Ficus carica","Impatiens / Alegría":"Impatiens walleriana","Julieta":"Dracaena fragrans","Mariana":"Dracaena fragrans","Croto Petra":"Codiaeum variegatum","Planta Carnívora":"Dionaea muscipula","Clavelina":"Dianthus","Celosía":"Celosia argentea","Viola":"Viola","Huele de Noche":"Cestrum nocturnum","Cissus":"Cissus","Ciprés Italiano":"Cupressus sempervirens","Tulia":"Thuja occidentalis"
  };

  const memory=new Map();
  const pending=new Map();
  const storageKey="florambar_real_photos_v3";
  let saved={};
  try{ saved=JSON.parse(localStorage.getItem(storageKey)||"{}"); }catch(e){}

  function candidate(p){
    return (manual[p.nombre]||p.cientifico||p.nombre).trim();
  }

  function remember(name,src){
    if(!src) return;
    memory.set(name,src);
    saved[name]=src;
    try{ localStorage.setItem(storageKey,JSON.stringify(saved)); }catch(e){}
  }

  async function summaryPhoto(title){
    const slug=encodeURIComponent(title.replace(/\s+/g,"_"));
    for(const lang of ["es","en"]){
      try{
        const r=await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${slug}`,{headers:{"Accept":"application/json"}});
        if(!r.ok) continue;
        const d=await r.json();
        const src=d.originalimage?.source||d.thumbnail?.source||"";
        if(src) return src;
      }catch(e){}
    }
    return "";
  }

  async function searchPhoto(q){
    for(const lang of ["es","en"]){
      const url=`https://${lang}.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(q)}&gsrlimit=5&prop=pageimages&piprop=original%7Cthumbnail&pithumbsize=900&format=json&origin=*`;
      try{
        const r=await fetch(url);
        if(!r.ok) continue;
        const d=await r.json();
        const pages=Object.values(d.query?.pages||{}).sort((a,b)=>(a.index||99)-(b.index||99));
        const hit=pages.find(x=>x.original?.source||x.thumbnail?.source);
        const src=hit?.original?.source||hit?.thumbnail?.source||"";
        if(src) return src;
      }catch(e){}
    }
    return "";
  }

  async function photoFor(p){
    const key=p.nombre;
    if(memory.has(key)) return memory.get(key);
    if(saved[key]){ memory.set(key,saved[key]); return saved[key]; }
    if(pending.has(key)) return pending.get(key);

    const task=(async()=>{
      const q=candidate(p);
      let src=await summaryPhoto(q);
      if(!src) src=await searchPhoto(q+" planta");
      if(!src && q!==p.nombre) src=await searchPhoto(p.nombre+" planta");
      if(src) remember(key,src);
      return src;
    })();

    pending.set(key,task);
    const result=await task;
    pending.delete(key);
    return result;
  }

  window.cargarFoto=async function(p,img){
    if(!p||!img) return;
    const token=String(p.id||p.nombre);
    img.dataset.photoToken=token;
    img.classList.add("plant-photo-loading");
    const src=await photoFor(p);
    if(img.dataset.photoToken!==token) return;
    if(!src){ img.classList.remove("plant-photo-loading"); return; }
    img.referrerPolicy="no-referrer";
    img.onload=()=>img.classList.remove("plant-photo-loading");
    img.onerror=()=>{
      img.classList.remove("plant-photo-loading");
      delete saved[p.nombre];
      memory.delete(p.nombre);
      try{ localStorage.setItem(storageKey,JSON.stringify(saved)); }catch(e){}
    };
    img.src=src;
    img.dataset.real="1";
  };
})();

/* Menú Florambar: controlador independiente para que el botón funcione
   aunque otra parte del script principal falle antes de enlazarlo. */
(function(){
  function initMenu(){
    const button=document.getElementById("menu-toggle");
    const nav=document.getElementById("nav");
    if(!button||!nav) return;

    /* Sustituimos el botón por una copia para eliminar manejadores duplicados. */
    const clean=button.cloneNode(true);
    button.parentNode.replaceChild(clean,button);
    clean.setAttribute("aria-expanded","false");

    clean.addEventListener("click",function(e){
      e.preventDefault();
      e.stopPropagation();
      const open=nav.classList.toggle("open");
      clean.setAttribute("aria-expanded",open?"true":"false");
      clean.textContent=open?"×":"☰";
    });

    nav.querySelectorAll("a").forEach(function(link){
      link.addEventListener("click",function(){
        nav.classList.remove("open");
        clean.setAttribute("aria-expanded","false");
        clean.textContent="☰";
      });
    });

    document.addEventListener("click",function(e){
      if(window.innerWidth<=700 && nav.classList.contains("open") && !nav.contains(e.target) && e.target!==clean){
        nav.classList.remove("open");
        clean.setAttribute("aria-expanded","false");
        clean.textContent="☰";
      }
    });
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",initMenu);
  else initMenu();
})();
