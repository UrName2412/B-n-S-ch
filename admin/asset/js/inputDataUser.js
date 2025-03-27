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

function fixButtons() {
    var fixButtons = document.querySelectorAll('.fix');
    const toolMenu = document.querySelector('.tool-menu');
    const menuFix = document.createElement('div');
    menuFix.className = 'menu-fix';
    const stringModal = 'Bạn có chắc muốn sửa người dùng không?';
    const stringAlert = 'Đã sửa.';

    fixButtons.forEach((fixButton) => {
        fixButton.addEventListener('click', (event) => {
            var gridRow = event.target.closest('.grid-row');
            let id = gridRow.querySelector('.grid-row textarea[placeholder="Nhập id..."]').value;
            let index = users.findIndex(user => user.id == id);
            menuFix.innerHTML = `
            <h2>Sửa người dùng</h2>
            <form class="form" id="form-fix">
                <div class="form-group">
                    <label for="matKhau">Mật khẩu:</label>
                    <input type="password" name="matKhau" id="matKhau" placeholder="Nhập mật khẩu">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="kiemTraMatKhau">Nhập lại mật khẩu:</label>
                    <input type="password" name="kiemTraMatKhau" id="kiemTraMatKhau" placeholder="Nhập mật khẩu">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="soDienThoai">Số điện thoại:</label>
                    <input type="tel" name="soDienThoai" id="soDienThoai" placeholder="Nhập số điện thoại">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="tel" name="email" id="email" placeholder="Nhập số điện thoại">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="diaChi">Địa chỉ:</label>
                    <div class="address">
                        <select name="tinhThanh" id="tinhThanh">
                            <option value="">Chọn Tỉnh/Thành phố</option>
                        </select>
                        <select name="quanHuyen" id="quanHuyen">
                            <option value="">Chọn Quận/Huyện</option>
                        </select>
                        <select name="xa" id="xa">
                            <option value="">Chọn Xã/Phường</option>
                        </select>
                    </div>
                    <div>
                        <label for="duong">Đường/Số nhà:</label>
                        <input type="text" id="duong" name="duong" placeholder="Số nhà, tên đường">
                    </div>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="vaiTro">Vai trò:</label>
                    <select name="vaiTro" id="vaiTro">
                        <option value="">Lựa chọn</option>
                        <option value="0">Người dùng</option>
                        <option value="1">Người quản trị</option>
                    </select>
                    <span class="form-message"></span>
                </div>
            </form>
            `;
            toolMenu.appendChild(menuFix);
            openToolMenu('.menu-fix');
            behindMenu = document.querySelector('.behindMenu');
            submitButton = document.querySelector('#form-fix .btn-submit');

            submitButton.addEventListener('click', () => {
                openModal(stringModal, stringAlert).then((result) => {
                    if (result) {
                        if (submitButton) {
                            dataInputs = document.querySelectorAll('#form-fix input');
                            dataInputs.forEach(dataInput => {
                                users[index][dataInput.id] = dataInput.value;
                            })
                            textareaGridRows = gridRow.querySelectorAll('textarea');
                            const data = ['id', 'username', 'phone', 'email', 'address'];
                            var count = 0;
                            textareaGridRows.forEach(textareaGridRow => {
                                textareaGridRow.innerHTML = users[index][data[count]];
                                count++;
                            })
                            menuFix.remove();
                            toolMenu.style.display = 'none';
                            behindMenu.style.display = 'none';

                        }
                    }
                });
            })
        })
    })
}

