import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { HarBruktNivaa4Type, Personalia, SpraakTolk, VergeOgFullmakt } from '../../api/veilarbperson';

const mockHarBruktNivaa4: HarBruktNivaa4Type = {
    harbruktnivaa4: false,
};

const mockPersonalia: Personalia = {
    fornavn: 'BRUCE BRUCE',
    mellomnavn: 'BATTY BATTY',
    etternavn: 'WAYNE',
    fodselsnummer: '10108000398',
    fodselsdato: '1974-09-16',
    dodsdato: null,
    diskresjonskode: null,
    sikkerhetstiltak: 'To ansatte i samtale',
    egenAnsatt: false,
    kjonn: 'K',
};

const mockPersonaliaV2: Personalia = {
    fornavn: 'GRØNN',
    mellomnavn: 'LIV',
    etternavn: 'STAFELLI',
    fodselsnummer: '10108000398',
    fodselsdato: '1990-09-16',
    dodsdato: null,
    diskresjonskode: null,
    sikkerhetstiltak: 'Ansatte i samtale',
    egenAnsatt: true,
    kjonn: 'M',
};

const mockVergeOgFullmakt: VergeOgFullmakt = {
    vergemaalEllerFremtidsfullmakt: [
        {
            type: 'Enslig mindreårig asylsøker',
            embete: 'Fylkesmannen i Agder',
            vergeEllerFullmektig: {
                navn: {
                    fornavn: 'fornavn',
                    mellomnavn: 'mellomnavn',
                    etternavn: 'etternavn',
                },
                motpartsPersonident: '1234567890',
                omfang: 'Ivareta personens interesser innenfor det personlige og økonomiske området',
            },
            folkeregistermetadata: {
                ajourholdstidspunkt: '2021-03-02T13:00:42',
                gyldighetstidspunkt: '2021-03-02T13:00:42',
            },
        },
        {
            type: 'Fremtidsfullmakt',
            embete: 'Fylkesmannen i Agder',
            vergeEllerFullmektig: {
                navn: {
                    fornavn: 'fornavn',
                    mellomnavn: 'mellomnavn',
                    etternavn: 'etternavn',
                },
                motpartsPersonident: '1234567890',
                omfang: 'Ivareta personens interesser innenfor det personlige området',
            },
            folkeregistermetadata: {
                ajourholdstidspunkt: '2021-03-02T13:00:42',
                gyldighetstidspunkt: '2021-03-02T13:00:42',
            },
        },
    ],
    fullmakt: [],
};

const mockSpraakTolk: SpraakTolk = {
    tegnspraak: 'Norsk',
    talespraak: 'Engelsk',
};

export const veilarbpersonHandlers: RequestHandlersList = [
    rest.get('/veilarbperson/api/person/:fnr', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockPersonalia));
    }),
    rest.get('/veilarbperson/api/person/:fnr/harNivaa4', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockHarBruktNivaa4));
    }),
    rest.get('/veilarbperson/api/v2/person', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockPersonaliaV2));
    }),
    rest.get('/veilarbperson/api/v2/person/vergeOgFullmakt', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockVergeOgFullmakt));
    }),
    rest.get('/veilarbperson/api/v2/person/tolk', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockSpraakTolk));
    }),
];
