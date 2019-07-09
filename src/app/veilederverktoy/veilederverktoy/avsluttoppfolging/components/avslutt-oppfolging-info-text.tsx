import { Normaltekst } from 'nav-frontend-typografi';
import React, { useEffect, useState } from 'react';
import { AvslutningStatus } from '../../../../../types/oppfolging';
import { OrNothing } from '../../../../../types/utils/ornothing';
import { FormattedMessage } from 'react-intl';
import { HiddenIfAlertStripeAdvarselSolid } from '../../../../components/hidden-if/hidden-if-alertstripe';
import VedtaksstotteApi from '../../../../../api/vedtaksstotte-api';
import NavFrontendSpinner from 'nav-frontend-spinner';
import FeatureApi from '../../../../../api/feature-api';

export function AvsluttOppfolgingInfoText(props: {
    avslutningStatus: OrNothing<AvslutningStatus>,
    datoErInnenFor28DagerSiden: boolean,
    harUbehandledeDialoger: boolean,
    fnr: string
    }) {

    const [harUtkast, oppdaterHarUtkast] = useState(false);
    const [lasterData, setLasterData] = useState(true);

    useEffect( () => {
        FeatureApi.hentFeatures('veilarbvedtaksstottefs.prelansering').then(resp => {
            if (!resp['veilarbvedtaksstottefs.prelansering']) {
                VedtaksstotteApi.fetchHarUtkast(props.fnr).then(
                    (harUtkastResp) => {
                        oppdaterHarUtkast(() => harUtkastResp );
                    }
                );
            }
            setLasterData(false);
        });
    });

    if (!props.avslutningStatus) {
        return null;
    }

    if (lasterData) {
        return <NavFrontendSpinner type="XL"/>;
    }
    const aktivMindreEnn28Dager = props.datoErInnenFor28DagerSiden ?
        'innstillinger.modal.avslutt.oppfolging.beskrivelse.innenfor-28-dager'
        : 'innstillinger.modal.avslutt.oppfolging.beskrivelse';
    const {harTiltak, harYtelser} = props.avslutningStatus;
    return (
        <>
            <Normaltekst>
                <FormattedMessage id={aktivMindreEnn28Dager}/>
            </Normaltekst>
            <HiddenIfAlertStripeAdvarselSolid
                hidden={!props.harUbehandledeDialoger && !harTiltak && !harYtelser}
            >
                Du kan avslutte oppfølgingsperioden selv om:
                <ul className="margin--0">
                    {props.harUbehandledeDialoger && <li>Brukeren har ubehandlede dialoger</li>}
                    {harTiltak && <li>Brukeren har aktive saker i Arena</li>}
                    {harYtelser && <li>Brukeren har aktive tiltak i Arena</li>}
                </ul>
            </HiddenIfAlertStripeAdvarselSolid>

            <HiddenIfAlertStripeAdvarselSolid
                hidden={!harUtkast}
            >
                Utkast til oppfølgingsvedtak vil bli slettet
            </HiddenIfAlertStripeAdvarselSolid>
        </>
    );
}
