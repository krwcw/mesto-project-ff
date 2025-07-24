import { deleteCard, unlikeCard, likeCard } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

// функция создания карточки
function createCard(
  cardData,
  handleDeleteCard,
  handleLikeButton,
  handleOpenImage,
  myUserId
) {
  const cardFragment = cardTemplate.cloneNode(true);
  const cardElement = cardFragment.querySelector(".card");
  const likeCounter = cardElement.querySelector(".card__like-counter");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardName = cardElement.querySelector(".card__title");
  cardName.textContent = cardData.name;

  // проверка карточки для отображения кнопки delete
  if (cardData.owner._id === myUserId) {
    deleteButton.addEventListener("click", () =>
      handleDeleteCard(cardElement, cardData._id)
    );
  } else {
    deleteButton.remove();
  }

  // меняем иконку лайка, если он уже поставлен мной
  const isLikedByMe = cardData.likes.some((like) => like._id === myUserId);
  if (isLikedByMe) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeCounter.textContent = cardData.likes.length;

  likeButton.addEventListener("click", () =>
    handleLikeButton(likeButton, cardData._id, likeCounter, myUserId)
  );

  cardImage.addEventListener("click", () =>
    handleOpenImage(cardData.link, cardData.name)
  );

  return cardElement;
}

// обработчик кнопки delete
const handleDeleteCard = (cardElement, cardId) => {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error("Ошибка удаления карточки", err);
    });
};

// обработчик кнопки like
const handleLikeButton = (likeButton, cardId, likeCounter, myUserId) => {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  const apiCall = isLiked ? unlikeCard(cardId) : likeCard(cardId);
  const currentLikes = parseInt(likeCounter.textContent);

  likeButton.classList.toggle("card__like-button_is-active");

  apiCall
    .then((likedCard) => {
      likeCounter.textContent = likedCard.likes.length;
      const isLikedCard = likedCard.likes.some((like) => like._id === myUserId);
      likeButton.classList.toggle("card__like-button_is-active", isLikedCard);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении лайка", err);
      likeButton.classList.toggle("card__like-button_is-active");
      likeCounter.textContent = currentLikes;
    });
};

export { createCard, handleDeleteCard, handleLikeButton };
