import {
    HarBruktNivaa4Type,
    Personalia,
    PersonaliaTelefon,
    RegistreringData,
    SpraakTolk,
    Verge,
    FullmaktDTO,
    OmraadeHandlingType
} from '../../api/veilarbperson';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

const mockHarBruktNivaa4: HarBruktNivaa4Type = {
    harbruktnivaa4: false
};

const mockTelefon: PersonaliaTelefon[] = [
    {
        prioritet: '1',
        telefonNr: '+4746333333',
        registrertDato: '10.07.2008',
        master: 'FREG'
    },
    {
        prioritet: '2',
        telefonNr: '80022222',
        registrertDato: '10.04.2010',
        master: 'KRR'
    },
    {
        prioritet: '3',
        telefonNr: '44222444',
        registrertDato: null,
        master: 'PDL'
    }
];

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
    kjonn: 'KVINNE',
    telefon: mockTelefon
};

const mockVerge: Verge = {
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
    ]
};

const mockFullmakt: FullmaktDTO = {
    fullmakt: [
        {
            fullmaktsgiver: '19827397213',
            fullmektig: '04877498455',
            omraade: [
                {
                    tema: 'Oppfølging',
                    handling: [OmraadeHandlingType.LES, OmraadeHandlingType.SKRIV, OmraadeHandlingType.KOMMUNISER]
                }
            ],
            gyldigFraOgMed: '2024-06-04',
            gyldigTilOgMed: '2025-05-31',
            fullmaktsgiverNavn: 'SMAL ARK',
            fullmektigsNavn: 'IDIOTSIKKER PERSILLE'
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

export const veilarbpersonHandlers: RequestHandler[] = [
    http.post('/veilarbperson/api/v3/person/hent-registrering', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockRegistrering);
    }),
    http.get('/veilarbperson/api/person/:fnr/harNivaa4', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockHarBruktNivaa4);
    }),
    http.post('/veilarbperson/api/v3/hent-person', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockPersonaliaV2);
    }),
    http.post('/veilarbperson/api/v3/person/hent-vergeOgFullmakt', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockVerge);
    }),
    http.post('/veilarbperson/api/v3/person/hent-fullmakt', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockFullmakt);
    }),
    http.post('/veilarbperson/api/v3/person/hent-tolk', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockSpraakTolk);
    })
];
