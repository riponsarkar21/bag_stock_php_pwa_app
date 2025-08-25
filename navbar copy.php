<div class="navbar">
  <a href="dashboard.php" class="nav-item active">
    <span class="icon">🏠</span>
    <span class="text">Dashboard</span>
  </a>
  <a href="profile.php" class="nav-item">
    <span class="icon">👤</span>
    <span class="text">Profile</span>
  </a>
  <a href="tasks.php" class="nav-item">
    <span class="icon">📝</span>
    <span class="text">Tasks</span>
  </a>
  <a href="settings.php" class="nav-item">
    <span class="icon">⚙️</span>
    <span class="text">Settings</span>
  </a>
</div>

<style>
.navbar {
  position: fixed;
  bottom: 0;
  left: 0; right: 0;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: rgba(6,10,18,.9);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--border);
  z-index: 100;
}
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: var(--muted);
  text-decoration: none;
}
.nav-item .icon { font-size: 18px; }
.nav-item.active { color: var(--accent); font-weight: 600; }
</style>
