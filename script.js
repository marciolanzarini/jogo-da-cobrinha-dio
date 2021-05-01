let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");  // context: renderiza o desenho que vai ocorrer dentro do canvas e indica 2d
let box = 32;  // indica que cada quadrado terá 32px
let snake = [];
snake[0] ={
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food ={   // comida
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {  //  criar background: cria função pra desenhar e definir cores
    context.fillStyle = "lightgreen";  //  fillStyle: trabalha o estilo do canvas/context
    context.fillRect(0, 0, 16 * box, 16 * box);  //  fillRect: desenha o retângulo onde vai acontecer o jogo
}

function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood (){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}


document.addEventListener('keydown', update);  // ativa os comandos pelo controle/teclado chamando a função update

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
    // limita a cobrinha de voltar exatamente na direção contrária
}


function iniciarJogo(){
    
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    // faz com que a cobrinha reinicie no lado oposto da tela ao cruzá-la

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Morreeeeeeu!');
        }
    // faz o jogo terminar se a cobrinha bater nela mesma
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;  // set posição inicial da cobrinha no 0 de x
    let snakeY = snake[0].y;  // set posição inicial da cobrinha no 0 de y

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    // adicionam ou retiram um quadradinho da cobrinha conforme a direção, para dar a sensação de movimento

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //pop tira o último elemento da lista
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box,
        food.y = Math.floor(Math.random() * 15 +1) * box
    }
  
    let newHead ={  
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100); //jogo reinicia a cada 100ms se travar

