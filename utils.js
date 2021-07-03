// Create Element

const createElement = (tag, className, innerTxt) => {
    if(!tag){
        alert('Внутренняя ошибка сервиса!');
        return;
    };
    
    const element = document.createElement(tag);

    if(className){
        element.className = className;
    };

    if(innerTxt){
        element.innerText = innerTxt;
    };
    
    return element;
};

// Create Date
const formatDate = (timestemp) => {
    const date = new Date(timestemp);
    const formatedDate = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    return formatedDate;
};


export {formatDate, createElement};