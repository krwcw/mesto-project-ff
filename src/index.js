import "./index.css";
import { openPopup, closePopup } from "./scripts/modal.js";
import {
  createCard,
  handleDeleteCard,
  handleLikeButton,
} from "./scripts/card.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  addNewCard,
  getInitialCards,
  getUserInfo,
  updateUserAvatar,
  updateUserInfo,
} from "./scripts/api.js";

const cardContainer = document.querySelector(".places__list");

const addButton = document.querySelector(".profile__add-button");
const editButton = document.querySelector(".profile__edit-button");

const closeButtons = document.querySelectorAll(".popup__close");

const newCardPopup = document.querySelector(".popup_type_new-card");
const editPopup = document.querySelector(".popup_type_edit");
const newAvatarPopup = document.querySelector(".popup_type_new-avatar");

const placeForm = document.forms["new-place"];
const inputNamePlaceForm = placeForm.elements["place-name"];
const inputLinkPlaceForm = placeForm.elements.link;

const profileImageForm = document.forms["new-avatar"];
const inputAvatarForm = profileImageForm.elements["avatar"];

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const editForm = document.forms["edit-profile"];
const nameInput = editForm.elements.name;
const descriptionInput = editForm.elements.description;

const popupFullImage = document.querySelector(".popup_type_image");
const photoPopupFullImage = popupFullImage.querySelector(".popup__image");
const captionPopupFullImage = popupFullImage.querySelector(".popup__caption");

// базовая конфигурация для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export let myUserId = "";
export let myUserName = "";

// получаем данные о себе, меняем имя, аватарку и описание
getUserInfo()
  .then((profile) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileImage.style.backgroundImage = `url('${profile.avatar}')`;
    myUserId = profile._id;
    myUserName = profile.name;
  })
  .catch((err) => {
    console.error("Ошибка при загрузке профиля:", err);
  });

// получаем карточки от сервера, добавляем их в DOM
getInitialCards()
  .then((items) => {
    items.forEach((cardData) => {
      const defaultCards = createCard(
        cardData,
        handleDeleteCard,
        handleLikeButton,
        handleOpenImage
      );
      cardContainer.appendChild(defaultCards);
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке карточек", err);
  });

// включаем валидацию, очищаем валидацию для placeForm и profileImageForm
enableValidation(validationConfig);
clearValidation(placeForm, validationConfig);
clearValidation(profileImageForm, validationConfig);

// функция открытия попапа для редактирования профиля
function openPopupProfile() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editForm, validationConfig);
  openPopup(editPopup);
}

// обработчик формы добавления карточки
function placeFormSubmit(nameValue, linkValue) {
  const submitButton = placeForm.querySelector(".popup__button");
  const originalText = submitButton.textContent;

  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  return addNewCard(nameValue, linkValue).finally(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  });
}

// обработчик формы редактирования профиля
function editFormSubmit() {
  const submitButton = editForm.querySelector(".popup__button");
  const originalText = submitButton.textContent;

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  updateUserInfo(newName, newDescription)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(editPopup)
    })
    .catch((err) => {
      console.log("Ошибка обновления профиля", err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

// обработчик формы обновления аватарки
function profileImageSubmit() {
  const submitButton = profileImageForm.querySelector(".popup__button");
  const originalText = submitButton.textContent;
  const newAvatar = inputAvatarForm.value;

  submitButton.textContent = "Сохранение...";
  submitButton.disabled = true;

  updateUserAvatar(newAvatar)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closePopup(newAvatarPopup)
      profileImageForm.reset();

    })
    .catch((err) => {
      console.error("Ошибка при загрузке аватара", err);
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
}

// обработчик открытия изображения
const handleOpenImage = (imageUrl, imageAlt) => {
  photoPopupFullImage.src = imageUrl;
  photoPopupFullImage.alt = imageAlt;
  captionPopupFullImage.textContent = imageAlt;

  openPopup(popupFullImage);
};

// слушатель подтверждения формы добавления карточек
placeForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  placeFormSubmit(inputNamePlaceForm.value, inputLinkPlaceForm.value)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        handleDeleteCard,
        handleLikeButton,
        handleOpenImage
      );
      cardContainer.prepend(newCard);
      closePopup(newCardPopup);
      placeForm.reset();
      clearValidation(placeForm, validationConfig);
    })
    .catch((err) => {
      console.error("Ошибка при обработке формы", err);
    });
});

// слушатель подтверждения формы редактирования профиля
editForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  editFormSubmit();
});

profileImageForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileImageSubmit();
});

// слушатель кнопки открытия попапа добавления карточек
addButton.addEventListener("click", () => {
  openPopup(newCardPopup);
});

// слушатель кнопки открытия попапа редактирования профиля
editButton.addEventListener("click", () => {
  openPopupProfile();
});

profileImage.addEventListener("click", () => {
  openPopup(newAvatarPopup);
});

// слушатель кнопок закрытия попапов
closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup");
    if (popup) {
      closePopup(popup);
    }
  });
});
