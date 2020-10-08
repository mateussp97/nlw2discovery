/*
    Seleciona a tag do botão através de seu id
    Usa o método addEventListener que recebe um evento, no caso 'click' e uma ação caso o evento ocorra que nesse caso é a função cloneField
    Em outras palavras: procurar o botão e aplicar a ação que irá ocorrer quando clicar no botão
*/
document.querySelector("#add-time").addEventListener('click', cloneField)

//Criação da ação/função
function cloneField(){

    /*
        Cria uma constante newFieldContainer
        Atribui a seleção da tag que deseja duplicar dando seu nome de classe
        Uso o método cloneNode no modo true para que aconteça a duplicação
        Em outras palavras: duplicar os campos
    */
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)

    /*
        Cria uma constante que recebe o input dentro do newFieldContainer
        Em outras palavras: pegar os campos
    */
    const fields = newFieldContainer.querySelectorAll('input')

    /*
        Aplica o método forEach no fields
        Cria uma função que irá retornar o valor vazio do field atual
        Em outras palavras: para cada campo, limpar
    */
    fields.forEach(function(field){
        field.value = ""
    })

    /*
        Seleciona a tag div através do seu nome de classe
        Adiciona o método appendChild que irá adicionar a duplicação abaixo da tag selecionada, nesse caso <div class="schedule-item">
        Em outras palavras: colocar na página
    */
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}