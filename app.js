let buttonRGBRed = '0';
let buttonRGBGreen = '0';
let buttonRGBBlue = '0';

class ButtonGenerator {
    constructor({ element }) {
        this._element = element;
        this._thumb = this._element.querySelector('.thumb');
        this._button = document.body.querySelector('button');

        this._sliderClientRect = this._element.getBoundingClientRect();
        this._thumbClientRect = this._thumb.getBoundingClientRect();

        this._thumb.onmousedown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
    }

    _onMouseDown(event) {
        document.addEventListener('mouseup', this._onMouseUp);
        this._element.addEventListener('mousemove', this._onMouseMove);
    }

    _onMouseUp(event) {
        this._element.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
    }

    _onMouseMove(event) {
        if (this._isNotOverLeft(event) && this._isNotOverRight(event)) {  
            const thumbCoord = event.clientX - this._sliderClientRect.left;
            this._thumb.style.left = thumbCoord + "px";
            this._changeBtnBgColor(event, thumbCoord);
        }
    }

    _isNotOverLeft(event) {
        return event.clientX >= this._sliderClientRect.left;
    }

    _isNotOverRight(event) {
        const rightBoundXCoord = this._sliderClientRect.left + this._sliderClientRect.width - this._thumbClientRect.width;

        return event.clientX <= rightBoundXCoord;
    }

    _changeBtnBgColor(event, thumbCoord) {
        if (event.target.closest('#slider-red')) {
            buttonRGBRed = this._calculateRGB(thumbCoord);
            this._button.style.backgroundColor = `rgb(${buttonRGBRed}, ${buttonRGBGreen}, ${buttonRGBBlue})`;
        }
        if (event.target.closest('#slider-green')) {
            buttonRGBGreen = this._calculateRGB(thumbCoord);
            this._button.style.backgroundColor = `rgb(${buttonRGBRed}, ${buttonRGBGreen}, ${buttonRGBBlue})`;
        }
        if (event.target.closest('#slider-blue')) {
            buttonRGBBlue = this._calculateRGB(thumbCoord);
            this._button.style.backgroundColor = `rgb(${buttonRGBRed}, ${buttonRGBGreen}, ${buttonRGBBlue})`;
        }
    }
    
    _calculateRGB(thumbCoord) {
        return (thumbCoord * 255 / (this._sliderClientRect.width - this._thumbClientRect.width)).toFixed();
    }
}

new ButtonGenerator( {element: document.body.querySelector('#slider-blue')} );
new ButtonGenerator( {element: document.body.querySelector('#slider-red')} );
new ButtonGenerator( {element: document.body.querySelector('#slider-green')} );