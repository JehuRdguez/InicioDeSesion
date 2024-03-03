function login() {
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    if (correo !== '') {
        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `correo=${correo}&contrasena=${contrasena}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // alert(data.message);
                window.location.href = 'pages/dashboard.php';
            } else {
                // alert(data.message);
                errorInputInicio('Contraseña incorrecta');
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        errorInputInicio('Ambos campos son obligatorios');
    }
}

function registrarse() {
    const correo = document.getElementById('correoRegistro').value;
    const contrasena = document.getElementById('contrasenaRegistro').value;
    const nombre = document.getElementById('nombre').value;

    if (contrasena !== '' && nombre !== '' && correo !== '') {
        fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `correo=${correo}&contrasena=${contrasena}&nombre=${nombre}`,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registro exitoso");
                window.location.href = 'pages/dashboard.php';
            } else {
                errorInputRegistro('El correo ya está registrado',correo, contrasena, nombre);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        errorInputRegistro('Todos los campos son obligatorios',correo, contrasena, nombre);
    }
}



function errorInputInicio(mensaje) {
    const inputCorreo = document.getElementById("correo");
    const inputContra = document.getElementById("contrasena");

    if(mensaje == 'Contraseña incorrecta') {
        inputContra.value = '';
        inputCorreo.style.border = '1px solid #ced4da';
        inputContra.classList.add('shake');
        inputContra.style.border = '1px solid red';

        const errorDiv = document.getElementById('errorInput');
        errorDiv.innerHTML = mensaje;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '11px';
        errorDiv.style.marginTop = '5px';
    } else {
        inputCorreo.classList.add('shake');
        inputCorreo.style.border = '1px solid red';
        inputContra.classList.add('shake');
        inputContra.style.border = '1px solid red';
        
        const errorDiv = document.getElementById('errorInput');
        errorDiv.innerHTML = mensaje;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '11px';
        errorDiv.style.marginTop = '5px';
    }
    setTimeout(function() {
        inputCorreo.classList.remove('shake');
        inputContra.classList.remove('shake');
        }, 500);
}

function errorInputRegistro(mensaje, correo, contrasena, nombre) {
    const errorCorreoRegistro = document.getElementById('errorCorreoRegistro');
    const inputCorreoRegistro = document.getElementById('correoRegistro');
    const nombreRegistro = document.getElementById('nombre');
    const contrasenaRegistro = document.getElementById('contrasenaRegistro');
    const errorCamposRegistro = document.getElementById('errorCamposRegistro');


    if(mensaje == 'El correo ya está registrado') {
        inputCorreoRegistro.classList.add('shake');
        inputCorreoRegistro.style.border = '1px solid red';
    
        errorCorreoRegistro.innerHTML = 'El correo ya está registrado';
        errorCorreoRegistro.style.color = 'red';
        errorCorreoRegistro.style.fontSize = '11px';
        errorCorreoRegistro.style.marginTop = '5px';

        nombreRegistro.style.border = '1px solid #ced4da';
        contrasenaRegistro.style.border = '1px solid #ced4da';
        errorCamposRegistro.innerHTML = '';

    } else {
        errorCorreoRegistro.innerHTML = '';
        inputCorreoRegistro.style.border = '1px solid #ced4da';
    }
    if(mensaje == 'Todos los campos son obligatorios') {
        if(correo ==''){
            inputCorreoRegistro.classList.add('shake');
            inputCorreoRegistro.style.border = '1px solid red';
            } else {
                inputCorreoRegistro.style.border = '1px solid #ced4da';
            }
            if(nombre == ''){
            nombreRegistro.classList.add('shake');
            nombreRegistro.style.border = '1px solid red';
            } else {
                nombreRegistro.style.border = '1px solid #ced4da';
            }
            if (contrasena == ''){
            contrasenaRegistro.classList.add('shake');
            contrasenaRegistro.style.border = '1px solid red';    
            } else {
                contrasenaRegistro.style.border = '1px solid #ced4da';
            }
            errorCamposRegistro.innerHTML = 'Todos los campos son obligatorios';
            errorCamposRegistro.style.color = 'red';
            errorCamposRegistro.style.fontSize = '11px';
            errorCamposRegistro.style.marginTop = '5px';
    } else {
        errorCamposRegistro.innerHTML = '';
    }

    setTimeout(function() {
        errorCorreoRegistro.classList.remove('shake');
        inputCorreoRegistro.classList.remove('shake');
        nombreRegistro.classList.remove('shake');
        contrasenaRegistro.classList.remove('shake');
        errorCamposRegistro.classList.remove('shake');
        }, 500);
}


