/**
 * QUAL É O NÚMERO?
 * 
 * Para o desenvolvimento desta aplicação, foram utilizadas as seguintes tecnologias: HTML, CSS & Javascript;
 * 
 * Seguindo o Model-View-Controller (MVC) e visando melhor organização de arquivos, a lógica que envolve a 
 * aceitação de apenas números no input do usuário e limita os valores aceitos dentro do intervalo de 1 a 300, 
 * foi inserida em um arquivo .js separado das demais funções;
 * 
 * Para acessar a aplicação, o usuário deverá ter baixado em sua máquina local os arquivos .html, .css e .js, além
 * de uma pasta chamada "assets", e deixá-los dentro de uma mesma pasta. Esses arquivos estão disponíveis no link do
 * google drive fornecido em formato .zip no processo de submissão deste projeto.
 * 
 * Essa aplicação também está disponível em funcionamento no seguinte endereço: 
 * 
 * ---------------------------------------------------------------------------------------------------------
 * 
 * LÓGICA
 * 
 * * A lógica de programação utilizada para a criação desta aplicação consiste 
 * em receber um valor do usuário por meio de um input e compará-lo com um
 * valor entre 1 e 300 gerado por uma API.
 * 
 * RECEBENDO DADOS DO INPUT DO USUÁRIO
 * 
 * Para receber um valor do usuário, foi utilizado um campo de input do tipo tel,
 * que permite limitar o número de caracteres a serem fornecidos pelo usuário
 * em apenas três (por meio do parâmetro maxlength()), além de apresentar uma interface
 * de teclado numérico mais agradável aos usuários que acessam a aplicação através de
 * dispositivos móveis.
 * 
 * Além disso, a função maxValue() impede que valores maiores do que 300 e menores do que 1
 * sejam apresentados no display de led. Em vez disso, valores maiores do que 300 são tidos como 
 * iguais a 300 e valores menores do que 1 são tidos como iguais a 1. Apenas valores numéricos são
 * aceitos no campo de input, o que é possível pela execução da função onlyNumbers().
 * 
 * RECEBENDO DADOS DA API
 * 
 * Para receber o valor fornecido pela API, foi utilizada requisição http por meio do método fetch.
 * Essa requisição é iniciada ao ser carregado o HTML inicial da página, no evento "DOMContentLoaded".
 * Esse tipo de requisição retorna um objeto resposta, que é então convertido para json 
 * por meio do método .json(). O status da requisição é obtido do objeto resposta por meio 
 * do método response.status; isso permite tratar o tipo de resposta que será apresentada
 * ao usuário.
 * 
 * Caso a aplicação retorne alguma falha (algum status diferente de 200), uma mensagem de erro é apresentada
 * ao usuário em cor vermelha e o código do status da falha é exibido no painel de led de sete segmentos.
 * Quando isto ocorrer, também será exibida uma mensagem com o erro vigente no console do navegador, tratada
 * por meio do método catch, e serão apresentados ao usuário:
 * 
 *    - Botão com os dizeres "Nova partida", que permite ser feita uma nova requisição fetch para que o 
 * jogo seja reiniciado;
 *    - Botão de enviar palpite com cor cinza e função de clique desabilitada, impedindo
 * que novas jogadas sejam feitas sem que antes a partida seja reiniciada.
 * 
 * Caso a requisição fetch seja bem sucedida, o que implica em um código de status da requisição
 * igual a 200, o json contendo o valor numérico criado pela api torna-se acessível por meio do 
 * propriedade "value" do json obtido na resposta da requisição.
 * 
 * 
 * O valor criado pela API é salvo no localStorage do navegador por meio do método localStorage.setItem.
 *    - Isso permite que o valor criado pela API seja acessado fora da promise do fetch por meio
 * do método localStorage.getItem;
 *    - Assim, após o clique no botão enviar, os dois valores em questão são comparados por meio da 
 * função compareValues():
 *          
 *          - Caso o valor inserido pelo usuário seja maior do que o valor a ser adivinhado,
 *       uma mensagem com os dizeres "É menor" é apresentada;
 *          - Caso o valor inserido pelo usuário seja menor do que o valor a ser adivinhado, 
 *       uma mensagem com os dizeres "É maior" é apresentada;
 *          - Caso o usuário acerte o valor, uma mensagem com os dizeres "Você acertou!!!!" é apresentada. Nesta situação,
 *       os números formados pelo display de led de sete segmentos são apresentados na cor verde, assim como a mensagem
 *       informativa exibida acima do display. O botão para enviar novas tentativas de acerto é desabilitado e assume a cor
 *       de apresentação cinza. Além disso, o botão para iniciar uma nova partida é apresentado na tela.
 *          - A cada tentativa sem sucesso do usuário acertar o valor, o campo input é limpo
 *       por meio da função clearField().
 * 
 * Após o valor ser acertado pelo usuário, o botão de "Nova Partida" torna-se disponível.
 * Ao clicá-lo, uma nova requisição fetch é feita para a API e um novo valor aleatório é salvo
 * no localStorage, permitindo que o jogo seja reiniciado. A função que é executada no evento de 
 * clique do botão de reiniciar a partida é chamada restartGame().
 * 
 * DISPLAY DE LED COM SETE SEGMENTOS
 *    
 * Para a criação de cada um dos dígitos do led de sete segmentos, foram utilizadas duas divs:
 * uma superior e outra inferior, contidas dentro de uma div box, que por sua vez possui um
 * display flex e a propriedade flex-direction configurada como column. 
 * 
 * A alternância entre as cores das bordas de cada uma dessas divs é responsável pela representação
 * de cada um dos números dentro do intervalo de 0 e 9. Para cada número neste intervalo, uma classe
 * CSS foi criada, manipulando as cores de borda das divs que devem representar os números. Para a representação
 * dos números, bordas com a cor preta são atribuídas à div pai (que tem por default bordas transparentes) à 
 * medida que cada número deve ser formado, o que ocorre por meio da execução da função addDigit().
 * 
 * Como o jogo permite valores entre 1 e 300, até três dígitos podem ser apresentados na tela.
 * Com isso, a função addDigit() recebe como argumentos o índex relativo a qual dos três dígitos
 * receberá a estilização do CSS e o número que deverá ser apresentado em cada um desses index.
 * A partir do número recebido, as cores de borda são atribuídas à div pai, mostrando o número esperado.
 * 
 * A função showDigits() tem como proposta receber o número do usuário e executar a função addDigit() de
 * acordo com o numero de dígitos que o número recebido tiver. Quando o número a ser mostrado no display tiver
 * mais do que um dígito, o método split() é utilizado para salvar cada parte do número no seu local correto e
 * apresentá-lo aos usuários. A div que contém o dígito das centenas é acessada pelo índex 0, a div das dezenas
 * é acessada pelo index 1 e a div das unidades pelo index 2. Tais valores foram capturados pela função querySelectorAll, 
 * que selecionou as três divs que podem receber estilização de suas bordas, dentro de uma lista. 
 * 
 * Caso o número recebido seja menor do que 10, apenas o dígito das unidades é mostrado (os demais recebem um display none).
 * Caso o número tenha duas unidades, dois dígitos são apresentados.
 * Caso o número tenha três unidades, os três dígitos são apresentados ao usuário.
 */

