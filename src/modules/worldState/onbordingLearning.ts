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
