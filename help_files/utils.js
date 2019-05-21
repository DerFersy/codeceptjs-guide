const mainPath = function() {
    return 'https://www.booking.com/index.en-gb.html?'
}

const singInPath = function() {
    return 'https://account.booking.com/sign-in?'
}

const login = (async (I, user) => {
    I.amOnPage(singInPath());
    let cookie = await I.grabCookie('_gid');
    if (cookie && cookie.value) {
        return;
    }
    I.see('Booking.com account');
    I.fillField('username', user.username);
    I.click('Next');
    I.fillField('password', user.password);
    I.click('Sign in');

    I.see('Your account');
});

function not_exist_user (I, user) {
    I.see('Booking.com account');
    I.fillField('username', user.username);
    I.click('Next');
    I.see('Make sure the email address you entered is correct.');
}

module.exports.login = login;
module.exports.mainPath = mainPath;
module.exports.singInPath = singInPath;
module.exports.not_exist_user = not_exist_user;