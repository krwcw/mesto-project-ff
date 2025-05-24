function createCard(cardData, handleDeleteCard, handleLikeButton, handleOpenImage) { 
    const cardTemplate = document.querySelector('#card-template').content;
    const cardFragment = cardTemplate.cloneNode(true);
    const cardElement = cardFragment.querySelector('.card');

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link;

    cardImage.alt = cardData.name;

    const cardName = cardElement.querySelector('.card__title');
    cardName.textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));

    const likeButton = cardElement.querySelector('.card__like-button');

    likeButton.addEventListener('click', (evt) => {
        handleLikeButton(evt.target);
    });

    cardImage.addEventListener('click', () => {
        handleOpenImage(cardData.link, cardData.name);
    });

    return cardElement;
};

export { createCard };