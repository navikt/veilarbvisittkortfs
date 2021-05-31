before('Start server', () => {
    cy.configure();

    cy.location().should(location => {
        expect(location.href).to.eq('http://localhost:3042/');
    });
});


it('Validerer arbeidslisteform', () => {
    cy.get('[data-testid=arbeidsliste-knapp]').realClick().then(() => {
        cy.get('[aria-label=veilederverktoy-modal]').within(() => {
            cy.get('[data-testid=modal-header]').contains('Legg i arbeidsliste');
            cy.get('[data-testid=arbeidsliste-form]').within(($arbeidslisteForm)=> {
                cy.wrap($arbeidslisteForm).submit().then(() => {
                    cy.contains('Du må fylle ut en tittel');
                    cy.contains('Du må fylle ut en kommentar');
                    cy.contains('Avbryt').click({force:true});
                });
            })
        })
    })
});

context('Tester ulike arbeidslistekategori', ()=> {
    it('Tester tom arbeidslistekategori-ikon', () => {
        cy.get('[data-testid=arbeidsliste-knapp]').as('arbeidsliste-knapp').realClick().then(() => {
            cy.get('[data-testid=modal-header]').contains('Legg i arbeidsliste');
            cy.get('[data-testid=arbeidsliste-form]').as('arbeidsliste-form').within(() =>
                cy.contains('Avbryt').click({force: true}).then(() =>
                    cy.get('@arbeidsliste-knapp').find('#Arbeidslistekategori_tom').contains('Flagg filled')))
        })
    });

    it('Lager arbeidsliste med blå arbeidslistekategori', () => {
        cy.get('[data-testid=arbeidsliste-knapp]').as('arbeidsliste-knapp').realClick().then(() => {
            cy.get('[data-testid=modal-header]').contains('Legg i arbeidsliste');
            cy.get('[data-testid=arbeidsliste-form]').as('arbeidsliste-form').within(() =>
                cy.fillArbeidsliste('BLA').then(() =>
                    cy.get('@arbeidsliste-form').submit().then(() =>
                        cy.get('@arbeidsliste-knapp').contains('svg>.currentLayer', 'Blått arbeidslisteikon'))))
        })
    });

    const arbeidsliste = [
        {ikonFarge: 'GUL', ikonTekst: 'Gult'},
        {ikonFarge: 'LILLA', ikonTekst: 'Lilla'},
        {ikonFarge: 'GRONN', ikonTekst: 'Grønt'}
    ];

    arbeidsliste.map((arbeidsliste, index) => {
        it(`Rediger arbeidsliste med ${arbeidsliste.ikonFarge.toLowerCase()} arbeidslistekategori`, () => {
            cy.get('[data-testid=arbeidsliste-knapp]').as('arbeidsliste-knapp').realClick().then(() => {
                cy.get('[data-testid=modal-header]').contains('Rediger arbeidsliste');
                cy.get('[data-testid=arbeidsliste-form]').as('arbeidsliste-form').within(() =>
                    cy.redigerArbeidslisteIkon(`${arbeidsliste.ikonFarge}`).then(() =>
                        cy.get('@arbeidsliste-form').submit().then(() =>
                            cy.get('@arbeidsliste-knapp').contains('svg>.currentLayer', `${arbeidsliste.ikonTekst} arbeidslisteikon`))))
            })
        })
    });

    it('Fjern arbeidsliste', () => {
        cy.get('[data-testid=arbeidsliste-knapp]').as('arbeidsliste-knapp').should('not.contain','#Arbeidslistekategori_tom').realClick().then(()=> {
            cy.get('[data-testid=modal-header]').contains('Rediger arbeidsliste');
            cy.get('[data-testid=arbeidsliste-form]').contains('Fjern').click({force:true}).then(()=> {
                cy.get('[aria-label="Fjern fra arbeidslisten"]').as('bekreft-modal').should('be.visible').and('contain','Fjern fra arbeidsliste');
                cy.get('@bekreft-modal').contains('Bekreft').realClick();
            });
            cy.get('@arbeidsliste-knapp').find('#Arbeidslistekategori_tom');
        })
    })
});

it('Kopiere fødselsnummer', () => {
    cy.get('[data-testid=kopier-knapp]').realClick().then(() => {
        cy.get('span.kopier-knapp__tooltip')
            .invoke('attr', 'style', 'tooltip--visible:true')
            .contains('Kopiert fødselsnummer');
    });
});

it('Tester etiketter', () => {
    cy.fixture('etiketter').then((etiketter) => {
        cy.get('[data-testid=etikett-container]').children().each(($child, index, $list) => {
            etiketter.map((etikett, index) => {
                if ($child.find('span').text() === etikett.tekst) {
                    cy.wrap($child).should('be.visible').and('have.text', etikett.tekst).and('have.class', `etikett--${etikett.css}`)
                }
            })
        })
    })
});
