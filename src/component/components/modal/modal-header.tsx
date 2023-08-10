import React from 'react';
import classNames from 'classnames';
import {Heading} from "@navikt/ds-react";

interface OwnProps {
    className?: string;
    tittel?: React.ReactNode;
}

function ModalHeader({ className, tittel }: OwnProps) {
    return (
        <div className={classNames('modal-header-wrapper', className)}>
            <header className="modal-header">
                <Heading level="3" size="medium" className="modal-info-tekst__overskrift">
                    {tittel}
                </Heading>
            </header>
        </div>
    );
}

export default ModalHeader;
