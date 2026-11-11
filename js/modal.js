const modal = document.getElementById("transactionModal");
const openModalButton = document.querySelector(".add-transaction");
const closeModalButton = document.getElementById("closeModal");
const cancelModalButton = document.getElementById("cancelModal");
const incomeButton = document.getElementById("incomeButton");
const expenseButton = document.getElementById("expenseButton");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("date");
const transactionForm = document.getElementById("transactionForm");

function openModal() {
    modal.classList.add("active");

    if (!dateInput.value) {
        dateInput.value = new Date().toISOString().split("T")[0];
    }
}

function closeModal() {
    modal.classList.remove("active");
}

openModalButton.addEventListener("click", openModal);

closeModalButton.addEventListener("click", closeModal);

cancelModalButton.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

incomeButton.addEventListener("click", () => {
    incomeButton.classList.add("active");
    expenseButton.classList.remove("active");
    updateCategories("income");
});

expenseButton.addEventListener("click", () => {
    expenseButton.classList.add("active");
    incomeButton.classList.remove("active");
    updateCategories("expense");
});

function updateCategories(type) {
    categoryInput.innerHTML = "";

    const categories = type === "income"
        ? ["Salário", "Freelance", "Investimentos", "Outros"]
        : ["Alimentação", "Transporte", "Moradia", "Lazer", "Saúde", "Outros"];

    categories.forEach((category) => {
        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryInput.appendChild(option);
    });
}

transactionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const description = descriptionInput.value.trim();
    const date = dateInput.value;

    if (amount <= 0) {
        alert("Digite um valor válido.");
        return;
    }

    if (!description) {
        alert("Digite uma descrição.");
        return;
    }

    if (!date) {
        alert("Selecione uma data.");
        return;
    }

    transactions.push({
        id: crypto.randomUUID(),
        type: incomeButton.classList.contains("active")
            ? "income"
            : "expense",
        amount,
        category,
        description,
        date
    });

    saveTransactions(transactions);
    renderTransactions();
    updateDashboard(transactions);
    closeModal();
    transactionForm.reset();

    incomeButton.classList.add("active");
    expenseButton.classList.remove("active");

    updateCategories("income");
});