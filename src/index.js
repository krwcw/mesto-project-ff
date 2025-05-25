import './index.css'
import { initialCards } from './scripts/cards';
import { openPopup, closePopup } from './scripts/modal.js';
import { editForm, editFormSubmit } from './scripts/modal.js';
import { createCard, handleDeleteCard, handleLikeButton } from './scripts/card';
import { placeFromSubmit } from './scripts/modal.js';


const cardContainer = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const closeButtons = document.querySelectorAll('.popup__close');

const newCardPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');

const placeForm = document.forms['new-place'];
const namePlace = placeForm.elements['place-name'];
const linkPlace = placeForm.elements.link;


// обработчик открытия изображения
const handleOpenImage = (imageUrl, imageAlt) => {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    
    popupImage.src = imageUrl;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
    
    openPopup(imagePopup);
};

// слушатель подтверждения формы добавления карточек
placeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCardData = placeFromSubmit(namePlace.value, linkPlace.value);
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
    openPopup(editPopup);
})

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
