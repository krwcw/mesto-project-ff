// показ ошибки валидации
const showInputError = (formElement, inputElement, errorMessage, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(options.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(options.errorClass);
  }
};

// отмена показа ошибки
const hideInputError = (formElement, inputElement, options) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(options.inputErrorClass);
  if (errorElement) {
    errorElement.textContent = "";
    errorElement.classList.remove(options.errorClass);
  }
};

// проверка элементов на валидность и показываем/убираем текст ошибки
const isValid = (formElement, inputElement, options) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      options
    );
  } else {
    hideInputError(formElement, inputElement, options);
  }
};

// чистка всех формы валидации
const clearValidation = (formElement, options) => {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, options);
    inputElement.setCustomValidity("");
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(options.inactiveButtonClass);
};

// установка слушаетелей на все элементы ввода
const setEventListeners = (formElement, options) => {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, options);
      toggleButtonStatus(inputList, buttonElement, options);
    });
  });
};

// включение валидацию
const enableValidation = (options) => {
  const { formSelector } = options;
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, options);
  });
};

// переключение статуса для кнопки в зависимости от валидности инпутов
const toggleButtonStatus = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
) => {
  const hasInvalidInput = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );
  buttonElement.disabled = hasInvalidInput;
  buttonElement.classList.toggle(inactiveButtonClass, hasInvalidInput);
};

export { enableValidation, clearValidation };
