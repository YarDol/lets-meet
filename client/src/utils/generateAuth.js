export function generateAuthError(message) {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Email або пароль введено не коректно";
    case "EMAIL_EXISTS":
      return "Користувач з таким Email вже існує";
    default:
      return "Забагато спроб входу. Спробуйте пізніше";
  }
}
