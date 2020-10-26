import React, { useEffect, useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { useDispatch } from 'react-redux';
import { AvslutningStatus } from '../../../../types/oppfolging';
import { OrNothing } from '../../../../types/utils/ornothing';
import { HiddenIfAlertStripeAdvarselSolid } from '../../../components/hidden-if/hidden-if-alertstripe';
import VedtaksstotteApi from '../../../../api/vedtaksstotte-api';
import FeatureApi from '../../../../api/feature-api';
import { hentHarTiltak } from '../../../../store/aktivitet/actions';

export function AvsluttOppfolgingInfoText(props: {
    avslutningStatus: OrNothing<AvslutningStatus>;
    harYtelser?: boolean;
    harTiltak?: boolean;
    datoErInnenFor28DagerSiden: boolean;
    harUbehandledeDialoger: boolean;
    fnr: string;
}) {
    const [harUtkast, oppdaterHarUtkast] = useState(false);
    const [lasterData, setLasterData] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        FeatureApi.hentFeatures('veilarbvedtaksstottefs.prelansering').then((resp) => {
            if (!resp['veilarbvedtaksstottefs.prelansering']) {
                VedtaksstotteApi.fetchHarUtkast(props.fnr).then((harUtkastResp) => {
                    oppdaterHarUtkast(() => harUtkastResp);
                });
            }
            setLasterData(false);
        });

        dispatch(hentHarTiltak());
    }, [props.fnr, dispatch]);
    if (!props.avslutningStatus) {
        return null;
    }

    if (lasterData) {
        return <NavFrontendSpinner type="XL" />;
    }
    const aktivMindreEnn28Dager = props.datoErInnenFor28DagerSiden
        ? 'Brukeren har vært inaktiv i mindre enn 28 dager. Vil du likevel avslutte brukerens oppfølgingsperiode?'
        : 'Her avslutter du brukerens oppfølgingsperioden og legger inn en kort begrunnelse om hvorfor.';
    return (
        <>
            <Normaltekst>{aktivMindreEnn28Dager}</Normaltekst>
            <HiddenIfAlertStripeAdvarselSolid
                hidden={!props.harUbehandledeDialoger && !props.harTiltak && !props.harYtelser}
            >
                Du kan avslutte oppfølgingsperioden selv om:
                <ul className="margin--0">
                    {props.harUbehandledeDialoger && <li>Brukeren har ubehandlede dialoger</li>}
                    {props.harTiltak && <li>Brukeren har aktive tiltak i Arena</li>}
                    {props.harYtelser && <li>Brukeren har aktive saker i Arena</li>}
                </ul>
            </HiddenIfAlertStripeAdvarselSolid>

            <HiddenIfAlertStripeAdvarselSolid hidden={!harUtkast}>
                Utkast til oppfølgingsvedtak vil bli slettet
            </HiddenIfAlertStripeAdvarselSolid>
        </>
    );
}
