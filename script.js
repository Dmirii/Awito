'use strict';

const modalAdd = document.querySelector('.modal__add');
const addAdd =document.querySelector('.add__ad');
const modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const modalIitem =document.querySelector('.modal__item');

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
    if(target.closest('li')){
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

window.addEventListener('keydown', event => {
   if (event.keyCode === 27 ){
         modalIitem.classList.add('hide');
        modalAdd.classList.add('hide');
   }
});