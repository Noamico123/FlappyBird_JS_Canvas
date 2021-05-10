// Select canvas
const cvs = document.getElementById("bird");
const ctx = cvs.getContext("2d");

// Game variables and consts
let frames = 0;
const DEGREE = Math.PI/180;

// Load sprite imgs
const sprite = new Image();
sprite.src = "images/css_sprites2.png";

const btns = new Image();
btns.src = "images/btns.png";

const logo = new Image();
logo.src = "images/NoamMIshaeli.png";

const sound = new Image();
sound.src = "images/sound.png";

// Load sound
const SCORE_S = new Audio();
SCORE_S.src = "audio/point.wav";

const FLAP = new Audio();
FLAP.src = "audio/flap.wav";

const HIT = new Audio();
HIT.src = "audio/hit.wav";

const SWOOSHING = new Audio();
SWOOSHING.src = "audio/swooshing.wav";

const DIE = new Audio();
DIE.src = "audio/die.wav";

// Game states
const state = {
    current : 0,
    getReady : 0,
    game : 1,
    menu: 2,
    over : 3,
}

//0 for day, 1 for night
var dayOrNight;
//0 for yellow, 1 for blue, 2 for red
var birdColor;
//0 for off, 1 for on
var isBird;
//0 for off, 1 for on
var isSound = 0;
//Yellow bird coordinates as default
var animation = [
            {sX: 1008, sY : 375},
            {sX: 1052, sY : 375},
            {sX: 1095, sY : 375},
            {sX: 1008, sY : 375}];
//Day coordinates as default
var dayNightCoordinates = [
            sX = 390,
            sY = 10,
            w = 360,
            h = 640,
            x = 0,
            y = 0];

//Click event
cvs.addEventListener("click", function(evt){
    var rect = cvs.getBoundingClientRect();
    var xVal = evt.clientX - rect.left;
    var yVal = evt.clientY - rect.top;
    console.log("X: ", xVal,"Y: ",yVal);
    switch(state.current){
        case state.getReady:
            //click on start button
            if (49 < xVal && xVal < 154 && 292 < yVal && yVal < 326){
                console.log("Start"); 
                state.current = state.game;
                isBird = 1;
                if( isSound == 0){SWOOSHING.play();}
                break;
            }
            //click on menu button
            else if (170 < xVal && xVal < 270 && 293 < yVal && yVal < 326) {
                console.log("Menu");
                isBird = 0;
                state.current = state.menu;
                if( isSound == 0){SWOOSHING.play();}
                break;
            }
            soundOnOff(xVal,yVal);
            break;

        case state.game:
            if(bird.y - bird.radius <= 0) return;
            bird.flap();
            if (isSound == 0){FLAP.play();}
            break;
        
        case state.menu:
            isBird = 0;
            soundOnOff(xVal,yVal);
            //Click on day button
            if (68 < xVal && xVal < 116 && 51 < yVal && yVal < 80) {
                state.current = state.menu;
                dayOrNight = 0;
                if (isSound == 0){SWOOSHING.play();}
                console.log("Day: ",dayOrNight);
                break;
            }
            //Click on night button
            else if (187 < xVal && xVal < 248 && 51 < yVal && yVal < 80) {
                state.current = state.menu;
                dayOrNight = 1;
                if( isSound == 0){SWOOSHING.play();}
                console.log("Night: ",dayOrNight);
                break;
            }
            //Click on yellow bird
            else if (69 < xVal && xVal < 92 && 180 < yVal && yVal < 200){
                birdColor = 0;
                if( isSound == 0){SWOOSHING.play();}
                console.log(birdColor," yellow"); 
                break;
            }
            //Click on blue bird
            else if (108 < xVal && xVal < 132 && 180 < yVal && yVal < 200){
                birdColor = 1;
                if( isSound == 0){SWOOSHING.play();}
                console.log(birdColor," blue"); 
                break;
            }
            //Click on red bird
            else if (148 < xVal && xVal < 178 && 180 < yVal && yVal < 200){
                birdColor = 2;
                if( isSound == 0){SWOOSHING.play();}
                console.log(birdColor," red"); 
                break;
            }
            //Click on restart
            else if (106 < xVal && xVal < 192 && 290 < yVal && yVal < 322){
                pipes.reset();
                bird.speedReset();
                score.reset();
                state.current = state.getReady;            
                if( isSound == 0){SWOOSHING.play();}
                console.log("Restart"); 
            }
            break;
        
        case state.over:
            isBird = 0;
            soundOnOff(xVal,yVal);
            // Click on restart
            if (106 < xVal && xVal < 192 && 290 < yVal && yVal < 322){
                pipes.reset();
                bird.speedReset();
                score.reset();
                state.current = state.getReady;            
                if( isSound == 0){SWOOSHING.play();}
                console.log("Restart"); 
            }
            break;
    }
});  

