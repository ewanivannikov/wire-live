import "driver.js/dist/driver.css";
import { driver } from "driver.js";

function encodeSVG(svg) {
  return svg.replace(/#/g, '%23')
            .replace(/\s+/g, ' ')
            .replace(/"/g, '\'')
            .replace(/%/g, '%25')
            .replace(/</g, '%3C')
            .replace(/>/g, '%3E')
            .replace(/\//g, '%2F');
}

export const onbordingLearning = driver({
    showProgress: true,
    steps: [
      { 
        element: 'canvas', 
        popover: { 
          title: 'Поле', 
          description: 'На каждом уровне вам нужно будет решить какую-либо проблему с помощью создания схемы на поле.', 
          side: "top", 
          align: 'center',
        }
      },
      { 
        element: 'div#task-panel', 
        popover: { 
          title: 'Панель задач', 
          description: 'Здесь вам будут давать описание проблемы, которую вам нужно решить. Чтобы свернуть панель задача, нажмите на кнопку рядом.', 
          side: "left", 
          align: 'center',
        }
      },
      { 
        element: 'div#tools', 
        popover: { 
          title: 'Инструменты', 
          description: 'У вас есть инструменты для того, чтобы изменять схему на поле. Вы можете рисовать знаки, стирать их и просто перемещаться по полю.', 
          side: "left", 
          align: 'start',
        }
      },
      { 
        element: 'label#sign-type', 
        popover: { 
          title: 'Контекстное меню', 
          description: 'Данное меню позволяет выбрать нужный тип знака и настроить его характеристики, например, направление.', 
          side: "left", 
          align: 'start',
        }
      },
      { 
        popover: { 
          title: 'Вперёд!', 
          description: 'Обучение завершено. Приятной игры!', 
        } 
      }
    ],
    onHighlighted: () => {
      // 1. Находим существующий SVG элемент
      //    (Используем ID, но можно и по классу, тегу или другому селектору)
      const svgElement = document.querySelector(".driver-overlay")
      const pathElement = svgElement.querySelector('path');
      const viewBox = svgElement.getAttribute('viewBox');
      const d = pathElement.getAttribute('d')
      const popover = document.querySelector("#driver-popover-content")
      popover.setAttribute('popover', 'manual')
      const svgString = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}' style='fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2; z-index: 10000; position: fixed; top: 0px; left: 0px; width: 100%; height: 100%;'><path style='fill: rgb(0, 0, 0); opacity: 0.7; pointer-events: auto; cursor: auto;' d='${d}'/></svg>`;
      const encodedSVG = encodeSVG(svgString);
      const backdropStyle = `url("data:image/svg+xml,${encodedSVG}")`;
      const style = document.createElement('style');
        style.innerHTML = `
            #driver-popover-content::backdrop {
                background-image: ${backdropStyle};
                background-repeat: no-repeat;
                background-size: cover;
            }
        `;
        document.head.appendChild(style);
        popover.showPopover()
    }
  });
