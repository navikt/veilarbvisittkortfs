import React from 'react';
import { Formik } from 'formik';
import { Textarea } from 'nav-frontend-skjema';
import VeilederVerktoyModal from '../veilederverktoy-modal';
import BegrunnelseFooter from './begrunnelse-form-footer';
import { StringOrNothing } from '../../../../types/utils/stringornothings';
import BergrunnelseOverskrift from './begrunnelse-overskrift';
import {Dispatch} from "redux";
import {navigerAction} from "../../../../store/navigation/actions";
import {connect} from "react-redux";

interface OwnProps {
    tekst: StringOrNothing;
    handleSubmit: (tekst: string) => void;
    tekstariaLabel: React.ReactNode;
    overskriftTekstId: string;
    infoTekst: React.ReactNode;
    maxLength?: number;
    isLoading: boolean;
}

interface DispatchProps {
    tilbakeTilProcesser: () => void;
}

type BegrunnelseFormProps = OwnProps & DispatchProps;


function BegrunnelseForm(props: BegrunnelseFormProps) {
    return (
        <Formik
            initialValues={{tekst: props.tekst || ''}}
            onSubmit={(values) => props.handleSubmit(values.tekst)}
            validationSchema={{}}
            render={formikProps => {
                return (
                    <VeilederVerktoyModal
                        touched={formikProps.touched.tekst as boolean}
                        visConfirmDialog={formikProps.touched.tekst as boolean}
                        tilbakeFunksjon={props.tilbakeTilProcesser}
                        tilbakeTekstId="innstillinger.modal.tilbake"

                    >
                        <div>
                            <section className="prosess">
                                <BergrunnelseOverskrift
                                    overskriftTekstId={props.overskriftTekstId}
                                    infoTekst={props.infoTekst}
                                />
                                <form onSubmit={formikProps.handleSubmit}>
                                    <Textarea
                                        label={props.tekstariaLabel}
                                        maxLength={props.maxLength || 500}
                                        value={formikProps.values.tekst}
                                        name="tekst"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                    />
                                    <BegrunnelseFooter
                                        spinner={props.isLoading}
                                    />
                                </form>
                            </section>
                        </div>
                    </VeilederVerktoyModal>
                );
            }}
        />
    );
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    tilbakeTilProcesser: () => dispatch(navigerAction('prosesser'))
});

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps)(BegrunnelseForm);
