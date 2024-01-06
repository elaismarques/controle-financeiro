function validateEmail(email) {
    // Expressão regular para validar um endereço de e-mail básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}