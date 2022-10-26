/**
 * @brief UOL Chat - Lucas Pagotto C. Oliveira - 25/10/22
 *        Driven Turma 9 - Fourth week of the full-stack course
 */ 
let visibility = document.querySelector('.public')
function setMenu(){
    let menu = document.querySelector('.menu')
    menu.classList.toggle('hide')
}

function checkOption(option){
    let icon = option.querySelector('.check')
    icon.classList.toggle('hide')
}

function setVisibility(option){
    let checkIcon = option.querySelector('ion-icon')
    if(checkIcon.name == 'lock-open'){
        console.log('open')
        checkOption(option)
    } else{
        console.log('closed')
    }
}

function getThis(itme){
    console.log(itme)
}