function valideForm() {
    const regexp_name = /^[a-zа-яё]+$/gi,
        regexp_email = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
        regexp_phone = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{2}){2}$/,
        regexp_message = /[a-zа-яё0-9]/;

    let name = document.getElementsByName('name')[0].value,
        email = document.getElementsByName('email')[0].value,
        phone = document.getElementsByName('phone')[0].value,
        message = document.getElementsByName('message')[0].value;

    if(regexp_name.test(name) === true) {
        document.getElementById('name').className = 'valide_val';
    } else {
        document.getElementById('name').className = 'invalide_val';
    }

    if(regexp_phone.test(phone) === true) {
        document.getElementById('phone').className = 'valide_val';
    } else {
        document.getElementById('phone').className = 'invalide_val';
    }

    if(regexp_email.test(email) === true) {
        document.getElementById('email').className = 'valide_val';
    } else {
        document.getElementById('email').className = 'invalide_val';
    }

    if(regexp_message.test(message) === true) {
        document.getElementById('message').className = 'valide_val';
    } else {
        document.getElementById('message').className = 'invalide_val';
    }
}

document.querySelector('.button').addEventListener("click", valideForm);
document.querySelector('.button_reset').addEventListener("click", evt => {
    if (evt.target.name === 'btn') {
        document.location.reload(true);
    }
});
