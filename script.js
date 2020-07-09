'use strict';

const dB = [];
const modalAdd = document.querySelector('.modal__add');
const addAdd =document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const modalIitem =document.querySelector('.modal__item');
const body =document.querySelector('body');
const modalBtnWarning =document.querySelector('.modal__btn-warning')

const elementModalSubmit = [...modalSubmit.elements].filter(elem => elem.tagName !=='BUTTON' && elem.tagName !=='submit');


// close modal window

const closeModal = function(event) {
    const target = event.target;
    if(target.closest('.modal__close') || target === this ) {
        this.classList.add('hide');
        if (this === modalAdd) {
            modalSubmit.reset();
        }
    }else if(event.code === 'Escape'){
        modalIitem.classList.add('hide');
        modalAdd.classList.add('hide');
        document.removeEventListener('keydown', closeModal);
    }
    console.log(event.code);

};

// open Add announcement window

addAdd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModal);

});

// open catalog window
catalog.addEventListener('click', event => {
    const target = event.target;

    if(target.closest('.card')){
        modalIitem.classList.remove('hide');
        document.addEventListener('keydown', closeModal);
    }   

});

// close modal window
modalAdd.addEventListener('click', closeModal);
modalIitem.addEventListener('click',closeModal);
//catalog.addEventListener('click', closeModal );



// validation of 'Add announcement form' elements
modalSubmit.addEventListener('input', () => {
    const validForm = elementModalSubmit.every(elem => elem.value); // if any of fills is empty ,we get false
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
});

// event submit of 'Add announcement form' 
modalSubmit.addEventListener('submit', event => {
    event.preventDefault(); // turn off default browser behavior
   
    const obj = {};// temp object for my dataBase
    for (const elem of elementModalSubmit){
        obj[elem.name] = elem.value;
    }
    dB.push(obj);//add eleement to dataBase
    modalSubmit.reset();
    modalAdd.classList.add('hide');

});