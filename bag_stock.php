<?php /* Bag Stock Page */ ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>Bag Stock</title>
  <meta name="theme-color" content="#111827" />
  <link rel="stylesheet" href="style.css" />
  <link rel="manifest" href="manifest.json" />
  <link rel="icon" type="image/png" href="icons/icon-192.png" />
</head>
<body>
  <!-- Header -->
  <header class="appbar">
    <div class="title">
      <div style="display:flex;align-items:center;gap:10px">
        <h1>Bag Stock</h1>
        <span class="badge">Packing</span>
      </div>
      <button id="toggleAllBtn" class="expand-btn" type="button">Expand All</button>
    </div>

    <section class="summary">
      <div class="form-row">
        <div class="field">
          <label class="label" for="date">Date</label>
          <input id="date" class="input" type="date" />
        </div>
        <div class="field">
          <label class="label" for="shift">Shift</label>
          <select id="shift" class="shift-selection-dropdown">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <!-- <option value="ALL">ALL</option> -->
          </select>
        </div>
        <div class="field">
          <label class="label-grandtotal">Grand Total</label>
          <div id="grandTotal" class="value">0</div>
        </div>
      </div>
    </section>
  </header>

  <!-- Main Content -->
  <main class="container">
    <section class="accordion" id="accordion"></section>
  </main>

  <!-- Floating Save Button -->
  <button class="fab" id="saveBtn" type="button">💾 Save</button>

  <!-- Footer Info -->
  <footer class="footer">
    <div class="info">Data is stored locally on this device.</div>
    <div class="info" id="status">Unsaved</div>
  </footer>

  <!-- Bottom Navbar -->
  <?php include "navbar.php"; ?>

  <!-- Scripts -->
  <script src="script6.js"></script>
  <script>
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js")
          .then(reg => console.log("✅ Service Worker registered:", reg.scope))
          .catch(err => console.log("❌ Service Worker failed:", err));
      });
    }
  </script>
</body>
</html>
