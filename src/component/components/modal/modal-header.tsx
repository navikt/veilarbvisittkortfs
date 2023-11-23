import React from 'react';
import classNames from 'classnames';
import { Heading } from '@navikt/ds-react';

interface OwnProps {
    className?: string;
    tittel?: React.ReactNode;
}

function ModalHeader({ className, tittel }: OwnProps) {
    return (
        <div className={classNames('modal-header-wrapper', className)}>
            <header className="modal-header">
                <Heading size="large" as="h1" className="modal-info-tekst__overskrift">
                    {tittel}
                </Heading>
            </header>
        </div>
    );
}

export default ModalHeader;
