import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { navigerAction } from '../../../store/navigation/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import VeilederSelector from '../../../store/tildel-veileder/selector';

export function TildelVeilederKvittering() {
    const dispatch = useDispatch();
    const veiledernavn = ' ' + useSelector(VeilederSelector.selectTildeltVeiledernavn);

    return (
        <VarselModal
            isOpen={true}
            onRequestClose={() => dispatch(navigerAction(null))}
            contentLabel="Vedlykked tildelning"
            type="SUCCESS"
        >
            <Normaltekst>
                {' '}
                Du har tildelt veileder{veiledernavn}. Det kan ta noe tid før brukeren er i Min oversikt.
            </Normaltekst>
        </VarselModal>
    );
}