//Selecionando elementos CSS e colocando-os dentro de variáveis:
let topPart = document.querySelectorAll('.topPart')
let bottomPart = document.querySelectorAll('.bottomPart');
let inputField = document.querySelector('.inputField');
let btnSend = document.getElementById('btnSend');
let btnRestart = document.getElementById('btnRestart');
let statusMessage = document.getElementById('statusMessage');

//Variáveis globais:
let inputValue = '';
let randomNumber = localStorage.getItem('randomNumber');

//Iniciando a aplicação quando o HTML inicial estiver carregado:
document.addEventListener('DOMContentLoaded', () => {
    receive();
});

//Formando números com led de sete segmentos:
function addDigit(number, n) {
    topPart[n].classList.remove("zeroTop", "oneTop", "twoTop", "threeTop", "fourTop", "fiveTop", "sixTop", "sevenTop", "eightTop", "nineTop");
    bottomPart[n].classList.remove("zeroBottom", "oneBottom", "twoBottom", "threeBottom", "fourBottom", "fiveBottom", "sixBottom", "sevenBottom", "eightBottom", "nineBottom");

    if (number === 0) {
        topPart[n].classList.add("zeroTop");
        bottomPart[n].classList.add("zeroBottom");
    } else if (number === 1) {
        topPart[n].classList.add("oneTop");
        bottomPart[n].classList.add("oneBottom");
    } else if (number === 2) {
        topPart[n].classList.add("twoTop");
        bottomPart[n].classList.add("twoBottom");
    } else if (number === 3) {
        topPart[n].classList.add("threeTop");
        bottomPart[n].classList.add("threeBottom");
    } else if (number === 4) {
        topPart[n].classList.add("fourTop");
        bottomPart[n].classList.add("fourBottom");
    } else if (number === 5) {
        topPart[n].classList.add("fiveTop");
        bottomPart[n].classList.add("fiveBottom");
    } else if (number === 6) {
        topPart[n].classList.add("sixTop");
        bottomPart[n].classList.add("sixBottom");
    } else if (number === 7) {
        topPart[n].classList.add("sevenTop");
        bottomPart[n].classList.add("sevenBottom");
    } else if (number === 8) {
        topPart[n].classList.add("eightTop");
        bottomPart[n].classList.add("eightBottom");
    } else if (number === 9) {
        topPart[n].classList.add("nineTop");
        bottomPart[n].classList.add("nineBottom");
    }
};

