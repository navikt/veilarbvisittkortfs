import React from 'react';
import classNames from 'classnames';

interface OwnProps {
    className?: string;
}

function ModalHeader({ className }: OwnProps) {
    return (
        <div className={classNames('modal-header-wrapper', className)}>
            <header className="modal-header" />
        </div>
    );
}

export default ModalHeader;
