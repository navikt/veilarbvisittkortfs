import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { erITestMiljo, finnMiljoStreng, finnNaisDomene, hentEnhetsIdFraUrl } from '../../../utils/utils';
import { Appstate } from '../../../../types/appstate';
import OppfolgingSelector from '../../../../store/oppfolging/selector';
import visibleIf from '../../../components/visible-if';
import { connect } from 'react-redux';
import { logEvent } from '../../../utils/frontend-logger';

function byggRegistreringUrl(fnr: string, enhet: string | string[]) {
    return `https://arbeidssokerregistrering-fss${finnMiljoStreng()}${finnNaisDomene()}?fnr=${fnr}&enhetId=${enhet}`;
}

function byggVeilarbLoginUrl() {
    return (url: string) => `https://veilarblogin${finnMiljoStreng()}${finnNaisDomene()}veilarblogin/api/start?url=${encodeURIComponent(url)}`;
}

interface StateProps {
    fnr: string;
    kanReaktiveres: boolean;
    erSykmeldtMedArbeidsgiver: boolean;
}

type StartRegistreringProsessProps = StateProps;

function StartRegistreringProsess(props: StartRegistreringProsessProps) {
    const veilarbLoginUrl = byggVeilarbLoginUrl();
    const registreringUrl = byggRegistreringUrl(props.fnr, hentEnhetsIdFraUrl());
    const brukerType = props.erSykmeldtMedArbeidsgiver ?
        'erSykemeldtMedArbeidsgiver' :
        props.kanReaktiveres ? 'kanReaktiveres' : 'kanIkkeReaktiveres';
    return (
        <article className="prosess gra-border">
            <Undertittel className="prosess_overskrift">
                <FormattedMessage
                    id="innstillinger.prosess.reaktiver-arbeidssoker.tittel"
                    values={{brukerType: brukerType}}
                />

            </Undertittel>
            <div className="blokk-xs">
                <Normaltekst>
                    <FormattedMessage
                        id="innstillinger.prosess.registrer-arbeidssoker.tekst"
                        values={{erSykmeldtMedArbeidsgiver: props.erSykmeldtMedArbeidsgiver}}
                    >
                        {(text: string) => <span dangerouslySetInnerHTML={{ __html: text}}/>}
                    </FormattedMessage>
                </Normaltekst>
            </div>
            <a
                href={erITestMiljo() ? veilarbLoginUrl(registreringUrl) : registreringUrl}
                className="knapp btn--mb1"
                onClick={() => logEvent('veilarbvisittkortfs.metrikker.registrering', {}, {brukerType: brukerType})}
            >
                <FormattedMessage id="innstillinger.modal.prosess.start.knapp"/>
            </a>
        </article>
    );

}

const mapStateToProps = (state: Appstate): StateProps => ({
    kanReaktiveres: OppfolgingSelector.selectKanReaktiveres(state),
    fnr: OppfolgingSelector.selectFnr(state),
    erSykmeldtMedArbeidsgiver: OppfolgingSelector.selectErSykmeldtMedArbeidsgiver(state),
});

export default visibleIf(connect<StateProps>(mapStateToProps)(StartRegistreringProsess));