const monthSelect = document.getElementById("monthSelect");
const yearSelect = document.getElementById("yearSelect");

function setupDateSelectors() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    for (
        let year = currentYear - 2;
        year <= currentYear + 2;
        year++
    ) {
        const option = document.createElement("option");

        option.value = year;
        option.textContent = year;

        yearSelect.appendChild(option);
    }

    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
}

monthSelect.addEventListener("change", () => {
    renderTransactions();
    updateDashboard(transactions);
});

yearSelect.addEventListener("change", () => {
    renderTransactions();
    updateDashboard(transactions);
});

setupDateSelectors();
updateCategories("income");
renderTransactions();
updateDashboard(transactions);