import React from 'react';
import BegrunnelseFooter from './begrunnelse-form-footer';
import { Dispatch } from 'redux';
import { navigerTilProcesser } from '../../../../store/navigation/actions';
import { connect } from 'react-redux';
import FormikModal from '../../../components/formik/formik-modal';
import { Form, FormikProps } from 'formik';
import BergrunnelseOverskrift from './begrunnelse-overskrift';
import { Appstate } from '../../../../types/appstate';
import PersonaliaSelector from '../../../../store/personalia/selectors';
import { BegrunnelseTextArea } from './begrunnelse-textarea';

export interface BegrunnelseValues {
    begrunnelse: string;
}

interface OwnProps<T extends BegrunnelseValues> {
    initialValues: T;
    handleSubmit: (values: T) => void;
    tekstariaLabel: string;
    isLoading: boolean;
    overskriftTekstId: string;
    infoTekst?: React.ReactNode;
    render?: (formikProps: FormikProps<T>) => React.ReactNode;
    maxLength?: number;
}

interface DispatchProps {
    tilbakeTilProcesser: () => void;
}

interface StateProps {
    navnPaMotpart: string;
}

type BegrunnelseFormProps<T extends BegrunnelseValues> = OwnProps<T> & DispatchProps & StateProps;

function BegrunnelseForm<T extends BegrunnelseValues>(props: BegrunnelseFormProps<T>) {
    return (
        <FormikModal
            initialValues={props.initialValues}
            handleSubmit={props.handleSubmit}
            contentLabel=""
            visConfirmDialog={true}
            tilbake={props.tilbakeTilProcesser}
            tilbakeTekstId="innstillinger.modal.tilbake"
            render={formikProps => (
                <div className="modal-innhold">
                    <BergrunnelseOverskrift
                        overskriftTekstId={props.overskriftTekstId}
                        infoTekst={props.infoTekst}
                        navnPaMotpart={props.navnPaMotpart}
                    />
                    <Form>
                        <BegrunnelseTextArea tekstariaLabel={props.tekstariaLabel} maxLength={props.maxLength} />
                        <BegrunnelseFooter spinner={props.isLoading} />
                    </Form>
                </div>
            )}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    navnPaMotpart: PersonaliaSelector.selectSammensattNavn(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    tilbakeTilProcesser: () => dispatch(navigerTilProcesser())
});

export default connect(mapStateToProps, mapDispatchToProps)(BegrunnelseForm);
