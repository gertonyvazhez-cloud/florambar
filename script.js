const WHATSAPP="527121479122";

const DATA=`Tulia|Exterior
Areca|Interior
Robelina|Interior
Camedor|Interior
Pata de elefante|Exterior
Croto|Interior
Sansevieria|Interior
Zamioculca|Interior
Julieta|Interior
Mariana|Interior
Drácena Marginata|Interior
Filodendro|Interior
Fittonia|Interior
Croto Petra|Interior
Teléfonos|Interior
Zapitos|Interior
Esqueletos|Interior
Muñecas|Interior
Espadas|Interior
Elegantísimas|Interior
Warneckii|Interior
Mimosa Sensitiva|Interior
Planta Carnívora|Interior
Violeta Imperial|Interior
Palma Camedor|Interior
Ixora|Plantas con flor
Pentas|Plantas con flor
Vinca de Madagascar|Plantas con flor
Clavel|Plantas con flor
Clavelina|Plantas con flor
Petunia|Plantas con flor
Celosía|Plantas con flor
Pensamiento|Plantas con flor
Viola|Plantas con flor
Amores|Plantas con flor
Agasania|Plantas con flor
Mosquito|Plantas con flor
Rosa|Plantas con flor
Llamarada|Plantas con flor
Velo de Novia Blanco|Plantas con flor
Velo de Novia Morado|Plantas con flor
Cempasúchil|Temporada
Nochebuena Pintada|Temporada
Nochebuena Natural|Temporada
Tulipán Holandés|Temporada
Bugambilia|Plantas con flor
Gardenia|Plantas con flor
Jazmín|Plantas con flor
Jazmín Estrella|Plantas con flor
Jazmín Enredadera|Plantas con flor
Huele de Noche|Plantas con flor
Cissus|Exterior
Dólar|Exterior
Cepillo|Exterior
Tabachín|Exterior
Jacaranda|Exterior
Flamboyán|Exterior
Magnolia|Exterior
Encino|Exterior
Cedro Limón|Exterior
Ciprés Italiano|Exterior
Árbol de Limón|Frutales
Árbol de Naranja|Frutales
Árbol de Tamarindo|Frutales
Árbol de Zapote Blanco|Frutales
Árbol de Níspero|Frutales
Árbol de Membrillo|Frutales
Árbol de Granada|Frutales
Árbol de Granada China|Frutales
Árbol de Guayaba Fresa|Frutales
Árbol de Papaya|Frutales
Árbol de Moringa|Frutales
Fresa|Huerto
Perejil|Huerto
Cilantro|Huerto
Chile Habanero|Huerto
Chile Jalapeño|Huerto
Apio|Huerto
Ficus Pintu|Exterior
Ficus Pandurata|Interior
Ule|Exterior
Bandera|Exterior
Cedo|Exterior
Rocíos|Exterior
Helecho Boston|Interior
Helecho Espada|Interior
Culantrillo|Interior
Nido de Ave|Interior
Pata de Conejo|Interior
Helecho Azul|Interior
Helecho Plumoso|Interior
Helecho Australiano|Interior
Helecho Cuero|Interior
Laurel|Exterior
Eucalipto|Exterior
Monstera Deliciosa|Interior
Monstera Adansonii|Interior
Poto / Potus|Interior
Poto Neón|Interior
Poto Mármol|Interior
Poto Satinado|Interior
Anturio|Interior
Orquídea Phalaenopsis|Interior
Aglaonema|Interior
Aglaonema Roja|Interior
Calathea|Interior
Calathea Ornata|Interior
Calathea Medallion|Interior
Maranta|Interior
Maranta Tricolor|Interior
Peperomia|Interior
Peperomia Sandía|Interior
Pilea|Interior
Planta Araña / Malamadre|Interior
Bromelia|Interior
Ficus Elástica|Interior
Schefflera|Interior
Árbol de Jade|Interior
Pachira|Interior
Bambú de la Suerte|Interior
Singonio|Interior
Dieffenbachia|Interior
Tradescantia|Interior
Dischidia|Interior
Begonia Rex|Interior
Insulina|Medicinales y aromáticas
Muitle|Medicinales y aromáticas
Hierbabuena|Medicinales y aromáticas
Menta|Medicinales y aromáticas
Ruda|Medicinales y aromáticas
Albahaca|Medicinales y aromáticas
Romero|Medicinales y aromáticas
Orégano|Medicinales y aromáticas
Lavanda|Medicinales y aromáticas
Tomillo|Medicinales y aromáticas
Salvia|Medicinales y aromáticas
Manzanilla|Medicinales y aromáticas
Toronjil / Melisa|Medicinales y aromáticas
Epazote|Medicinales y aromáticas
Cedrón / Hierba Luisa|Medicinales y aromáticas
Estragón|Medicinales y aromáticas
Hinojo|Medicinales y aromáticas
Eneldo|Medicinales y aromáticas
Mejorana|Medicinales y aromáticas
Cebollín|Medicinales y aromáticas
Árnica Mexicana|Medicinales y aromáticas
Caléndula|Medicinales y aromáticas
Aloe Vera / Sábila|Medicinales y aromáticas
Stevia|Medicinales y aromáticas
Hoja Santa|Medicinales y aromáticas
Epazote de Zorrillo|Medicinales y aromáticas
Chaya|Medicinales y aromáticas
Orégano Mexicano|Medicinales y aromáticas
Limonaria / Zacate Limón|Medicinales y aromáticas
Hoja de Higuera|Frutales
Hibisco|Plantas con flor
Azalea|Plantas con flor
Begonia|Plantas con flor
Geranio|Plantas con flor
Malvón|Plantas con flor
Cuna de Moisés|Interior
Violeta Africana Imperial|Interior
Gazania|Plantas con flor
Portulaca|Plantas con flor
Gerbera|Plantas con flor
Zinnia|Plantas con flor
Dalia|Plantas con flor
Margarita|Plantas con flor
Impatiens / Alegría|Plantas con flor
Plumeria / Flor de Mayo|Plantas con flor
Ave del Paraíso|Plantas con flor
Agapanto|Plantas con flor
Lantana|Exterior`;

