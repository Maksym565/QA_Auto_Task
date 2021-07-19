// -----------------------------------------------------------------------

const SELECTORS = {
    link: 'https://www.pecodesoftware.com/qa-portal/greet.php',
    errors: '.has-error',
    buttons: '.btn',
    fields: '.form-control',
    fieldUsername: ':nth-child(1) > .form-control',
    filedPassword: ':nth-child(2) > .form-control',
}

// -----------------------------------------------------------------------

class LogInPage {
    visit() {
      cy.visit(SELECTORS.link);
    }
  
    verifyErrors(error){
      cy.get(SELECTORS.errors).invoke('text').should('include', error)
    }

    verifyFields(name){
      cy.get(SELECTORS.fields).then(fields => {
        let field;
        let isField = false;
          for(let i = 0; i < name.length; i++){
              field = fields[i].name;
              if(field === name){
                isField = true;
                break;
              }     
          }
          expect(isField).to.be.equal(true);  
      })
    }

    verifyButtons(name){
      cy.get(SELECTORS.buttons).then(buttons => {
        let isButtonSignUp = false;
        let button;
            for(let i = 0; i < buttons.length; i++){
                button = buttons[i];
                    if(button.value === name){
                        isButtonSignUp = true;
                        break;
                    }
            }
        expect(isButtonSignUp).to.be.equal(true)
    })
    }
  
    typeEmail(value) {
      const field = cy.get(SELECTORS.fieldUsername);
      field.clear();
      field.type(value);
      return this;
    }
  
    typePassword(value) {
      const field = cy.get(SELECTORS.filedPassword);
      field.clear();
      field.type(value);
      return this;
    }
  
    submit(name) {
      const button = cy.get(SELECTORS.buttons);
      button.contains(name).click()
    }
  }
  
  export default LogInPage;