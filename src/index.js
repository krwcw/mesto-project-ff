import './index.css'
import { initialCards } from './scripts/cards';
import { openPopup, closePopup } from './scripts/modal.js';
import { createCard, handleDeleteCard, handleLikeButton } from './scripts/card';


const cardContainer = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const closeButtons = document.querySelectorAll('.popup__close');

const newCardPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');

const placeForm = document.forms['new-place'];
const inputNamePlaceForm = placeForm.elements['place-name'];
const inputLinkPlaceForm = placeForm.elements.link;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const editForm = document.forms['edit-profile'];
const nameInput = editForm.elements.name;
const descriptionInput = editForm.elements.description;

const popupFullImage = document.querySelector('.popup_type_image');
const photoPopupFullImage = popupFullImage.querySelector('.popup__image');
const captionPopupFullImage = popupFullImage.querySelector('.popup__caption');


function openPopupProfile () {
        nameInput.value = profileTitle.textContent;
        descriptionInput.value = profileDescription.textContent;
        openPopup(editPopup);
}


// обработчик формы добавления карточки
function placeFromSubmit(nameValue, linkValue) {

    const newCardData = {
        name: nameValue,
        link: linkValue
    };
    
    return newCardData
}


// обработчик формы редактирования профиля
function editFormSubmit() {

    const newName = nameInput.value;
    const newDescription = descriptionInput.value;


    profileTitle.textContent = newName;
    profileDescription.textContent = newDescription;
}


// обработчик открытия изображения
const handleOpenImage = (imageUrl, imageAlt) => {

    photoPopupFullImage.src = imageUrl;
    photoPopupFullImage.alt = imageAlt;
    captionPopupFullImage.textContent = imageAlt;
    
    openPopup(popupFullImage);
};

// слушатель подтверждения формы добавления карточек
placeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCardData = placeFromSubmit(inputNamePlaceForm.value, inputLinkPlaceForm.value);
    const newCard = createCard(newCardData, handleDeleteCard, handleLikeButton, handleOpenImage);
    
    cardContainer.prepend(newCard);
    closePopup(newCardPopup);
    placeForm.reset();
})

// слушатель подтверждения формы редактирования профиля
editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    editFormSubmit();
    closePopup(editPopup);
    editForm.reset();
});

// слушатель кнопки открытия попапа добавления карточек
addButton.addEventListener('click', () => {
    openPopup(newCardPopup);
})

// слушатель кнопки открытия попапа редактирования профиля
editButton.addEventListener('click', () => {
    openPopupProfile()
});

// слушатель кнопок закрытия попапов
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        if (popup) {
            closePopup(popup);
        }
    })
})

// инициализация карточек сохраненных в массиве
initialCards.forEach (cardData => {
    const defaultCards = createCard(cardData, handleDeleteCard, handleLikeButton, handleOpenImage);
    cardContainer.appendChild(defaultCards);
})
