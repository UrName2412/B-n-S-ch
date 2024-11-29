const containerCss = document.querySelector('.container');

const toolMenu = document.querySelector('.tool-menu');
const toolMenu_fix_delete = document.querySelector('.tool-menu-fix-delete');
const addMenu = document.querySelector('.menu-add');
const fixMenu = document.querySelector('.menu-fix');
const deleteMenu = document.querySelector('.menu-delete');
const addBtn = document.querySelector('.tool .add');
const fixBtn = document.querySelector('.tool .fix');
const deleteBtn = document.querySelector('.tool .delete');
const closeBtn_tool_menu = document.querySelector('.tool-menu .menu-close');
const closeBtn_tool_menu_fix_delete = document.querySelector('.tool-menu-fix-delete .menu-close');
const behindMenu = document.querySelector('.behindMenu');
const submitAddbtn = document.querySelector('.tool .add .btn-submit');

const headMenu = document.querySelector('.menuHeader');
const headLogo = document.querySelector('.logo a');
const headSidebar = document.querySelector('.sidebar');
const headSidebar_re = document.querySelector('.sidebar-re');
const headClosebtn = document.querySelector('.header .close');

const headMenuMoblie = document.querySelector('.menuHeader-mobile');
const headAside = document.querySelector('aside');
const headClosebtnMobile = document.querySelector('.header .close-mobile');


addBtn.addEventListener('click', () => {
    toolMenu.style.display = 'block';
    addMenu.style.display = 'block';
    behindMenu.style.display = 'block';
})
fixBtn.addEventListener('click', () => {
    toolMenu_fix_delete.style.display = 'block';
    fixMenu.style.display = 'block';
    behindMenu.style.display = 'block';
})
deleteBtn.addEventListener('click', () => {
    toolMenu_fix_delete.style.display = 'block';
    deleteMenu.style.display = 'block';
    behindMenu.style.display = 'block';
})

closeBtn_tool_menu.addEventListener('click', () => {
    toolMenu.style.display = 'none';
    addMenu.style.display = 'none';
    fixMenu.style.display = 'none';
    deleteMenu.style.display = 'none';
    behindMenu.style.display = 'none';
})

closeBtn_tool_menu_fix_delete.addEventListener('click', () => {
    toolMenu_fix_delete.style.display = 'none';
    addMenu.style.display = 'none';
    fixMenu.style.display = 'none';
    deleteMenu.style.display = 'none';
    behindMenu.style.display = 'none';
})

// submitAddbtn.addEventListener('click', () => {
//     alert('Đã thêm.');
// })



behindMenu.addEventListener('click', () => {
    toolMenu.style.display = 'none';
    toolMenu_fix_delete.style.display = 'none';
    addMenu.style.display = 'none';
    fixMenu.style.display = 'none';
    deleteMenu.style.display = 'none';
    behindMenu.style.display = 'none';
})


headMenu.addEventListener('click', () => {
    headLogo.style.display = 'inline-flex';
    headSidebar.style.display = 'block';
    headSidebar_re.style.display = 'none';
    headMenu.style.display = 'none';
    headClosebtn.style.display = 'block';
    containerCss.style.gridTemplateColumns = '12rem 1fr';
})

headClosebtn.addEventListener('click', () => {
    headLogo.style.display = 'none';
    headSidebar.style.display = 'none';
    headSidebar_re.style.display = 'block';
    headMenu.style.display = 'block';
    headClosebtn.style.display = 'none';
    containerCss.style.gridTemplateColumns = '3.5rem 1fr';
})

headMenuMoblie.addEventListener('click', () => {
    headAside.style.display = 'block';
    headClosebtnMobile.style.display = 'block';
})

headClosebtnMobile.addEventListener('click', () => {
    headAside.style.display = 'none';
    headClosebtnMobile.style.display = 'none';
})



document.querySelectorAll('.container-content .grid-row').forEach(row => {
    row.addEventListener('click', function () {
        const spans = this.querySelectorAll('span');
        const isExpanded = this.classList.contains('expanded');
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
            this.classList.remove('expanded');
        } else {
            spans.forEach(span => {
                span.style.display = 'inline-block';
                span.style.borderBottom = '1px solid var(--color-dark)';
            });
            this.classList.add('expanded');
        }
    });
});


