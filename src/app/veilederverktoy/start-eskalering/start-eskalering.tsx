import React from 'react';
import { Dispatch } from 'redux';
import { opprettHenvendelse } from '../../../store/dialog/actions';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import { Normaltekst } from 'nav-frontend-typografi';
import { navigerAction } from '../../../store/navigation/actions';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import StartEskaleringForm, { StartEskaleringValues } from './start-eskalering-form';
import PersonaliaSelectors from '../../../store/personalia/selectors';

interface DispatchProps {
    handleSubmit: (values: OwnValues) => void;
    lukkModal: () => void;
}

interface StateProps {
    isLoading: boolean;
    registrertKRR: boolean;
    harBruktNivaa4: boolean;
}

interface OwnValues extends StartEskaleringValues {
    overskrift: string;
    tekst: string;
}

type StartEskaleringProps = StateProps & DispatchProps;

function StartEskalering(props: StartEskaleringProps) {
    if (!props.registrertKRR || !props.harBruktNivaa4) {
        const varselTekst = !props.registrertKRR
            ? 'Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret, og du kan derfor ikke sende varsel.'
            : 'Du kan ikke sende varsel fordi brukeren ikke har vært innlogget de siste 18 månedene med nivå 4 (for eksempel BankID).';

        return (
            <VarselModal
                className=""
                contentLabel="Bruker kan ikke varsles"
                onRequestClose={props.lukkModal}
                isOpen={true}
                type="ADVARSEL"
            >
                {varselTekst}
            </VarselModal>
        );
    }

    const infoTekst = (
        <Normaltekst className="blokk-xs">
            Husk å være tydelig på hvilken oppgave brukeren skal gjennomføre og hva som er fristen. Hvis du varsler om
            at en ytelse kan bli stanset eller en annen reaksjon fra NAV, må du vise til lovhjemler.
        </Normaltekst>
    );

    const initialValues = {
        begrunnelse: '',
        brukMalvelger: true,
        overskrift: 'Du har fått et varsel fra NAV',
        tekst: '',
    };
    return (
        <StartEskaleringForm
            handleSubmit={props.handleSubmit}
            initialValues={initialValues}
            tekstariaLabel="Rediger teksten under slik at den passer."
            maxLength={5000}
            tittel="Send varsel til brukeren"
            infoTekst={infoTekst}
            isLoading={props.isLoading}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state) || state.dialoger.status === 'LOADING',
    registrertKRR: state.oppfolging.data.kanVarsles,
    harBruktNivaa4: PersonaliaSelectors.selectHarBruktNivaa4(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    lukkModal: () => dispatch(navigerAction(null)),
    handleSubmit: (values: OwnValues) =>
        dispatch(
            opprettHenvendelse({
                begrunnelse: values.begrunnelse,
                overskrift: values.overskrift,
                egenskaper: ['ESKALERINGSVARSEL'],
                tekst: values.begrunnelse,
            })
        ),
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(StartEskalering);
