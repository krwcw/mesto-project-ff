function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    popupElement.addEventListener('mousedown', handleOverlayClick);
};
  
  function closePopup(popupElement) {
    popupElement.classList.remove('popup_is-opened');
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

export { openPopup, closePopup, handleEscClose, handleOverlayClick };