document.querySelectorAll('.container-content .grid-row-product').forEach(row => {
    row.addEventListener('click', function () {
        const spans = this.querySelectorAll('span');
        const isExpanded = this.classList.contains('expanded');
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
            this.classList.remove('expanded');
        } else {
            spans.forEach(span => {
                span.style.display = 'inline-block';
                span.style.borderBottom = '1px solid var(--color-dark)';
            });
            this.classList.add('expanded');
        }
    });
});

document.querySelectorAll('.container-content .grid-row-cart').forEach(row => {
    row.addEventListener('click', function () {
        const spans = this.querySelectorAll('span');
        const isExpanded = this.classList.contains('expanded');
        if (isExpanded) {
            spans.forEach((span, index) => {
                if (index > 2) {
                    span.style.display = 'none';
                    span.style.borderBottom = 'none';
                }
                else {
                    span.style.borderBottom = 'none';
                }
            });
            this.classList.remove('expanded');
        } else {
            spans.forEach(span => {
                span.style.display = 'inline-block';
                span.style.borderBottom = '1px solid var(--color-dark)';
            });
            this.classList.add('expanded');
        }
    });
});


// Ngăn sự kiện khi chỉnh sửa input
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('click', function (event) {
        event.stopPropagation(); // Ngăn sự kiện lan ra hàng cha
    });
});


document.querySelectorAll('.fix').forEach(button => {
    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Ngăn sự kiện lan ra hàng cha
        const input = this.previousElementSibling;
        if (input && input.disabled) {
            input.disabled = false;
            input.focus();
        }
    });
});
document.querySelectorAll('.fix-select').forEach(button => {
    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Ngăn sự kiện lan ra hàng cha
        const input = this.previousElementSibling;
        if (input && input.disabled) {
            input.disabled = false;
            input.focus();
        }
    });
});

document.querySelectorAll('select').forEach(input => {
    input.addEventListener('click', function (event) {
        event.stopPropagation(); // Ngăn sự kiện lan ra hàng cha
    });
});



//Fix Button trong Menu Fix

var fixButton = document.querySelectorAll('.tool-menu-fix-delete .row-element .fix');
var inputElement = document.querySelectorAll('.tool-menu-fix-delete .row-element input');
for (let i = 0; i < fixButton.length; i++) {
    fixButton[i].addEventListener('click', function() {
        if (inputElement[i].disabled) {
            inputElement[i].disabled = false;
            inputElement[i].focus();
            fixButton[i].innerHTML = '<img src="../image/check.png" alt="build" class="icon">';
        } else {
            inputElement[i].disabled = true;
            fixButton[i].innerHTML = '<img src="../image/build.png" alt="build" class="icon">';
        }
    });
};

var fixButtonSelect = document.querySelectorAll('.tool-menu-fix-delete .row-element .fix-select');
var selectElement = document.querySelectorAll('.tool-menu-fix-delete .row-element select');
for (let i = 0; i < fixButtonSelect.length; i++) {
    fixButtonSelect[i].addEventListener('click', function() {
        if (selectElement[i].disabled) {
            selectElement[i].disabled = false;
            selectElement[i].focus();
            fixButtonSelect[i].innerHTML = '<img src="../image/check.png" alt="build" class="icon">';
        } else {
            selectElement[i].disabled = true;
            fixButtonSelect[i].innerHTML = '<img src="../image/build.png" alt="build" class="icon">';
        }
    });
};

//Đặt disabled khi click Close
if (closeBtn_tool_menu_fix_delete) {
    closeBtn_tool_menu_fix_delete.addEventListener('click', function() {
        inputElement.forEach(function(input) {
            input.disabled = true;
        });
        fixButton.forEach(function(button) {
            button.innerHTML = '<img src="../image/build.png" alt="build" class="icon">';
        });
    });
}




document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Ngăn sự kiện lan ra hàng cha
        const input = this.previousElementSibling;
        if (input && input.disabled) {
            input.disabled = false;
            input.focus();
        }
    });
});

document.querySelectorAll('.tool-menu-fix-delete .grid-row').forEach(row => {
    row.addEventListener('click', function (event) {
        const rowElements = this.querySelectorAll('.row-element');
        const isExpanded = this.classList.contains('expanded');
        event.stopPropagation();
        if (isExpanded) {
            rowElements.forEach((element, index) => {
                if (index > 0) {
                    element.style.display = 'none';
                }
            });
            this.classList.remove('expanded');
        } else {
            rowElements.forEach(element => {
                element.style.display = 'grid';
            });
            this.classList.add('expanded');
        }
    });
});







