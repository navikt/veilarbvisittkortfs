import { VeilederData, VeilederListe } from '../../api/veilarbveileder';

function lagVeileder(): VeilederData {
    const fornavn = 'Herpsderps';
    const etternavn = 'Apabepa';

    const id = 'Z' + (Math.floor(Math.random() * 1000000) + 100000);

    return {
        ident: id,
        navn: fornavn + ' ' + etternavn,
        fornavn: fornavn,
        etternavn: etternavn
    };
}

const veilederMedVeldigKortNavn: VeilederData = {
    ident: 'Å123456',
    navn: 'Jo Å',
    fornavn: 'Jo',
    etternavn: 'Å'
};

const veilederMedVeldigLangtNavn: VeilederData = {
    ident: 'H123456',
    navn: 'Albus Parsifal Ulfrik Brian Humlesnurr',
    fornavn: 'Albus Parsifal Ulfrik Brian',
    etternavn: 'Humlesnurr'
};

const mangeLikeVeiledere = new Array(40).fill(0).map(() => lagVeileder());

export const mockEnhetVeiledere: VeilederListe = {
    veilederListe: [veilederMedVeldigKortNavn, veilederMedVeldigLangtNavn, ...mangeLikeVeiledere]
};
