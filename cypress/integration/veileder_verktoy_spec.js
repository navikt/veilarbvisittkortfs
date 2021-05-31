before('Start server', () => {
    cy.configure();
    cy.location().should(location => {
        expect(location.href).to.eq('http://localhost:3042/');
    });
});

    it('Tester "Legg i arbeidsliste" fra veilederverktøy', () => {
        cy.velgFraVeilederVerktoy('Legg i arbeidsliste');
        cy.get('[aria-label=veilederverktoy-modal]').within(() => {
            cy.get('[data-testid=modal-header]').contains('Legg i arbeidsliste');
            cy.fillArbeidsliste('BLA');
            cy.get('[data-testid=arbeidsliste-form]').submit();
        });
        cy.get('[data-testid=arbeidsliste-knapp]').contains('svg>.currentLayer', 'Blått arbeidslisteikon');
    });

    it('Tester "Tildel veileder" fra veilederverktøy', () => {
        cy.velgFraVeilederVerktoy('Tildel veileder');
        cy.get('[aria-label=veilederverktoy-modal]').within(() => {
            cy.get('[data-testid=modal-header]').contains('Tildel veileder');
            cy.getByTestId('tildelVeilederSubmit').as('tildelVeilederSubmit').should('be.disabled');
            cy.getByTestId('radio-filterform__valg').find('input[type=radio]:first').check({force: true});
            cy.get('@tildelVeilederSubmit').should('be.enabled').click({force: true});
        });
        cy.get('[aria-label="Vellykket tildeling"]').should('be.visible').find('[aria-label="Lukk"]').realClick();
    });

    it('Tester "Endre til manuell oppfølging" fra veilederverktøy', () => {
        const begrunnelse = "Bruker ønsker seg manuell oppfølging";
        const antallTegnIgjen = 500 - begrunnelse.length;

        cy.velgFraVeilederVerktoy('Endre til manuell oppfølging');
        cy.get('[aria-label="Begrunnelse modal"]').within(() => {
            cy.getByTestId('modal-header').contains('Endre til manuell oppfølging');
            cy.getByTestId('manuell-oppfolging-infotekst').should('be.visible');
            cy.getByTestId('manuell-oppfolging-form').as('manuell-oppfolging-form').within(($form) => {
                cy.get('#begrunnelse').type(begrunnelse).should('contain', begrunnelse);
                cy.contains('span.teller-tekst',`Du har ${antallTegnIgjen} tegn igjen`);
                cy.get($form).submit()
            });
        });
        cy.get('[aria-label="Operasjon fullført"]').as('manuell-oppfolging-kvittering').contains('Endring til manuell oppfølging er gjennomført');
        cy.get('@manuell-oppfolging-kvittering').find('[aria-label="Lukk"]').click({force: true});
    });

    it('Tester "Start KVP-periode" fra veilederverktøy', () => {
        const begrunnelse = "Bruker har flyttet til ny enhet";
        const antallTegnIgjen = 250 - begrunnelse.length;

        cy.velgFraVeilederVerktoy('Start KVP-periode');
        cy.get('[aria-label="Begrunnelse modal"]').within(() => {
            cy.getByTestId('modal-header').contains('Start periode i Kvalifiseringsprogrammet (KVP)');
            cy.getByTestId('start-kvp-infotekst').should('be.visible');
            cy.getByTestId('start-kvp-form').within(($form) => {
                cy.get('textarea#begrunnelse').type(begrunnelse).should('contain', begrunnelse);
                cy.contains('span.teller-tekst', `Du har ${antallTegnIgjen} tegn igjen`);
                cy.get($form).submit()
            })
        });
        cy.get('div[aria-label="Operasjon fullført"]').as('kvp-kvittering').should(($kvpKvittering)=> {
            expect($kvpKvittering).to.contain('Start periode i Kvalifiseringsprogrammet (KVP)');
            expect($kvpKvittering).to.contain('Du har startet en KVP-periode for brukeren. Bare veiledere i din enhet har nå tilgang til dialoger, ' +
                'aktiviteter og mål som blir opprettet i KVP-perioden.');
        });
        cy.get('@kvp-kvittering').find('button[aria-label="Lukk"]').click({force: true});
    });

    it('Tester "Opprett Gosys-oppgave" fra veilederverktøy', () => {
        const beskrivelse = "Bruker har behov for opppfølging";

        cy.velgFraVeilederVerktoy('Opprett Gosys-oppgave');
        cy.get('[aria-label="Opprett gosys oppgave"]').within(() => {
            cy.getByTestId('modal-header').contains('Opprett en Gosys-oppgave');
            cy.getByTestId('opprett-oppgave-form').within(($form) => {
                cy.get('select#tema').select('Dagpenger').should('have.value', 'DAGPENGER');
                cy.get('select#type').select('Vurder konsekvens for ytelse').should('have.value', 'VURDER_KONSEKVENS_FOR_YTELSE');
                cy.get('select#prioritet').select('Lav').should('have.value', 'LAV');
                cy.getByTestId('velg-enhet-dropdownBtn').click({force: true});
                cy.getByTestId('velg-enhet-dropdown__innhold').find('input[type="radio"]:last').check({force: true}).type('{esc}');
                cy.getByTestId('beskrivelse').type(beskrivelse).should('have.value', beskrivelse);
                cy.get($form).submit()
            })
        });
        cy.get('div[aria-label="Operasjon fullført"]').as('gosys-oppgave-kvittering').should('be.visible');
        cy.get('@gosys-oppgave-kvittering').contains('Opprett en Gosys-oppgave');
        cy.get('@gosys-oppgave-kvittering').find('button[aria-label="Lukk"]').click({force: true});
    });

    it('Tester "Avslutt oppfølging" fra veilederverktøy', () => {
        let begrunnelse = "Bruker har ikke behov for oppfolging lenge";
        const antallTegnIgjen = 500 - begrunnelse.length;

        cy.velgFraVeilederVerktoy('Avslutt oppfølging');
        cy.getByTestId('modal-header').contains('Avslutt oppfølgingsperioden');
        cy.getByTestId('avslutt-oppfolging-form').within(($form) => {
            cy.get('#begrunnelse').type(begrunnelse).should('contain', begrunnelse);
            cy.get('span.teller-tekst').contains(`Du har ${antallTegnIgjen} tegn igjen`);
            cy.get($form).submit()
        }).then(() => {
            cy.get('div[role="dialog"]').should('be.visible').and('have.attr', 'aria-label', 'Bruker kan ikke varsles');
            cy.getByTestId('bekreft-avslutt-oppfolging').contains('Bekreft').click({force: true});
        }).then(() => {
            cy.get('[aria-label="Operasjon fullført"]').as('avslutt-oppfolging-kvittering').should('be.visible');
            cy.get('@avslutt-oppfolging-kvittering').contains('Avslutt oppfølging fra NAV');
            cy.get('@avslutt-oppfolging-kvittering').contains('Oppfølgingsperioden er nå avsluttet.');
            cy.get('@avslutt-oppfolging-kvittering').find('button[aria-label="Lukk"]').click({force: true});
        })
    });

