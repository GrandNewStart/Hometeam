export function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isValidPassword(password: string) {
  if (password.length < 8) {
    return false;
  }
  const alphabetRegex = /[a-zA-Z]/;
  const numberRegex = /[0-9]/;
  if (!alphabetRegex.test(password) || !numberRegex.test(password)) {
    return false;
  }
  return true;
}