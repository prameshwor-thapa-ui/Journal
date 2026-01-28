window.dashboardCharts = {
    renderWordCountChart: (canvasId, dates, counts) => {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        // Destroy existing chart if it exists to avoid overlaps
        if (ctx.chart) {
            ctx.chart.destroy();
        }

        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color').trim();
        const gridColor = getComputedStyle(document.body).getPropertyValue('--border-color').trim();

        ctx.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Word Count',
                    data: counts,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: textColor
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: { color: textColor },
                        grid: { color: gridColor }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { color: textColor },
                        grid: { color: gridColor }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: textColor }
                    }
                }
            }
        });
    },

    renderTagsChart: (canvasId, labels, data) => {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        if (ctx.chart) {
            ctx.chart.destroy();
        }

        const textColor = getComputedStyle(document.body).getPropertyValue('--text-color').trim();

        ctx.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40'
                    ],
                    borderColor: getComputedStyle(document.body).getPropertyValue('--card-bg').trim(),
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: textColor }
                    }
                }
            }
        });
    }
};
