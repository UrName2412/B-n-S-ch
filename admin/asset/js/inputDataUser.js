import { addressHandler } from './apiAddress.js';
const addressHandler1 = new addressHandler('tinhThanh', 'quanHuyen', 'xa');

let users = [];
var listUsersBlock = document.querySelector('#dataUsers');

function start() {
    getUsers().then(() => {
        renderUsers();
    });
}


//function
function getUsers() {
    return fetch('../handlers/lay/laynguoidung.php')
        .then(response => response.json())
        .then(data => {
            users = data;
        })
        .catch(error => console.error("Lỗi khi fetch dữ liệu:", error));
}

function renderUsers() {
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
            let tenNguoiDung = gridRow.querySelector('textarea[placeholder="Nhập tên người dùng..."]').value;
            let index = users.findIndex(user => user.tenNguoiDung == tenNguoiDung);
            menuFix.innerHTML = `
            <h2>Sửa người dùng</h2>
            <form class="form" id="form-fix" method="POST" action="../handlers/sua/suanguoidung.php">
                <input type="hidden" name="tenNguoiDung" value="${users[index].tenNguoiDung}">
                <input type="hidden" name="vaiTro" value="${users[index].vaiTro}">
                <input type="hidden" name="trangThai" value="${users[index].trangThai}">
                <div class="form-group">
                    <label for="matKhau">Mật khẩu:</label>
                    <input type="password" name="matKhau" id="suaMatKhau" placeholder="Nhập mật khẩu" >
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="soDienThoai">Số điện thoại:</label>
                    <input type="tel" name="soDienThoai" id="suaSoDienThoai" placeholder="Nhập số điện thoại" value=${users[index].soDienThoai}>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" name="email" id="suaEmail" placeholder="Nhập email" value="${users[index].email}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="diaChi">Địa chỉ:</label>
                    <div class="address">
                        <div class="form-group">
                            <select name="tinhThanh" id="suaTinhThanh">
                                <option value="">Chọn Tỉnh/Thành phố</option>
                            </select>
                            <span class="form-message"></span>
                        </div>
                        <div class="form-group">
                            <select name="quanHuyen" id="suaQuanHuyen">
                                <option value="">Chọn Quận/Huyện</option>
                            </select>
                            <span class="form-message"></span>
                        </div>
                        <div class="form-group">
                            <select name="xa" id="suaXa">
                                <option value="">Chọn Xã/Phường</option>
                            </select>
                            <span class="form-message"></span>
                        </div>
                    </div>
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <label for="duong">Đường/Số nhà:</label>
                    <input type="text" name="duong" id="suaDuong" placeholder="Số nhà, tên đường" value="${users[index].duong}">
                    <span class="form-message"></span>
                </div>
                <div class="form-group">
                    <input type="submit" value="Thêm" class="btn-submit">
                </div>
            </form>
            `;


            toolMenu.appendChild(menuFix);
            openToolMenu('.menu-fix');
            const addressHandlerFix = new addressHandler('suaTinhThanh', 'suaQuanHuyen', 'suaXa');
            addressHandlerFix.setSelectedValues(users[index].tinhThanh,users[index].quanHuyen,users[index].xa);
            
            var formFix = document.getElementById('form-fix');
            formFix.addEventListener('submit', e =>{
                e.preventDefault();

                var suaMatKhau = document.getElementById('suaMatKhau').value;
                var suaSoDienThoai = document.getElementById('suaSoDienThoai').value;
                var suaEmail = document.getElementById('suaEmail').value;
                var suaTinhThanh = document.getElementById('suaTinhThanh').value;
                var suaQuanHuyen = document.getElementById('suaQuanHuyen').value;
                var suaXa = document.getElementById('suaXa').value;
                var suaDuong = document.getElementById('suaDuong').value;

                var flag = true;

                if (suaMatKhau != "") flag = false;
                if (suaSoDienThoai != users[index].soDienThoai) flag = false;
                if (suaEmail != users[index].email) flag = false;
                if (suaTinhThanh != users[index].tinhThanh) flag = false;
                if (suaQuanHuyen != users[index].quanHuyen) flag = false;
                if (suaXa != users[index].xa) flag = false;
                if (suaDuong != users[index].duong) flag = false;

                if (flag) {
                    createAlert("Không có thông tin nào cần sửa.");
                } else {
                    openModal(stringModal, stringAlert).then((result) => {
                        if (result) {
                            formFix.submit();
                            menuFix.remove();
                            behindMenu.style.display = 'none';
                            userFilter();
                        }
                    });
                }
            })
        })
    })
}

