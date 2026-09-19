/* Florambar — fotos reales para catálogo, carrito y ficha técnica.
   Busca primero por nombre científico y conserva la misma foto en toda la sesión. */
(function(){
  const manual={
    "Teléfonos":"Tradescantia zebrina",
    "Zapitos":"Calceolaria plant",
    "Esqueletos":"Euphorbia tithymaloides",
    "Muñecas":"Fuchsia plant",
    "Espadas":"Sansevieria trifasciata",
    "Elegantísimas":"Chamaedorea elegans",
    "Warneckii":"Dracaena fragrans Warneckii",
    "Violeta Imperial":"Streptocarpus ionanthus",
    "Violeta Africana Imperial":"Streptocarpus ionanthus",
    "Amores":"Impatiens walleriana",
    "Agasania":"Gazania rigens",
    "Mosquito":"Cuphea hyssopifolia",
    "Llamarada":"Celosia argentea",
    "Velo de Novia Blanco":"Gypsophila paniculata",
    "Velo de Novia Morado":"Gypsophila paniculata purple",
    "Dólar":"Plectranthus verticillatus",
    "Cepillo":"Callistemon citrinus",
    "Ficus Pintu":"Ficus benjamina",
    "Ule":"Ficus elastica",
    "Bandera":"Codiaeum variegatum",
    "Cedo":"Cedrus plant",
    "Rocíos":"Aptenia cordifolia",
    "Culantrillo":"Adiantum raddianum",
    "Nido de Ave":"Asplenium nidus",
    "Pata de Conejo":"Davallia fejeensis",
    "Helecho Azul":"Phlebodium aureum",
    "Helecho Plumoso":"Asparagus setaceus",
    "Helecho Australiano":"Cyathea cooperi",
    "Helecho Cuero":"Rumohra adiantiformis",
    "Poto Neón":"Epipremnum aureum Neon",
    "Poto Mármol":"Epipremnum aureum Marble Queen",
    "Poto Satinado":"Scindapsus pictus",
    "Aglaonema Roja":"Aglaonema red",
    "Calathea Ornata":"Goeppertia ornata",
    "Calathea Medallion":"Goeppertia roseopicta",
    "Maranta Tricolor":"Maranta leuconeura",
    "Peperomia Sandía":"Peperomia argyreia",
    "Planta Araña / Malamadre":"Chlorophytum comosum",
    "Bambú de la Suerte":"Dracaena sanderiana",
    "Singonio":"Syngonium podophyllum",
    "Dischidia":"Dischidia plant",
    "Begonia Rex":"Begonia rex",
    "Insulina":"Cissus verticillata",
    "Muitle":"Justicia spicigera",
    "Árnica Mexicana":"Heterotheca inuloides",
    "Epazote de Zorrillo":"Dysphania graveolens",
    "Orégano Mexicano":"Lippia graveolens",
    "Hoja de Higuera":"Ficus carica",
    "Impatiens / Alegría":"Impatiens walleriana"
  };

  const cache=new Map();
  const pending=new Map();

  function queryFor(p){ return (p.cientifico||manual[p.nombre]||p.nombre+" planta").trim(); }

  async function wikiPhoto(p){
    const key=p.nombre;
    if(cache.has(key)) return cache.get(key);
    if(pending.has(key)) return pending.get(key);
    const task=(async()=>{
      const q=encodeURIComponent(queryFor(p));
      const endpoints=[
        `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&gsrlimit=4&prop=pageimages&piprop=original|thumbnail&pithumbsize=900&format=json&origin=*`,
        `https://es.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${q}&gsrlimit=4&prop=pageimages&piprop=original|thumbnail&pithumbsize=900&format=json&origin=*`
      ];
      for(const url of endpoints){
        try{
          const r=await fetch(url);
          if(!r.ok) continue;
          const d=await r.json();
          const pages=Object.values(d.query?.pages||{}).sort((a,b)=>(a.index||99)-(b.index||99));
          const hit=pages.find(x=>x.original?.source||x.thumbnail?.source);
          const src=hit?.original?.source||hit?.thumbnail?.source;
          if(src){ cache.set(key,src); return src; }
        }catch(e){}
      }
      return "";
    })();
    pending.set(key,task);
    const result=await task;
    pending.delete(key);
    return result;
  }

  window.cargarFoto=async function(p,img){
    if(!p||!img) return;
    img.classList.add("plant-photo-loading");
    const src=await wikiPhoto(p);
    if(!src) return;
    img.onload=()=>img.classList.remove("plant-photo-loading");
    img.onerror=()=>img.classList.remove("plant-photo-loading");
    img.src=src;
    img.dataset.real="1";
  };

  /* Fotos también en favoritos, que el script original crea sin data-id. */
  const oldRenderFav=window.renderFav;
  if(typeof oldRenderFav==="function"){
    window.renderFav=function(){
      oldRenderFav();
      const favs=[...document.querySelectorAll("#fav-items .fav-item")];
      favs.forEach((row,i)=>{
        const name=row.querySelector("b")?.textContent?.trim();
        const p=window.productos?.find?.(x=>x.nombre===name);
        const img=row.querySelector("img");
        if(p&&img) window.cargarFoto(p,img);
      });
    };
  }
})();