const productos=DATA.split("\n").map((line,i)=>{
 const [nombre,categoria]=line.split("|");

 return{
  id:i+1,
  nombre,
  categoria,
  cientifico:"",
  stock:1000,
  imagen:"",
  descripcion:`${nombre} disponible en Florambar para decorar y dar vida a tus espacios.`
 };
});


const scientific={

"Tulia":"Thuja occidentalis",
"Areca":"Dypsis lutescens",
"Camedor":"Chamaedorea elegans",
"Palma Camedor":"Chamaedorea elegans",
"Pata de elefante":"Beaucarnea recurvata",
"Croto":"Codiaeum variegatum",
"Sansevieria":"Dracaena trifasciata",
"Zamioculca":"Zamioculcas zamiifolia",
"Drácena Marginata":"Dracaena marginata",
"Filodendro":"Philodendron",
"Fittonia":"Fittonia",
"Monstera Deliciosa":"Monstera deliciosa",
"Monstera Adansonii":"Monstera adansonii",
"Poto / Potus":"Epipremnum aureum",
"Anturio":"Anthurium",
"Orquídea Phalaenopsis":"Phalaenopsis",
"Aglaonema":"Aglaonema",
"Calathea":"Calathea",
"Maranta":"Maranta",
"Peperomia":"Peperomia",
"Pilea":"Pilea peperomioides",
"Bromelia":"Bromeliaceae",
"Ficus Elástica":"Ficus elastica",
"Schefflera":"Schefflera arboricola",
"Árbol de Jade":"Crassula ovata",
"Pachira":"Pachira aquatica",
"Dieffenbachia":"Dieffenbachia",
"Tradescantia":"Tradescantia",
"Ixora":"Ixora coccinea",
"Pentas":"Pentas lanceolata",
"Clavel":"Dianthus caryophyllus",
"Petunia":"Petunia × hybrida",
"Pensamiento":"Viola × wittrockiana",
"Rosa":"Rosa",
"Cempasúchil":"Tagetes erecta",
"Nochebuena Natural":"Euphorbia pulcherrima",
"Nochebuena Pintada":"Euphorbia pulcherrima",
"Bugambilia":"Bougainvillea",
"Gardenia":"Gardenia jasminoides",
"Jazmín":"Jasminum",
"Jazmín Estrella":"Trachelospermum jasminoides",
"Hibisco":"Hibiscus rosa-sinensis",
"Geranio":"Pelargonium",
"Malvón":"Pelargonium × hortorum",
"Lantana":"Lantana camara",
"Gazania":"Gazania rigens",
"Portulaca":"Portulaca grandiflora",
"Gerbera":"Gerbera jamesonii",
"Zinnia":"Zinnia elegans",
"Dalia":"Dahlia",
"Margarita":"Leucanthemum",
"Plumeria / Flor de Mayo":"Plumeria rubra",
"Ave del Paraíso":"Strelitzia reginae",
"Agapanto":"Agapanthus",

"Árbol de Limón":"Citrus limon",
"Árbol de Naranja":"Citrus sinensis",
"Árbol de Tamarindo":"Tamarindus indica",
"Árbol de Zapote Blanco":"Casimiroa edulis",
"Árbol de Níspero":"Eriobotrya japonica",
"Árbol de Membrillo":"Cydonia oblonga",
"Árbol de Granada":"Punica granatum",
"Árbol de Granada China":"Passiflora ligularis",
"Árbol de Guayaba Fresa":"Psidium cattleyanum",
"Árbol de Papaya":"Carica papaya",
"Árbol de Moringa":"Moringa oleifera",

"Fresa":"Fragaria × ananassa",
"Perejil":"Petroselinum crispum",
"Cilantro":"Coriandrum sativum",
"Chile Habanero":"Capsicum chinense",
"Chile Jalapeño":"Capsicum annuum",
"Apio":"Apium graveolens",
"Hierbabuena":"Mentha spicata",
"Menta":"Mentha × piperita",
"Ruda":"Ruta graveolens",
"Albahaca":"Ocimum basilicum",
"Romero":"Salvia rosmarinus",
"Orégano":"Origanum vulgare",
"Lavanda":"Lavandula angustifolia",
"Tomillo":"Thymus vulgaris",
"Salvia":"Salvia officinalis",
"Manzanilla":"Matricaria chamomilla",
"Toronjil / Melisa":"Melissa officinalis",
"Epazote":"Dysphania ambrosioides",
"Cedrón / Hierba Luisa":"Aloysia citrodora",
"Hinojo":"Foeniculum vulgare",
"Eneldo":"Anethum graveolens",
"Mejorana":"Origanum majorana",
"Cebollín":"Allium schoenoprasum",
"Caléndula":"Calendula officinalis",
"Aloe Vera / Sábila":"Aloe vera",
"Stevia":"Stevia rebaudiana",
"Hoja Santa":"Piper auritum",
"Chaya":"Cnidoscolus aconitifolius",
"Limonaria / Zacate Limón":"Cymbopogon citratus",
"Eucalipto":"Eucalyptus",
"Laurel":"Laurus nobilis",
"Jacaranda":"Jacaranda",
"Flamboyán":"Delonix regia",
"Magnolia":"Magnolia"

};