function banButtons() {
    var banButtons = document.querySelectorAll('.delete');
    banButtons.forEach((banButton) => {
        banButton.addEventListener('click', (event) => {
            var gridRow = event.target.closest('.grid-row');
            let tenNguoiDung = gridRow.querySelector('textarea[placeholder="Nhập tên người dùng..."]').value;
            let vaiTro = gridRow.querySelector('textarea[placeholder="Nhập vai trò..."]').value;
            vaiTro = (vaiTro == "Người quản trị" ? 1 : 0);
            let index = users.findIndex(user => (user.tenNguoiDung == tenNguoiDung && user.vaiTro == vaiTro));
            const stringModal = users[index].trangThai ? 'Bạn có chắc muốn khóa người dùng không?' : 'Người dùng đã bị khóa trước đó. Bạn có muốn mở khóa không?';
            const stringAlert = users[index].trangThai ? 'Đã khóa.' : 'Đã mở khóa.';
            openModal(stringModal, stringAlert).then((result) => {
                if (result) {
                    if (banButton){
                        xuLiNguoiDung(tenNguoiDung,vaiTro).then((response) =>{
                            if (response.status === "success"){
                                getUsers().then(() =>{
                                    userFilter();
                                })
                            }
                            createAlert(response.message);
                        })
                    }
                }
            });
        });
    });
}

function unlockButtons() {
    var unlockButtons = document.querySelectorAll('.unlock');
    unlockButtons.forEach((unlockButton) => {
        unlockButton.addEventListener('click', (event) => {
            var gridRow = event.target.closest('.grid-row');
            let tenNguoiDung = gridRow.querySelector('textarea[placeholder="Nhập tên người dùng..."]').value;
            let vaiTro = gridRow.querySelector('textarea[placeholder="Nhập vai trò..."]').value;
            vaiTro = (vaiTro == "Người quản trị" ? 1 : 0);
            let index = users.findIndex(user => (user.tenNguoiDung == tenNguoiDung && user.vaiTro == vaiTro));
            const stringModal = users[index].trangThai ? 'Bạn có chắc muốn khóa người dùng không?' : 'Người dùng đã bị khóa trước đó. Bạn có muốn mở khóa không?';
            const stringAlert = users[index].trangThai ? 'Đã khóa.' : 'Đã mở khóa.';
            openModal(stringModal, stringAlert).then((result) => {
                if (result) {
                    if (unlockButton) {
                        xuLiNguoiDung(tenNguoiDung,vaiTro).then((response) =>{
                            if (response.status === "success"){
                                getUsers().then(() =>{
                                    userFilter();
                                })
                            }
                            createAlert(response.message);
                        })
                    }
                }
            })
        })
    })
}

