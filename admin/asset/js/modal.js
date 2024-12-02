const deleteButtons = document.querySelectorAll('.tool-menu-fix-delete .row-element .delete');
const modal = document.querySelector('.modal');
const behindMenuModal = document.querySelector('.behindMenuModal');
const behindMenuAlert = document.querySelector('.behindMenuAlert');
const cancelButton = document.querySelector('.modal .choiceModal .cancel');
const confirmButton = document.querySelector('.modal .choiceModal .confirm');
const messageAlert = document.getElementById('alertMessage');

let elementToDelete = null;

deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', (event) => {
        modal.classList.toggle("show", true);
        behindMenuModal.style.display = 'block';
        elementToDelete = event.target.closest('.grid-row');
        console.log(elementToDelete);

        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                modal.classList.toggle("show", false);
                behindMenuModal.style.display = 'none';
                elementToDelete = null;
            })
        }
        if (confirmButton) {
            confirmButton.addEventListener('click', () => {
                if (elementToDelete) {
                    elementToDelete.remove();
                    modal.classList.toggle("show", false);
                    behindMenuModal.style.display = 'none';
                    elementToDelete = null;

                    //Alert
                    behindMenuAlert.style.display = 'block';
                    let customAlert = document.getElementById('customAlert');
                    customAlert.style.display = 'block';
                    messageAlert.innerText = 'Đã xóa thành công.';
                    let closeButton = document.getElementById('alertCloseBtn');
                    closeButton.addEventListener('click', () => {
                        customAlert.style.display = 'none';
                        behindMenuAlert.style.display = 'none';
                    });
                }
            })
        }
    })
})

behindMenuModal.addEventListener('click', () => {
    modal.classList.toggle("show", false);
    behindMenuModal.style.display = 'none';
})

behindMenuAlert.addEventListener('click', () => {
    modal.classList.toggle("show", false);
    behindMenuAlert.style.display = 'none';
    customAlert.style.display = 'none';
})



