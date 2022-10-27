/**
 * @brief UOL Chat - Lucas Pagotto C. Oliveira - 25/10/22
 *        Driven Turma 9 - Fourth week of the full-stack course
 */ 


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

function renderChat(){
    console.log('atualizou')
    axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
    .then(response => {
        console.log(response.data[99])
        //response.data.forEach(msg => {
            //     if(msg.type == 'message'){
                //         document.querySelector('main').innerHTML += `
                //             <div class="msg">
                //                 <p>
                //                     <span class="msgDate">
                //                         (${(msg.time)})
                //                     </span>
                //                     <span class="user">
                //                         <strong>${(msg.from)}</strong> para <strong>${(msg.to)}</strong>:
                //                     </span>
                //                     <span class="action">
                //                         ${(msg.text)}
                //                     </span>
        //                 </p>
        //             </div>
        //         `
        //     }
        //     else if(msg.type == 'status'){
            //         document.querySelector('main').innerHTML += `
            //             <div class="msg">
            //                 <p>
            //                     <span class="msgDate">
            //                         (${(msg.time)})
            //                     </span>
            //                     <span class="user">
            //                         <strong>${(msg.from)}</strong>
            //                     </span>
            //                     <span class="action">
            //                         ${(msg.text)}
            //                     </span>
            //                 </p>
            //             </div>
            //         `
            //     }
            //     else if(msg.type == 'private_message'){
                //         document.querySelector('main').innerHTML += `
                //             <div class="msg reserved">
                //                 <p>
                //                     <span class="msgDate">
                //                         (${(msg.time)}) 
        //                     </span>
        //                     <span class="user">
        //                         <strong>${(msg.from)}</strong> reservadamente para <strong>${(msg.to)}</strong>: 
        //                     </span>
        //                     <span class="action">
        //                         ${(msg.text)}
        //                     </span>
        //                 </p>
        //             </div>
        //         `
        //     }
        //             //msg.scrollIntoView()     
        // })
        //console.log(lastMessage)
    })
    .catch(err => {
        //console.log(err)
    })
}
//setInterval(renderChat(),1000)

function sendMessage(){
    let messageToSend = document.querySelector('textarea').value
    message.text = messageToSend
    axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',message)
    .then(res => {
        //console.log(res)
    })
    messageToSend = ''
}

const user = {}
let message = {
    from: user.name,
    to: "Todos",
    text: "Eu vou ser rei dos pitadas poha",
    type: "message" 
}
function joinChat(){
    user.name = prompt('Qual é o seu usuário?')
    axios.post('https://mock-api.driven.com.br/api/v6/uol/participants',user)
    .then(() => {
        renderChat()
    })
    
}
// joinChat()


function setMenu(){
    let menu = document.querySelector('.menu')
    menu.classList.toggle('hidden')
}


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

