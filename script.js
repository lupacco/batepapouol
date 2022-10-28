/**
 * @brief UOL Chat - Lucas Pagotto C. Oliveira - 25/10/22
 *        Driven Turma 9 - Fourth week of the full-stack course
 */


//INTERFACE FUNCTIONS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//Global variable representing user an it attributes
let user = {}

//Set User's name
function setUser(){
    //get value of input
    let inputValue = document.querySelector('.login input').value
    //set user's name based on input value
    user.name = inputValue
    joinChat()
}

//Open menu sidebar
function openMenu(){
    let menu = document.querySelector('.menu')
    menu.classList.toggle('hidden')
    renderMenu()
}
//Close menu sidebar
function closeMenu(){
    let menu = document.querySelector('.menu')
    menu.classList.toggle('hidden')
    menu.querySelector('.contacts').innerHTML = ''
}

//API FUNCTIONS @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//Render menu options
function renderMenu(){
    let contactsList = document.querySelector('.contacts')
    contactsList.innerHTML += `
        <h2>Escolha um contato<br> para enviar mensagem</h2>
        <h3>
            <ion-icon size="large" name="people"></ion-icon>
                Todos
            <ion-icon class="check" name="checkmark-outline"></ion-icon>
        </h3>
    `
    axios.get('https://mock-api.driven.com.br/api/v6/uol/participants')
    .then(res => {
        let persons = res.data
        persons.forEach(person => {
            contactsList.innerHTML += `
            <h3 class="hide">
                <ion-icon size="large" name="person-circle-outline"></ion-icon>
                    ${person.name}
                <ion-icon class="check" name="checkmark-outline"></ion-icon>
            </h3>
            `
        })
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
    })
}
//Join chat with user's name
function joinChat(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',user)
    .then(res => {
        //Close login screen if success on join the chat
        let loginScreen = document.querySelector('.login')
        loginScreen.classList.add('hidden')
        console.log(`${user.name} entrou no chat`)
        renderChat()
        setInterval(updateStatus, 5000)
    })
    .catch(err => {
        console.log(err)
        console.log('tente novamente')
    })
    
}
//Update user's status
function updateStatus(){
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status',user)
    .then(res => {
        console.log(`${user.name} ainda está online`)
    })
}
//Check if messages are equal
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
//Variable that saves the last rendered message
let lastMsgInHTML;
//Render entire chat after login
function renderChat(){
    console.log('renderizou chat')
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(res => {
        res.data.forEach(msg => {
            renderMessage(msg)
            if(msg == res.data[res.data.length-1]){
                lastMsgInHTML = msg
                let chat = document.querySelector('main')
                let lastMsgHTML = chat.querySelector('div:last-child')
                lastMsgHTML.scrollIntoView()
            }
        })
    })
    .catch(err => {
        console.log(err)
    })
    setInterval(renderLastMessage, 1000)
    // renderLastMessage()
}
//Render last message
function renderLastMessage(){
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(res => {
        let lastMsgAPI = res.data[res.data.length - 1]
        let chat = document.querySelector('main')
        //Ensure last msg from API is not the last msg rendered
        if(!sameMessage(lastMsgAPI, lastMsgInHTML)){
            //Render last message from API
            renderMessage(lastMsgAPI)
            let lastMsgHTML = chat.querySelector('div:last-child')
            //Scroll screen to last message rendered
            //lastMsgHTML.scrollIntoView()
            //Update last message in HTML
            lastMsgInHTML = lastMsgAPI
        }
    })
}


//Send message
function sendMessage(){
    //Create an message object
    let message = {
        from: user.name,
        to: "Todos",
        text: 'Mensagem padrão galeraaa',
        type: "message" 
    }
    //Get value from text area
    let messageToSend = document.querySelector('textarea').value
    //Set text of message based on value from text area
    message.text = messageToSend
    //Send message to server
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',message)
    .then(res => {
        console.log(res)
    })
    //Clena text area
    document.querySelector('textarea').value = ''
}







