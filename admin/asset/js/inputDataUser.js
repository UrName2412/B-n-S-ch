

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
            <textarea placeholder="Nhập id..." readonly>${user.id}</textarea>
            <textarea placeholder="Nhập tên người dùng..." readonly>${user.name}</textarea>
            <textarea placeholder="Nhập số điện thoại..." readonly>${user.phone}</textarea>
            <textarea placeholder="Nhập email..." readonly>${user.email}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${user.address}</textarea>
            <div class="tool">
                <button type="button" class="fix">
                    <img src="../image/build.png" alt="build" class="icon">
                </button>
                <button type="button" class="delete">
                    <img src="../image/block.png" alt="delete" class="icon">
                </button>
            </div>
        `;

        // Thêm phần tử vào DOM
        listUsersBlock.appendChild(newUser);
    });
}

