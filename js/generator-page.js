import ButtonExample from './button-example.js';
// import SliderRed from './Sliders/slider-red.js';
// import SliderGreen from './Sliders/slider-green.js';
// import SliderBlue from './Sliders/slider-blue.js';
import SliderComponent from './Sliders/slider-component.js';

export default class GeneratorPage {
    _initComponents() {
        this.redSlider = new SliderComponent({
            element: this._element.querySelector('#slider-red'),
            eventName: 'red.move'
        });
        this.greenSlider = new SliderComponent({
            element: this._element.querySelector('#slider-green'),
            eventName: 'green.move'
        });
        this.blueSlider = new SliderComponent({
            element: this._element.querySelector('#slider-blue'),
            eventName: 'blue.move'
        });
    }

    constructor({ element }) {
        this._element = element;
        this._initComponents();

        this._RGBColorBg = {
            redColor: parseInt(getComputedStyle(this.redSlider._thumb).left),
            greenColor: parseInt(getComputedStyle(this.greenSlider._thumb).left),
            blueColor: parseInt(getComputedStyle(this.blueSlider._thumb).left)
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