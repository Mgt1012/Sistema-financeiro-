let lineChart;
let pieChart;

function updateDashboard(transactions) {
    const month = Number(document.getElementById("monthSelect").value);
    const year = Number(document.getElementById("yearSelect").value);

    const monthly = transactions.filter((t) => {
        const d = new Date(`${t.date}T00:00:00`);

        return d.getMonth() === month && d.getFullYear() === year;
    });

    let income = 0;
    let expense = 0;

    monthly.forEach((t) => {
        if (t.type === "income") income += t.amount;
        if (t.type === "expense") expense += t.amount;
    });

    const balance = income - expense;

    document.getElementById("incomeTotal").textContent =
        formatCurrency(income);

    document.getElementById("expenseTotal").textContent =
        formatCurrency(expense);

    document.getElementById("balanceTotal").textContent =
        formatCurrency(balance);

    updateTotalBalance(transactions);
    updateLineChart(monthly);
    updatePieChart(monthly);
}

function updateTotalBalance(transactions) {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
        if (t.type === "income") income += t.amount;
        if (t.type === "expense") expense += t.amount;
    });

    document.getElementById("totalBalance").textContent =
        formatCurrency(income - expense);
}

function updateLineChart(transactions) {
    const month = Number(document.getElementById("monthSelect").value);
    const year = Number(document.getElementById("yearSelect").value);

    const days = new Date(year, month + 1, 0).getDate();

    const labels = Array.from(
        { length: days },
        (_, i) => String(i + 1).padStart(2, "0")
    );

    const income = labels.map((day) =>
        transactions
            .filter(
                (t) =>
                    t.type === "income" &&
                    t.date.split("-")[2] === day
            )
            .reduce((s, t) => s + t.amount, 0)
    );

    const expense = labels.map((day) =>
        transactions
            .filter(
                (t) =>
                    t.type === "expense" &&
                    t.date.split("-")[2] === day
            )
            .reduce((s, t) => s + t.amount, 0)
    );

    if (lineChart) lineChart.destroy();

    lineChart = new Chart(
        document.getElementById("lineChart"),
        {
            type: "line",

            data: {
                labels,

                datasets: [
                    {
                        label: "Receitas",
                        data: income,
                        borderColor: "#0E9F6E",
                        backgroundColor: "rgba(14,159,110,.15)",
                        tension: 0.4,
                        fill: true
                    },

                    {
                        label: "Despesas",
                        data: expense,
                        borderColor: "#E02424",
                        backgroundColor: "rgba(224,36,36,.12)",
                        tension: 0.4,
                        fill: true
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "top"
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    );
}

function updatePieChart(transactions) {
    const categories = {};

    transactions
        .filter((t) => t.type === "expense")
        .forEach((t) => {
            categories[t.category] =
                (categories[t.category] || 0) + t.amount;
        });

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    if (pieChart) pieChart.destroy();

    pieChart = new Chart(
        document.getElementById("pieChart"),
        {
            type: "doughnut",

            data: {
                labels: labels.length
                    ? labels
                    : ["Sem despesas"],

                datasets: [
                    {
                        data: data.length
                            ? data
                            : [1],

                        backgroundColor: [
                            "#0E9F6E",
                            "#2563EB",
                            "#F59E0B",
                            "#E02424",
                            "#8B5CF6",
                            "#64748B"
                        ]
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                plugins: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        }
    );
}