/**
 * @brief UOL Chat - Lucas Pagotto C. Oliveira - 25/10/22
 *        Driven Turma 9 - Fourth week of the full-stack course
 */


//INTERFACE FUNCTIONS

//Ensures that only one contact option is selected
let contacts = Array.from(document.querySelectorAll('.contacts h3') )
contacts.forEach(item => {
    item.addEventListener('click', function(event) {
        for(c in contacts){
            contacts[c].classList.add('hide')
        }
        event.target.classList.toggle('hide')
    })    
})
//Ensure that only one privacy setup is selected
let privacy = Array.from(document.querySelectorAll('.visibility h3'))
privacy.forEach(item => {
    item.addEventListener('click', function(event) {
        for(p in privacy){
            privacy[p].classList.add('hide')
        }
        event.target.classList.toggle('hide')
    })    
})

//Global variable representing user an it attributes
const user = {}

//Set User's name
function setUser(){
    //get value of input
    let inputValue = document.querySelector('.login input').value
    //set user's name based on input value
    user.name = inputValue
    let loginScreen = document.querySelector('.login')
    loginScreen.classList.add('hidden')
    joinChat()
}

//Open menu sidebar
function openMenu(){
    let menu = document.querySelector('.menu')
    menu.classList.toggle('hidden')
}

//API FUNCTIONS

//Join chat with user's name
function joinChat(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',user)
    .then(res => {
        console.log(res)
        console.log(`${user.name} entrou no chat`)
        renderChat()
    })
    
}
// joinChat()
function sameMessage(lastMessage, currentMessage) {
    if(lastMessage.from == currentMessage.from &&
        lastMessage.to   == currentMessage.to   &&
        lastMessage.text == currentMessage.text &&
        lastMessage.type == currentMessage.type &&
        lastMessage.time == currentMessage.time) {
            return true;
        }
    return false;
}
//Render single message
function renderMessage(msg){
    if(msg.type == 'message'){
        document.querySelector('main').innerHTML += `
            <div class="msg">
                <p>
                    <span class="msgDate">
                        (${msg.time})
                    </span>
                    <span class="user">
                        <strong>${msg.from}</strong> para <strong>${msg.to}</strong>:
                    </span>
                    <span class="action">
                        ${(msg.text)}
                    </span>
        </p>
    </div>
    `
    }
    else if(msg.type == 'status'){
            document.querySelector('main').innerHTML += `
                <div class="msg">
                    <p>
                        <span class="msgDate">
                            (${msg.time})
                        </span>
                        <span class="user">
                            <strong>${msg.from}</strong>
                        </span>
                        <span class="action">
                            ${msg.text}
                        </span>
                    </p>
                </div>
            `
        }
        else if(msg.type == 'private_message'){
                document.querySelector('main').innerHTML += `
                    <div class="msg reserved">
                        <p>
                            <span class="msgDate">
                                (${msg.time}) 
                    </span>
                    <span class="user">
                        <strong>${msg.from}</strong> reservadamente para <strong>${msg.to}</strong>: 
                    </span>
                    <span class="action">
                        ${msg.text}
                    </span>
                </p>
            </div>
        `
    }
}

//Render entire chat after login
function renderChat(){
    console.log('renderizou chat')
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(res => {
        res.data.forEach(msg => {
            renderMessage(msg)
        })
    })
    .catch(err => {
        console.log(err)
    })
    //setInterval(renderLastMessage, 1000)
    renderLastMessage()
}
//Render last message
function renderLastMessage(){
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(res => {
        console.log(res.data)
        let lastMsgAPI = res.data[res.data.length - 1]
        let lastMsgHTML = document.querySelector('main:last-child')
        if(lastMsgHTML == null || !sameMessage(lastMsgAPI, lastMsgHTML)){
            console.log('nao é a mesma mensagem')
            renderMessage(lastMsgAPI)
        }
    })
}

function sendMessage(){
    let messageToSend = document.querySelector('textarea').value
    message.text = messageToSend
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',message)
    .then(res => {
        //console.log(res)
    })
    messageToSend = ''
}

let message = {
    from: user.name,
    to: "Todos",
    text: "Eu vou ser rei dos pitadas poha",
    type: "message" 
}






