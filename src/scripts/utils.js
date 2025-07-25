export function renderLoading(button, isLoading, loadingText = 'Сохранение...', defaultText = 'Сохранить') {
  button.disabled = isLoading;
  button.textContent = isLoading ? loadingText : defaultText;
};
