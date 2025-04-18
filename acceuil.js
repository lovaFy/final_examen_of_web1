document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginForm");
    
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault(); 

            const username = document.getElementById('Username').value;
            const password = document.getElementById('password').value;
            const errorMessage=document.getElementById('error-message');

            if (username === 'Fitiavana' && password === 'angela123') {
                setTimeout(() => {
                    window.location.href = 'vanilla.html';
                }, 2000);
            } else {
                errorMessage.textContent = 'Email or password invalid';
                errorMessage.style.backgroundColor = 'orange';
                errorMessage.style.padding = '8px';
                errorMessage.style.marginTop = '8px';
            
               
                setTimeout(() => {
                  errorMessage.textContent = '';
                }, 3000);
            }
        });
    } else {
        console.error("Le formulaire n'a pas été trouvé !");
    }
});