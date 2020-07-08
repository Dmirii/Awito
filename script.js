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


addAdd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;

});

modalAdd.addEventListener('click', event => {
    const target = event.target;
    
    
    if (target.classList.contains('modal__close') ||
        target === modalAdd){
        modalAdd.classList.add('hide');
        modalSubmit.reset();
    }
});

catalog.addEventListener('click', event => {
    const target = event.target;
    if(target.closest('.card')){
        modalIitem.classList.remove('hide');
    }   
});

modalIitem.addEventListener('click', event => {
    const target = event.target;   
    
    if (target.classList.contains('modal__close') ||
        target === modalIitem){
        modalIitem.classList.add('hide');
     
    }
});


body.addEventListener('keydown', event => {
   if (event.keyCode === 27 ){
         modalIitem.classList.add('hide');
         modalAdd.classList.add('hide');
   }
});

modalSubmit.addEventListener('input', () => {
    const validForm = elementModalSubmit.every(elem => elem.value);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';

});

modalSubmit.addEventListener('submit', event => {
    event.preventDefault();
   
    const obj = {};
    for (const elem of elementModalSubmit){
        obj[elem.name] = elem.value;
    }
    dB.push(obj);
    modalSubmit.reset();
    modalAdd.classList.add('hide');

});