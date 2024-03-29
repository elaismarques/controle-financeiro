// if (!isNewTransaction()) {
//     const uid = getTransactionUid();
    
//     findTransactionByUid(uid);
// }
firebase.auth().onAuthStateChanged(user => {
    if (user){
        if (!isNewTransaction()) {
            const uid = getTransactionUid();
            findTransactionByUid(uid);
        }
    }
})

function getTransactionUid() {
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get('uid')
    return uid;
}

function isNewTransaction() {
    return getTransactionUid() ? false : true;
}

function findTransactionByUid(uid) {
    showLoading();
    
    transactionService.findByUid(uid).then(transaction => {
        // console.log('tá chamando ' + uid)
        hideLoading();
        if(transaction) {
            fillTransactionScreen(transaction);
            toggleSaveButtonDisable();
        } else {
            alert("Documento não encontrado.")
            window.location.href = "../home/home.html";
        }
    }).catch(() => {
        hideLoading();

        alert("Erro ao recuperar documento");
        window.location.href = "../home/home.html";
    });
}

function fillTransactionScreen(transaction) {
    // console.log(transaction)
    if (transaction.type == "expense") {
        form.typeExpense().checked = true;
    } else {
        form.typeIncome().checked = true;
    }

    form.date().value = transaction.date;
    form.currency().value = transaction.money.currency;
    form.value().value = transaction.money.value;
    form.transactionType().value = transaction.transactionType;

    if(transaction.description) {
        form.description().value = transaction.description;
    }
}

function saveTransaction() {
    showLoading();

    const transaction = createTransaction();

    if (isNewTransaction()) {
        save(transaction);
    } else {
        update(transaction);
    }
}

function save(transaction) {
    showLoading();

    transactionService.save(transaction).then(() => {
        hideLoading();
        window.location.href = "../home/home.html"
    }).catch(() => {
        hideLoading();
        alert('Erro ao salvar transação');
    });
}

function update(transaction) {
    showLoading();
    
    transactionService.update(transaction)
    .then(() => {
        hideLoading();
        window.location.href = "../home/home.html"
    }).catch(() => {
        hideLoading();
        alert('Erro ao atualizar transação');
    });
}

function createTransaction() {
    return {
        type: form.typeExpense().checked ? "expense" : "income",
        date: form.date().value,
        money: {
            currency: form.currency().value,
            value: parseFloat(form.value().value)
        },
        transactionType: form.transactionType().value,
        description: form.description().value,
        user: {
            uid: firebase.auth().currentUser.uid
        }
    }
}

function onChangeDate() {
   const date = form.date().value;
   form.dateRequiredError().style.display = !date ? "block" : "none";

   toggleSaveButtonDisable();
}

function onChangeValue() {
    const value = form.value().value;
    form.valueRequiredError().style.display = !value ? "block" : "none";

    form.valueLessOrEqualToZero().style.display = value <= 0 ? "block" : "none";

    toggleSaveButtonDisable();
    // console.log('funfo')
}

function onChangeTransactionType() {
    const transactionType = form.transactionType().value;
    
    form.transactionTypeRequiredError().style.display = !transactionType ? "block" : "none";

    toggleSaveButtonDisable();
}

function toggleSaveButtonDisable() {
    form.saveButton().disabled = !isFormValid();
}

function isFormValid() {
    const date = form.date().value;
    if(!date) {
        return false;
    }

    const value = form.value().value;
    if(!value || value <= 0) {
        return false;
    }

    const transactionType = form.transactionType().value;
    if(!transactionType) {
        return false;
    }
    return true;
}

const form = {
    currency: () => document.getElementById('currency'),
    date: () => document.getElementById('date'),
    description: () => document.getElementById('description'),
    dateRequiredError: () => document.getElementById('date-required-error'),
    saveButton: () => document.getElementById('save-button'),
    transactionType: () => document.getElementById('transaction-type'),
    transactionTypeRequiredError: () => document.getElementById('transaction-type-required-error'),
    typeExpense: () => document.getElementById('expense'),
    typeIncome: () => document.getElementById('income'),
    value: () => document.getElementById('value'),
    valueRequiredError: () => document.getElementById('value-required-error'),
    valueLessOrEqualToZeroError: () => document.getElementById('value-less-or-equal-to-zero-error')
}

// const form = {
//     date: () => document.getElementById('date'),
//     dateRequiredError: () => document.getElementById('date-required-error'),
//     value: () => document.getElementById('value'),
//     valueRequiredError: () => document.getElementById('value-required-error'),
//     valueLessOrEqualToZero: () => document.getElementById('value-less-or-equal-to-zero-error'),
//     transactionTypeRequiredError: () => document.getElementById('transaction-type-required-error'),
//     transactionType: () => document.getElementById('transaction-type'),
//     saveButton: () => document.getElementById('save-button'),
//     typeExpense: () => document.getElementById('expense'),
//     typeIncome: () => document.getElementById('income'),
//     currency: () => document.getElementById('currency'),
//     transactionType: () => document.getElementById('transaction-type'),
//     description: () => document.getElementById('description')
// }