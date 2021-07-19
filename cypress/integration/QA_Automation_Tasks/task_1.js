//-------------------------------------------------------------------------------
//  QA Automation test task
//-------------------------------------------------------------------------------

import LogInPage from '../../support/PageObjects/TestLogInPage';

//----------- Handle errors + names + user credentials --------------------------

const ELEMENTS = {
    inputs: {
        username: 'username',
        password: 'password'
    },
    buttons: {
        signup: 'Sign-up',
        login: 'Login'
    }
}
let USER_CREDENTIALS = {
    usernames: {
        user_1: 'User_1'
    },
    passwords: {
        password_1: 'Password_1'
    }
}
const ERRORS = {
    error_1: 'No account found with that username.',
    error_2: 'Please enter username.',
    error_3: 'Please enter your password.'
}

//----------- Set data to Local Storage + PageObject assigning -------------------

window.localStorage.setItem('data', JSON.stringify(USER_CREDENTIALS));
let localSTdata = window.localStorage.getItem('data');
let localSTdataParsed = JSON.parse(localSTdata);
const logInPage = new LogInPage();

//----------- Test Task Executing ------------------------------------------------

context("Automation Test Task", () => {
    beforeEach(() => {
        logInPage.visit();
    })

    it(`Fill in the "Username" and "Password" input fields and click the ${ELEMENTS.buttons.signup} button`, () => {
        logInPage.typeEmail(localSTdataParsed.usernames.user_1);
        logInPage.typePassword(localSTdataParsed.passwords.password_1);
        logInPage.submit(ELEMENTS.buttons.signup);
    });

    it("Verify that all elements are presented on the page", () => {
        logInPage.verifyFields(ELEMENTS.inputs.username)
        logInPage.verifyFields(ELEMENTS.inputs.password)
        logInPage.verifyButtons(ELEMENTS.buttons.signup)
    });

    it('Create a tast case that will fail because of unsuccessful login (TestCase_1)', () => {
        logInPage.typeEmail(localSTdataParsed.usernames.user_1);
        logInPage.typePassword(localSTdataParsed.passwords.password_1);
        logInPage.submit(ELEMENTS.buttons.login);
        logInPage.verifyErrors(ERRORS.error_1);
    });

    it('Create a tast case that will fail because of unsuccessful login (TestCase_2)', () => {
        logInPage.submit(ELEMENTS.buttons.login);
        logInPage.verifyErrors(ERRORS.error_2);
        logInPage.verifyErrors(ERRORS.error_3);
    })

    it('Create a tast case that will fail because of unsuccessful login (TestCase_3)', () => {
        logInPage.typePassword(localSTdataParsed.passwords.password_1);
        logInPage.submit(ELEMENTS.buttons.login);
        logInPage.verifyErrors(ERRORS.error_2);
    });

    it('Create a tast case that will fail because of unsuccessful login (TestCase_4)', () => {
        logInPage.typeEmail(localSTdataParsed.usernames.user_1);
        logInPage.submit(ELEMENTS.buttons.login);
        logInPage.verifyErrors(ERRORS.error_3);
    });
})