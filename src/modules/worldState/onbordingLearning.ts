import "driver.js/dist/driver.css";
import { driver } from "driver.js";

export const onbordingLearning = driver({
    showProgress: true,
    steps: [
      { 
        element: 'label#sign-type', 
        popover: { 
          title: 'Выбираем тип знака', 
          description: 'Here is the code example showing animated tour. Let\'s walk you through it.', 
          side: "left", 
          align: 'start' 
        }
      },
      { popover: { 
          title: 'Happy Coding', 
          description: 'And that is all, go ahead and start adding tours to your applications.' 
        } 
      }
    ],
    onHighlighted: () => {
      // 1. Находим существующий SVG элемент
      //    (Используем ID, но можно и по классу, тегу или другому селектору)
      const svgElement = document.querySelector(".driver-overlay")
      const popover = document.querySelector("#driver-popover-content")
      popover.setAttribute('popover', 'manual')
      console.log('Popover показан');
      // Проверяем, найден ли SVG элемент
      if (svgElement) {
        // 2. Создаем новый div элемент
        const newDiv = document.createElement('div');

        // 4. Перемещаем SVG элемент внутрь созданного div
        //    appendChild() автоматически удалит svgElement из его текущего родителя (если он есть)
        //    и добавит его в newDiv.
        newDiv.appendChild(svgElement);

        // 3. (Опционально) Добавляем классы или атрибуты к новому div, если нужно
        newDiv.setAttribute('popover', 'manual');
        
        newDiv.classList.add('svg-wrapper'); // Например, для стилизации

        // 5. Добавляем созданный div (вместе с SVG внутри) на страницу.
        //    Например, добавим его в конец элемента с id="target-container"
        const targetContainer = document.getElementById('body');
        if (targetContainer) {
          targetContainer.appendChild(newDiv);
          try {
            newDiv.showPopover();
            console.log(`Overlay #${newDiv.id} показан.`);
            popover.showPopover()
          } catch (error) {
            console.error('Не удалось показать поповер:', error);
            // Может произойти, если браузер не поддерживает Popover API
            // или если элемент не был правильно добавлен в DOM перед вызовом.
          }
        } else {
          // Если контейнер не найден, можно добавить в конец body как запасной вариант
          console.warn('Контейнер #target-container не найден. Добавляем div в body.');
          document.body.appendChild(newDiv);
        }
        console.log('SVG элемент успешно перемещен в новый div.');
      } else {
        console.error('SVG элемент с id "myExistingSvg" не найден на странице.');
      }
    }
  });
