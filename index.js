const getUserBtn = document.querySelector('#getUser');
const card = document.querySelector('.card');

function getInfo(url, cb) {
    try {
        const request = new XMLHttpRequest();
        request.open('GET', url);

        request.addEventListener('load', () => {
            if (Math.floor(request.status / 100) !== 2) {
                cb(`Error. Status code: ${request.status}`, request);
                return;
            }
            
            const response = JSON.parse(request.responseText);
            cb(null, response);
        });
        request.send();
    } catch (error) {
        cb(`Error. Status code: ${request.status}`, request);
    }
};

function onGetUsersCallback(err, res) {
    if (err) {
        console.log(err);
        return;
    }
    if (!res.users.length) {
        console.log('No results.');
        return;
    }
    getUserBtn.setAttribute('usersCount', res.users.length);
};

function onGetUserInfoCallback(err, user) {
    if (err) {
        console.log(err);
        return;
    }
    if (!user.id) {
        console.log('User not found.');
        return;
    }
    renderUserInfo(user);
};

document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://dummyjson.com/users';
    getInfo(url, onGetUsersCallback);

    getUserBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (!this.hasAttribute('usersCount')) {
            return;
        }
        const usersCount = parseInt(this.getAttribute('usersCount'));

        const randomUserId = Math.floor(Math.random() * usersCount) + 1;
        console.log(randomUserId);
        getInfo(`${url}/${randomUserId}`, onGetUserInfoCallback);
    })
});

function renderUserInfo(user) {
    userTemplate(user);
};

function userTemplate({ firstName, lastName, age, birthDate, gender, email, image, company: { name } }) {
    const userImage = card.querySelector('.card-img-top');
    const cardTitle = card.querySelector('.card-title');
    const userBirthdate = card.querySelector('.userBirthdate > span');
    const userGender = card.querySelector('.userGender > span');
    const userCompany = card.querySelector('.userCompany');
    const userEmail = card.querySelector('.card-link');
    
    userImage.src = image;
    cardTitle.innerText = `${firstName} ${lastName}, ${age}`;
    userBirthdate.innerText = `${birthDate}`;
    userGender.innerText = `${gender}`;
    userName.innerText = `${name}`;
    userEmail.href = `mailto:${email}`;
    userEmail.innerText = `${email}`;
};