//Formando números em cada um dos três campos disponíveis:
function showDigits(number) {
    treatedNumber = number.toString().split('');
    firstDigit = parseInt(treatedNumber[0]);
    secondDigit = parseInt(treatedNumber[1]);
    thirdDigit = parseInt(treatedNumber[2]);
    if (number < 10) {
        addDigit(firstDigit, 2);
        topPart[0].classList.add("displayNone");
        bottomPart[0].classList.add("displayNone");
        topPart[1].classList.add("displayNone");
        bottomPart[1].classList.add("displayNone");
    } else if (number >= 10 & number < 100) {
        addDigit(firstDigit, 1);
        addDigit(secondDigit, 2);
        topPart[0].classList.add("displayNone");
        bottomPart[0].classList.add("displayNone");
        topPart[1].classList.remove("displayNone");
        bottomPart[1].classList.remove("displayNone");
    } else if (number >= 100) {
        addDigit(firstDigit, 0);
        addDigit(secondDigit, 1);
        addDigit(thirdDigit, 2);
        topPart[0].classList.remove("displayNone");
        bottomPart[0].classList.remove("displayNone");
        topPart[1].classList.remove("displayNone");
        bottomPart[1].classList.remove("displayNone");
    };
};

//Comparando dados da API com input do usuário:
btnSend.addEventListener('click', compareValues);

function compareValues() {
    game.maxValue();
    showDigits(inputValue);

    if (inputValue > randomNumber) {
        statusMessage.style.setProperty('display', 'flex');
        statusMessage.innerHTML = `<h3>É menor</h3>`
    } else if (inputValue < randomNumber) {
        statusMessage.style.setProperty('display', 'flex');
        statusMessage.innerHTML = `<h3>É maior</h3>`
    } else if (inputValue == randomNumber) {
        statusMessage.style.setProperty('display', 'flex');
        document.body.style.setProperty('--cor-default', '#32BF00');
        statusMessage.innerHTML = `<h3 style = "color: #32BF00">Você acertou!!!!</h3>`
        btnRestart.classList.remove('displayNone');
        btnRestart.classList.add('displayFlex');
        btnSend.style.background = '#DDDDDD';
        btnSend.disabled = true;
    };
    clearField();
};

//Requisitando a API e tratando eventuais erros:
async function receive() {
    let url = 'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300';
    await fetch(url).then((res) => {
        if (res.status != 502) {
            showDigits(0);
            return res.json()
        }
        else {
            statusMessage.style.setProperty('display', 'flex');
            document.body.style.setProperty('--cor-default', '#CC3300');
            statusMessage.innerHTML = `<h3 style = "text-transform: uppercase; color: #CC3300">ERRO</h3>`
            showDigits(res.status);
            btnRestart.classList.remove('displayNone');
            btnRestart.classList.add('displayFlex');
            btnSend.style.background = '#DDDDDD';
            btnSend.disabled = true;
        }
    }).then((data) => {
        randomNumber = data.value;
        localStorage.setItem('randomNumber', randomNumber);
    }).catch(function (error) {
        console.log('Houve um erro com a operação fetch: ' + error.message);
    });
};

//Função para limpar o campo de input:
function clearField() {
    inputField.value = "";
};

//Função para reiniciar o jogo, executada ao clicar no botão "Nova partida":
function restartGame() {
    receive();
    btnSend.style.background = 'linear-gradient(180deg, #EF6C00 0%, #C0661C 100%)';
    btnSend.disabled = false;
    btnRestart.classList.add('displayNone');
    statusMessage.style.setProperty('display', 'none');
    statusMessage.innerHTML = `<h3></h3>`;
    document.body.style.setProperty('--cor-default', '#000000');
    clearField();
};