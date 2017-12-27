export default class ButtonExample {
    constructor({ element, bgcolor }) {
        this._element = element;
        this.updateButtonColor(bgcolor);
    }

    updateButtonColor(bgcolor) {
        this._element.style.backgroundColor = `rgb(${bgcolor.redColor}, ${bgcolor.greenColor}, ${bgcolor.blueColor})`
    }
}