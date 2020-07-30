const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, //sprite x e y
            planoDeFundo.largura, planoDeFundo.altura, //tamanho do recorte do sprite
            planoDeFundo.x, planoDeFundo.y, //local q o sprite vai aparecer
            planoDeFundo.largura, planoDeFundo.altura, //tamanho q vai aparecer no canvas
        );

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, //sprite x e y
            planoDeFundo.largura, planoDeFundo.altura, //tamanho do recorte do sprite
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, //local q o sprite vai aparecer
            planoDeFundo.largura, planoDeFundo.altura, //tamanho q vai aparecer no canvas
        );
    }
}


const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, //sprite x e y
            chao.largura, chao.altura, //tamanho do recorte do sprite
            chao.x, chao.y, //local q o sprite vai aparecer
            chao.largura, chao.altura, //tamanho q vai aparecer no canvas
        );

        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY, //sprite x e y
            chao.largura, chao.altura, //tamanho do recorte do sprite
            (chao.x + chao.largura), chao.y, //local q o sprite vai aparecer
            chao.largura, chao.altura, //tamanho q vai aparecer no canvas
        );
    }
}

const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, //sprite x e y
            flappyBird.largura, flappyBird.altura, //tamanho do recorte do sprite
            flappyBird.x, flappyBird.y, //local q o sprite vai aparecer
            flappyBird.largura, flappyBird.altura, //tamanho q vai aparecer no canvas
        );
    }
}

const getReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            getReady.spriteX, getReady.spriteY, //sprite x e y
            getReady.largura, getReady.altura, //tamanho do recorte do sprite
            getReady.x, getReady.y, //local q o sprite vai aparecer
            getReady.largura, getReady.altura, //tamanho q vai aparecer no canvas
        );
    }
}

let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;
}

const Telas = {
    INICIO: {
        desenha() {
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha();
            getReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {

        }
    }
};

Telas.JOGO = {
    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        flappyBird.desenha();
    },
    atualiza() {
        flappyBird.atualiza();
    }
};

function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if(telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();