/*
import NavFrontendModal from "nav-frontend-modal";
import ModalHeader from "../modal/modal-header";
import React from "react";
import classNames from "classnames";
import {Formik} from "formik";
import {VenstreChevron} from "nav-frontend-chevron";
import {FormattedMessage} from "react-intl";

const cls = (className:string) => classNames('modal',className);

function TilbakeKnapp() {
    function tilbake(e: React.SyntheticEvent) {
        e.preventDefault();
        const dialogTekst = props.intl.formatMessage({
            id: 'modal-skjema.lukk-advarsel',
        });
        // eslint-disable-next-line no-alert
        if (!props.visConfirmDialog || confirm(dialogTekst)) {
            if (props.tilbake) {
                props.tilbake();
                return;
            }
        }
    }

    return (
        <button onClick={tilbake} className="tilbakeknapp">
            <VenstreChevron />
            <span className="tilbakeknapp-innhold__tekst">
                    <FormattedMessage id={props.tekstId}/>
                </span>
        </button>
    );
}


function FormikModal () {

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={{}}
            render={formikProps =>
                <NavFrontendModal
                    className={cls(className)}
                    contentLabel={contentLabel}
                    isOpen={true}
                    onRequestClose={tilbake}
                    closeButton={true}
                    portalClassName="visittkortfs"
                >
                    <ModalHeader/>
                    <div className="modal-innhold">
                        {children(formikProps)}
                    </div>
                </NavFrontendModal>
            }
        />
    )
}
*/

function FormikModal () {
    return "Hello";
}

export default FormikModal;