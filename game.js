let game = {
    //Função para receber apenas números no input:
    onlyNumbers: function (event) {
        return ((event.charCode >= 48 && event.charCode <= 57))
    },

    //Função para impedir que valores menores do que 1 e maiores do que 300 sejam aceitos:
    maxValue: function () {
        let inputField = document.querySelector('.inputField');
        inputValue = parseInt(inputField.value);
        if (inputValue > 300) {
            inputValue = 300;
        } else if (inputValue < 1) {
            inputValue = 1;
        } else {
            inputValue = parseInt(inputField.value);
        };
    },
};