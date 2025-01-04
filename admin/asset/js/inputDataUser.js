var usersAPI = '../data/JSON/nguoidung.json';

let users = [];
var listUsersBlock = document.querySelector('#dataUsers');

function start() {
    getUsers().then(() => {
        renderUsers();
    });
}


//function
function getUsers() {
    return fetch(usersAPI)
        .then(response => response.json())
        .then(data => {
            users = data;
        });
}

function renderUsers() {
    // Nội dung trong bảng
    activeUsers(listUsersBlock);
}

function fixButtons(){
    var fixButtons = document.querySelectorAll('.fix');
    fixButtons.forEach((fixButton) => {
        fixButton.addEventListener('click', (event) => {
            var gridRow = event.target.closest('.grid-row');
            if (gridRow.classList.contains('fixed')) {
                fixButton.innerHTML = `<i class="fas fa-wrench"></i>`;
            } else {
                fixButton.innerHTML = `<i class="fas fa-check"></i>`;
            }
            gridRow.classList.toggle('fixed');
            fixButton.classList.toggle('fixed');
        })
    })
}

function banButtons(){
    var banButtons = document.querySelectorAll('.delete');
    const stringModal = 'Bạn có chắc muốn khóa người dùng không?';
    const stringAlert = 'Đã khóa.';
    banButtons.forEach((banButton) => {
        banButton.addEventListener('click', (event) => {
            openModal(stringModal, stringAlert).then((result) => {
                if (result) {
                    if (banButton) {
                        var gridRow = event.target.closest('.grid-row');
                        gridRow.remove();
                        let id = gridRow.querySelector('.grid-row textarea[placeholder="Nhập id..."]').value;
                        let index = users.findIndex(user => user.id == id);
                        users[index].isBanned = "true";
                    }
                }
            });
        });
    })
}
function banButtonsAllUsers(){
    var banButtons = document.querySelectorAll('.delete');
    const stringModal = 'Bạn có chắc muốn khóa người dùng không?';
    const stringAlert = 'Đã khóa.';
    banButtons.forEach((banButton) => {
        banButton.addEventListener('click', (event) => {
            var confirm = openModal(stringModal, stringAlert).then((result) => {
                if (result) {
                    if (banButton) {
                        var gridRow = event.target.closest('.grid-row');
                        let id = gridRow.querySelector('.grid-row textarea[placeholder="Nhập id..."]').value;
                        let index = users.findIndex(user => user.id == id);
                        users[index].isBanned = "true";
                        allUsers(listUsersBlock);
                    }
                }
            });
        });
    })
}

function unlockButtons(){
    var unlockButtons = document.querySelectorAll('.unlock');
    const stringModal = 'Bạn có chắc muốn mở khóa người dùng không?';
    const stringAlert = 'Đã mở khóa.';
    unlockButtons.forEach((unlockButton) => {
        unlockButton.addEventListener('click', (event) => {
            var confirm = openModal(stringModal,stringAlert).then((result) => {
                if (result) {
                    if (unlockButton) {
                        var gridRow = event.target.closest('.grid-row');
                        gridRow.remove();
                        let id = gridRow.querySelector('.grid-row textarea[placeholder="Nhập id..."]').value;
                        let index = users.findIndex(user => user.id == id);
                        users[index].isBanned = "false";
                    }
                }
            })
        })
    })
}
function unlockButtonsAllUsers(){
    var unlockButtons = document.querySelectorAll('.unlock');
    const stringModal = 'Bạn có chắc muốn mở khóa người dùng không?';
    const stringAlert = 'Đã mở khóa.';
    unlockButtons.forEach((unlockButton) => {
        unlockButton.addEventListener('click', (event) => {
            var confirm = openModal(stringModal,stringAlert).then((result) => {
                if (result) {
                    if (unlockButton) {
                        var gridRow = event.target.closest('.grid-row');
                        let id = gridRow.querySelector('.grid-row textarea[placeholder="Nhập id..."]').value;
                        let index = users.findIndex(user => user.id == id);
                        users[index].isBanned = "false";
                        allUsers(listUsersBlock);
                    }
                }
            })
        })
    })
}

function userFilter(){
    const userFilter = document.getElementById('userFilter');
    users.forEach((user) => {
        if (userFilter.value == "activeUsers") activeUsers(listUsersBlock);
        else if (userFilter.value == "bannedUsers") bannedUsers(listUsersBlock);
        else if (userFilter.value == "allUsers") allUsers(listUsersBlock);
    });
}

function activeUsers(listUsersBlock){
    listUsersBlock.innerHTML = '';
    users.forEach(function (user) {
        if (user.isBanned == "false"){
            var newUser = document.createElement('div');
            newUser.className = 'grid-row';
            newUser.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${user.id}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${user.username}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${user.phone}</textarea>
                <textarea placeholder="Nhập email..." readonly>${user.email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${user.address}</textarea>
                <div class="tool">
                    <button type="button" class="fix">
                        <i class="fas fa-wrench"></i>
                    </button>
                    <button type="button" class="delete">
                        <i class="fas fa-ban"></i>
                    </button>
                </div>
            `;
            listUsersBlock.appendChild(newUser);
        }  
    });
    fixButtons();
    banButtons();
}

function allUsers(listUsersBlock){
    listUsersBlock.innerHTML = '';
    users.forEach(function (user) {
        var newUser = document.createElement('div');
        newUser.className = 'grid-row';
        if (user.isBanned == "true"){
            newUser.classList.add('banned');
            newUser.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${user.id}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${user.username}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${user.phone}</textarea>
                <textarea placeholder="Nhập email..." readonly>${user.email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${user.address}</textarea>
                <div class="tool">
                    <button type="button" class="unlock">
                        <i class="fas fa-unlock"></i>
                    </button>
                </div>
            `;
        } else if (user.isBanned == "false"){
            newUser.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${user.id}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${user.username}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${user.phone}</textarea>
                <textarea placeholder="Nhập email..." readonly>${user.email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${user.address}</textarea>
                <div class="tool">
                    <button type="button" class="fix">
                        <i class="fas fa-wrench"></i>
                    </button>
                    <button type="button" class="delete">
                        <i class="fas fa-ban"></i>
                    </button>
                </div>
            `;
        }
        listUsersBlock.appendChild(newUser);  
    });
    fixButtons();
    banButtonsAllUsers();
    unlockButtonsAllUsers();
}

function bannedUsers(listUsersBlock){
    listUsersBlock.innerHTML = '';
    users.forEach(function (user) {
        if (user.isBanned == "true"){
            var newUser = document.createElement('div');
            newUser.className = 'grid-row';
            newUser.classList.add('banned');
            newUser.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${user.id}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${user.username}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${user.phone}</textarea>
                <textarea placeholder="Nhập email..." readonly>${user.email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${user.address}</textarea>
                <div class="tool">
                    <button type="button" class="unlock">
                        <i class="fas fa-unlock"></i>
                    </button>
                </div>
            `;
            listUsersBlock.appendChild(newUser);
        }  
    });
    unlockButtons();
}

start();