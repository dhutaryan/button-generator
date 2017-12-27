import ButtonExample from './button-example.js';
import SliderRed from './Sliders/slider-red.js';
import SliderGreen from './Sliders/slider-green.js';
import SliderBlue from './Sliders/slider-blue.js';

export default class GeneratorPage {
    _initComponents() {
        this.redSlider = new SliderRed({
            element: this._element.querySelector('#slider-red'),
            eventName: 'red.move'
        });
        new SliderGreen({
            element: this._element.querySelector('#slider-green'),
            eventName: 'green.move'
        });
        new SliderBlue({
            element: this._element.querySelector('#slider-blue'),
            eventName: 'blue.move'
        });
        // new ButtonExample({
        //     element: this._element.querySelector('[data-component="button"]')
        // });
    }

    constructor({ element }) {
        this._element = element;
        this._initComponents();

        this._RGBColorBg = {
            redColor: parseInt(getComputedStyle(this.redSlider._thumb).left),
            greenColor: parseInt(getComputedStyle(this.redSlider._thumb).left),
            blueColor: parseInt(getComputedStyle(this.redSlider._thumb).left)
        }
        this.changeButtonColor();

        this._element.addEventListener('red.move', (event) => {
            this._RGBColorBg.redColor = event.detail;
            this.changeButtonColor();
        });

        this._element.addEventListener('green.move', (event) => {
            this._RGBColorBg.greenColor = event.detail;
            this.changeButtonColor();
        });

        this._element.addEventListener('blue.move', (event) => {
            this._RGBColorBg.blueColor = event.detail;
            this.changeButtonColor();
        });
    }

    changeButtonColor() {
        new ButtonExample({
            element: this._element.querySelector('[data-component="button"]'),
            bgcolor: this._RGBColorBg
        });
    }
}