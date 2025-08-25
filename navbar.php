<div class="navbar">
  <a href="dashboard.php" class="nav-item active">
    <span>🏠</span>
    <div>Dashboard</div>
  </a>
  <a href="profile.php" class="nav-item">
    <span>👤</span>
    <div>Profile</div>
  </a>
  <a href="tasks.php" class="nav-item">
    <span>📝</span>
    <div>Tasks</div>
  </a>
  <a href="settings.php" class="nav-item">
    <span>⚙️</span>
    <div>Settings</div>
  </a>
</div>

<style>
.navbar {
  position: fixed;
  bottom: 0;
  left: 0; right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(6,10,18,.95);
  border-top: 1px solid var(--border);
  padding: 8px 0;
  z-index: 100;
}

.navbar .nav-item {
  flex: 1;
  text-align: center;
  color: var(--muted);
  text-decoration: none;
  font-size: 12px;
}

.navbar .nav-item span {
  display: block;
  font-size: 20px;
  margin-bottom: 2px;
}

.navbar .nav-item.active {
  color: var(--accent);
  font-weight: 600;
}
</style>