//Objects - images, coordinates and its drawing 
//Background - defined as var and not as const because it can be change during running
var createBackground = {    
    draw : function(){
        sX1 = 9;
        sY1 = 9;
        w1 = 31;
        h1 = 31;
        x1 = 0;
        y1 = 0;

        //0 for day
        if (dayOrNight == 0){
            dayNightCoordinates = [
                sX = 390,
                sY = 10,
                w = 360,
                h = 640,
                x = 0,
                y = 0];    
        }
        //1 for night
        if (dayOrNight == 1){
            dayNightCoordinates = [
                sX = 10,
                sY = 10,
                w = 360,
                h = 640,
                x = 0,
                y = 0];
        }

        ctx.drawImage(sprite, sX, sY, w, h, x, y, w,h);
        ctx.drawImage(sprite, sX, sY, w, h, x, y, w,h);
        
        if (isSound == 0){
            ctx.drawImage(sound, sX1, sY1, w1, h1, x1, y1, w1,h1);
        }
        if (isSound == 1){
            sX1 = 60;
            sY1 = 9;
            w1 = 33;
            h1 = 32;
            x1 = 0;
            y1 = 0;
            ctx.drawImage(sound, sX1, sY1, w1, h1, x1, y1, w1,h1);
        }
    }
}

// Footer
const createFooter = {
    //ground coordinates
    sX: 898,
    sY: 228,
    w: 200,
    h: 69,
    x: 0,
    y: cvs.height - 68,
    dx : 2,

    //signature coordinates
    sX2: 17,
    sY2: 14,
    w2: 173,
    h2: 18,
    x2: 5,
    y2: cvs.height - 25,

    //draw function for this elemnt
    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);    
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
        ctx.drawImage(logo, this.sX2, this.sY2, this.w2, this.h2, this.x2, this.y2, this.w2, this.h2);
    },
    update: function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w/2);
        }
    }
}

