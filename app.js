class ButtonGenerator {
    constructor({ element }) {
        this._element = element;
        this._thumb = this._element.querySelector('.thumb');

        this._thumb.onmousedown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);

        // this._thumb.ondragstart = function() {
        //     return false;
        // };
    }

    _onMouseDown(event) {
        console.log(event.clientX);
        document.addEventListener('mouseup', this._onMouseUp);
        document.addEventListener('mousemove', this._onMouseMove);
    }

    _onMouseUp(event) {
        document.removeEventListener('mousemove', this._onMouseMove);
        document.removeEventListener('mouseup', this._onMouseUp);
    }

    _onMouseMove(event) {
        console.log(event.clientX);
        this._thumb.style.left = event.clientX + "px";
    }
}

new ButtonGenerator( {element: document.body.querySelector('#slider')} );