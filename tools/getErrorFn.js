const getMyAccountResponse = (errorCode) => {
  switch (errorCode) {
    case "notOldPwd":
      return "Si introduces una nueva contraseña, debes introducir tu anterior contraseña para modificarla";
    case "notNewPwd":
      return "Debes introducir una nueva contraseña";
    case "oldPwdNok":
      return "La contraseña introducida no coincide, inténtalo de nuevo";
    case "newPwdNok":
      return "La nueva contraseña debe tener al menos 6 caracteres, una letra mayúscula, otra minúscula y un número";
    default:
      return ""
  }
}

module.exports = {getMyAccountResponse};