function xuLiNguoiDung(tenNguoiDung,vaiTro) {
    return new Promise((resolve, reject) => {
        fetch(`../handlers/xoa/khoanguoidung.php?tenNguoiDung=${tenNguoiDung}&vaiTro=${vaiTro}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                resolve(data);
            } else {
                console.error("Lỗi:", data.message);
                reject(new Error(data.message));
            }
        })
        .catch(error => {
            console.error("Lỗi:", error);
            reject(error);
        });
    });
}

async function searchButton() {
    var flag = true;
    var input = document.getElementById('searchInput');
    var valueSearch = input.value.trim().toLowerCase();
    const userFilterValue = document.getElementById('userFilter').value;
    const keyUserSearch = "tenNguoiDung";
    if (valueSearch == "") {
        userFilter();
    } else {
        listUsersBlock.innerHTML = '';
        for (let user of users){
            if (typeof (user[keyUserSearch]) !== "string") {
                var data = String(user[keyUserSearch]);
            } else var data = user[keyUserSearch];
            data = data.trim().toLowerCase();
            if (data.includes(valueSearch)) {
                flag = false;
                var newUser = document.createElement('div');
                newUser.className = 'grid-row';
                let vaiTro = user.vaiTro ? "Người quản trị" : "Người dùng";
                let diaChi = await addressHandler1.concatenateAddress(user.tinhThanh, user.quanHuyen, user.xa);
                if (user.duong != "") diaChi = diaChi.concat(", " + user.duong);

                if (!user.trangThai && userFilterValue != "activeUsers") {
                    newUser.classList.add('banned');
                    newUser.innerHTML = `
                            <textarea placeholder="Nhập vai trò..." readonly>${vaiTro}</textarea>
                            <textarea placeholder="Nhập tên người dùng..." readonly>${user.tenNguoiDung}</textarea>
                            <textarea placeholder="Nhập số điện thoại..." readonly>${user.soDienThoai}</textarea>
                            <textarea placeholder="Nhập email..." readonly>${user.email}</textarea>
                            <textarea placeholder="Nhập nội dung..." readonly>${diaChi}</textarea>
                            <div class="tool">
                                <button type="button" class="unlock">
                                    <i class="fas fa-unlock"></i>
                                </button>
                            </div>
                        `;
                    listUsersBlock.appendChild(newUser);
                }
                if (user.trangThai && userFilterValue != "bannedUsers") {
                    newUser.innerHTML = `
                            <textarea placeholder="Nhập vai trò..." readonly>${vaiTro}</textarea>
                            <textarea placeholder="Nhập tên người dùng..." readonly>${user.tenNguoiDung}</textarea>
                            <textarea placeholder="Nhập số điện thoại..." readonly>${user.soDienThoai}</textarea>
                            <textarea placeholder="Nhập email..." readonly>${user.email}</textarea>
                            <textarea placeholder="Nhập nội dung..." readonly>${diaChi}</textarea>
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
        }
        if (flag) {
            createAlert("Không tìm thấy người dùng.");
            userFilter();
        } else {
            fixButtons();
            banButtons();
            unlockButtons();
        }
    }
}

function userFilter() {
    const userFilter = document.getElementById('userFilter');
    if (userFilter.value == "activeUsers") activeUsers(listUsersBlock);
    else if (userFilter.value == "bannedUsers") bannedUsers(listUsersBlock);
    else if (userFilter.value == "allUsers") allUsers(listUsersBlock);
}

async function activeUsers(listUsersBlock) {
    listUsersBlock.innerHTML = '';
    for (let user of users) {
        if (user.trangThai) {
            let vaiTro = user.vaiTro ? "Người quản trị" : "Người dùng";
            let diaChi = await addressHandler1.concatenateAddress(user.tinhThanh, user.quanHuyen, user.xa);
            if (user.duong != "") diaChi = diaChi.concat(", " + user.duong);
            
            var newUser = document.createElement('div');
            newUser.className = 'grid-row';
            newUser.innerHTML = `
                <textarea placeholder="Nhập vai trò..." readonly>${vaiTro}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${user.tenNguoiDung}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${user.soDienThoai}</textarea>
                <textarea placeholder="Nhập email..." readonly>${user.email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${diaChi}</textarea>
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
    
    fixButtons();
    banButtons();
}

async function allUsers(listUsersBlock) {
    listUsersBlock.innerHTML = '';

    for (let user of users) {
        var newUser = document.createElement('div');
        newUser.className = 'grid-row';
        let vaiTro = user.vaiTro ? "Người quản trị" : "Người dùng";
        let diaChi = await addressHandler1.concatenateAddress(user.tinhThanh, user.quanHuyen, user.xa);
        if (user.duong) diaChi += `, ${user.duong}`;

        if (user.trangThai) {
            newUser.innerHTML = `
                <textarea placeholder="Nhập vai trò..." readonly>${vaiTro}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${user.tenNguoiDung}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${user.soDienThoai}</textarea>
                <textarea placeholder="Nhập email..." readonly>${user.email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${diaChi}</textarea>
                <div class="tool">
                    <button type="button" class="fix">
                        <i class="fas fa-wrench"></i>
                    </button>
                    <button type="button" class="delete">
                        <i class="fas fa-ban"></i>
                    </button>
                </div>
            `;
        } else {
            newUser.classList.add('banned');
            newUser.innerHTML = `
                <textarea placeholder="Nhập vai trò..." readonly>${vaiTro}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${user.tenNguoiDung}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${user.soDienThoai}</textarea>
                <textarea placeholder="Nhập email..." readonly>${user.email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${diaChi}</textarea>
                <div class="tool">
                    <button type="button" class="unlock">
                        <i class="fas fa-unlock"></i>
                    </button>
                </div>
            `;
        }
        listUsersBlock.appendChild(newUser);
    }

    fixButtons();
    banButtons();
    unlockButtons();
}


async function bannedUsers(listUsersBlock) {
    listUsersBlock.innerHTML = '';
    for (let user of users) {
        if (!user.trangThai) {
            let vaiTro = user.vaiTro ? "Người quản trị" : "Người dùng";
            let diaChi = await addressHandler1.concatenateAddress(user.tinhThanh, user.quanHuyen, user.xa);
            if (user.duong != "") diaChi = diaChi.concat(", " + user.duong);
            
            var newUser = document.createElement('div');
            newUser.className = 'grid-row';
            newUser.classList.add('banned');
            newUser.innerHTML = `
                <textarea placeholder="Nhập vai trò..." readonly>${vaiTro}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${user.tenNguoiDung}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${user.soDienThoai}</textarea>
                <textarea placeholder="Nhập email..." readonly>${user.email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${diaChi}</textarea>
                <div class="tool">
                    <button type="button" class="unlock">
                        <i class="fas fa-unlock"></i>
                    </button>
                </div>
            `;
            listUsersBlock.appendChild(newUser);
        }
    }
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

async function handleFilter(vaiTro,tinhThanh, quanHuyen, soDienThoai) {
    var flag = true;

    const stringBannedTrue = "bannedUsers";
    const stringBannedFalse = "activeUsers";
    tinhThanh = (tinhThanh == "") ? null : tinhThanh;
    quanHuyen = (quanHuyen == "") ? null : quanHuyen;
    if (soDienThoai && (!/^[0-9]+$/.test(soDienThoai.toString()))) {
        createAlert("Vui lòng nhập số và không nhập kí tự lạ.");
        return;
    }

    var userFilterValue = document.getElementById('userFilter').value;

    if (vaiTro == "" && !tinhThanh && !quanHuyen && !soDienThoai) {
        listUsersBlock.innerHTML = '';
        userFilter();
        return;
    }
    listUsersBlock.innerHTML = '';

    for (let i = 0; i < users.length; i++) {
        if (((users[i].trangThai) ? stringBannedFalse : stringBannedTrue) == userFilterValue || userFilterValue == "Tất cả người dùng") {

            let tinhThanhTemp = users[i].tinhThanh;
            let quanHuyenTemp = users[i].quanHuyen;
            let soDienThoaiTemp = users[i].soDienThoai;
            let vaiTroTemp = users[i].vaiTro;

            if (tinhThanh && tinhThanh != tinhThanhTemp) continue;
            if (quanHuyen && quanHuyen != quanHuyenTemp) continue;
            if (soDienThoai && !soDienThoaiTemp.includes(soDienThoai)) continue;
            if (vaiTro != "" && vaiTro != vaiTroTemp ) continue;

            flag = false;

            var newUser = document.createElement('div');
            
            let chuoiVaiTro = (users[i].vaiTro) ? "Người quản trị" : "Người dùng";
            let diaChi = await addressHandler1.concatenateAddress(users[i].tinhThanh, users[i].quanHuyen, users[i].xa);
            if (users[i].duong != "") diaChi = diaChi.concat(", " + users[i].duong);
            newUser.className = 'grid-row';
            if (!users[i].trangThai) {
                newUser.classList.add('banned');
                newUser.innerHTML = `
                <textarea placeholder="Nhập vai trò..." readonly>${chuoiVaiTro}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${users[i].tenNguoiDung}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${users[i].soDienThoai}</textarea>
                <textarea placeholder="Nhập email..." readonly>${users[i].email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${diaChi}</textarea>
                <div class="tool">
                    <button type="button" class="unlock">
                        <i class="fas fa-unlock"></i>
                    </button>
                </div>
            `;
            } else{
                newUser.innerHTML = `
                <textarea placeholder="Nhập vai trò..." readonly>${chuoiVaiTro}</textarea>
                <textarea placeholder="Nhập tên người dùng..." readonly>${users[i].tenNguoiDung}</textarea>
                <textarea placeholder="Nhập số điện thoại..." readonly>${users[i].soDienThoai}</textarea>
                <textarea placeholder="Nhập email..." readonly>${users[i].email}</textarea>
                <textarea placeholder="Nhập nội dung..." readonly>${diaChi}</textarea>
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
        clearFilter();
        createAlert("Không tìm thấy người dùng.");
    } else {
        fixButtons();
        banButtons();
        unlockButtons();
    }
}

function clearFilter(){
    userFilter();
    const ids = ['vaiTroTimKiem','tinhThanhTimKiem','quanHuyenTimKiem','soDienThoaiTimKiem'];
    ids.forEach(id =>{
        const Element = document.getElementById(id);
        if (Element) Element.value = "";
    })
}



start();

document.getElementById('filterButton').addEventListener('click', () =>{
    let vaiTro = document.getElementById('vaiTroTimKiem').value;
    let tinhThanh = document.getElementById('tinhThanhTimKiem').value;
    let quanHuyen = document.getElementById('quanHuyenTimKiem').value;
    let soDienThoai = document.getElementById('soDienThoaiTimKiem').value;
    handleFilter(vaiTro,tinhThanh,quanHuyen,soDienThoai);
})

document.getElementById('userFilter').addEventListener('change', () =>{
    userFilter();
})

document.getElementById('searchButton').addEventListener('click', () =>{
    searchButton();
})

document.getElementById('clearButton').addEventListener('click', () =>{
    clearFilter();
})

document.addEventListener("DOMContentLoaded", () => {
    response768('.grid-row');
});