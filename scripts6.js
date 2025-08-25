// data only save and load in browser

const BRANDS = [
  { key:"bm_2ply",      name:"BM 2Ply",       strip:"brand-bm-2ply" },
  { key:"am_2ply",      name:"AM 2Ply",       strip:"brand-am-2ply" },
  { key:"am_1ply",      name:"AM 1Ply",       strip:"brand-am-1ply" },
  { key:"am_1ply_mes",  name:"AM 1Ply MES",   strip:"brand-am-1ply-mes" },
  { key:"gold_2ply",    name:"Gold 2Ply",     strip:"brand-gold-2ply" },
  { key:"gold_1ply",    name:"Gold 1Ply",     strip:"brand-gold-1ply" },
  { key:"gold_1ply_mes",name:"Gold 1Ply MES", strip:"brand-gold-1ply" }
];

const accordion = document.getElementById('accordion');

function brandCardTemplate({ key, name, strip }) {
  // Fixed row labels
  const ROWS = [
    "Store",
    "Packer-1",
    "Packer-2",
    "May-21",
    "Without Seal",
    "Old Bag",
    "New Bag",
    "Faulty"
  ];

  // Build horizontal rows
  const rowsHtml = ROWS.map((row, i) => `
    <div class="input-row">
      <label class="label" for="${key}_${i}_bundle">${row} :</label>
      <input id="${key}_${i}_bundle" class="input qty bundle" type="number" placeholder="Bundle" min="0">
      <input id="${key}_${i}_loose"  class="input qty loose"  type="number" placeholder="Loose"  min="0">
      <input id="${key}_${i}_total"  class="input total"       type="number" placeholder="Total"  readonly>
    </div>
  `).join("");

  return `
    <details class="card" id="${key}">
      <div class="brand-strip ${strip}"></div>
      <summary class="head" onclick="event.preventDefault(); this.parentElement.toggleAttribute('open'); this.parentElement.dispatchEvent(new Event('toggle')); ">
        <h2>${name}</h2>
        <div style="display:flex;align-items:center;gap:8px">
          <strong><span class="brand-chip" id="chip_${key}">Total: 0</strong></span>
          <button class="toggle" aria-label="Toggle ${name}"></button>
        </div>
      </summary>
      <div class="body">
        ${rowsHtml}
      </div>
    </details>
  `;
}



// Render cards
accordion.innerHTML = BRANDS.map(brandCardTemplate).join('');

const $$ = (sel)=>Array.from(document.querySelectorAll(sel));
const byId=(id)=>document.getElementById(id);

// function calcBrand(key){
//   const bundle = parseInt(byId(`${key}_bundle`).value||0,10);
//   const loose  = parseInt(byId(`${key}_loose`).value||0,10);
//   const total = bundle*200 + loose;
//   byId(`${key}_total`).textContent=total;
//   byId(`chip_${key}`).textContent=`Total: ${total}`;
//   return total;
// }
function calcBrand(key){
  let brandSum = 0;
  // there are 8 rows, index 0..7
  for(let i=0;i<8;i++){
    const bundle = parseInt(document.getElementById(`${key}_${i}_bundle`)?.value || 0, 10);
    const loose  = parseInt(document.getElementById(`${key}_${i}_loose`)?.value  || 0, 10);
    const rowTotal = bundle*200 + loose;
    const totalEl = document.getElementById(`${key}_${i}_total`);
    if(totalEl) totalEl.value = rowTotal;   // fill the Total input
    brandSum += rowTotal;
  }
  const chip = document.getElementById(`chip_${key}`);
  if(chip) chip.textContent = `Total: ${brandSum}`;
  return brandSum;
}

function calcGrand(){
  const grand = BRANDS.reduce((s,b)=>s+calcBrand(b.key),0);
  byId('grandTotal').textContent=grand;
  return grand;
}

function wireInputs(){
  $$('.qty').forEach(el=>el.addEventListener('input',()=>{calcGrand();setDirty();}));
  byId('date').addEventListener('change',()=>{updateSummaryDate();setDirty();});
  byId('shift').addEventListener('change',setDirty);
}
function updateSummaryDate(){
  const d=byId('date').value; 
  if(d) new Date(d).toDateString();
}

const KEY='bag_stock_form_v1';
function save(){
  const data={date:byId('date').value,shift:byId('shift').value,
    brands:Object.fromEntries(BRANDS.map(b=>[
      b.key,{
        store:byId(`${b.key}_store`).value,
        bundle:byId(`${b.key}_bundle`).value,
        loose:byId(`${b.key}_loose`).value,
        open:document.getElementById(b.key).hasAttribute('open')
      }
    ]))
  };
  localStorage.setItem(KEY,JSON.stringify(data));
  byId('status').textContent='Saved';
}

async function saveToServer() {
  const data = {
    date: byId("date").value,
    shift: byId("shift").value,
    brands: {}
  };

  BRANDS.forEach(b => {
    data.brands[b.key] = [];
    const rows = ["Store","Packer-1","Packer-2","May-21","Without Seal","Old Bag","New Bag","Faulty"];
    rows.forEach((row, i) => {
      data.brands[b.key].push({
        row: row,
        bundle: parseInt(document.getElementById(`${b.key}_${i}_bundle`)?.value || 0),
        loose: parseInt(document.getElementById(`${b.key}_${i}_loose`)?.value || 0)
      });
    });
  });

  let res = await fetch("save_stock.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  let json = await res.json();
  document.getElementById("status").textContent = json.status === "success" ? "Saved" : "Error";
}



function load(){
  const raw=localStorage.getItem(KEY);
  if(!raw) return;
  try{
    const data=JSON.parse(raw);
    if(data.date) byId('date').value=data.date;
    if(data.shift) byId('shift').value=data.shift;
    for(const b of BRANDS){
      const v=data.brands?.[b.key]; if(!v) continue;
      byId(`${b.key}_store`).value=v.store??'';
      byId(`${b.key}_bundle`).value=v.bundle??0;
      byId(`${b.key}_loose`).value=v.loose??0;
      const card=document.getElementById(b.key);
      if(v.open) card.setAttribute('open',''); else card.removeAttribute('open');
    }
    updateToggleBtn();
  }catch(e){console.warn('Load failed',e);}
}
function setDirty(){byId('status').textContent='Unsaved';}

// Expand/Collapse button
const toggleAllBtn=document.getElementById('toggleAllBtn');
function setAll(open){$$('#accordion details.card').forEach(d=>open?d.setAttribute('open',''):d.removeAttribute('open'));}
function updateToggleBtn(){
  const anyClosed=$$('#accordion details.card').some(d=>!d.hasAttribute('open'));
  toggleAllBtn.textContent=anyClosed?'Expand All':'Collapse All';
}
accordion.addEventListener('toggle',updateToggleBtn,true);
toggleAllBtn.addEventListener('click',()=>{
  const shouldExpand=toggleAllBtn.textContent.includes('Expand');
  setAll(shouldExpand); updateToggleBtn(); setDirty();
});

// Init
load(); wireInputs(); calcGrand();
if(!byId('date').value){
  const t=new Date(); byId('date').value=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
}
updateToggleBtn();

// byId('saveBtn').addEventListener('click',save);
byId('saveBtn').addEventListener('click', saveToServer);
