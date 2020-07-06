import * as p5 from 'p5';

interface P5Callback {
    preload: (arg0: p5) => void;
    setup: (arg0: p5) => void;
    draw: (arg0: p5) => void;
};

class P5FigureBase {
    canvas: HTMLElement;
    draw_post: (arg0: HTMLElement) => void;
    p5: p5;
    callbacks: P5Callback;
    
    constructor(canvas: HTMLElement, callbacks: P5Callback,  draw_post?: (arg0: HTMLElement) => void) {
        this.canvas = canvas;
        this.callbacks = callbacks;

        if (draw_post) {
            this.draw_post = draw_post;
        }
        else {
            this.draw_post = (canvas: HTMLElement) => {};
        }

        this.p5 = new p5(this.generator.bind(this), this.canvas);
    }

    generator (p: p5) {
        p.preload = () => {
            this.callbacks.preload(p);
        };

        p.setup = () => {
            this.callbacks.setup(p);
        };

        p.draw = () => {
            this.callbacks.draw(p);
            this.draw_post(this.canvas);
        };
    }
};

export class P5Figure extends P5FigureBase {
    constructor(canvas: HTMLElement, callbacks: P5Callback) {
        super(canvas, callbacks);
    }
};