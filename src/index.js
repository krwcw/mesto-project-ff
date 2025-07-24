import "./index.css";
import { openPopup, closePopup, renderLoading } from "./scripts/modal.js";
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

const submitBtnAvatar = profileImageForm.querySelector(".popup__button");
const submitBtnProfile = editForm.querySelector(".popup__button");
const submitBtnPlace = placeForm.querySelector(".popup__button");

// базовая конфигурация для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let myUserId = "";

const initPromises = [getUserInfo(), getInitialCards()];

// инициализируем данные профиля и карточки
Promise.all(initPromises)
.then(([userInfo, initialCards]) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url('${userInfo.avatar}')`;
  myUserId = userInfo._id;

  initialCards.forEach((cardData) => {
      const defaultCards = createCard(
        cardData,
        handleDeleteCard,
        handleLikeButton,
        handleOpenImage,
        myUserId
      );
      cardContainer.appendChild(defaultCards);
    })
})
.catch((err) => {
    console.error("Ошибка инициализации", err);
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
  
  renderLoading(submitBtnPlace, true, 'Сохранение...', 'Сохранить');

  return addNewCard(nameValue, linkValue).finally(() => {
      renderLoading(submitBtnPlace, false);
  });
}

// обработчик формы редактирования профиля
function editFormSubmit() {

  renderLoading(submitBtnProfile, true, 'Сохранение...', 'Сохранить');

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

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
      renderLoading(submitBtnProfile, false);
    });
}

// обработчик формы обновления аватарки
function profileImageSubmit() {
  
  renderLoading(submitBtnAvatar, true, 'Сохранение...', 'Сохранить');

  updateUserAvatar(newAvatar)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closePopup(newAvatarPopup)
      clearValidation(profileImageForm, validationConfig);
      profileImageForm.reset();

    })
    .catch((err) => {
      console.error("Ошибка при загрузке аватара", err);
    })
    .finally(() => {
      renderLoading(submitBtnAvatar, false);
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
        handleOpenImage,
        myUserId
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
