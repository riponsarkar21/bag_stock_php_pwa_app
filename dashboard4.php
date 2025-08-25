<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
  <link rel="stylesheet" href="style.css">
  <style>
    body {
      max-width: 360px;
      margin: 0 auto;
      height: 750px;
      overflow-x: hidden;
      scale: 2.5;
    }

    /* App grid */
    .app-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
      padding: 80px 16px 80px; /* space for header & navbar */
    }

    .app-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 26px 14px;
      text-align: center;
      box-shadow: var(--shadow);
      cursor: pointer;
      transition: transform .15s;
      min-height: 140px;
    }

    .app-card:hover { transform: scale(1.04); }

    .app-card span {
      font-size: 40px;  /* bigger icons */
      margin-bottom: 10px;
    }

    .app-card h2 {
      font-size: 16px;   /* bigger text */
      margin: 0;
      font-weight: 700;
      color: var(--text);
    }

    .app-card p {
      font-size: 13px;   /* readable subtitle */
      margin: 4px 0 0;
      color: var(--muted);
    }

    /* Header (appbar) */
    header.appbar {
      position: fixed;
      top: 0;
      left: 0; right: 0;
      z-index: 50;
      backdrop-filter: saturate(1.2) blur(16px);
      background: linear-gradient(180deg, rgba(6,10,18,.7), rgba(6,10,18,.35) 60%, rgba(6,10,18,0));
      border-bottom: 1px solid var(--border);
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
    }

    header.appbar h1 {
      font-size: 20px;
      margin: 0;
      font-weight: 700;
    }

    header.appbar span {
      font-size: 20px;
    }
  </style>
</head>
<body>
  <!-- Header -->
  <header class="appbar">
    <h1>Dashboard</h1>
    <span>🔔</span>
  </header>

  <!-- App Icons Grid -->
  <div class="app-grid">
    <div class="app-card"><span>👥</span><h2>User Management</h2><p>Manage Users</p></div>
    <div class="app-card"><span>🗓️</span><h2>Leave Management</h2><p>Apply leave</p></div>
    <div class="app-card"><span>⏱️</span><h2>OT Management</h2><p>Apply overtime</p></div>
    <div class="app-card"><span>📦</span><h2>Bag Stock</h2><p>Manage daily bag stock</p></div>
    <div class="app-card"><span>👤</span><h2>User Profile</h2><p>Update information</p></div>
    <div class="app-card"><span>📊</span><h2>Production Report</h2><p>Check Production</p></div>
    <div class="app-card"><span>🛠️</span><h2>Maintenance</h2><p>Log and track maint.</p></div>
    <div class="app-card"><span>📋</span><h2>Task Management</h2><p>Check The task</p></div>
    <div class="app-card"><span>⚙️</span><h2>Settings</h2><p>Adjust application</p></div>
  </div>

  <!-- Bottom Navbar -->
  <?php include "navbar.php"; ?>
</body>
</html>
