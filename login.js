 /* /// <reference path="../steps.d.ts" /> */

const faker = require('faker');
const utils = require('./help_files/utils');
const try_acsess = require('./help_files/utils');

Feature('Базовый функционал входа и выхода из личног аккаунта');

Before((I) => {
    I.amOnPage(utils.singInPath());
});

Scenario('Проверить доступ к странице авторизации ', (I) => {
    I.see('Sign in');
    I.see('Email');
});

Scenario('Проверить вход в личный кабинет существующего пользователя', (I) => {
    const user = { 
        username: process.env.BOOKING_EMAIL,
        password: process.env.BOOKING_PASSWORD
    };
    utils.login(I, user);
});

Scenario('Проверить вход в систему несуществующего пользователя', (I) => {
    const user = {
        username: faker.internet.email()
    };

    try_acsess.not_exist_user(I, user);
});

Scenario('Проверить вход в систему с некорректным паролем', (I) => {
    const user = {
        username: process.env.BOOKING_EMAIL,
        password: faker.internet.password()
    };
    
    try_acsess.not_exist_user(I, user);
});

Scenario('Проверить возможность выйти из системы администрирования', (I) => {
    const user = { 
        username: process.env.BOOKING_EMAIL,
        password: process.env.BOOKING_PASSWORD
    };

    utils.login(I, user);

    I.click('Extranet Login');
    I.waitForText('Sign In to Manage Your Property');
    I.see('Sign In to Manage Your Property');
});
