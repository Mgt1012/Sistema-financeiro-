const STORAGE_KEY = "controlFinancerTransactions";

function getTransactions() { const saved = localStorage.getItem(STORAGE_KEY); if (!saved) return []; try { return JSON.parse(saved) } 

catch (error) { console.error("Erro ao ler as transações:", error); return [] } }

function saveTransactions(transactions) { localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions)) }
