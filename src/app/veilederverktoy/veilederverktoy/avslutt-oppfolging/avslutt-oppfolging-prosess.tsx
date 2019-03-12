import React from 'react';
import { FormattedMessage } from 'react-intl';
import {Normaltekst, Undertittel} from 'nav-frontend-typografi';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';
import classNames from "classnames";

interface StateProps {
    skjulAvsluttOppfolging: boolean;
}

interface DispatchProps {
    navigerTilAvsluttOppfolging: () => void;
}

function AvsluttOppfolgingProsess({skjulAvsluttOppfolging, navigerTilAvsluttOppfolging, }: StateProps & DispatchProps) {
    if (skjulAvsluttOppfolging) {
        return null;
    }
    return (
        <article className={classNames('prosess')}>
            <Undertittel className="prosess_overskrift">
                <FormattedMessage id="innstillinger.prosess.avslutt.oppfolging.tittel" />
            </Undertittel>

            <div className="blokk-xs">
                <Normaltekst>
                    <FormattedMessage id="innstillinger.prosess.avslutt-oppfolging.tekst" />
                </Normaltekst>
            </div>
        </article>
    );
}

const mapStateToProps = (state: Appstate): StateProps => {
    const oppfolging = state.oppfolging.data;
    return {
        skjulAvsluttOppfolging: !oppfolging.underOppfolging || !state.tilgangTilBrukersKontor.data.tilgangTilBrukersKontor,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTilAvsluttOppfolging: () => dispatch(navigerAction('avslutt_oppfolging'))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(AvsluttOppfolgingProsess);