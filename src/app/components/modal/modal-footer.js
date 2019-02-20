import React from 'react';
import PT from 'prop-types';

function ModalFooter({ children }) {
    return (
        <div className="modal-footer">
            {children}
        </div>
    );
}

ModalFooter.propTypes = {
    children: PT.node,
};

ModalFooter.defaultProps = {
    children: undefined,
};

export default ModalFooter;
