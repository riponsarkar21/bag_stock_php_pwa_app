 /**
     * Minimal JS to:
     * 1) Create repeated brand cards
     * 2) Calculate per-brand total (Bundle*50 + Loose)
     * 3) Update Grand Total automatically
     * 4) Save/Restore from localStorage
     */
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

    function brandCardTemplate({key,name,strip}){
      return `
      <details class="card" id="${key}" open>
        <div class="brand-strip ${strip}"></div>
        <summary class="head" onclick="event.preventDefault(); this.parentElement.toggleAttribute('open');">
          <h2>${name}</h2>
          <div style="display:flex;align-items:center;gap:8px">
            <span class="brand-chip" id="chip_${key}">Total: 0</span>
            <button class="toggle" aria-label="Toggle ${name}"></button>
          </div>
        </summary>
        <div class="body">
          <div class="grid">
            <div class="field">
              <label class="label" for="${key}_store">Store</label>
              <input id="${key}_store" class="input" type="text" placeholder="eg: Silo / Store" />
            </div>
            <div class="field">
              <label class="label" for="${key}_bundle">Bundle</label>
              <input id="${key}_bundle" class="input qty" type="number" inputmode="numeric" value="0" min="0" />
            </div>
            <div class="field">
              <label class="label" for="${key}_loose">Loose</label>
              <input id="${key}_loose" class="input qty" type="number" inputmode="numeric" value="0" min="0" />
            </div>
          </div>
          <div class="calc-row">
            <div class="pill total" id="${key}_total">0</div>
          </div>
        </div>
      </details>`
    }

    // Render all cards
    accordion.innerHTML = BRANDS.map(brandCardTemplate).join('');

    const $$ = (sel) => Array.from(document.querySelectorAll(sel));
    const byId = (id) => document.getElementById(id);

    function calcBrand(key){
      const bundle = parseInt(byId(`${key}_bundle`).value || 0, 10);
      const loose  = parseInt(byId(`${key}_loose`).value  || 0, 10);
      const total = bundle*200 + loose;
      byId(`${key}_total`).textContent = total.toString();
      byId(`chip_${key}`).textContent = `Total: ${total}`;
      return total;
    }

    // function calcGrand(){
    //   const grand = BRANDS.reduce((sum,b)=>sum + calcBrand(b.key), 0);
    //   byId('grandTotal').value = grand;
    //   byId('summaryTotal').textContent = grand;
    //   return grand;
    // }

    function calcGrand(){
        const grand = BRANDS.reduce((sum,b)=>sum + calcBrand(b.key), 0);
        byId('grandTotal').textContent = grand;
        return grand;
    }


    function wireInputs(){
      $$('.qty').forEach(el=>{
        el.addEventListener('input', ()=>{ calcGrand(); setDirty(); });
      });
      byId('date').addEventListener('change', ()=>{ updateSummaryDate(); setDirty(); });
      byId('shift').addEventListener('change', setDirty);
    }

    function updateSummaryDate(){
      const d = byId('date').value; 
      byId('summaryDate').textContent = d ? new Date(d).toDateString() : new Date().toDateString();
    }

    // Local storage helpers
    const KEY = 'bag_stock_form_v1';
    function save(){
      const data = {
        date: byId('date').value,
        shift: byId('shift').value,
        brands: Object.fromEntries(BRANDS.map(b=>[
          b.key,
          {
            store: byId(`${b.key}_store`).value,
            bundle: byId(`${b.key}_bundle`).value,
            loose: byId(`${b.key}_loose`).value
          }
        ])),
      };
      localStorage.setItem(KEY, JSON.stringify(data));
      byId('status').textContent = 'Saved';
    }
    function load(){
      const raw = localStorage.getItem(KEY);
      if(!raw) return;
      try{
        const data = JSON.parse(raw);
        if(data.date) byId('date').value = data.date;
        if(data.shift) byId('shift').value = data.shift;
        for(const b of BRANDS){
          const v = data.brands?.[b.key];
          if(!v) continue;
          byId(`${b.key}_store`).value  = v.store  ?? '';
          byId(`${b.key}_bundle`).value = v.bundle ?? 0;
          byId(`${b.key}_loose`).value  = v.loose  ?? 0;
        }
      }catch(e){ console.warn('Load failed', e); }
    }

    function setDirty(){ byId('status').textContent = 'Unsaved'; }

    // Init
    load();
    wireInputs();
    updateSummaryDate();
    calcGrand();

    // Save CTA
    byId('saveBtn').addEventListener('click', ()=>{ save(); });

    // Default date = today if empty
    if(!byId('date').value){
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth()+1).padStart(2,'0');
      const dd = String(today.getDate()).padStart(2,'0');
      byId('date').value = `${yyyy}-${mm}-${dd}`;
      updateSummaryDate();
    }