function banButtons() {
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
function banButtonsAllUsers() {
    var banButtons = document.querySelectorAll('.delete');
    const stringModal = 'Bạn có chắc muốn khóa người dùng không?';
    const stringAlert = 'Đã khóa.';
    banButtons.forEach((banButton) => {
        banButton.addEventListener('click', (event) => {
            openModal(stringModal, stringAlert).then((result) => {
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

function unlockButtons() {
    var unlockButtons = document.querySelectorAll('.unlock');
    const stringModal = 'Bạn có chắc muốn mở khóa người dùng không?';
    const stringAlert = 'Đã mở khóa.';
    unlockButtons.forEach((unlockButton) => {
        unlockButton.addEventListener('click', (event) => {
            openModal(stringModal, stringAlert).then((result) => {
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
function unlockButtonsAllUsers() {
    var unlockButtons = document.querySelectorAll('.unlock');
    const stringModal = 'Bạn có chắc muốn mở khóa người dùng không?';
    const stringAlert = 'Đã mở khóa.';
    unlockButtons.forEach((unlockButton) => {
        unlockButton.addEventListener('click', (event) => {
            openModal(stringModal, stringAlert).then((result) => {
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

function searchButton() {
    var flag = true;
    var input = document.getElementById('searchInput');
    var valueSearch = input.value.trim().toLowerCase();
    const userFilterValue = document.getElementById('userFilter').value;
    const keyUserSearch = "username";
    if (valueSearch == "") {
        userFilter();
    } else {
        listUsersBlock.innerHTML = '';
        users.forEach(user => {
            if (typeof (user[keyUserSearch]) !== "string") {
                var data = String(user[keyUserSearch]);
            } else var data = user[keyUserSearch];
            data = data.trim().toLowerCase();
            if (data.includes(valueSearch) && !data.includes("gmail")) {
                flag = false;
                var newUser = document.createElement('div');
                newUser.className = 'grid-row';
                if (user.isBanned == "true" && userFilterValue != "activeUsers") {
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
                if (user.isBanned == "false" && userFilterValue != "bannedUsers") {
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
            }
        })
        if (flag) {
            createAlert("Không tìm thấy người dùng.");
            userFilter();
        } else {
            fixButtons();
            banButtonsAllUsers();
            unlockButtonsAllUsers();
        }
    }
}

function userFilter() {
    const userFilter = document.getElementById('userFilter');
    if (userFilter.value == "activeUsers") activeUsers(listUsersBlock);
    else if (userFilter.value == "bannedUsers") bannedUsers(listUsersBlock);
    else if (userFilter.value == "allUsers") allUsers(listUsersBlock);
}

function activeUsers(listUsersBlock) {
    listUsersBlock.innerHTML = '';
    users.forEach(function (user) {
        if (user.isBanned == "false") {
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

function allUsers(listUsersBlock) {
    listUsersBlock.innerHTML = '';
    users.forEach(function (user) {
        var newUser = document.createElement('div');
        newUser.className = 'grid-row';
        if (user.isBanned == "true") {
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
        } else if (user.isBanned == "false") {
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

function bannedUsers(listUsersBlock) {
    listUsersBlock.innerHTML = '';
    users.forEach(function (user) {
        if (user.isBanned == "true") {
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

let filterBtn = document.getElementById('filterBtnUser');
let menuFilter = document.querySelector('.menuFilter');
filterBtn.onclick = (e) => {
    e.stopPropagation();
    if (menuFilter.classList.contains('appear')) {
        menuFilter.style.display = 'none';
        menuFilter.classList.remove('appear');
    } else {
        menuFilter.style.display = 'flex';
        menuFilter.classList.add('appear');
    }
}
document.onclick = (e) => {
    if (!menuFilter.contains(e.target) && e.target !== filterBtn) {
        menuFilter.style.display = "none";
        menuFilter.classList.remove('appear');
    }
}

function handleFilter(city, district, phone) {
    var flag = true;

    const stringBannedTrue = "bannedUsers";
    const stringBannedFalse = "activeUsers";
    city = (city == "") ? null : city.trim().toLowerCase();
    district = (district == "") ? null : district.trim().toLowerCase();
    if (phone && (!/^[0-9]+$/.test(phone.toString()))) {
        createAlert("Vui lòng nhập số và không nhập kí tự lạ.");
        return;
    }


    var userFilterValue = document.getElementById('userFilter').value;

    if (!city && !district && !phone) {
        listUsersBlock.innerHTML = '';
        userFilter();
        return;
    }
    listUsersBlock.innerHTML = '';


    for (let i = 0; i < users.length; i++) {
        if (((users[i].isBanned == "true") ? stringBannedTrue : stringBannedFalse) == userFilterValue || userFilterValue == "Tất cả người dùng") {

            var cityTemp = users[i].address.split(",")[2].trim().toLowerCase();
            var districtTemp = users[i].address.split(",")[1].trim().toLowerCase();
            var phoneTemp = users[i].phone;



            if (city && city.normalize("NFC") !== cityTemp.normalize("NFC")) continue;
            if (district && district.normalize("NFC") !== districtTemp.normalize("NFC")) continue;
            if (phone && !phoneTemp.includes(phone)) continue;

            flag = false;

            var newUser = document.createElement('div');
            newUser.className = 'grid-row';
            if (users[i].isBanned == "true") {
                newUser.classList.add('banned');
                newUser.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${users[i].id}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${users[i].username}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${users[i].phone}</textarea>
                <textarea placeholder="Nhập email..." readonly>${users[i].email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${users[i].address}</textarea>
                <div class="tool">
                    <button type="button" class="unlock">
                        <i class="fas fa-unlock"></i>
                    </button>
                </div>
            `;
            } else if (users[i].isBanned == "false") {
                newUser.innerHTML = `
                <textarea placeholder="Nhập id..." readonly>${users[i].id}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${users[i].username}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${users[i].phone}</textarea>
                <textarea placeholder="Nhập email..." readonly>${users[i].email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${users[i].address}</textarea>
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
        }
    }
    if (flag) {
        createAlert("Không tìm thấy người dùng.");
        userFilter();
    } else {
        fixButtons();
        banButtonsAllUsers();
        unlockButtonsAllUsers();
    }
}



start();

document.addEventListener("DOMContentLoaded", () => {
    response768('.grid-row');
});