productos.forEach(
 p=>p.cientifico=scientific[p.nombre]||""
);


const $=s=>document.querySelector(s);

const $$=s=>[
 ...document.querySelectorAll(s)
];


const norm=s=>(s||"")
 .toString()
 .normalize("NFD")
 .replace(/[\u0300-\u036f]/g,"")
 .toLowerCase()
 .trim();


let filtro="Todos";

let busqueda="";

let carrito=
 JSON.parse(
  localStorage.getItem("florambar_cart")||"{}"
 );

let favoritos=
 new Set(
  JSON.parse(
   localStorage.getItem("florambar_fav")||"[]"
  )
 );


function tech(p){

 const c=p.categoria;


 if(c==="Interior"){
  return[
   "Luz indirecta o filtrada",
   "Riego moderado cuando se seque la capa superior",
   "Sustrato aireado y con buen drenaje",
   "Vigilar cochinilla, araña roja y hongos",
   "Limpiar hojas y evitar encharcamientos"
  ];
 }


 if(c==="Plantas con flor"){
  return[
   "Luz abundante; según variedad puede recibir sol suave",
   "Riego moderado, sin encharcar",
   "Sustrato fértil y drenante",
   "Vigilar pulgón, mosca blanca y hongos",
   "Retirar flores secas y mantener buena ventilación"
  ];
 }


 if(c==="Frutales"){
  return[
   "Sol directo o luz muy abundante",
   "Riego regular según clima y tamaño",
   "Sustrato fértil y drenante",
   "Vigilar plagas propias del cultivo",
   "Poda y fertilización según especie"
  ];
 }


 if(c==="Huerto"){
  return[
   "Sol abundante",
   "Riego regular sin encharcar",
   "Sustrato fértil, suelto y drenante",
   "Revisar pulgones, trips y hongos",
   "Cosechar y mantener limpieza del cultivo"
  ];
 }


 if(c==="Medicinales y aromáticas"){
  return[
   "Luz abundante; algunas toleran semisombra",
   "Riego moderado",
   "Sustrato ligero y drenante",
   "Revisar pulgones y hongos",
   "Podar puntas para estimular crecimiento"
  ];
 }


 if(c==="Temporada"){
  return[
   "Luz abundante",
   "Riego moderado",
   "Sustrato fértil y drenante",
   "Revisar plagas según temporada",
   "Retirar partes dañadas y respetar su ciclo"
  ];
 }


 return[
  "Sol o luz abundante según variedad",
  "Riego moderado según clima",
  "Sustrato fértil y drenante",
  "Revisar plagas y hongos periódicamente",
  "Poda de formación y limpieza cuando corresponda"
 ];
}


