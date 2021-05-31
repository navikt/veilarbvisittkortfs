Cypress.Commands.add('configure', () => {
    cy.server();
    cy.visit('/').wait(1000);
    Cypress.on('uncaught:exception', err => {
        console.log(err);
        return false;
    });
});

Cypress.Commands.add('getByTestId', (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args);
});

Cypress.Commands.add('fillArbeidsliste', (arbeidslisteKategori) => {
    let arbeidslisteTittel = 'Arbeidsliste tittel';
    let arbeidslisteKommentar = 'Arbeidsliste kommentar';
    let fristDato = '01.06.2021';

    return (
        cy.getByTestId('arbeidsliste-tittel').type(arbeidslisteTittel).should('have.value', arbeidslisteTittel) &&
        cy.getByTestId('arbeidsliste-kommentar').type(arbeidslisteKommentar).should('have.value', arbeidslisteKommentar) &&
        cy.get('#frist').type(fristDato).should('have.value', fristDato) &&
        cy.get('[data-testid="arbeidslistekategori"]').find(`#${arbeidslisteKategori}`).check({force:true}).should('be.checked')
    )
});

Cypress.Commands.add('redigerArbeidsliste', (arbeidslisteKategori) => {
    let arbeidslisteTittel = 'Arbeidsliste tittel';
    let arbeidslisteKommentar = 'Arbeidsliste kommentar';
    let redigerte = 'Redigerte ';

    return (
        cy.getByTestId('arbeidsliste-tittel').as('arbeidsliste-tittel') &&
        cy.getByTestId('arbeidsliste-kommentar').as('arbeidsliste-kommentar') &&
        cy.get('@arbeidsliste-tittel').should('have.value', arbeidslisteTittel) &&
        cy.get('@arbeidsliste-tittel').clear().should('have.value', '') &&
        cy.get('@arbeidsliste-tittel').type(redigerte + arbeidslisteTittel).should('have.value', redigerte + arbeidslisteTittel) &&
        cy.get('@arbeidsliste-kommentar').should('have.value', arbeidslisteKommentar) &&
        cy.get('@arbeidsliste-kommentar').clear().should('have.value', '') &&
        cy.getByTestId('arbeidsliste-kommentar').type(redigerte + arbeidslisteKommentar).should('have.value', redigerte + arbeidslisteKommentar) &&
        cy.get('[data-testid="arbeidslistekategori"]').find(`[value=${arbeidslisteKategori}]`).check({force:true}).should('be.checked')
    )
});

Cypress.Commands.add('redigerArbeidslisteIkon', (arbeidslisteKategori) =>
     cy.get('[data-testid="arbeidslistekategori"]').find(`[value=${arbeidslisteKategori}]`).check({force:true}).should('be.checked')
);

Cypress.Commands.add('velgFraVeilederVerktoy', (aktivitet) => {
    cy.getByTestId('veiledervektoy-dropdownBtn').contains('Veilederverktøy').should('be.visible').click({force:true}).then(() =>
        cy.getByTestId('veiledervektoy-dropdown__innhold').contains('li', aktivitet).realClick())
});



