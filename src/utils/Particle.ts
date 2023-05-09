import Effect from "./Effect";
import { Vector } from "./types";

class Particle{
    effect: Effect;
    pos: Vector;
    speed: Vector;
    history: Vector[]
    maxLength: number;
    angle: number;
    speedModifier: number;
    timer: number;
    color: string;
    colors: string[];

    constructor( effect: Effect ){
        this.effect = effect;
        this.pos = {
            x: Math.floor(Math.random() * this.effect.width),
            y: Math.floor(Math.random() * this.effect.height)
        }
        this.speed = {
            x: 0,
            y: 0
        }
        this.speedModifier = Math.floor(Math.random() * 5 + 1);
        this.history = [{x: this.pos.x, y: this.pos.y}]
        this.maxLength = Math.floor(Math.random() * 200 + 10);
        this.angle = 0;
        this.timer = this.maxLength * 2;
        this.colors = ["#0A2F50", "#17395A", "#204262", "#2A4B68", "#395A7F"];
        this.color = this.colors[Math.floor(Math.random()* this.colors.length)];
    }

    draw(context: CanvasRenderingContext2D){
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 0; i < this.history.length; i++) {
            context.lineTo(this.history[i].x,this.history[i].y)
        }
        context.strokeStyle = this.color;
        context.stroke();
    }
    update(){
        this.timer--;
        if(this.timer>=1){
            let x = Math.floor(this.pos.x / this.effect.cellSize);
            let y = Math.floor(this.pos.y / this.effect.cellSize);
            let index = y * this.effect.cols + x;
            this.angle = this.effect.flowField[index];
    
            this.speed.x = Math.cos(this.angle);
            this.speed.y = Math.sin(this.angle);
            this.pos.x += this.speed.x * this.speedModifier;
            this.pos.y += this.speed.y * this.speedModifier;
    
            this.history.push({x: this.pos.x, y: this.pos.y})
            if(this.history.length > this.maxLength){
                this.history.shift();
            }
        }else if(this.history.length > 1){
            this.history.shift();
        }else{
            this.reset();
        }
    }
    reset(){
        this.pos = {
            x: Math.floor(Math.random() * this.effect.width),
            y: Math.floor(Math.random() * this.effect.height)
        }
        this.history = [{x: this.pos.x, y: this.pos.y}]
        this.timer = this.maxLength * 2;
    }
}

export default Particle