function placeholder(p){

 const txt=encodeURIComponent(p.nombre);

 return `data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%23edf8e5"/><circle cx="400" cy="270" r="145" fill="%23d5efc5"/><text x="400" y="255" text-anchor="middle" font-size="105">🌿</text><text x="400" y="380" text-anchor="middle" font-family="Arial" font-size="34" font-weight="700" fill="%23713517">${txt}</text></svg>`;
}


/* =========================================================
   IMÁGENES
   ========================================================= */

async function cargarFoto(p,img){

 if(!p||!img)return;


 /* =========================================================
    ÚNICA CORRECCIÓN:
    FOTOS MANUALES PARA NOMBRES COMERCIALES AMBIGUOS
    ========================================================= */

 const fotosManuales={

  "Teléfonos":"imagenes/telefonos.jpg",

  "Esqueletos":"imagenes/esqueletos.jpg"

 };


 if(fotosManuales[p.nombre]){

  img.src=
   fotosManuales[p.nombre];

  img.dataset.real="1";

  return;
 }


 /* =========================================================
    SI NO HAY NOMBRE CIENTÍFICO CONFIRMADO,
    NO BUSCAMOS EL NOMBRE COMERCIAL EN WIKIPEDIA
    ========================================================= */

 if(!p.cientifico){

  return;

 }


 /* =========================================================
    PARA LAS DEMÁS PLANTAS SE CONSERVA LA BÚSQUEDA
    POR NOMBRE CIENTÍFICO
    ========================================================= */

 const consultas=[
  p.cientifico
 ].filter(Boolean);


 for(const q of consultas){

  try{

   const title=
    encodeURIComponent(
     q.trim().replace(/ /g,"_")
    );


   const r=
    await fetch(
     `https://es.wikipedia.org/api/rest_v1/page/summary/${title}`,
     {
      headers:{
       Accept:"application/json"
      }
     }
    );


   if(!r.ok)continue;


   const d=
    await r.json();


   const foto=
    d.originalimage?.source||
    d.thumbnail?.source;


   if(foto){

    img.src=foto;

    img.dataset.real="1";

    return;
   }

  }catch(e){}
 }
}


/* =========================================================
   BÚSQUEDA
   ========================================================= */

function match(p){

 if(!busqueda)return true;


 const extras={

  "Interior":`
   planta plantas
   interior interiores
   sombra
   semisombra
   planta de sombra
   plantas de sombra
   planta de sombra de interior
   plantas de sombra de interior
   luz indirecta
   luz filtrada
   ornamental
   ornamentales
  `,

  "Exterior":`
   planta plantas
   exterior exteriores
   sol
   jardín jardin
   ornamental
   ornamentales
  `,

  "Plantas con flor":`
   planta plantas
   flor flores
   plantas con flor
   ornamental
   ornamentales
  `,

  "Frutales":`
   árbol arbol
   árboles arboles
   árbol frutal
   arbol frutal
   árboles frutales
   arboles frutales
   frutal
   frutales
   exterior
  `,

  "Huerto":`
   planta plantas
   huerto
   plantas de huerto
   comestible
   comestibles
   hortaliza
   hortalizas
   exterior
  `,

  "Medicinales y aromáticas":`
   planta plantas
   medicinal medicinales
   aromática aromatica
   aromáticas aromaticas
   hierba hierbas
   plantas medicinales
   plantas aromáticas
  `,

  "Temporada":`
   planta plantas
   temporada
   planta de temporada
   plantas de temporada
   ornamental
   ornamentales
  `
 };


 const text=
  norm([
   p.nombre,
   p.cientifico,
   p.categoria,
   p.descripcion,
   extras[p.categoria]||""
  ].join(" "));


 const q=
  norm(busqueda);


 return(
  text.includes(q)||
  q.split(" ")
   .filter(Boolean)
   .every(
    w=>text.includes(w)
   )
 );
}


function visibles(){

 return productos.filter(
  p=>
   (
    filtro==="Todos"||
    p.categoria===filtro
   )
   &&
   match(p)
 );
}


function actualizarContador(list){

 $("#total-number").textContent=
  list.length;


 $("#total-label").textContent=
  list.length===1
   ?"variedad disponible"
   :"variedades disponibles";
}


