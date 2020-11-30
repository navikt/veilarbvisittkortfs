import { Normaltekst } from 'nav-frontend-typografi';
import React, { useEffect } from 'react';
import { HiddenIfAlertStripeAdvarselSolid } from '../../../components/hidden-if/hidden-if-alertstripe';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { OrNothing } from '../../../../util/type/ornothing';
import { useFetchHarUtkast } from '../../../../api/veilarbvedtaksstotte';
import { AvslutningStatus } from '../../../../api/veilarboppfolging';

export function AvsluttOppfolgingInfoText(props: {
    vedtaksstottePrelanseringEnabled: boolean;
    avslutningStatus: OrNothing<AvslutningStatus>;
    datoErInnenFor28DagerSiden: boolean;
    harUbehandledeDialoger: boolean;
    fnr: string;
}) {
    const fetchHarUtkast = useFetchHarUtkast(props.fnr, { manual: true });

    useEffect(() => {
        if (!props.vedtaksstottePrelanseringEnabled) {
            fetchHarUtkast.fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!props.avslutningStatus) {
        return null;
    }

    if (!props.vedtaksstottePrelanseringEnabled && fetchHarUtkast.loading) {
        return <NavFrontendSpinner type="XL" />;
    }
    const aktivMindreEnn28Dager = props.datoErInnenFor28DagerSiden
        ? 'Brukeren har vært inaktiv i mindre enn 28 dager. Vil du likevel avslutte brukerens oppfølgingsperiode?'
        : 'Her avslutter du brukerens oppfølgingsperioden og legger inn en kort begrunnelse om hvorfor.';

    const { harTiltak, harYtelser } = props.avslutningStatus;

    return (
        <>
            <Normaltekst>{aktivMindreEnn28Dager}</Normaltekst>
            <HiddenIfAlertStripeAdvarselSolid hidden={!props.harUbehandledeDialoger && !harTiltak && !harYtelser}>
                Du kan avslutte oppfølgingsperioden selv om:
                <ul className="margin--0">
                    {props.harUbehandledeDialoger && <li>Brukeren har ubehandlede dialoger</li>}
                    {harTiltak && <li>Brukeren har aktive saker i Arena</li>}
                    {harYtelser && <li>Brukeren har aktive tiltak i Arena</li>}
                </ul>
            </HiddenIfAlertStripeAdvarselSolid>

            <HiddenIfAlertStripeAdvarselSolid hidden={!fetchHarUtkast.data}>
                Utkast til oppfølgingsvedtak vil bli slettet
            </HiddenIfAlertStripeAdvarselSolid>
        </>
    );
}
