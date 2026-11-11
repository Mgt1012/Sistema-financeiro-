let transactions = getTransactions();

function renderTransactions() {
    const list = document.querySelector(".transactions-list");
    const month = Number(document.getElementById("monthSelect").value);
    const year = Number(document.getElementById("yearSelect").value);

    const monthly = transactions.filter((t) => {
        const d = new Date(`${t.date}T00:00:00`);

        return d.getMonth() === month && d.getFullYear() === year;
    }).sort((a, b) => b.date.localeCompare(a.date));

    list.innerHTML = "";

    if (!monthly.length) {
        list.innerHTML = `
            <div class="empty-transactions">
                <i class="fa-solid fa-receipt"></i>
                <p>Nenhuma transação cadastrada.</p>
                <span>Clique em "Nova transação" para adicionar.</span>
            </div>
        `;

        return;
    }

    monthly.forEach((t) => {
        const el = document.createElement("div");

        el.classList.add("transaction", t.type);

        const icon = t.type === "income"
            ? "fa-arrow-up"
            : "fa-arrow-down";

        const signal = t.type === "income"
            ? "+"
            : "-";

        el.innerHTML = `
            <div class="transaction-info">
                <div class="transaction-icon">
                    <i class="fa-solid ${icon}"></i>
                </div>

                <div class="transaction-details">
                    <strong>${escapeHTML(t.description)}</strong>
                    <span>${escapeHTML(t.category)}</span>
                </div>
            </div>

            <div class="transaction-value">
                <strong>${signal} ${formatCurrency(t.amount)}</strong>
                <span>${formatDate(t.date)}</span>
            </div>

            <button
                class="delete-transaction"
                type="button"
                data-id="${t.id}"
                title="Excluir transação"
            >
                <i class="fa-solid fa-trash"></i>
            </button>
        `;

        list.appendChild(el);
    });
}

function deleteTransaction(id) {
    transactions = transactions.filter(
        (t) => t.id !== id
    );

    saveTransactions(transactions);
    renderTransactions();
    updateDashboard(transactions);
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

document.addEventListener("click", (event) => {
    const btn = event.target.closest(".delete-transaction");

    if (!btn) return;

    if (confirm("Deseja realmente excluir esta transação?")) {
        deleteTransaction(btn.dataset.id);
    }
});