function card(p){

 const fav=
  favoritos.has(p.id);


 return `<article class="product-card">

 <div class="product-image-wrap">

  <img
   src="${placeholder(p)}"
   data-id="${p.id}"
   alt="${p.nombre}"
   loading="lazy"
  >

  <button
   class="favorite ${fav?"active":""}"
   data-fav="${p.id}"
  >${fav?"♥":"♡"}</button>

 </div>


 <div class="product-body">

  <span class="tag">
   ${p.categoria}
  </span>


  <h3>${p.nombre}</h3>


  <div class="product-scientific">
   ${p.cientifico||"Variedad disponible en Florambar"}
  </div>


  <p>${p.descripcion}</p>


  <div class="product-stock">
   ● Disponible <b>1,000 piezas</b>
  </div>


  <div class="product-actions">

   <button
    class="view"
    data-view="${p.id}"
   >
    Ver ficha
   </button>


   <button
    class="add"
    data-add="${p.id}"
   >
    + Agregar
   </button>

  </div>

 </div>

 </article>`;
}


function render(){

 const list=
  visibles();


 actualizarContador(list);


 $("#results-info").textContent=
  busqueda
   ?`${list.length} resultado(s) para “${busqueda}”`
   :`${list.length} variedades en ${filtro==="Todos"?"todo el catálogo":filtro}`;


 $("#catalog-grid").innerHTML=
  list.map(card).join("");


 $("#empty").hidden=
  list.length!==0;


 list.forEach(p=>{

  const img=
   $(`img[data-id="${p.id}"]`);


  if(img)
   cargarFoto(p,img);

 });
}


function save(){

 localStorage.setItem(
  "florambar_cart",
  JSON.stringify(carrito)
 );


 localStorage.setItem(
  "florambar_fav",
  JSON.stringify([...favoritos])
 );
}


function updateCounts(){

 $("#cart-count").textContent=
  Object.values(carrito)
   .reduce((a,b)=>a+b,0);


 $("#fav-count").textContent=
  favoritos.size;
}


function add(id){

 carrito[id]=
  (carrito[id]||0)+1;


 save();

 updateCounts();


 toast(
  "🌿 Planta agregada al carrito"
 );


 renderCart();
}


function toggleFav(id){

 favoritos.has(id)
  ?favoritos.delete(id)
  :favoritos.add(id);


 save();

 updateCounts();

 render();
}


function renderCart(){

 const rows=
  Object.entries(carrito)
   .filter(
    ([id])=>
     productos.some(
      p=>p.id==id
     )
   );


 $("#cart-items").innerHTML=
  rows.length
   ?rows.map(
    ([id,q])=>{

     const p=
      productos.find(
       x=>x.id==id
      );


     return `<div class="cart-item">

      <img
       src="${placeholder(p)}"
       data-cart-id="${id}"
       alt=""
      >


      <div>

       <b>${p.nombre}</b>


       <div class="cart-controls">

        <button data-minus="${id}">
         −
        </button>

        ${q}

        <button data-plus="${id}">
         +
        </button>

       </div>

      </div>


      <button
       class="remove-item"
       data-remove="${id}"
      >
       Eliminar
      </button>

     </div>`;

    }
   ).join("")
   :"<p>Tu carrito está vacío.</p>";


 $("#cart-total").textContent=
  Object.values(carrito)
   .reduce((a,b)=>a+b,0);


 rows.forEach(([id])=>{

  const p=
   productos.find(
    x=>x.id==id
   );


  const img=
   $(
    `#cart-items img[data-cart-id="${id}"]`
   );


  if(img)
   cargarFoto(p,img);

 });
}


function openDrawer(id){

 $("#overlay")
  .classList.add("show");


 $(id)
  .classList.add("open");
}


function closeDrawers(){

 $("#overlay")
  .classList.remove("show");


 $$(".drawer")
  .forEach(
   x=>x.classList.remove("open")
  );
}


/* ================================
   NAVEGACIÓN ENTRE VARIEDADES
   ================================ */

let fichaLista=[];

let fichaIndice=-1;


