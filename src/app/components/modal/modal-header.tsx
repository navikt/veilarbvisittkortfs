import React from 'react';
import classNames from 'classnames';
import Tilbakeknapp from './tilbakeknapp';

interface OwnProps {
    className?: string;
    tilbakeTekstId?: string;
    visConfirmDialog?: boolean;
    tilbake?: () => void;
}

function ModalHeader({className, tilbakeTekstId, visConfirmDialog, tilbake}: OwnProps) {
    return (
        <div className={classNames('modal-header-wrapper', className)}>
            <header className="modal-header">
                {tilbake &&
                    <Tilbakeknapp
                        tekstId={tilbakeTekstId || 'Tilbake'}
                        visConfirmDialog={visConfirmDialog}
                        tilbake={tilbake}
                    />}
            </header>
        </div>
    );
}

export default ModalHeader;
