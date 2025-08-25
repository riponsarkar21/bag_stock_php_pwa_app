<?php include 'navbar.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="appbar">
    <div class="title">
      <h1>Dashboard</h1>
      <button class="expand-btn">🔔</button>
    </div>
  </header>

  <div class="container" style="margin-top:160px;">
    <div class="grid" style="grid-template-columns:repeat(2,1fr); gap:16px;">
      <div class="card app-icon">
        <h3>User Management</h3>
        <p>Manage Users</p>
      </div>
      <div class="card app-icon">
        <h3>Leave Management</h3>
        <p>Apply leave</p>
      </div>
      <div class="card app-icon">
        <h3>OT Management</h3>
        <p>Apply overtime</p>
      </div>
      <div class="card app-icon">
        <h3>Bag Stock</h3>
        <p>Manage daily bag stock</p>
      </div>
      <div class="card app-icon">
        <h3>User Profile</h3>
        <p>Update information</p>
      </div>
      <div class="card app-icon">
        <h3>Production Report</h3>
        <p>Check Production</p>
      </div>
      <div class="card app-icon">
        <h3>Maintenance</h3>
        <p>Log and track maint.</p>
      </div>
      <div class="card app-icon">
        <h3>Task Management</h3>
        <p>Check The task</p>
      </div>
      <div class="card app-icon">
        <h3>Settings</h3>
        <p>Adjust application</p>
      </div>
    </div>
  </div>

  <?php include 'navbar.php'; ?>
</body>
</html>

<style>
.app-icon {
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all .2s;
}
.app-icon:hover {
  background: rgba(255,255,255,.08);
}
.app-icon h3 {
  margin: 8px 0 4px;
  font-size: 14px;
}
.app-icon p {
  margin: 0;
  font-size: 12px;
  color: var(--muted);
}
</style>
