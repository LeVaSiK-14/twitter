import { formatDate, createElement } from "./utils.js";


const messages = JSON.parse(localStorage.getItem('messages')) || [];

const sendBtn = document.querySelector("#sendBtn");
const posts = document.querySelector(".posts");

const authorM = document.getElementById("create-msg-author");
const messageM = document.querySelector("#create-msg-text");

const authorError = document.querySelector(".authorError");
const textError = document.querySelector(".textError");
const selectError = document.querySelector(".selectError");

const closeAut = document.querySelector(".closeAut");
const closeText = document.querySelector(".closeText");

const modalAuthor = document.querySelector(".modal-author");
const modalText = document.querySelector(".modal-texts");


function toggleModalText () {
    modalText.classList.toggle("show-modal");
};

function toggleModalAuthor () {
    modalAuthor.classList.toggle("show-modal");
};

function windowOnClickAuthor(event) {
    if(event.target === modalAuthor){
        toggleModalAuthor();
    };
};

function windowOnClickText(event) {
    if(event.target === modalText){
        toggleModalText();
    };
};


const renderMessages = () => {
    clearPost(posts);
    for (let i = 0; i < messages.length; i++) {
        const element = messages[i];
        
        let message;
        if(element.bgColor === 'black'){
            message = createElement('li', 'msgsB');
        }else{
            message = createElement('li', 'msgsW');
        };
        
        const author = createElement('div', 'author', element.author);
        const text = createElement('div', 'text', element.message);
        const date = createElement('div', 'date', formatDate(element.createdAt));

        
        message.append(author, date, text);
        posts.prepend(message);
    };
    
};


const clearInputs = () => {
    authorM.value = '';
    messageM.value = '';
};


const clearPost = (posts) => {
    posts.innerHTML = '';
};
renderMessages();

sendBtn.addEventListener("click", function(){
    const messageFin = {};
    let authorBool = false;
    let textBool = false;
    let selectBool = false;

    if(authorM.value.length > 3){
        messageFin.author = authorM.value;
        authorM.style.border = '1px solid black';
        authorBool = true;
        authorError.innerHTML = '';
    }else{
        authorM.style.border = '1px solid red';
        authorBool = false;
        authorError.innerHTML = 'Введите имя автора!';
        toggleModalAuthor();
        return;
    };

    if(messageM.value.length > 3){
        messageFin.message = messageM.value;
        messageM.style.border = '1px solid black';
        textBool = true;
        textError.innerHTML = '';
    }else{
        messageM.style.border = '1px solid red';
        textBool = false;
        textError.innerHTML = 'Введите сообщение!';
        toggleModalText();
        return;
    };

    const select = document.querySelector('.select').value;
    if (select === ''){
        selectBool = false;
        selectError.innerHTML = 'Выберете тему!';
        return;
    }else{
        messageFin.bgColor = select;
        selectBool = true;
        selectError.innerHTML = '';
    };
    
    messageFin.createdAt = Date.now();
    if(authorBool && textBool && selectBool){
        messages.push(messageFin);
        localStorage.setItem('messages', JSON.stringify(messages));

        clearInputs();
        renderMessages();
    };

});

window.addEventListener("click", windowOnClickAuthor);
window.addEventListener("click", windowOnClickText);

closeAut.addEventListener("click", toggleModalAuthor);
closeText.addEventListener("click", toggleModalText);