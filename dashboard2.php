<?php
include 'db.php';

// Fetch latest 7 days summary
$query = "
    SELECT entry_date, shift, brand_key, SUM(bundle) as total_bundle, 
           SUM(loose) as total_loose, SUM(total) as grand_total
    FROM stock_entries
    GROUP BY entry_date, shift, brand_key
    ORDER BY entry_date DESC, shift ASC
    LIMIT 50
";
$result = $conn->query($query);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bag Stock Dashboard</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" 
        href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
  <link rel="stylesheet" 
        href="https://cdn.datatables.net/buttons/2.3.6/css/buttons.dataTables.min.css">

  <style>
    body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: #f8fafc;
  color: #1f2937;
}

.app-header {
  background: #111827;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

.container {
  padding: 1rem;
}

.summary {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.table-wrapper {
  overflow-x: auto;
}

table.dataTable {
  font-size: 14px;
}

table.dataTable th, table.dataTable td {
  padding: 8px;
  text-align: center;
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.2rem;
  }
  .summary {
    padding: 0.5rem;
  }
  table.dataTable {
    font-size: 12px;
  }
}
  </style>
  <script src="https://code.jquery.com/jquery-3.7.0.min.js"></script>
  <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/2.3.6/js/dataTables.buttons.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/2.3.6/js/buttons.html5.min.js"></script>
  <script src="https://cdn.datatables.net/buttons/2.3.6/js/buttons.print.min.js"></script>
</head>
<body>
  <header class="app-header">
    <h1>📊 Bag Stock Dashboard</h1>
  </header>

  <main class="container">
    <section class="summary">
      <h2>Recent Entries</h2>
      <div class="table-wrapper">
        <table id="stockTable" class="display compact nowrap" style="width:100%">
          <thead>
            <tr>
              <th>Date</th>
              <th>Shift</th>
              <th>Brand</th>
              <th>Bundle</th>
              <th>Loose</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <?php while ($row = $result->fetch_assoc()) { ?>
              <tr>
                <td><?= htmlspecialchars($row['entry_date']) ?></td>
                <td><?= htmlspecialchars($row['shift']) ?></td>
                <td><?= htmlspecialchars($row['brand_key']) ?></td>
                <td><?= number_format($row['total_bundle']) ?></td>
                <td><?= number_format($row['total_loose']) ?></td>
                <td><strong><?= number_format($row['grand_total']) ?></strong></td>
              </tr>
            <?php } ?>
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <script>
    $(document).ready(function() {
      $('#stockTable').DataTable({
        responsive: true,
        dom: 'Bfrtip',
        buttons: ['copy', 'csv', 'excel', 'pdf', 'print']
      });
    });
  </script>
</body>
</html>
