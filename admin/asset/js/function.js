//BehindMenu: cái màn màu tối tối phía trong
function createBehindMenu(){
    let behindMenu = document.querySelector('.behindMenu');
    if (!behindMenu) {
        behindMenu = document.createElement('div');
        behindMenu.className = 'behindMenu';
        behindMenu.style.display = 'block';
        document.body.appendChild(behindMenu);
    }
    return behindMenu;
}

function closeBehindMenu(behindMenu){
    if (document.body.contains(behindMenu)) {
        document.body.removeChild(behindMenu);
    }
}

function isSelector(selector) {
    try {
        document.querySelector(selector);
        return true; // Selector hợp lệ
    } catch (error) {
        return false; // Selector không hợp lệ
    }
}

function isFunction(callback) {
    try {
        callback();
        return true;
    } catch (error) {
        return false;
    }
}

function openToolMenu(selector){
    var toolMenu = document.getElementById("tool-menu");
    var closeButton = document.getElementById("closeToolMenuButton");
    var behindMenu = createBehindMenu();
    var menuAdd = document.querySelector('.menu-add');
    if (isSelector(selector)){
        var changeMenu = document.querySelector(`${selector}`);
        changeMenu.style.display = 'flex';
    } else{
        menuAdd.style.display = 'block';
    }

    toolMenu.style.display = 'block';
    closeButton.style.display = 'block';

    behindMenu.addEventListener('click',() => {
        toolMenu.style.display = 'none';
        if (changeMenu){
            changeMenu.style.display = 'none';
        } else{
            menuAdd.style.display = 'none';
        }
        closeBehindMenu(behindMenu);
    });
    closeButton.addEventListener('click',() => {
        toolMenu.style.display = 'none';
        if (changeMenu){
            changeMenu.style.display = 'none';
        } else{
            menuAdd.style.display = 'none';
        }
        closeBehindMenu(behindMenu);
    });
}

//Modal: Xác nhận một cái gì đó
function createModal(stringModal){
    var modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="headModal">
            <span>${stringModal}</span>
        </div>
        <div class="choiceModal">
            <button type="button" class="canceled">Hủy</button>
            <button type="button" class="confirm">Xác nhận</button>
        </div>
    `;
    modal.style.display = 'block';
    document.body.appendChild(modal);
    return modal;
}

function openModal(stringModal, stringAlert) {
    return new Promise((resolve) => {
        var modal = createModal(stringModal); 
        var behindMenu = createBehindMenu(); 
        modal.style.display = 'block'; 
        behindMenu.style.display = 'block'; 

        var canceled = modal.querySelector('.canceled');
        var confirm = modal.querySelector('.confirm');

        canceled.addEventListener('click', () => {
            closeModal();
            resolve(false);
        });

        confirm.addEventListener('click', () => {
            // createAlert(stringAlert);
            closeModal();
            resolve(true);
        });

        behindMenu.addEventListener('click', () => {
            closeModal();
            resolve(false);
        });

        function closeModal() {
            modal.style.display = 'none';
            behindMenu.style.display = 'none';
        }
    });
}

//Alert: Thông báo như kiểu cảnh cáo
function createAlert(stringAlert){
    var behindMenu = createBehindMenu();
    var alert = document.createElement('div');
    alert.className = 'customAlert';
    alert.innerHTML = `
        <div class="alertContent">
            <p id="alertMessage">${stringAlert}</p>
            <button id="alertCloseBtn">OK</button>
        </div>
    `;
    document.body.appendChild(alert);
    var closeAlert = document.getElementById('alertCloseBtn').addEventListener('click', () => {
        if (document.body.contains(alert)){
            document.body.removeChild(alert);
            closeBehindMenu(behindMenu);
        }
    });
    behindMenu.addEventListener('click', () => {
        if (document.body.contains(alert)){
            document.body.removeChild(alert);
            closeBehindMenu(behindMenu);
        }
    });
}

function previewImage(input, previewImgId, errorSelector = '.form-message') {
    const previewImg = document.getElementById(previewImgId);
    const formGroup = input.closest('.form-group') || input.parentElement;
    const errorMessage = formGroup.querySelector(errorSelector);
    const file = input.files[0];

    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 2 * 1024 * 1024;

    if (file) {
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (!validTypes.includes(file.type) && !['jpg', 'jpeg', 'png'].includes(fileExtension)) {
            errorMessage.innerText = 'Vui lòng chọn ảnh có định dạng JPG, PNG, jpec.';
            previewImg.style.display = 'none';
            input.value = '';
            formGroup.classList.add('invalid');
            return;
        }

        if (file.size > maxSize) {
            errorMessage.innerText = 'Vui lòng chọn ảnh có dung lượng nhỏ hơn 2MB.';
            previewImg.style.display = 'none';
            input.value = '';
            formGroup.classList.add('invalid');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
        };
        reader.readAsDataURL(file);

        errorMessage.innerText = '';
        formGroup.classList.remove('invalid');
    } else {
        previewImg.style.display = 'none';
        errorMessage.innerText = '';
        formGroup.classList.remove('invalid');
    }
}

function formatVND(value) {
    const number = Number(value);
    if (isNaN(number)) return '0 ₫';
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

  




