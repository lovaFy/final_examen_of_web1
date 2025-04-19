document.addEventListener("DOMContentLoaded", function () {
    const papillon = document.getElementById('papillon');

    papillon.addEventListener('animationend', function () {
        window.location.href = "accueil.html";
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const papillon = document.getElementById('papillons');
    const loading = document.querySelector('.loading');

    loading.style.display = 'none';

    papillon.addEventListener('animationend', function () {
        loading.style.display = 'block';
        loading.style.position = 'absolute';
        loading.style.top = '50%';
        loading.style.left = '50%';
        loading.style.transform = 'translate(-50%, -50%)';

        setTimeout(() => {
            window.location.href = "accueil.html";
        }, 5000);
    });
});
