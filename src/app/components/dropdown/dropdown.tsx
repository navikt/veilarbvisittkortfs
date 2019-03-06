import React, { Component } from 'react';
import classNames from 'classnames';
import './dropdown.less';
/* tslint:disable */
const btnCls = (erApen: boolean, className: string|undefined) =>
    classNames('dropdown', className, {
        'dropdown--apen': erApen,
    });

function isChildOf(parent: any, element: any): boolean {
    if (element === document) {

        return false;
    }

    if (element === parent) {
        return true;
    }
    return isChildOf(parent, element.parentNode);
}
function settFokus(element: any) {
    if (element !== null) {
        const elementer = element.querySelector('button, a, input, select');
        if (elementer) {
            elementer.focus();
        }
    }
}
interface DropdownProps {
    apen?: boolean;
    name: string;
    knappeTekst: string;
    render: (lukkDropdown:()=>void) => React.ReactNode;
    className?: string;
    onLukk?: () => void;
    btnClassnames?: string;
}

interface DropdownState {
    apen: boolean;
}

class Dropdown extends Component<DropdownProps, DropdownState> {
    // @ts-ignore
    private btn: HTMLButtonElement;
    // @ts-ignore
    private component: React.ReactNode;

    constructor(props: DropdownProps) {
        super(props);

        this.state = { apen: this.props.apen || false };

        this.eventHandler = this.eventHandler.bind(this);
        this.apneDropdown = this.apneDropdown.bind(this);
        this.lukkDropdown = this.lukkDropdown.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.bindComponent = this.bindComponent.bind(this);
        this.bindBtn = this.bindBtn.bind(this);
    }

    eventHandler(e: any) {
        if (e.code === 'Escape' || !isChildOf(this.component, e.target)) {
            this.lukkDropdown();
        }
    }

    apneDropdown() {
        document.body.addEventListener('click', this.eventHandler); // eslint-disable-line no-undef
        document.body.addEventListener('keyup', this.eventHandler); // eslint-disable-line no-undef
        this.setState({ apen: true });
    }

    lukkDropdown() {
        document.body.removeEventListener('click', this.eventHandler); // eslint-disable-line no-undef
        document.body.removeEventListener('keyup', this.eventHandler); // eslint-disable-line no-undef
        this.setState({ apen: false });
        this.btn.focus();
        if(this.props.onLukk) {
            this.props.onLukk();
        }
    }

    toggleDropdown() {
        if (this.state.apen) {
            this.lukkDropdown();
        } else {
            this.apneDropdown();
        }
    }

    bindComponent(component: React.ReactNode) {
        this.component = component;
    }

    bindBtn(btn: HTMLButtonElement) {
        this.btn = btn;
    }

    render() {
        const { name, className, knappeTekst } = this.props;
        const { apen } = this.state;

        return (
            <div className={btnCls(apen, className)} ref={this.bindComponent}>
                    <button
                        ref={this.bindBtn}
                        type="button"
                        className={classNames("dropdown__btn", this.props.btnClassnames)}
                        onClick={this.toggleDropdown}
                        aria-expanded={apen}
                        aria-controls={`${name}-dropdown__innhold`}
                    >
                        {knappeTekst}
                    </button>
                <div
                    hidden={!apen}
                    className={`${name}-dropdown__innhold dropdown__innhold`}
                    id={`${name}-dropdown__innhold`}
                    ref={settFokus}
                >

                    {this.props.render(this.lukkDropdown)}
                </div>
            </div>
        );
    }
}

export default Dropdown;
