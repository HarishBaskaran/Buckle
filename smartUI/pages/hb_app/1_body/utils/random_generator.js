export function generateRandomString(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    const randomChar = characters.charAt(randomIndex);
    result += randomChar;
  }

  return result;
}

export function generateRandomNumber(length) {
  let randomNumber = "";
  for (let i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
}

export function generateRandomAlphaNumeric(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  let hasNumber = false;

  for (let i = 0; i < length; i++) {
    if (i === length - 1 && !hasNumber) {
      // Add a random number as the last character if no number has been added yet
      const randomNumber = Math.floor(Math.random() * 10);
      result += randomNumber.toString();
    } else {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
      if (/\d/.test(result.charAt(i))) {
        hasNumber = true;
      }
    }
  }

  return result;
}

const RandomGenerator_default = () => {};
export default RandomGenerator_default;
