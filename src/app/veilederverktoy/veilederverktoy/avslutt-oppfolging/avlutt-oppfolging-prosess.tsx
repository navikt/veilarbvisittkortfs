import React from 'react';
import { FormattedMessage } from 'react-intl';
import {Normaltekst, Undertittel} from 'nav-frontend-typografi';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';
import OppfolgingSelector from "../../../../store/oppfolging/selector";
import classNames from "classnames";

interface StateProps {
    skjulAvsluttOppfolging: boolean;
    fnr: string
}

interface DispatchProps {
    navigerTilAvsluttOppfolging: () => void;
}

function AvsluttOppfolgingProsess({skjulAvsluttOppfolging, navigerTilAvsluttOppfolging, fnr }: StateProps & DispatchProps) {
    //const[avslutningStatus, setAvslutningStatus] = useState({} as AvslutningStatus);
    //const[isLoading, setIsLoding] = useState(true);
    /*
    useEffect(()=> {
        OppfolgingApi.kanAvslutte(fnr)
            .then((avslutningStatus)=> {
                setAvslutningStatus(avslutningStatus);
                setIsLoding(false);
            })
    },[]);

    */

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
        fnr: OppfolgingSelector.selectFnr(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTilAvsluttOppfolging: () => dispatch(navigerAction('avslutt_oppfolging'))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(AvsluttOppfolgingProsess);