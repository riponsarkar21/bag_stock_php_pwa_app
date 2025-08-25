// sever base data save and fetch 

const BRANDS = [
  { key:"bm_2ply",      name:"BM 2Ply",       strip:"brand-bm-2ply" },
  { key:"am_2ply",      name:"AM 2Ply",       strip:"brand-am-2ply" },
  { key:"am_1ply",      name:"AM 1Ply",       strip:"brand-am-1ply" },
  { key:"am_1ply_mes",  name:"AM 1Ply MES",   strip:"brand-am-1ply-mes" },
  { key:"gold_2ply",    name:"Gold 2Ply",     strip:"brand-gold-2ply" },
  { key:"gold_1ply",    name:"Gold 1Ply",     strip:"brand-gold-1ply" },
  { key:"gold_1ply_mes",name:"Gold 1Ply MES", strip:"brand-gold-1ply" }
];

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

const accordion = document.getElementById('accordion');

function brandCardTemplate({ key, name, strip }) {
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
          <strong><span class="brand-chip" id="chip_${key}">Total: 0</span></strong>
          <button class="toggle" aria-label="Toggle ${name}"></button>
        </div>
      </summary>
      <div class="body">
        ${rowsHtml}
      </div>
    </details>
  `;
}

// Render all cards
accordion.innerHTML = BRANDS.map(brandCardTemplate).join('');

const $$ = (sel)=>Array.from(document.querySelectorAll(sel));
const byId=(id)=>document.getElementById(id);

function calcBrand(key){
  let brandSum = 0;
  for(let i=0;i<ROWS.length;i++){
    const bundle = parseInt(document.getElementById(`${key}_${i}_bundle`)?.value || 0, 10);
    const loose  = parseInt(document.getElementById(`${key}_${i}_loose`)?.value  || 0, 10);
    const rowTotal = bundle*200 + loose;
    const totalEl = document.getElementById(`${key}_${i}_total`);
    if(totalEl) totalEl.value = rowTotal;
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

function setDirty(){byId('status').textContent='Unsaved';}

// ---------------- SAVE TO SERVER ----------------
async function saveToServer() {
  const data = {
    date: byId("date").value,
    shift: byId("shift").value,
    brands: {}
  };

  BRANDS.forEach(b => {
    data.brands[b.key] = [];
    ROWS.forEach((row, i) => {
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

// ---------------- LOAD FROM SERVER ----------------
async function loadFromServer() {
  const date = byId("date").value;
  const shift = byId("shift").value;
  if (!date || !shift) return;

  try {
    let res = await fetch(`load_stock.php?date=${date}&shift=${shift}`);
    let rows = await res.json();

    // Reset inputs
    BRANDS.forEach(b=>{
      ROWS.forEach((row, i)=>{
        byId(`${b.key}_${i}_bundle`).value = 0;
        byId(`${b.key}_${i}_loose`).value = 0;
        byId(`${b.key}_${i}_total`).value = 0;
      });
    });

    rows.forEach(r => {
      const brandKey = r.brand_key;
      const rowIndex = ROWS.indexOf(r.row_label);
      if (rowIndex >= 0) {
        byId(`${brandKey}_${rowIndex}_bundle`).value = r.bundle || 0;
        byId(`${brandKey}_${rowIndex}_loose`).value  = r.loose || 0;
      }
    });

    calcGrand();
    byId("status").textContent = "Loaded";
  } catch(e){
    console.error("Load failed", e);
    byId("status").textContent = "Error loading";
  }
}

// ---------------- Expand/Collapse ----------------
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

// ---------------- Init ----------------
wireInputs(); calcGrand();
if(!byId('date').value){
  const t=new Date();
  byId('date').value=`${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
}
updateToggleBtn();

// Hook save button
byId('saveBtn').addEventListener('click', saveToServer);
// Optional: load automatically after picking date/shift
byId('date').addEventListener('change', loadFromServer);
byId('shift').addEventListener('change', loadFromServer);
