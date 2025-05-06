const cardTemplate = document.querySelector('#card-template').content;
const cardContainer = document.querySelector('.places__list');
const addButton = document.querySelector('.profile__add-button');

// индекс, с которого начинается добавление новых карточек
let currentIndex = 6;

// функция удаления карточки
const deleteCard = cardElement => {
    cardElement.remove();
}

// функция создания карточек
function createCard(cardData) { 
    const cardFragment = cardTemplate.cloneNode(true);
    const cardElement = cardFragment.querySelector('.card');

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardData.link

    cardImage.alt = cardData.name

    const cardName = cardElement.querySelector('.card__title');
    cardName.textContent = cardData.name

    const deleteButton = cardElement.querySelector('.card__delete-button');

    // кнопка удаления карточки
    deleteButton.addEventListener('click', () => {
        deleteCard(cardElement) 
    });

    return cardElement;
}

// добавление карточек
addButton.addEventListener('click', function addButtonAction() {
    
    if (currentIndex < initialCards.length) {
        const newCard = createCard(initialCards[currentIndex])
        cardContainer.appendChild(newCard);
        currentIndex++;
        if (currentIndex === initialCards.length) {
            addButton.disabled = true;
        }
    }
});

// вывод первых 6 карточек
initialCards.slice(0, 6).forEach (cardData => {
    const defaultCards = createCard(cardData);
    cardContainer.appendChild(defaultCards);
})