class ButtonGenerator {
    constructor({ element }) {
        this._element = element;
        this._thumb = this._element.querySelector('.thumb');

        this._sliderClientRect = this._element.getBoundingClientRect();
        this._thumbClientRect = this._thumb.getBoundingClientRect();

        this._thumb.onmousedown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
    }

    _onMouseDown(event) {
        document.addEventListener('mouseup', this._onMouseUp);
        document.addEventListener('mousemove', this._onMouseMove);
    }

    _onMouseUp(event) {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
    }

    _onMouseMove(event) {
        if (this._isNotOverLeft(event) && this._isNotOverRight(event)) {
            this._thumb.style.left = event.clientX - this._sliderClientRect.left + "px";
        }
    }

    _isNotOverLeft(event) {
        return event.clientX > this._sliderClientRect.left;
    }

    _isNotOverRight(event) {
        const rightBoundXCoord = this._sliderClientRect.left + this._sliderClientRect.width - this._thumbClientRect.width;
        return event.clientX < rightBoundXCoord;
    }
}

new ButtonGenerator( {element: document.body.querySelector('#slider-blue')} );
new ButtonGenerator( {element: document.body.querySelector('#slider-red')} );
new ButtonGenerator( {element: document.body.querySelector('#slider-green')} );