// BIRD - defined as var and not as const because it can be change during running
var bird = {
    //bird size and starting point coordinates
    x : 50,
    y : 150,
    w : 34,
    h : 26,
    
    radius : 12,
    frame : 0,
    gravity : 0.125,
    jump : 3.5,
    speed : 0,
    rotation : 0,

    //draw function for this elemnt
    draw : function(){
        //0 for yellow bird
        if (birdColor == 0) {
            animation = [
                {sX: 1008, sY : 375},
                {sX: 1052, sY : 375},
                {sX: 1095, sY : 375},
                {sX: 1008, sY : 375}
            ]
        }
        //1 for blue bird
        if (birdColor == 1) {
                animation = [
                    {sX: 1139, sY : 375},
                    {sX: 897, sY : 434},
                    {sX: 897, sY : 474},
                    {sX: 1139, sY : 375}
                ];   
            }
        //2 for red bird
        if (birdColor == 2) {
            animation = [
                {sX: 897, sY : 515},
                {sX: 897, sY : 555},
                {sX: 897, sY : 595},
                {sX: 897, sY : 515}
            ]      
        }      

        let bird = animation[this.frame];
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h,- this.w/2, - this.h/2, this.w, this.h);
        ctx.restore();
    },
    
    flap : function(){
        this.speed = - this.jump;
    },
    
    update: function(){
        // If the game is on 'getReady' , THE BIRD MUST FLAP SLOWLY
        this.period = state.current == state.getReady ? 10 : 5;
        // Increacing frames by 1
        this.frame += frames%this.period == 0 ? 1 : 0;
        // Frames goes from 0 to 4
        this.frame = this.frame% animation.length;
        // Reset bird's position after gameOver
        if(state.current == state.getReady){
            this.y = 150; 
            this.rotation = 0 * DEGREE;
        }else{
            this.speed += this.gravity;
            this.y += this.speed;
            
            if(this.y + this.h/2 >= cvs.height - createFooter.h){
                this.y = cvs.height - createFooter.h - this.h/2;
                if(state.current == state.game){
                    state.current = state.over;
                    if( isSound == 0){DIE.play();}
                }
            }
            
            // If the speed greater than jump - the bird will fall down
            if(this.speed >= this.jump){
                this.rotation = 90 * DEGREE;
                this.frame = 1;
            }else{
                this.rotation = -25 * DEGREE;
            }
        }
        
    },
    speedReset : function(){
        this.speed = 0;
    }
}

// GetReady screen
const getReady = {
    //get ready logo
    sX : 769,
    sY : 7,
    w : 175,
    h : 50,
    x :  cvs.width/2 - 175/2,
    y : cvs.height/2 - 75,

    //start btn
    sX2 : 951,
    sY2 : 489,
    w2 : 109,
    h2 : 36,
    x2 :  cvs.width/3-60,
    y2 : cvs.height/2+50,

    //menu btn
    sX3 : 951,
    sY3 : 547,
    w3 : 109,
    h3 : 36,
    x3 :  cvs.width/3+60,
    y3 : cvs.height/2+50,

    //draw function for this elemnt
    draw: function(){
        if(state.current == state.getReady){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
            ctx.drawImage(sprite, this.sX2, this.sY2, this.w2, this.h2, this.x2, this.y2, this.w2, this.h2);
            ctx.drawImage(sprite, this.sX3, this.sY3, this.w3, this.h3, this.x3, this.y3, this.w3, this.h3);
        }
    }
}

const createMenu = {
    //color btn
    sX : 15,
    sY : 9,
    w : 110,
    h : 24,
    x : cvs.width/3-40,
    y : 140,

    //day btn
    sX2 : 11,
    sY2 : 112,
    w2 : 51,
    h2 : 30,
    x2 :  cvs.width/3-40,
    y2 : 50,

    //night btn
    sX3 : 154,
    sY3 : 11,
    w3 : 62,
    h3 : 30,
    x3 :  cvs.width/3+80,
    y3 : 50,

    //yellow bird
    sX4 : 1008,
    sY4 : 375,
    w4 : 34,
    h4 : 26,
    x4 : cvs.width/3-40,
    y4 : 180,
    
    //blue bird
    sX5 : 1139,
    sY5 : 375,
    w5 : 34,
    h5 : 26,
    x5 : cvs.width/3,
    y5 : 180,
    
    //red bird
    sX6 : 897,
    sY6 : 515,
    w6 : 34,
    h6 : 26,
    x6 : cvs.width/3+40,
    y6 : 180,
    
    //Restart btn
    sX7 : 12,
    sY7 : 56,
    w7 : 83,
    h7 : 35,
    x7 :  cvs.width/3,
    y7 : cvs.height/2+50,
    
    //draw function for this elemnt
    draw: function(){
        if(state.current == state.menu){
            ctx.drawImage(btns, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);   
            ctx.drawImage(btns, this.sX2, this.sY2, this.w2, this.h2, this.x2, this.y2, this.w2, this.h2);
            ctx.drawImage(btns, this.sX3, this.sY3, this.w3, this.h3, this.x3, this.y3, this.w3, this.h3);
            ctx.drawImage(sprite, this.sX4, this.sY4, this.w4, this.h4, this.x4, this.y4, this.w4, this.h4);
            ctx.drawImage(sprite, this.sX5, this.sY5, this.w5, this.h5, this.x5, this.y5, this.w5, this.h5);
            ctx.drawImage(sprite, this.sX6, this.sY6, this.w6, this.h6, this.x6, this.y6, this.w6, this.h6);
            ctx.drawImage(btns, this.sX7, this.sY7, this.w7, this.h7, this.x7, this.y7, this.w7, this.h7);
        }
    }
}

