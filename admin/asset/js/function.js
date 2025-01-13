//BehindMenu: cái màn màu tối tối phía trong
function createBehindMenu(){
    var behindMenu = document.createElement('div');
    behindMenu.className = 'behindMenu';
    behindMenu.style.display = 'block';
    document.body.appendChild(behindMenu);
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
            resolve(false); // Trả về false khi hủy
        });

        confirm.addEventListener('click', () => {
            createAlert(stringAlert);
            closeModal();
            resolve(true); // Trả về true khi xác nhận
        });

        behindMenu.addEventListener('click', () => {
            closeModal();
            resolve(false); // Trả về false khi hủy
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
