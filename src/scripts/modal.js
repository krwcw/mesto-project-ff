// открытие попапа
function openPopup(popupElement) {

    popupElement.classList.add('popup_is-opened', 'popup_is-animated');
    document.addEventListener('keydown', handleEscClose);
    popupElement.addEventListener('mousedown', handleOverlayClick);
};

// закрытие попапа
function closePopup(popupElement) {

    popupElement.classList.remove('popup_is-animated', 'popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    popupElement.removeEventListener('mousedown', handleOverlayClick);
};

// закрытие по клику esc
function handleEscClose(evt) {

    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closePopup(openedPopup);
      };
    };
};

// закрытие по клику по оверлею
function handleOverlayClick(evt) {
    
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    }
};

function renderLoading(button, isLoading, loadingText = 'Сохранение...', defaultText = 'Сохранить') {
  button.disabled = isLoading;
  button.textContent = isLoading ? loadingText : defaultText;
};

export { openPopup, closePopup, handleEscClose, handleOverlayClick, renderLoading };