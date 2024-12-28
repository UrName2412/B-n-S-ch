

var productsAPI = '../data/JSON/sanpham.json';

function start() {
    getProducts(function (products) {
        renderProducts(products);
    });
}

start();

//function
function getProducts(callback) {
    fetch(productsAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function renderProducts(products) {
    // Nội dung trong bảng
    var listProductsBlock = document.querySelector('#dataProducts');
    products.forEach(function (product) {
        // Tạo phần tử mới
        var newProduct = document.createElement('div');
        newProduct.className = 'grid-row-product';
        newProduct.innerHTML = `
            <textarea placeholder="Nhập nội dung..." readonly>${product.id}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${product.name}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${product.author}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${product.category}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${product.nxb}</textarea>
            <textarea placeholder="Nhập nội dung..." readonly>${product.total}</textarea>
            <div class="input-picture">
                <input type="file" name="picture" class="picture" placeholder="Chọn ảnh" onchange="displayFileName()" style="display: none;">
                <textarea placeholder="Nhập nội dung..." class="file-name" readonly>${product.picture}</textarea>
            </div>
            <div class="tool">
                <button type="button" class="fix">
                    <i class="fas fa-wrench"></i>
                </button>
                <button type="button" class="delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        // Thêm phần tử vào DOM
        listProductsBlock.appendChild(newProduct);
    });
    
    var deleteButtons = document.querySelectorAll('.delete');
    const stringModal = 'Bạn có chắc muốn xóa sản phẩm không?';
    const stringAlert = 'Đã xóa.';
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (event) => {
            var confirm = openModal(stringModal, stringAlert).then((result) => {
                if (result) {
                    if (deleteButton){
                        var gridRow = event.target.closest('.grid-row');
                        console.log(gridRow);
                        //Chưa xong
                    }
                }
            });
            
        });
    })

    var fixButtons = document.querySelectorAll('.fix');
    fixButtons.forEach((fixButton) => {
        fixButton.addEventListener('click', (event) => {
            var gridRowProduct = event.target.closest('.grid-row-product');
            var textAreas = gridRowProduct.querySelectorAll('textarea');
            if (gridRowProduct.classList.contains('fixed')) {
                textAreas.forEach((textArea) => {
                    textArea.readOnly = true;
                    textArea.classList.toggle('fixed');
                })
                fixButton.innerHTML = `<i class="fas fa-wrench"></i>`;
            } else {
                textAreas.forEach((textArea) => {
                    textArea.readOnly = false;
                    textArea.classList.toggle('fixed');
                })
                fixButton.innerHTML = `<i class="fas fa-check"></i>`;
            }
            gridRowProduct.classList.toggle('fixed');
            fixButton.classList.toggle('fixed');
        })
    })
}


// function displayFileName() {
//     const fileInput = document.querySelector('.picture');
//     console.log(fileInput);
//     const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : "Chưa chọn ảnh";
//     document.que('file-name').textContent = fileName;
// }