// Game over screen
const gameOver = {
    sX : 945,
    sY : 6,
    w : 229,
    h : 161,
    x : cvs.width/2 - 225/2,
    y : 90,

    //Restart btn
    sX2 : 12,
    sY2 : 56,
    w2 : 83,
    h2 : 35,
    x2 :  cvs.width/3,
    y2 : cvs.height/2+50,

    //draw function for this elemnt
    draw: function(){
        if(state.current == state.over){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);   
            ctx.drawImage(btns, this.sX2, this.sY2, this.w2, this.h2, this.x2, this.y2, this.w2, this.h2);
        }
    }
}

// Pipes elements
const pipes = { 
    position : [],

    top : {
        sX : 823,
        sY : 228
    },
    bottom:{
        sX : 770,
        sY : 228
    },
    //Posiotions
    w : 53,
    h : 400,
    gap : 85,
    maxYPos : -150,
    dx : 2,

    //draw function for this elemnt
    draw : function(){
        for(let i  = 0; i < this.position.length; i++){
            let p = this.position[i];
            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;
            
            // top pipe
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);  
            
            // bottom pipe
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);  
        }
    },
    
    update: function(){
        if(state.current !== state.game) return;
        
        if(frames%100 == 0){
            this.position.push({
                x : cvs.width,
                y : this.maxYPos * ( Math.random() + 1)
            });
        }
        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];
            
            let bottomPipeYPos = p.y + this.h + this.gap;
            
            // Collision detection
            // Top pipe
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h){
                state.current = state.over;
                if( isSound == 0){HIT.play();}
            }
            // Bottom pipe
            if(bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h){
                state.current = state.over;
                if( isSound == 0){HIT.play();}
            }
            
            // Move pipes to left side
            p.x -= this.dx;
            
            // If the pipes goes beyond canvas, we delete them from the array
            if(p.x + this.w <= 0){
                this.position.shift();
                score.value += 1;
                if( isSound == 0){SCORE_S.play();}
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    },    
    reset : function(){
        this.position = [];
    }
    
}

// Score text and counting
const score = {
    best : parseInt(localStorage.getItem("best")) || 0,
    value : 0,
    
    draw : function(){
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        
        if(state.current == state.game){
            ctx.lineWidth = 2;
            ctx.font = "35px Teko";
            ctx.fillText(this.value, cvs.width/2, 50);
            ctx.strokeText(this.value, cvs.width/2, 50);
            
        }else if(state.current == state.over){
            // Score value
            ctx.font = "25px Teko";
            ctx.fillText(this.value, 225, 186);
            ctx.strokeText(this.value, 225, 186);
            // Best value
            ctx.fillText(this.best, 225, 228);
            ctx.strokeText(this.best, 225, 228);
        }
    },
    
    reset : function(){
        this.value = 0;
    }
}


function soundOnOff(x,y){
    if (1 < x && x < 31 && 3 < y && y < 30){
        if (isSound == 0) isSound = 1;
        else isSound = 0;
        console.log("sdfs: ",isSound);
    }
}



// Draw game
function draw(){
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    createBackground.draw();
    pipes.draw();
    createFooter.draw();
    if (isBird == 1){
        bird.draw();
    }
    getReady.draw();
    createMenu.draw();
    gameOver.draw();
    score.draw();
}

// Update 
function update(){
    bird.update();
    createFooter.update();
    pipes.update();
}

// Loop
function loop(){
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();
