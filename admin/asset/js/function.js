function openToolMenu(){
    var toolMenu = document.getElementById("tool-menu");
    var behindMenuModal = document.querySelector(".behindMenuModal");
    var closeButton = document.getElementById("close-tool-menu");

    behindMenuModal.style.display = 'block';
    toolMenu.style.display = 'block';

    behindMenuModal.addEventListener('click', closeToolMenu);
    closeButton.addEventListener('click', closeToolMenu);
    
    function closeToolMenu(){
        behindMenuModal.style.display = 'none';
        toolMenu.style.display = 'none';
    }
}


// var behindMenuModal = document.createElement('div');
// behindMenuModal.className='behindMenuModal';
// behindMenuModal.style.display = 'none';
// console.log(behindMenuModal);