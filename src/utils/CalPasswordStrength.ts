export const calPasswordStrength = (password: string) => {
    const passwordLength = password.length;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*()\-_=+[\]{}|;:',<.>/?]/.test(password);

    let strength = 0;

    if (passwordLength >= 8) strength++;
    if (passwordLength >= 12) strength++;
    if (hasUpperCase) strength++;
    if (hasLowerCase) strength++;
    if (hasNumber) strength++;
    if (hasSymbol) strength++;

    return strength
}
