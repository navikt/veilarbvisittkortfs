import React from 'react';
import {Formik, FormikValues} from "formik";
import StartEskaleringOverskrift from "../start-eskalering/start-eskalering-prosess-overskrift";
import {Textarea} from "nav-frontend-skjema";
import VeilederVerktoyModal from '../veilederverktoy-modal';
import BegrunnelseFooter from "./begrunnelse-form-footer";
import {StringOrNothing} from "../../../../types/utils/stringornothings";

interface BegrunnelseFormProps {
    tekst: StringOrNothing;
    handleSubmit: (values: FormikValues) => void;
    tekstariaLabel: React.ReactNode;
    maxLength: number;
}

function BegrunnelseForm(props: BegrunnelseFormProps) {
    return (
        <Formik
            initialValues={{tekst: props.tekst || ''}}
            onSubmit={props.handleSubmit}
            validationSchema={{}}
            render={formikProps => {
                return (
                    <VeilederVerktoyModal
                        touched={formikProps.touched.tekst as boolean}
                        visConfirmDialog={formikProps.touched.tekst as boolean}
                    >
                        <div>
                            <section className="innstillinger__prosess">
                                <StartEskaleringOverskrift/>
                                <Textarea
                                    label={props.tekstariaLabel}
                                    maxLength={5000}
                                    value={formikProps.values.tekst}
                                    name="tekst"
                                    onChange={formikProps.handleChange}
                                    onBlur={formikProps.handleBlur}
                                />
                                <BegrunnelseFooter
                                    tilbake={()=>"hepsderps"}
                                    spinner={true}
                                />

                            </section>
                        </div>
                    </VeilederVerktoyModal>
                )
            }
            }
        />
    )
}

export default BegrunnelseForm;