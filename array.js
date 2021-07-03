const messages = [
    {
        author: 'IY Academy', 
        message: 'Hello world! I`m IT Academy'
    },
    {
        author: 'LeVaSiK', 
        message: 'Hello world! I`m LeVaSiK'
    },
];

const sendBtn = document.querySelector("#sendBtn");
const posts = document.querySelector(".posts");
const authorM = document.getElementById("create-msg-author");
const messageM = document.querySelector("#create-msg-text");
const authorError = document.querySelector(".authorError");
const textError = document.querySelector(".textError");
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

const createElement = (tag, className, innerTxt) => {
    if(!tag){
        alert('Внутренняя ошибка сервиса!');
        return;
    }
    
    const element = document.createElement(tag);

    if(className){
        element.className = className;
    };

    if(innerTxt){
        element.innerText = innerTxt;
    }
    
    return element;
};

const renderMessages = (messages) => {
    for (let i = 0; i < messages.length; i++) {
        const element = messages[i];
        const message = createElement('li', 'msg');
        const author = createElement('div', 'author', element.author);
        const text = createElement('div', 'text', element.message);
        message.append(author, text);
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

renderMessages(messages);


sendBtn.addEventListener("click", function(){
    const message = {};
    let authorBool = false;
    let textBool = false;
    if(authorM.value.length > 4){
        message.author = authorM.value;
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
    if(messageM.value.length > 10){
        message.message = messageM.value;
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
    if(authorBool && textBool){
        messages.push(message);
        clearInputs();
        clearPost(posts);
        renderMessages(messages);
    };
});




window.addEventListener("click", windowOnClickAuthor);
window.addEventListener("click", windowOnClickText);

closeAut.addEventListener("click", toggleModalAuthor);
closeText.addEventListener("click", toggleModalText);