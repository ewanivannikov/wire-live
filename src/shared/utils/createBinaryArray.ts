export const createBinaryArray = (pattern: number[], initialState: number) => {
  if (!Array.isArray(pattern) || pattern.some(num => !Number.isInteger(num) || num <= 0)) {
    throw new Error("Паттерн должен быть массивом положительных целых чисел.");
  }
  if (initialState !== 0 && initialState !== 1) {
    throw new Error("Начальное состояние должно быть либо 0, либо 1.");
  }

  const result = [];
  let currentState = initialState;

  for (const count of pattern) {
    for (let i = 0; i < count; i++) {
      result.push(currentState);
    }
    currentState = currentState === 0 ? 1 : 0;
  }

  return result;
}