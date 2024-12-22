export const getRandomNumberExceptExceptions=(length: number, exceptions: number[]): number | Error => {
    if (length <= 0) {
      throw new Error("Длина списка должна быть больше 0.");
    }
  
    if (exceptions.some(x => x < 0 || x >= length)) {
      throw new Error("Исключения должны быть в диапазоне от 0 до L-1.");
    }
  
    const validNumbers = Array.from({ length }, (_, i) => i).filter(num => !exceptions.includes(num));
  
    if (validNumbers.length === 0) {
      return new Error("Все числа в диапазоне являются исключениями.", {cause: 'ALL_ARE_EXCEPTIONS'});
    }
  
    const randomIndex = Math.floor(Math.random() * validNumbers.length);
    return validNumbers[randomIndex];
  }