function prepararNavegacionFicha(){

 const modal=
  $("#product-modal");


 const box=
  modal?.querySelector(".modal-box");


 if(!modal||!box)
  return null;


 let nav=
  $("#ficha-navigation");


 if(!nav){

  nav=
   document.createElement("div");


  nav.id=
   "ficha-navigation";


  nav.innerHTML=`
   <button
    type="button"
    id="ficha-prev"
    aria-label="Variedad anterior"
   >
    ‹ <span>Anterior</span>
   </button>

   <span id="ficha-position"></span>

   <button
    type="button"
    id="ficha-next"
    aria-label="Siguiente variedad"
   >
    <span>Siguiente</span> ›
   </button>
  `;


  const body=
   box.querySelector(".modal-body");


  if(body)
   box.insertBefore(nav,body);

  else
   box.appendChild(nav);


  Object.assign(
   nav.style,
   {
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    gap:"10px",
    padding:"8px 14px 14px",
    width:"100%",
    boxSizing:"border-box"
   }
  );


  [
   $("#ficha-prev"),
   $("#ficha-next")
  ].forEach(b=>{

   if(b){

    Object.assign(
     b.style,
     {
      border:"0",
      borderRadius:"999px",
      padding:"10px 14px",
      background:"#3f8f3a",
      color:"#fff",
      fontWeight:"700",
      cursor:"pointer",
      fontSize:"14px"
     }
    );

   }

  });


  Object.assign(
   $("#ficha-position").style,
   {
    fontWeight:"700",
    color:"#4d2d20",
    fontSize:"13px",
    textAlign:"center",
    flex:"1"
   }
  );


  $("#ficha-prev").onclick=
   ()=>cambiarFicha(-1);


  $("#ficha-next").onclick=
   ()=>cambiarFicha(1);
 }


 return nav;
}


function actualizarFichaNavegacion(){

 prepararNavegacionFicha();


 const prev=
  $("#ficha-prev");

 const next=
  $("#ficha-next");

 const pos=
  $("#ficha-position");


 if(!prev||!next||!pos)
  return;


 const total=
  fichaLista.length;


 prev.disabled=
  total<2;

 next.disabled=
  total<2;


 prev.style.opacity=
  total<2?".45":"1";

 next.style.opacity=
  total<2?".45":"1";


 pos.textContent=
  total
   ?`${fichaIndice+1} de ${total}`
   :"";
}


function cambiarFicha(direccion){

 if(fichaLista.length<2)
  return;


 fichaIndice=
  (
   fichaIndice+
   direccion+
   fichaLista.length
  )
  %
  fichaLista.length;


 mostrarFichaProducto(
  fichaLista[fichaIndice]
 );
}


function mostrarFichaProducto(p){

 if(!p)
  return;


 const t=
  tech(p);


 const modalImg=
  $("#modal-image");


 modalImg.src=
  placeholder(p);


 modalImg.alt=
  p.nombre;


 cargarFoto(
  p,
  modalImg
 );


 $("#modal-name").textContent=
  p.nombre;


 $("#modal-cat").textContent=
  p.categoria;


 $("#modal-scientific").textContent=
  p.cientifico;


 $("#modal-desc").textContent=
  p.descripcion;


 $("#m-light").textContent=
  t[0];


 $("#m-water").textContent=
  t[1];


 $("#m-substrate").textContent=
  t[2];


 $("#m-pests").textContent=
  t[3];


 $("#m-care").textContent=
  t[4];


 $("#modal-add").dataset.id=
  p.id;


 $("#modal-wa").href=
  `https://wa.me/${WHATSAPP}?text=${
   encodeURIComponent(
    "Hola Florambar, quiero información sobre "+
    p.nombre
   )
  }`;


 actualizarFichaNavegacion();
}


function openModal(id){

 const p=
  productos.find(
   x=>x.id==id
  );


 if(!p)
  return;


 fichaLista=
  visibles();


 if(
  !fichaLista.some(
   x=>x.id==p.id
  )
 ){

  fichaLista=
   productos.slice();

 }


 fichaIndice=
  Math.max(
   0,
   fichaLista.findIndex(
    x=>x.id==p.id
   )
  );


 mostrarFichaProducto(p);


 $("#product-modal")
  .classList.add("show");
}


function toast(t){

 const x=
  $("#toast");


 x.textContent=
  t;


 x.classList.add("show");


 setTimeout(
  ()=>x.classList.remove("show"),
  1800
 );
}


function setSearch(v){

 /*
  Cuando hacemos una búsqueda,
  buscamos en todo el catálogo.
  Así una categoría anterior no bloquea los resultados.
 */
 filtro="Todos";

 busqueda=v;


 $$("#filters button").forEach(
  x=>
   x.classList.toggle(
    "active",
    x.dataset.filter==="Todos"
   )
 );


 render();


 $("#catalogo")
  .scrollIntoView({
   behavior:"smooth"
  });
}


/* =========================================================
   CONVIERTE LOS NOMBRES DEL MENÚ A LAS CATEGORÍAS REALES
   ========================================================= */

