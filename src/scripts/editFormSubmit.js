const editForm = document.forms['edit-profile'];
const nameForm = editForm.elements.name;
const descriptionForm = editForm.elements.description;

function editFormSubmit() {

    const newName = nameForm.value;
    const newDescription = descriptionForm.value;

    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = newName;
    profileDescription.textContent = newDescription;
}

export { editForm, nameForm, descriptionForm, editFormSubmit };