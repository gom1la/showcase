const screens=(window.MADISON_MENU||[]).filter(s=>!["INTRO 1 – 5","INTRO 1 – 6","INTRO 1 – 7","MENÚ 1"].includes(s.name));
const groups=[
 {label:'Cafetería clásica',keys:['CAFETERÍA'],icon:'cup'},
 {label:'Lattes especiales',keys:['ESPECIALES'],icon:'latte'},
 {label:'Desayunos & meriendas',keys:['DESAYUNOS'],icon:'sun'},
 {label:'Frappés',keys:['FRAPPES'],icon:'shake'},
 {label:'Café frío',keys:['CAFE FRIOS'],icon:'cold'},
 {label:'Milkshakes',keys:['MILKSHAKES'],icon:'shake'},
 {label:'Pastelería',keys:['TORTAS'],icon:'cake'},
 {label:'Waffles dulces',keys:['WAFFLES DULCES'],icon:'waffle'},
 {label:'Brunch',keys:['BRUNCH'],icon:'toast'},
 {label:'Entradas, papas & tablas',keys:['ENTRADAS'],icon:'plate'},
 {label:'Sándwiches',keys:['SANDWICHS'],icon:'sandwich'},
 {label:'Platos & ensaladas',keys:['PLATOS'],icon:'dish'},
 {label:'Pizzas',keys:['PIZZAS'],icon:'pizza'},
 {label:'Hamburguesas',keys:['HAMBURGUESAS'],icon:'burger'},
 {label:'Postres',keys:['POSTRES'],icon:'dessert'},
 {label:'Sin alcohol',keys:['SIN ALCOHOL'],icon:'glass'},
 {label:'Cervezas & vinos',keys:['CON ALCOHOL'],icon:'wine'},
 {label:'Cocktails',keys:['COCKTAILS'],icon:'cocktail'}
];
const icons={
 cup:'<path d="M8 10h18v9a8 8 0 0 1-8 8h-2a8 8 0 0 1-8-8z"/><path d="M26 13h3a4 4 0 0 1 0 8h-4M11 31h16M13 5v2m6-2v2m6-2v2"/>',
 latte:'<path d="M10 9h16l-2 22H12z"/><path d="M11 13h14M12 18h12M13 24h10M17 4c-2 2 2 3 0 5m6-5c-2 2 2 3 0 5"/>',
 sun:'<circle cx="19" cy="19" r="7"/><path d="M19 4v4m0 22v4M4 19h4m22 0h4M8.5 8.5l3 3m15 15 3 3m0-21-3 3m-15 15-3 3"/>',
 cold:'<path d="M11 8h16l-2 24H13zM14 15h10M20 8l4-5M8 5l4 3"/><path d="M18 20h2m-1-1v2"/>',
 shake:'<path d="M11 11h16l-2 20H13zM13 16h12M16 5c0 3 6 2 6 6m2-6-3 6"/>',
 cake:'<path d="M7 17h24v14H7zM9 17c1-5 6-7 10-7s9 2 10 7M19 5v5"/><path d="M17 5c0-2 2-3 2-3s2 1 2 3"/>',
 waffle:'<path d="M7 7h24v24H7zM7 15h24M7 23h24M15 7v24M23 7v24"/>',
 toast:'<path d="M9 13c0-5 4-7 10-7s10 2 10 7v17H9z"/><path d="M14 21c3-5 8-6 11-2-2 5-6 7-11 2z"/>',
 plate:'<circle cx="19" cy="20" r="13"/><circle cx="19" cy="20" r="8"/><path d="M5 5v9m3-9v9M5 10h3m25-5v26"/>',
 sandwich:'<path d="M7 15h24L20 6a2 2 0 0 0-2 0zM7 18h24M8 21l10 10a2 2 0 0 0 2 0l10-10z"/>',
 dish:'<path d="M6 25h26M9 25a10 10 0 0 1 20 0M19 11V8M4 30h30"/>',
 pizza:'<path d="M6 31 19 6l13 25z"/><path d="M10 25h18M18 15h.1M24 23h.1"/>',
 burger:'<path d="M7 17h24M7 24h24M9 14c2-8 18-8 20 0H9zm0 13h20c0 3-2 4-5 4H14c-3 0-5-1-5-4z"/>',
 dessert:'<path d="M9 12h20l-3 19H12zM12 18h14M14 8c2-4 8-4 10 0"/>',
 glass:'<path d="M11 6h16l-2 12c-1 5-11 5-12 0zM19 23v8m-6 0h12"/><path d="M14 12h10"/>',
 wine:'<path d="M12 5h14l-1 10c-1 7-11 7-12 0zM19 22v9m-6 0h12M13 12h12"/>',
 cocktail:'<path d="M8 7h22L19 20zM19 20v11m-6 0h12M23 7l5-4"/>'
};
const money=/\$\s?\d/;const skip=/^(Enjoy the moment|VOLVER|Nuevo|CAFÉ FRÍOS|FRAPPÉS|MILKSHAKES|pastelería|WAFFLES|BRUNCHS|LATTES\s*\/\s*ESPECIALES|ENTRADAS|SANDWICHS|PLATOS PRINCIPALES|PIZZAS|HAMBURGUESAS|POSTRES|MOCKTAILS|TRAGOS SIN ALCOHOL|BEBIDAS|CON ALCOHOL|SIN ALCOHOL|COCKTAILS)$/i;
function linesFor(group){return group.keys.flatMap(key=>key==='ESPECIALES'?screens.filter(s=>s.name.startsWith('ESPECIALES')).flatMap(s=>s.text.map(t=>t.text)):(screens.find(s=>s.name===key)?.text||[]).map(t=>t.text)).filter(t=>t&&!skip.test(t))}
function itemsFor(group){if(group.keys[0]==='CAFETERÍA')return[{name:'Expreso',price:'$4000'},{name:'Americano',price:'$4500'},{name:'Americano cortado',price:'$4600'},{name:'Lágrima',price:'$5800'},{name:'Café doble',price:'$5500'},{name:'Doble cortado',price:'$5800'},{name:'Café con leche',price:'$6800'},{name:'Flat white',price:'$7000'},{name:'Cappuccino',price:'$7500'},{name:'Mocha',price:'$7400',detail:'Chocolate en trozos, café, leche y cacao.'},{name:'Té en saquito',price:'$3500'},{name:'Té con leche',price:'$3800'},{name:'Matcha latte',price:'$10500'},{name:'Mate cocido con leche',price:'$3800'},{name:'Hot chocolat',price:'$7900'},{name:'Submarino negro o blanco',price:'$6500'},{name:'Té en hebras · blends',price:'$4800',detail:'Frutos rojos, blueberry, strawberry, tropical o hazel & choc.'}];const lines=linesFor(group),items=[];for(const t of lines){if(money.test(t)){if(items.length&&!items.at(-1).price)items.at(-1).price=t;continue}const detail=t.length>55||/[,+:]/.test(t)||/^(CON |acompañado|JUGO |HELADO |medallón |VIENEN |Comen |elegí |SIMPLE |2 cafés)/i.test(t);if(detail&&items.length)items.at(-1).detail=[items.at(-1).detail,t].filter(Boolean).join(' ');else items.push({name:t})}return items.filter(i=>i.name)}
function icon(name){return `<svg viewBox="0 0 38 38" aria-hidden="true">${icons[name]||icons.plate}</svg>`}
const grid=document.querySelector('.category-grid'),dialog=document.querySelector('.menu-dialog'),content=document.querySelector('.menu-dialog-content');
groups.forEach((group,index)=>{const items=itemsFor(group);if(index%3===0){const row=document.createElement('div');row.className='category-row';grid.append(row)}const card=document.createElement('button');card.className='category-card';card.type='button';card.innerHTML=`<span class="category-front"><span class="category-icon">${icon(group.icon)}</span><span><h3>${group.label}</h3><span>${items.length} opciones</span></span></span><span class="category-preview"><h4>${group.label}</h4><span class="preview-list">${items.map(i=>`<span class="preview-row"><span>${i.name}${i.detail?`<small>${i.detail}</small>`:''}</span>${i.price?`<b>${i.price}</b>`:''}</span>`).join('')}</span></span>`;const fitPreview=()=>{const preview=card.querySelector('.category-preview'),list=card.querySelector('.preview-list'),title=preview.querySelector('h4');card.style.setProperty('--expanded-height',`${Math.max(310,list.scrollHeight+title.offsetHeight+58)}px`)};card.addEventListener('pointerenter',()=>requestAnimationFrame(fitPreview));card.addEventListener('focus',()=>requestAnimationFrame(fitPreview));new ResizeObserver(()=>{if(card.matches(':hover,:focus-visible'))fitPreview()}).observe(card);card.addEventListener('click',()=>openGroup(group,items));grid.lastElementChild.append(card)});
function openGroup(group,items){content.innerHTML=`<div class="menu-panel-head"><div><p class="kicker">Menú Madison 2026</p><h3>${group.label}</h3></div><span class="menu-count">${items.length} opciones</span></div><div class="menu-items">${items.map(i=>`<div class="menu-item"><strong>${i.name}${i.price?` <span class="price">${i.price}</span>`:''}</strong>${i.detail?`<small>${i.detail}</small>`:''}</div>`).join('')}</div><p class="menu-note">Consultá disponibilidad y opciones sin TACC al realizar tu pedido.</p>`;dialog.showModal()}
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));const toggle=document.querySelector('.menu-toggle'),header=document.querySelector('.site-header');toggle.addEventListener('click',()=>{const open=header.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open))});header.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{header.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));
