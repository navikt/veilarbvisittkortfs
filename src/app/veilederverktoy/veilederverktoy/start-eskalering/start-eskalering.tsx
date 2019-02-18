import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import VeilederVerktoyModal from '../veilederverktoy-modal';
import StartEskaleringOverskrift from "./start-eskalering-prosess-overskrift";
import StartEskaleringFooter from "./start-eskalering-prosess-footer";
import {Formik} from "formik";
import {Textarea} from "nav-frontend-skjema";
import {Dispatch} from "redux";
import {opprettHenvendelse} from "../../../../store/dialog/actions";
import {connect} from "react-redux";
import {navigerTilbake} from "../../../../store/navigation/actions";

interface DispatchProps {
    handleSubmit: (tekst: string, overskrift: string) => void
    tilbake: () => void;
}


function StartEskalering(props:{intl: any, tilbake: ()=> void; handleSubmit: (tekst: string, overskrift: string) => void }) {
    return (
        <FormattedMessage id="dialog.eskalering.overskrift">
            {overskrift =>
                <FormattedMessage id="innstillinger.modal.start-eskalering.automatisk-tekst">
                    {defaultTekst =>
                        <Formik
                            initialValues={{overskrift : overskrift, tekst: defaultTekst}}
                            onSubmit={(values) => props.handleSubmit(values.tekst as string, values.overskrift as string)}
                            validationSchema={{}}
                            render={formikProps => {
                                return (
                                    <VeilederVerktoyModal
                                        onRequestClose={() => {
                                            const dialogTekst = props.intl.formatMessage({
                                                id: 'aktkivitet-skjema.lukk-advarsel',
                                            });
                                            if (!formikProps.touched.tekst || confirm(dialogTekst)) {
                                                 props.tilbake();
                                            }
                                        }}
                                        visConfirmDialog={formikProps.touched.tekst}
                                    >
                                        <div>
                                            <section className="innstillinger__prosess">
                                                <StartEskaleringOverskrift/>
                                                <Textarea
                                                    label="Rediger teksten under slik at den passer"
                                                    maxLength={5000}
                                                    value={formikProps.values.tekst as string}
                                                    name="tekst"
                                                    onChange={formikProps.handleChange}
                                                    onBlur={formikProps.handleBlur}
                                                />
                                                <StartEskaleringFooter spinner={true}/>
                                            </section>
                                        </div>
                                    </VeilederVerktoyModal>
                                )
                            }
                            }
                        />
                    }

                </FormattedMessage>
            }
        </FormattedMessage>
    );
}


const mapDispatchToProps = (dispatch: Dispatch, props: any)=> {
    return {
        handleSubmit: (tekst:string, overskrift:string) =>
            dispatch(opprettHenvendelse(
            {begrunnelse: tekst, overskrift, egenskaper: ["ESKALERINGSVARSEL"], tekst})),
        tilbake: ()=> dispatch(navigerTilbake())
    }
};


export default injectIntl(connect<{},DispatchProps,{}>(null,mapDispatchToProps)(StartEskalering));