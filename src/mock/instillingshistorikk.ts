import { InnstillingsHistorikk } from '../types/innstillings-historikk';
import { JSONValue } from 'yet-another-fetch-mock';

const innstillingsHistorikk: InnstillingsHistorikk[] & JSONValue = [{
    'type': 'AVSLUTTET_OPPFOLGINGSPERIODE',
    'dato': '2018-08-14T13:56:53.813+02:00',
    'begrunnelse': 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': null,
    'dialogId': null
}, {
    'type': 'AVSLUTTET_OPPFOLGINGSPERIODE',
    'dato': '2018-10-30T12:23:48.116+01:00',
    'begrunnelse': 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': null,
    'dialogId': null
}, {
    'type': 'AVSLUTTET_OPPFOLGINGSPERIODE',
    'dato': '2018-09-03T13:17:41.325+02:00',
    'begrunnelse': 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': null,
    'dialogId': null
}, {
    'type': 'AVSLUTTET_OPPFOLGINGSPERIODE',
    'dato': '2019-01-28T09:30:23.76+01:00',
    'begrunnelse': 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': null,
    'dialogId': null
}, {
    'type': 'ESKALERING_STARTET',
    'dato': '2019-03-07T12:45:09.571+01:00',
    'begrunnelse': 'TEST AV OPPGAVE (TONE)',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'z990279',
    'dialogId': 1412
}, {
    'type': 'ESKALERING_STOPPET',
    'dato': '2019-03-07T15:11:41.997+01:00',
    'begrunnelse': 'Du har gjennomført møtet eller aktiviteten som vi ba deg om å gjøre.',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'z990279',
    'dialogId': 1412
}, {
    'type': 'ESKALERING_STARTET',
    'dato': '2019-03-07T18:04:50.498+01:00',
    'begrunnelse': 'Test varsel om oppgave i aktivitetsplan 7/3 kl 1804',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'z990279',
    'dialogId': 1415
}, {
    'type': 'ESKALERING_STOPPET',
    'dato': '2019-03-27T09:32:51.748+01:00',
    'begrunnelse': 'Du har gjennomført møtet eller aktiviteten som vi ba deg om å gjøre.\nasdfasdfasdfasdfsadfasdf',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'Z990781',
    'dialogId': 1415
}, {
    'type': 'ESKALERING_STARTET',
    'dato': '2019-03-07T15:11:54.465+01:00',
    'begrunnelse': 'TEst ',
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'z990279',
    'dialogId': 1413
}, {
    'type': 'ESKALERING_STOPPET',
    'dato': '2019-03-07T18:04:06.707+01:00',
    'begrunnelse': null,
    'opprettetAv': 'NAV',
    'opprettetAvBrukerId': 'z990279',
    'dialogId': 1413
}];

export default innstillingsHistorikk;