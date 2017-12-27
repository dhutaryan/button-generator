export default class SliderComponent {
    constructor({ element, eventName }) {
        this._element = element;
        this._eventName = eventName;
        this._thumb = this._element.querySelector('.thumb');
        this._button = document.body.querySelector('button');

        this._sliderClientRect = this._element.getBoundingClientRect();
        this._thumbClientRect = this._thumb.getBoundingClientRect();

        this._thumb.onmousedown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
    }

    _onMouseDown() {
        document.addEventListener('mouseup', this._onMouseUp);
        this._element.addEventListener('mousemove', this._onMouseMove);
    }

    _onMouseUp() {
        this._element.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
    }

    _onMouseMove(event) {
        if (this._isNotOverLeft(event) && this._isNotOverRight(event)) {  
            const thumbCoord = event.clientX - this._sliderClientRect.left;

            const myEvent = new CustomEvent(this._eventName, {
                bubbles: true,
                detail: this._calculateRGB(),
            });
    
            this._element.dispatchEvent(myEvent);
            this._thumb.style.left = thumbCoord + "px";
        }
    }

    _isNotOverLeft(event) {
        return event.clientX >= this._sliderClientRect.left;
    }

    _isNotOverRight(event) {
        const rightBoundXCoord = this._sliderClientRect.left + this._sliderClientRect.width - this._thumbClientRect.width;

        return event.clientX <= rightBoundXCoord;
    }
    
    _calculateRGB() {
        return ((event.clientX - this._sliderClientRect.left) * 255 / (this._sliderClientRect.width - this._thumbClientRect.width)).toFixed();
    }
}