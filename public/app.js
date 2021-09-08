const socket = io();
const msgText = document.querySelector('#msg')
const btnSend = document.querySelector('#btn-send')
const chatBox = document.querySelector('.chat-content')
const displayMsg = document.querySelector('.message')

let names;
do{
    names = prompt('Silahkan masukkan nama anda')
}while(!names)

document.querySelector('#your-name').textContent = names
msgText.focus()

btnSend.addEventListener('click', (e)=>{
    e.preventDefault()
    sendMsg(msgText.value)
    msgText.value = ''
    msgText.focus()
})

const sendMsg = message =>{
    let msg ={
        user: names,
        message: message.trim()
    }

    display(msg, 'you-message')

    socket.emit('sendMessage', msg)
}

socket.on('sendToAll', msg=>{
    display(msg, 'other-message')
})

const display = (msg, type) =>{
    const msgDiv = document.createElement('div')
    let className = type
    msgDiv.classList.add(className, 'message-row')
    let time= new Date().toLocaleTimeString()

    let innterText = `
    <div class="message-title">
        👻<span>${msg.user}</span>
    </div>
    <div class="message-text">
        ${msg.message}
    </div>
    <div class="message-time">
        ${time}
    </div>
    `;
    msgDiv.innerHTML = innterText;
    displayMsg.appendChild(msgDiv)
}