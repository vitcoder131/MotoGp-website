const menuIcon = document.getElementById('menu-icon');
const sideMenu = document.getElementById('side-menu');
const closeBtn = document.getElementById('close-btn');

menuIcon.addEventListener('click', () => {
    sideMenu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});



//xu ly anh 
function previewImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById('preview');

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        }

        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
}