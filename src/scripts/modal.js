const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


const editForm = document.forms['edit-profile'];
const nameForm = editForm.elements.name;
const descriptionForm = editForm.elements.description;


function openPopup(popupElement) {

    if (popupElement.classList.contains('popup_type_edit')) {
        nameForm.value = profileTitle.textContent
        descriptionForm.value = profileDescription.textContent
    }

    popupElement.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', handleEscClose);
    popupElement.addEventListener('mousedown', handleOverlayClick);
};
  
function closePopup(popupElement) {

    popupElement.classList.remove('popup_is-animated', 'popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    popupElement.removeEventListener('mousedown', handleOverlayClick);
};

function handleEscClose(evt) {

    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closePopup(openedPopup);
      };
    };
};
  
function handleOverlayClick(evt) {
    
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
};

function placeFromSubmit(nameValue, linkValue) {

    const newCardData = {
        name: nameValue,
        link: linkValue
    };
    
    return newCardData
}


function editFormSubmit() {

    const newName = nameForm.value;
    const newDescription = descriptionForm.value;


    profileTitle.textContent = newName;
    profileDescription.textContent = newDescription;
}

export { editForm, nameForm, descriptionForm, editFormSubmit };

export { placeFromSubmit };

export { openPopup, closePopup, handleEscClose, handleOverlayClick };