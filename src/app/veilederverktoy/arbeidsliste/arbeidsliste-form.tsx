import React from 'react';
import { Formik, FormikValues } from 'formik';
import { Input, Textarea } from 'nav-frontend-skjema';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Arbeidsliste } from '../../../types/arbeidsliste';
import Modal from '../../components/modal/modal';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { oppdaterArbeidsliste } from '../../../store/arbeidsliste/actions';
import ModalContainer from '../../components/modal/modal-container';
import ModalHeader from '../../components/modal/modal-header';
import ModalFooter from '../../components/modal/modal-footer';
import './arbeidsliste.less';
import Datovelger from 'nav-datovelger/dist/datovelger/Datovelger';
import { OrNothing } from '../../../types/utils/ornothing';
import { StringOrNothing } from '../../../types/utils/stringornothings';
import { moment } from '../../../App';

interface OwnProps {
    isOpen: boolean;
    onRequestClose: () => void;
    arbeidsliste: Arbeidsliste;
    innholdstittel: string;
    children: React.ReactNode;
}

interface DispatchProps {
    lagreArbeidsliste: (values: FormikValues) => void;
}

export interface ArbeidslisteForm {
    kommentar: string;
    overskrift: string;
    frist: OrNothing<Date>;
}

interface ErrorProps {
    kommentar: StringOrNothing;
    frist: StringOrNothing;
    overskrift: StringOrNothing;
}

type LeggTilArbeidslisteProps = DispatchProps & OwnProps;

function ArbeidslisteForm (props: LeggTilArbeidslisteProps) {
    const initalValues = {
        overskrift: props.arbeidsliste.overskrift ? props.arbeidsliste.overskrift :  '',
        kommentar: props.arbeidsliste.kommentar ? props.arbeidsliste.kommentar : '' ,
        frist: props.arbeidsliste.frist ? new Date(props.arbeidsliste.frist) : props.arbeidsliste.frist};

    return (
        <Formik
            initialValues={initalValues}
            onSubmit={props.lagreArbeidsliste}
            validate={values => {
                let errors: ErrorProps = {kommentar: null, frist: null, overskrift: null};
                if (values.kommentar.length === 0) {
                    errors.kommentar = 'Påkrevd!';
                } else if (values.kommentar.length > 500) {
                    errors.kommentar = 'Før langt';
                }

                if (values.overskrift.length === 0) {
                    errors.overskrift = 'Påkreved';
                } else if (values.overskrift.length > 15) {
                    errors.overskrift = 'Før langt';
                }

                if (values.frist && !moment(values.frist).isAfter(moment().subtract(1, 'day').startOf('day'), 'd')) {
                    errors.frist = 'Fristen må være i dag eller senere';
                }
                return errors;
            }}
            render={formikProps => {

                const harFeilIOverskrift = formikProps.errors.overskrift && formikProps.touched.overskrift ?
                    {feilmelding: formikProps.errors.overskrift} : undefined;

                const harFeilIKommentar =  formikProps.errors.kommentar && formikProps.touched.kommentar ?
                    {feilmelding: formikProps.errors.kommentar} : undefined;

                const handleChange = (value: Date| string) => {
                    let dato = value;
                    if (typeof value === 'string') {
                        dato = new Date(value);
                    }
                    formikProps.setFieldValue('frist', dato);
                };

                return (
                    <Modal
                        isOpen={props.isOpen}
                        onRequestClose={props.onRequestClose}
                        className=""
                        header={<ModalHeader/>}
                    >
                        <section className="arbeidsliste__form">
                            <ModalContainer className="arbeidsliste__form-container">
                                {props.children}
                                <form onSubmit={formikProps.handleSubmit}>
                                    <Input
                                        label="Overskrift"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.overskrift}
                                        name="overskrift"
                                        feil={harFeilIOverskrift}
                                    />
                                    <Textarea
                                        label="Kommentar"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.kommentar}
                                        name="kommentar"
                                        feil={harFeilIKommentar}
                                    />
                                    <Datovelger
                                        input={{
                                            id: 'fristInput',
                                            name: 'frist',
                                            placeholder: 'dd.mm.åååå',
                                            ariaLabel: 'Frist:',
                                            onChange: handleChange,
                                        }}
                                        id="fristDatovelger"
                                        onChange={handleChange}
                                        locale="no"
                                        dato={formikProps.values.frist}
                                    />
                                    <ModalFooter>
                                        <Hovedknapp htmlType="submit">
                                            Lagre
                                        </Hovedknapp>
                                        <Knapp
                                            htmlType="button"
                                            onClick={() => {
                                                formikProps.resetForm(initalValues);
                                                props.onRequestClose();
                                            }}
                                        >
                                            Avbryt
                                        </Knapp>
                                    </ModalFooter>
                                </form>
                            </ModalContainer>
                        </section>
                    </Modal>
                ); }}
        />
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    lagreArbeidsliste: (values: FormikValues) => dispatch(
        oppdaterArbeidsliste({kommentar: values.kommentar, overskrift: values.overskrift, frist: values.frist})
    )
});

export default connect<{}, DispatchProps, OwnProps>(null, mapDispatchToProps)(ArbeidslisteForm);