import Particle from "./Particle";

class Effect{
    canvas: HTMLCanvasElement;
    height: number;
    width: number;
    particles: Particle[];
    totalParticles: number;
    cellSize: number;
    rows: number;
    cols: number;
    flowField: number[];
    curve: number;
    zoom: number;
    debug: boolean;
    
    curveInput: HTMLInputElement;
    zoomInput: HTMLInputElement;
    cellSizeInput: HTMLInputElement;
    totalParticlesInput: HTMLInputElement;

    constructor( canvas: HTMLCanvasElement ){
        this.canvas = canvas;
        this.height = this.canvas.height;
        this.width = this.canvas.width;
        this.particles = [];
        this.totalParticles = 2000;
        this.cellSize = 5;
        this.rows = 0;
        this.cols = 0;
        this.flowField = [];
        this.curve = 2.5;
        this.zoom = 0.05;
        this.debug = false;
        this.init();

        this.curveInput = document.getElementById("curve-input") as HTMLInputElement;
        this.zoomInput = document.getElementById("zoom-input") as HTMLInputElement;
        this.cellSizeInput = document.getElementById("cell-size-input") as HTMLInputElement;
        this.totalParticlesInput = document.getElementById("total-particles-input") as HTMLInputElement;

        this.curveInput.value = this.curve.toString()
        this.zoomInput.value = this.zoom.toString()
        this.cellSizeInput.value = this.cellSize.toString()
        this.totalParticlesInput.value = this.totalParticles.toString()

        this.curveInput.oninput = (e: Event)=>{
            let target = e.target as HTMLInputElement;
            this.curve = Number(target.value);            
            this.init()
        }
        this.zoomInput.oninput = (e: Event)=>{
            let target = e.target as HTMLInputElement;
            this.zoom = Number(target.value);     
            this.init()       
        }
        this.cellSizeInput.oninput = (e: Event)=>{
            let target = e.target as HTMLInputElement;
            this.cellSize = Number(target.value);    
            this.init()        
        }
        this.totalParticlesInput.oninput = (e: Event)=>{
            let target = e.target as HTMLInputElement;
            this.totalParticles = Number(target.value);    
            this.init()        
        }

        window.addEventListener("keydown", e=>{
            if(e.key === "d") this.debug = !this.debug
        })
        window.addEventListener("resize", e=>{
            const target = e.target as Window;

            this.resize(target.innerWidth, target.innerHeight)

        })
    }
    init(){

        this.rows = Math.floor(this.height / this.cellSize);
        this.cols = Math.floor(this.width / this.cellSize);
        this.flowField = [];
        this.particles = [];

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let angle = (Math.cos(x * this.zoom) + Math.sin(y * this.zoom)) * this.curve;
                this.flowField.push(angle);            
            }
        }
        for (let i = 0; i < this.totalParticles; i++) {
            this.particles.push(new Particle(this));
        }
    }
    drawGrid(context: CanvasRenderingContext2D){
        context.save();
        context.strokeStyle = "white";
        context.lineWidth = 0.3;
        for (let c = 0; c < this.cols; c++) {
            context.beginPath()
            context.moveTo(this.cellSize * c, 0);
            context.lineTo(this.cellSize * c, this.height);
            context.stroke();
        }
        for (let r = 0; r < this.cols; r++) {
            context.beginPath()
            context.moveTo(0, this.cellSize * r);
            context.lineTo(this.width, this.cellSize * r);
            context.stroke();
        }
        context.restore();
    }
    render(context: CanvasRenderingContext2D){
        if(this.debug) this.drawGrid(context)
        this.particles.forEach(particle=>{
            particle.draw(context);
            particle.update();
        })
    }
    resize(w: number, h: number){
        this.canvas.width = w;
        this.canvas.height = h;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.init();
    }
}

export default Effect;