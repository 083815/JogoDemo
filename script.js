let canvas = document.getElementById("snake"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); // trata o dociumento em um plano 2d
let box = 50; // cada quadrado que será comido pela cobrinha
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; // movimentos da cobra
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){ 
    context.fillStyle = "lightgreen"; // estilo do contexto 
    context.fillRect(0, 0, 16*box, 16*box); //desenha o retângulo usando x e y e a largura e altura setadas onde ocorrerá o jogo 
}

function criarCobrinha (){ // criaçao da cobrinha i= ao corpo da cobra
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){ // comando para criar a comida da cobrinha
    context.fillStyle = "grey";
    context.fillRect(food.x, food.y, box, box);
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update); 

// comando do teclado sendo transmitido para a cobrinha

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    

    // comandos para fazer com que a cobrinha saia pela direita e entre pela esquerda; saia por baixo e entre por cima 
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){ // se essas posiçoes forem iguais significa que bateu ai acaba o jogo 
            clearInterval(jogo); // para a funçao jogo
            alert('Game Over Over ! Try Again ! :(');
        }
    }
//chamando as funçoes para o jogo acpontecer
    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; // local do inico da cobra -inico do jogo
    let snakeY = snake[0].y;
// comando das direçoes em que a cobrionha pode se movimentar

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){ // funçao pra comer a comida
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={ 
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); //método unshift adiciona como primeiro quadradinho da cobrinha
}

let jogo = setInterval(iniciarJogo, 110);// atualizaçao da cobrinha em ms