import React from 'react';
import { Appstate } from '../../../types/appstate';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import { connect } from 'react-redux';
import { StringOrNothing } from '../../../util/type/stringornothings';
import { erITestMiljo, finnMiljoStreng, finnNaisDomene } from '../../../util/utils';
import { logger } from '../../../util/logger';

function byggRegistreringUrl(fnr: string, enhet: StringOrNothing) {
    return `https://arbeidssokerregistrering-fss${finnMiljoStreng()}${finnNaisDomene()}?fnr=${fnr}&enhetId=${enhet}`;
}

function byggVeilarbLoginUrl() {
    return (url: string) =>
        `https://veilarblogin${finnMiljoStreng()}${finnNaisDomene()}veilarblogin/api/start?url=${encodeURIComponent(
            url
        )}`;
}

interface StateProps {
    fnr: string;
    kanReaktiveres: boolean;
    erSykmeldtMedArbeidsgiver: boolean;
    kanRegistrere: boolean;
    enhetId: StringOrNothing;
}

type StartRegistreringProsessProps = StateProps;

function StartRegistreringProsess(props: StartRegistreringProsessProps) {
    if (!props.kanRegistrere) {
        return null;
    }

    const veilarbLoginUrl = byggVeilarbLoginUrl();
    const registreringUrl = byggRegistreringUrl(props.fnr, props.enhetId);
    const brukerType = props.erSykmeldtMedArbeidsgiver
        ? 'erSykemeldtMedArbeidsgiver'
        : props.kanReaktiveres
        ? 'kanReaktiveres'
        : 'kanIkkeReaktiveres';

    const brukerTekst = () => {
        switch (brukerType) {
            case 'erSykemeldtMedArbeidsgiver':
                return 'Start oppfølging';
            case 'kanReaktiveres':
                return 'Reaktiver arbeidssøker';
            case 'kanIkkeReaktiveres':
                return 'Registrer person';
            default:
                return null;
        }
    };

    return (
        <a
            href={erITestMiljo() ? veilarbLoginUrl(registreringUrl) : registreringUrl}
            className="knapp meny-knapp btn--mb1"
            onClick={() => logger.event('veilarbvisittkortfs.metrikker.registrering', {}, { brukerType: brukerType })}
        >
            {brukerTekst()}
        </a>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    kanReaktiveres: OppfolgingSelector.selectKanReaktiveres(state),
    fnr: OppfolgingSelector.selectFnr(state),
    erSykmeldtMedArbeidsgiver: OppfolgingSelector.selectErSykmeldtMedArbeidsgiver(state),
    kanRegistrere: OppfolgingSelector.kanRegistreresEllerReaktiveres(state),
    enhetId: state.enhetId.enhet,
});

export default connect<StateProps>(mapStateToProps)(StartRegistreringProsess);
