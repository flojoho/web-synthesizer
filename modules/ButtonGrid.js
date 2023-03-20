import NoteButton, { getDiameter, getSpacing } from './NoteButton.js';
const buttonGridContainer = document.getElementById('buttonGridContainer');
const render = () => {
    const divWidth = buttonGridContainer.offsetWidth;
    const divHeight = buttonGridContainer.offsetHeight;
    const diameter = getDiameter();
    const spacing = getSpacing();
    const tileSize = diameter + spacing;
    const buttonsPerRow = Math.floor(divWidth / tileSize);
    const buttonsPerColumn = Math.floor(divHeight / tileSize);
    const marginX = (divWidth - (buttonsPerRow * tileSize)) / 2;
    const marginY = (divHeight - (buttonsPerColumn * tileSize)) / 2;
    buttonGridContainer.textContent = '';
    for (let countY = 0; countY < buttonsPerColumn; countY++) {
        for (let countX = 0; countX < buttonsPerRow; countX++) {
            const x = marginX + countX * tileSize;
            const y = marginY + countY * tileSize;
            const noteNumber = countX - (Math.floor(buttonsPerRow / 2)) - 5 * (countY - Math.floor(buttonsPerColumn / 2));
            const noteButton = new NoteButton(noteNumber, x, y);
            noteButton.appendTo(buttonGridContainer);
        }
    }
};
export default { render };
