<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
window.renderChart = () => {
  const ctx = document.getElementById('chart')?.getContext('2d');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [{
        label: 'Study Time (mins)',
        data: [30, 60, 45, 80, 50, 90, 70]
      }]
    }
  });
};
</script>
