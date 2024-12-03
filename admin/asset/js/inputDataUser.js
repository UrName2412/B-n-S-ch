

var usersAPI = '../data/JSON/nguoidung.json';

function start() {
    getUsers(function (users) {
        renderUsers(users);
    });
}

start();

//function
function getUsers(callback) {
    fetch(usersAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function renderUsers(users) {
    // Nội dung trong bảng
    var listUsersBlock = document.querySelector('#dataUsers');
    users.forEach(function (user) {
        // Tạo phần tử mới
        var newUser = document.createElement('div');
        newUser.className = 'grid-row';
        newUser.innerHTML = `
            <span>${user.id}</span>
            <span>${user.name}</span>
            <span>${user.phone}</span>
            <span>${user.email}</span>
        `;

        // Thêm phần tử vào DOM
        listUsersBlock.appendChild(newUser);
    });

    //Menu Fix
    var listUsersFix = document.querySelector('#dataUsersFix');
    users.forEach(function (user) {
        var newUserFix = document.createElement('div');
        newUserFix.className = 'grid-row';
        newUserFix.innerHTML = `
            <div class="row-element">
                <span>${user.id}</span>
                <span>${user.name}</span>
            </div>
            <div class="row-element">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <label for="phone">Số điện thoại:</label>
                <input type="tel" name="phone" class="input" value="${user.phone}" disabled>
            </div>
            <div class="row-element">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <label for="email">Email:</label>
                <input type="email" name="email" value="${user.email}" disabled>
            </div>
        `;
        listUsersFix.appendChild(newUserFix);
    });

    // Menu Delete
    var listUsersDelete = document.querySelector('#dataUsersDelete');
    users.forEach(function (user) {
        var newUserDelete = document.createElement('div');
        newUserDelete.className = 'grid-row';
        newUserDelete.innerHTML = `
            <div class="row-element">
                <span>${user.id}</span>
                <span>${user.name}</span>
                <button type="button" class="delete">
                    <img src="../image/delete.png" alt="delete" class="icon">
                </button>
            </div>
            <div class="row-element">
                <label for="phone">Số điện thoại:</label>
                <input type="tel" name="phone" value="${user.phone}" disabled>
            </div>
            <div class="row-element">
                <label for="email">Email:</label>
                <input type="email" name="email" value="${user.email}" disabled>
            </div>
        `;
        listUsersDelete.appendChild(newUserDelete);
    });
}

document.querySelector('#dataUsers').addEventListener('click', function (event) {
    var row = event.target.closest('.grid-row');
    if (row) {
        const spans = row.querySelectorAll('span');
        const isExpanded = row.classList.contains('expanded');
        if (isExpanded) {
            spans.forEach((span, index) => {
                if (index > 1) {
                    span.style.display = 'none';
                    span.style.borderBottom = 'none';
                }
                else {
                    span.style.borderBottom = 'none';
                }
            });
            row.classList.remove('expanded');
        } else {
            spans.forEach(span => {
                span.style.display = 'inline-block';
                span.style.borderBottom = '1px solid var(--color-dark)';
            });
            row.classList.add('expanded');
        }
    }
});

document.querySelector('#dataUsersFix').addEventListener('click', function (event) {
    var rowFix = event.target.closest('.grid-row');
    if (rowFix) {
        const rowElements = rowFix.querySelectorAll('.row-element');
        const isExpanded = rowFix.classList.contains('expanded');
        event.stopPropagation();
        fixButton = event.target.closest('.fix')
        if (fixButton) {
            const input = fixButton.nextElementSibling?.nextElementSibling;
            input.addEventListener('click', function (event) {
                event.stopPropagation();
            });
            if (input && input.disabled) {
                input.disabled = false;
                input.focus();
                fixButton.innerHTML = '<img src="../image/check.png" alt="build" class="icon">';
            } else if (input) {
                input.disabled = true;
                fixButton.innerHTML = '<img src="../image/build.png" alt="build" class="icon">';
            }
            return;
        }
        if (isExpanded) {
            rowElements.forEach((element, index) => {
                if (index > 0) {
                    element.style.display = 'none';
                }
            });
            rowFix.classList.remove('expanded');
        } else {
            rowElements.forEach(element => {
                element.style.display = 'grid';
            });
            rowFix.classList.add('expanded');
        }
    }
})

document.addEventListener('click', function (event) {
    var rowFix = document.querySelector('.grid-row.expanded');
    if (rowFix && !rowFix.contains(event.target)) {
        const inputs = document.querySelectorAll('.menu-fix input');
        inputs.forEach(function (input) {
            input.disabled = true;
        });

        const fixButtons = document.querySelectorAll('.fix');
        fixButtons.forEach(function (button) {
            button.innerHTML = '<img src="../image/build.png" alt="build" class="icon">';
        });

        const rowElements = rowFix.querySelectorAll('.row-element');
        rowElements.forEach((element, index) => {
            if (index > 0) {
                element.style.display = 'none';
            }
        });
        rowFix.classList.remove('expanded');
    }
});


document.querySelector('#dataUsersDelete').addEventListener('click', function (event) {
    var rowDelete = event.target.closest('.grid-row');
    if (rowDelete) {
        const rowElements = rowDelete.querySelectorAll('.row-element');
        const isExpanded = rowDelete.classList.contains('expanded');
        event.stopPropagation();
        deleteButton = event.target.closest('.delete');
        if (deleteButton) {
            modal.classList.toggle("show", true);
            behindMenuModal.style.display = 'block';
            elementToDelete = event.target.closest('.grid-row');

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
        }else{
            if (isExpanded) {
                rowElements.forEach((element, index) => {
                    if (index > 0) {
                        element.style.display = 'none';
                    }
                });
                rowDelete.classList.remove('expanded');
            } else {
                rowElements.forEach(element => {
                    element.style.display = 'grid';
                });
                rowDelete.classList.add('expanded');
            }
        }
    }
})
