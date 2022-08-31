import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { HarBruktNivaa4Type, Personalia, RegistreringData, SpraakTolk, VergeOgFullmakt } from '../../api/veilarbperson';
import { defaultNetworkResponseDelay } from '../config';

const mockHarBruktNivaa4: HarBruktNivaa4Type = {
    harbruktnivaa4: false
};

const mockPersonaliaV2: Personalia = {
    fornavn: 'GRØNN',
    mellomnavn: 'LIV',
    etternavn: 'STAFELLI',
    fodselsnummer: '10108000398',
    fodselsdato: '1990-09-16',
    dodsdato: '2021-09-16',
    diskresjonskode: '7',
    sikkerhetstiltak: 'Ansatte i samtale',
    egenAnsatt: true,
    kjonn: 'KVINNE'
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
                    etternavn: 'etternavn'
                },
                motpartsPersonident: '1234567890',
                omfang: 'Ivareta personens interesser innenfor det personlige og økonomiske området'
            },
            folkeregistermetadata: {
                ajourholdstidspunkt: '2021-03-02T13:00:42',
                gyldighetstidspunkt: '2021-03-02T13:00:42'
            }
        },
        {
            type: 'Fremtidsfullmakt',
            embete: 'Fylkesmannen i Agder',
            vergeEllerFullmektig: {
                navn: {
                    fornavn: 'fornavn',
                    mellomnavn: 'mellomnavn',
                    etternavn: 'etternavn'
                },
                motpartsPersonident: '1234567890',
                omfang: 'Ivareta personens interesser innenfor det personlige området'
            },
            folkeregistermetadata: {
                ajourholdstidspunkt: '2021-03-02T13:00:42',
                gyldighetstidspunkt: '2021-03-02T13:00:42'
            }
        }
    ],
    fullmakt: [
        {
            motpartsPersonident: '',
            motpartsRolle: '',
            omraader: [],
            gyldigFraOgMed: '',
            gyldigTilOgMed: ''
        }
    ]
};

const mockSpraakTolk: SpraakTolk = {
    tegnspraak: 'Norsk',
    talespraak: 'Engelsk'
};

const mockRegistrering: RegistreringData = {
    type: 'ORDINAER',
    registrering: {
        manueltRegistrertAv: null
    }
};

export const veilarbpersonHandlers: RequestHandlersList = [
    rest.get('/veilarbperson/api/person/registrering', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockRegistrering));
    }),
    rest.get('/veilarbperson/api/person/:fnr/harNivaa4', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockHarBruktNivaa4));
    }),
    rest.get('/veilarbperson/api/v2/person', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockPersonaliaV2));
    }),
    rest.get('/veilarbperson/api/v2/person/vergeOgFullmakt', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockVergeOgFullmakt));
    }),
    rest.get('/veilarbperson/api/v2/person/tolk', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockSpraakTolk));
    })
];
