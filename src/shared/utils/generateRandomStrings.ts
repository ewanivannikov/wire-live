export function generateRandomStrings(count = 1, length = 10) {
  const strings = [];
  for (let i = 0; i < count; i++) {
    let randomString = '';
    for (let j = 0; j < length; j++) {
      // Генерируем случайный символ (буква или цифра)
      const randomCharCode = Math.random() < 0.5 ? 
                           Math.floor(Math.random() * 26) + 97 : // a-z
                           Math.floor(Math.random() * 10) + 48; // 0-9
      randomString += String.fromCharCode(randomCharCode);
    }
    strings.push(randomString);
  }
  return strings;
}
