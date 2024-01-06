// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//         window.location.href = "pages/home/home.html";
//     }
// });

function onChangeEmail() {
    toggleButtonDisable();
    toggleEmailErrors();
}

function onChangePassword() {
    toggleButtonDisable();
    togglePasswordErrors()
}

function isEmailValid() {
    const email = form.email().value;
    if(!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = form.password().value;
    if(!password) {
        return false;
    }
    return true;
}

function toggleEmailErrors() {
    const email = form.email().value;
    if(!email) {
        form.emailRequiredError().style.display = "block";
    } else {
        form.emailRequiredError().style.display = "none";
    }

    if (validateEmail(email)) {
        form.emailInvalidError().style.display = "none"
    } else {
        form.emailInvalidError().style.display = "block"
    }
}

function toggleButtonDisable() {
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function togglePasswordErrors() {
    const password = form.password().value;
    if(!password) {
        form.passwordRequired().style.display = "block";
    } else {
        form.passwordRequired().style.display = "none";
    }
}

const form = {
    email: () => document.getElementById('email'),
    emailRequiredError: () => document.getElementById('email-required-error'), 
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    password: () => document.getElementById('password'),
    passwordRequired: () => document.getElementById('password-required-error'),
    recoverPassword: () => document.getElementById('recover-password-button'),
    loginButton: () => document.getElementById('login-button')
}

function login() {
    showLoading();

    console.log('antes da promise')
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response => {
        hideLoading();
        console.log('success', response)
        window.location.href = "pages/home/home.html";
      }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error));

        console.log('error', error)
      });
}

function getErrorMessage(error) {
    if (error.code == "auth/invalid-credential" || error.code =="auth/user-not-found") {
        return "Usuario não encontrado"
    }
    if (error.code == "auth/wrong-password") {
        return "Senha Inválida"
    }
    return error.message;
}

function register() {
    window.location.href = "pages/register/register.html";
}

function recoverPassword() {
    showLoading();

    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        hideLoading();
        alert("Email enviado com sucesso");
    }).catch(error => {
        hideLoading();
        alert(getErrorMessage(error))
    });
}