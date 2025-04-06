/**
 * Создает троттлинг-функцию, которая вызывает func не чаще одного раза
 * за указанный период времени (delay). Вызов происходит на "переднем фронте"
 * (leading edge), то есть сразу при первом вызове в периоде.
 * Последующие вызовы внутри этого периода будут проигнорированы до истечения delay.
 *
 * @param {Function} func Функция, которую нужно "затроттлить".
 * @param {number} delay Задержка в миллисекундах.
 * @returns {Function} Новая троттлинг-функция с методом .cancel().
 */
function throttle(func, delay) {
  let isThrottled = false; // Флаг, указывающий, находимся ли мы в периоде ожидания
  let timeoutId = null;    // ID таймера для возможности отмены

  function throttled(...args) {
    // Сохраняем контекст `this` для использования внутри func и setTimeout
    const context = this;

    // Если мы не в периоде ожидания (троттлинг не активен)
    if (!isThrottled) {
      // Выполняем функцию немедленно с текущими аргументами и контекстом
      func.apply(context, args);
      // Устанавливаем флаг, что мы вошли в период ожидания
      isThrottled = true;

      // Устанавливаем таймер для сброса флага после задержки
      timeoutId = setTimeout(() => {
        isThrottled = false; // Разрешаем следующий вызов после истечения delay
        timeoutId = null;    // Сбрасываем ID таймера, т.к. он выполнился
      }, delay);
    }
    // Если isThrottled === true, то вызов просто игнорируется.
  }

  // Добавляем метод для отмены запланированного сброса флага
  // Это может быть полезно, например, при размонтировании компонента в React/Vue
  throttled.cancel = function() {
    clearTimeout(timeoutId); // Очищаем таймер
    isThrottled = false;     // Сбрасываем флаг немедленно
    timeoutId = null;        // Обнуляем ID таймера
  };

  return throttled;
}

// --- Пример использования ---

// Функция, которую мы будем троттлить (например, обработчик события resize или scroll)
function handleExpensiveOperation(id) {
  console.log(`Выполняется операция ${id} в ${new Date().toLocaleTimeString()}.${String(Date.now()).slice(-3)}`);
}

// Создаем троттлинг-версию функции с задержкой 1000 мс (1 секунда)
const throttledHandler = throttle(handleExpensiveOperation, 1000);

// Имитируем частые вызовы
console.log("Начало имитации вызовов...");

throttledHandler(1); // Выполнится сразу
setTimeout(() => throttledHandler(2), 200);  // Будет проигнорирован
setTimeout(() => throttledHandler(3), 500);  // Будет проигнорирован
setTimeout(() => throttledHandler(4), 800);  // Будет проигнорирован

// Через 1100 мс (после истечения задержки первого вызова)
setTimeout(() => {
    console.log("--- Прошла 1 секунда ---");
    throttledHandler(5); // Выполнится сразу
}, 1100);

setTimeout(() => throttledHandler(6), 1300); // Будет проигнорирован
setTimeout(() => throttledHandler(7), 1900); // Будет проигнорирован

// Через 2200 мс (после истечения задержки пятого вызова)
setTimeout(() => {
    console.log("--- Прошла еще 1 секунда ---");
    throttledHandler(8); // Выполнится сразу
}, 2200);

// Пример отмены
const cancellableHandler = throttle(() => console.log("Этот вызов можно отменить"), 1000);
cancellableHandler(); // Запланирует сброс флага через 1000 мс
console.log("Вызов запланирован, но будет отменен через 500 мс.");
setTimeout(() => {
    cancellableHandler.cancel();
    console.log("Таймер отменен.");
    // Попытка вызова после отмены (должен сработать сразу, т.к. флаг сброшен)
    cancellableHandler();
}, 500);

export default throttle;