function categoriaMenu(valor){

 const v=
  norm(valor);


 if(
  v==="interior"||
  v==="plantas de interior"||
  v==="planta de interior"||
  v==="plantas de sombra"||
  v==="plantas de sombra de interior"||
  v==="planta de sombra de interior"
 ){
  return "Interior";
 }


 if(
  v==="temporada"||
  v==="planta de temporada"||
  v==="plantas de temporada"
 ){
  return "Temporada";
 }


 if(
  v==="exterior"||
  v==="plantas de exterior"||
  v==="planta de exterior"
 ){
  return "Exterior";
 }


 if(
  v==="plantas con flor"||
  v==="planta con flor"||
  v==="flores"
 ){
  return "Plantas con flor";
 }


 if(
  v==="frutales"||
  v==="arboles frutales"||
  v==="arboles frutal"||
  v==="arbol frutal"||
  v==="arboles"
 ){
  return "Frutales";
 }


 if(
  v==="huerto"||
  v==="plantas de huerto"||
  v==="planta de huerto"
 ){
  return "Huerto";
 }


 if(
  v==="medicinales y aromaticas"||
  v==="plantas medicinales y aromaticas"||
  v==="medicinales"||
  v==="aromaticas"
 ){
  return "Medicinales y aromáticas";
 }


 if(
  v==="todos"||
  v==="todo"||
  v==="todas"
 ){
  return "Todos";
 }


 return valor;
}


document.addEventListener(
 "DOMContentLoaded",
 ()=>{


  updateCounts();


  renderCart();


  render();


  $("#header-search-btn").onclick=
   ()=>setSearch(
    $("#header-search").value
   );


  $("#header-search").addEventListener(
   "keydown",
   e=>{

    if(e.key==="Enter")
     setSearch(
      e.target.value
     );

   }
  );


  $("#catalog-search-btn").onclick=
   ()=>setSearch(
    $("#catalog-search").value
   );


  $("#catalog-search").addEventListener(
   "keydown",
   e=>{

    if(e.key==="Enter")
     setSearch(
      e.target.value
     );

   }
  );


  $$("#filters button").forEach(
   b=>b.onclick=()=>{


    filtro=
     categoriaMenu(
      b.dataset.filter
     );


    busqueda="";


    $("#header-search").value="";


    $("#catalog-search").value="";


    $$("#filters button").forEach(
     x=>x.classList.remove("active")
    );


    b.classList.add("active");


    render();

   }
  );


  $$("[data-cat]").forEach(
   b=>b.onclick=()=>{


    /*
     Aquí está la corrección para el menú.

     Por ejemplo:
     "Plantas de sombra de interior"
     se convierte en "Interior".

     "Plantas de temporada"
     se convierte en "Temporada".
    */

    filtro=
     categoriaMenu(
      b.dataset.cat
     );


    /*
     Borra la búsqueda anterior para que
     no deje el catálogo en cero.
    */

    busqueda="";


    if($("#header-search"))
     $("#header-search").value="";


    if($("#catalog-search"))
     $("#catalog-search").value="";


    $$("#filters button").forEach(
     x=>
      x.classList.toggle(
       "active",
       categoriaMenu(
        x.dataset.filter
       )===filtro
      )
    );


    render();


    $("#catalogo")
     .scrollIntoView({
      behavior:"smooth"
     });

   }
  );


  $("#show-all").onclick=()=>{


   filtro="Todos";


   busqueda="";


   if($("#header-search"))
    $("#header-search").value="";


   if($("#catalog-search"))
    $("#catalog-search").value="";


   $$("#filters button").forEach(
    x=>
     x.classList.toggle(
      "active",
      categoriaMenu(
       x.dataset.filter
      )==="Todos"
     )
   );


   render();

  };


  $("#catalog-grid").addEventListener(
   "click",
   e=>{


    const f=
     e.target.closest("[data-fav]");


    const v=
     e.target.closest("[data-view]");


    const a=
     e.target.closest("[data-add]");


    if(f)
     toggleFav(
      +f.dataset.fav
     );


    if(v)
     openModal(
      +v.dataset.view
     );


    if(a)
     add(
      +a.dataset.add
     );

   }
  );


  $("#open-cart").onclick=
   ()=>openDrawer(
    "#cart-drawer"
   );


  $("#open-favorites").onclick=()=>{


   renderFav();


   openDrawer(
    "#fav-drawer"
   );

  };


  $("#overlay").onclick=
   closeDrawers;


  $$("[data-close]").forEach(
   b=>b.onclick=
    closeDrawers
  );


  $("#cart-items").addEventListener(
   "click",
   e=>{


    let id;


    if(e.target.dataset.plus){


     id=
      +e.target.dataset.plus;


     carrito[id]++;

    }


    if(e.target.dataset.minus){


     id=
      +e.target.dataset.minus;


     carrito[id]--;


     if(carrito[id]<=0)
      delete carrito[id];

    }


    if(e.target.dataset.remove){


     id=
      +e.target.dataset.remove;


     delete carrito[id];

    }


    save();


    updateCounts();


    renderCart();

   }
  );


  $("#clear-cart").onclick=()=>{


   carrito={};


   save();


   updateCounts();


   renderCart();

  };


  $("#whatsapp-cart").onclick=()=>{

   const text=
    Object.entries(carrito)
     .filter(([id,q])=>q>0)
     .map(([id,q])=>{

      const p=
       productos.find(
        x=>x.id==id
       );

      if(!p)return "";

      return `${q} x ${p.nombre}`;

     })
     .filter(Boolean)
     .join("\n");


   if(!text){

    return toast(
     "El carrito está vacío"
    );

   }


   const mensaje=
    "Hola Florambar, quiero pedir:\n\n"+
    text;


   const url=
    `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${
     encodeURIComponent(mensaje)
    }`;


   window.location.href=url;

  };


  $("#modal-close").onclick=
   ()=>$("#product-modal")
    .classList.remove("show");


  $("#product-modal").addEventListener(
   "click",
   e=>{


    if(
     e.target.id==="product-modal"
    )
     $("#product-modal")
      .classList.remove("show");

   }
  );


  $("#modal-add").onclick=
   e=>add(
    +e.target.dataset.id
   );


  /*
   MENÚ
   Conserva el mismo funcionamiento que tu código.
  */

  $("#menu-toggle").onclick=()=>{


   $("#nav")
    .classList.toggle("open");

  };


  document.addEventListener(
   "keydown",
   e=>{


    if(e.key==="Escape"){


     closeDrawers();


     $("#product-modal")
      .classList.remove("show");

    }

   }
  );

 }
);


