'use strict';
// get data from localStorage change format from STR to OBJ
const dB = JSON.parse(localStorage.getItem('awito')) || [];

///// Dom var
const $modalAdd = document.querySelector('.modal__add');
const $addAdd =document.querySelector('.add__ad');
const $modalBtnSubmit = document.querySelector('.modal__btn-submit');
const modalSubmit = document.querySelector('.modal__submit');
const catalog = document.querySelector('.catalog');
const modalIitem =document.querySelector('.modal__item');
const modalBtnWarning =document.querySelector('.modal__btn-warning');
const modalFileInput = document.querySelector('.modal__file-input');
const modalFileBtn = document.querySelector('.modal__file-btn');
const modalImageAdd = document.querySelector('.modal__image-add');
///// modalItem elem
const modalHeaderItem =document.querySelector('.modal__header-item');
const modalStatusItem =document.querySelector('.modal__status-item');
const modalDescriptionItem = document.querySelector('.modal__description-item')
const modalCostItem = document.querySelector('.modal__cost-item');
const modalImageItem = document.querySelector('.modal__image-item')

///// temp var
const textFileBtn = modalFileBtn.textContent;
const srcModalImg = modalImageAdd.src;
const infoPhoto = {};

// save data to localStorage
const saveDb = () => localStorage.setItem('awito',JSON.stringify(dB));

const elementModalSubmit = [...modalSubmit.elements]
                            .filter(elem => elem.tagName !=='BUTTON' 
                            && elem.tagName !=='submit');// fiter form element (witout buttons)


// validation form func
const checkForm = function() {
    const validForm = elementModalSubmit.every(elem => elem.value); // every return // if any of fills is empty ,we get false
    $modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';// the inscription disappears
};

// close modal window
const closeModal = function(event) {
    const target = event.target;
    console.log(target);
    if(target.closest('.modal__close') // push modal close
        || target.classList.contains('modal') 
        || event.code === 'Escape') {
        console.log( modalIitem.classList.add('hide'));
        console.log( $modalAdd.classList.add('hide'));    
        document.removeEventListener('keydown', closeModal);
        modalSubmit.reset();
        checkForm();
        modalFileBtn.textContent= textFileBtn;
        modalImageAdd.src = srcModalImg;    
    }    
};

//
const renderCard = () => {
    catalog.textContent='';
    dB.forEach((element, index) => {
        catalog.insertAdjacentHTML('beforeend', `
                <li class="card" data-id="${index}">
                    <img class="card__image" src="data:image/jpeg;base64,${element.image}" alt="test">
                    <div class="card__description">
                        <h3 class="card__header">${element.nameItem}</h3>
                        <div class="card__price">${element.costItem} ₽</div>
                    </div>
                </li>
        `)
        
    });

};


// open Add announcement window
$addAdd.addEventListener('click', () => {
    $modalAdd.classList.remove('hide');
    $modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModal);
});

// open catalog window
catalog.addEventListener('click', event => {
    const target = event.target;

    if(target.closest('.card')){
        modalIitem.classList.remove('hide');
        document.addEventListener('keydown', closeModal);

        // render modalItem
        const index =target.closest('.card').getAttribute('data-id');  
        modalHeaderItem.innerText= dB[index].nameItem;        
        modalStatusItem.innerText = dB[index].status === 'old' ? 'Б/У' : 'новый';
        modalDescriptionItem.innerText = dB[index].descriptionItem;
        modalCostItem.innerText = dB[index].costItem;
        modalImageItem.src= `data:image/jpeg;base64,${dB[index].image}`
    } 
});

// close modal window
$modalAdd.addEventListener('click', closeModal);
modalIitem.addEventListener('click',closeModal);

// validation of 'Add announcement form' elements
modalSubmit.addEventListener('input',checkForm);

// event submit of 'Add announcement form' 
modalSubmit.addEventListener('submit', event => {
    event.preventDefault(); // turn off default browser behavior
   
    const obj = {};// temp object for my dataBase
    for (const elem of elementModalSubmit){
        obj[elem.name] = elem.value;
    }

    obj.image = infoPhoto.base64;
    dB.push(obj);//add eleement to dataBase
    closeModal({target: $modalAdd}); // ?
    console.log({target: $modalAdd});
    saveDb();  
    renderCard();  

});

// Add photo to announcement
modalFileInput.addEventListener('change', event =>{
    const target = event.target; 

    const reader = new FileReader();
    const file = target.files[0]; // get file

    infoPhoto.filename = file.name;
    infoPhoto.size = file.size;

    reader.readAsBinaryString(file); // read from file 
    reader.addEventListener('load', event => {
        //modalFileBtn.textContent = infoPhoto.filename;
        //modalFileBtn.insertAdjacentText('afterbegin',infoPhoto.filename);
        if(infoPhoto.size < 200000){
            modalFileBtn.innerText = infoPhoto.filename;
            infoPhoto.base64 = btoa(event.target.result);
            modalImageAdd.src= `data:image/jpeg;base64,${infoPhoto.base64}`;
        }
         else
         {
            modalFileBtn.textContent= 'Большой файл!'
            modalFileInput.value='';
        }

    });

});


// rebder Catalog 
renderCard();