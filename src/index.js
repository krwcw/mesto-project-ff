import './index.css'
import { initialCards } from './scripts/cards';
import { openPopup, closePopup, handleEscClose, handleOverlayClick } from './scripts/popup';
import { editForm, nameForm, descriptionForm, editFormSubmit } from './scripts/editFormSubmit';
import { createCard } from './scripts/createcard';



const cardContainer = document.querySelector('.places__list');

const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

const closeButtons = document.querySelectorAll('.popup__close');

const newCardPopup = document.querySelector('.popup_type_new-card');
const editPopup = document.querySelector('.popup_type_edit');


const placeForm = document.forms['new-place'];
const namePlace = placeForm.elements['place-name'];
const linkPlace = placeForm.elements.link;




const handleDeleteCard = cardElement => {
    cardElement.remove();
}

const handleLikeButton = likeButton => {
    likeButton.classList.toggle('card__like-button_is-active');
}

const handleOpenImage = (imageUrl, imageAlt) => {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    
    popupImage.src = imageUrl;
    popupImage.alt = imageAlt;
    popupCaption.textContent = imageAlt;
    
    // Открываем попап
    openPopup(imagePopup);
};

placeForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const newCardData = {
        name: namePlace.value,
        link: linkPlace.value
    };
    const newCard = createCard(newCardData, handleDeleteCard, handleLikeButton, handleOpenImage);
    cardContainer.prepend(newCard);
    closePopup(newCardPopup);
})


addButton.addEventListener('click', () => {
    placeForm.reset();
    openPopup(newCardPopup);
})

editButton.addEventListener('click', () => {
    editForm.reset();
    openPopup(editPopup);
})

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        if (popup) {
            closePopup(popup);
        }
    })
})

initialCards.forEach (cardData => {
    const defaultCards = createCard(cardData, handleDeleteCard, handleLikeButton, handleOpenImage);
    cardContainer.appendChild(defaultCards);
})

editForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    editFormSubmit();
    closePopup(editPopup);
});