function renderFav(){

 const list=
  productos.filter(
   p=>favoritos.has(p.id)
  );


 $("#fav-items").innerHTML=
  list.length
   ?list.map(
    p=>`

     <div class="fav-item">

      <img
       src="${placeholder(p)}"
      >

      <div>
       <b>${p.nombre}</b>
       <small>${p.categoria}</small>
      </div>

      <button
       class="remove-item"
       data-fremove="${p.id}"
      >
       ×
      </button>

     </div>

    `
   ).join("")
   :"<p>Aún no tienes favoritos.</p>";


 $$("[data-fremove]").forEach(
  b=>b.onclick=()=>{


   favoritos.delete(
    +b.dataset.fremove
   );


   save();


   updateCounts();


   renderFav();


   render();

  }
 );
}


/* =========================================================
   FLORAMBAR — FLECHAS PARA RECORRER PLANTAS
   NO MODIFICA LAS FUNCIONES EXISTENTES
   ========================================================= */

(function(){

  const grid = document.getElementById("catalog-grid");

  if(!grid) return;


  /* Evita crear las flechas dos veces */

  if(document.querySelector(".catalog-carousel-controls")){
    return;
  }


  /* CONTENEDOR DE FLECHAS */

  const controls = document.createElement("div");

  controls.className = "catalog-carousel-controls";


  /* FLECHA IZQUIERDA */

  const prev = document.createElement("button");

  prev.type = "button";

  prev.className = "catalog-arrow catalog-arrow-prev";

  prev.setAttribute(
    "aria-label",
    "Ver plantas anteriores"
  );

  prev.innerHTML = "‹";


  /* FLECHA DERECHA */

  const next = document.createElement("button");

  next.type = "button";

  next.className = "catalog-arrow catalog-arrow-next";

  next.setAttribute(
    "aria-label",
    "Ver plantas siguientes"
  );

  next.innerHTML = "›";


  controls.appendChild(prev);

  controls.appendChild(next);


  /* COLOCAR LAS FLECHAS ALREDEDOR DEL CATÁLOGO */

  grid.parentNode.insertBefore(
    controls,
    grid
  );


  /* CUÁNTO SE MUEVE */

  function distancia(){

    const card =
      grid.querySelector(".product-card");

    if(!card){
      return grid.clientWidth * .8;
    }

    const estilo =
      window.getComputedStyle(grid);

    const gap =
      parseFloat(estilo.gap) || 10;

    return card.getBoundingClientRect().width + gap;

  }


  /* ANTERIOR */

  prev.addEventListener(
    "click",
    function(){

      grid.scrollBy({
        left:-distancia(),
        behavior:"smooth"
      });

    }
  );


  /* SIGUIENTE */

  next.addEventListener(
    "click",
    function(){

      grid.scrollBy({
        left:distancia(),
        behavior:"smooth"
      });

    }
  );

})();