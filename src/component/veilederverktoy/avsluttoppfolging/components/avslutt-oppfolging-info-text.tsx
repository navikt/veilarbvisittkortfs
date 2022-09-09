import React, { useEffect } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { HiddenIfAlertStripeAdvarselSolid } from '../../../components/hidden-if/hidden-if-alertstripe';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { fetchHarUtkast } from '../../../../api/veilarbvedtaksstotte';
import { AvslutningStatus } from '../../../../api/veilarboppfolging';
import { fetchHarTiltak } from '../../../../api/veilarbaktivitet';
import { useAxiosFetcher } from '../../../../util/hook/use-axios-fetcher';
import { OrNothing } from '../../../../util/type/utility-types';

export function AvsluttOppfolgingInfoText(props: {
    harYtelser?: boolean;
    vedtaksstottePrelanseringEnabled: boolean;
    avslutningStatus: OrNothing<AvslutningStatus>;
    datoErInnenFor28DagerSiden: boolean;
    harUbehandledeDialoger: boolean;
    fnr: string;
}) {
    const harTiltakFetcher = useAxiosFetcher(fetchHarTiltak);
    const harUtakstFetcher = useAxiosFetcher(fetchHarUtkast);

    useEffect(() => {
        if (!props.vedtaksstottePrelanseringEnabled) {
            harUtakstFetcher.fetch(props.fnr);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (harTiltakFetcher.loading || (!props.vedtaksstottePrelanseringEnabled && harUtakstFetcher.loading)) {
        return <NavFrontendSpinner type="XL" />;
    }

    const harTiltak = harTiltakFetcher.data;
    const hentTiltakFeilet = !!harTiltakFetcher.error;

    const aktivMindreEnn28Dager = props.datoErInnenFor28DagerSiden
        ? 'Brukeren har vært inaktiv i mindre enn 28 dager. Vil du likevel avslutte brukerens oppfølgingsperiode?'
        : 'Her avslutter du brukerens oppfølgingsperioden og legger inn en kort begrunnelse om hvorfor.';

    return (
        <>
            <Normaltekst>{aktivMindreEnn28Dager}</Normaltekst>
            <HiddenIfAlertStripeAdvarselSolid hidden={!props.harUbehandledeDialoger && !harTiltak && !props.harYtelser}>
                Du kan avslutte oppfølgingsperioden selv om:
                <ul className="margin--0">
                    {props.harUbehandledeDialoger && <li>Brukeren har ubehandlede dialoger</li>}
                    {hentTiltakFeilet && <li>Brukeren kan ha aktive tiltak i Arena</li>}
                    {!hentTiltakFeilet && harTiltak && <li>Brukeren har aktive tiltak i Arena</li>}
                    {props.harYtelser && <li>Brukeren har aktive saker i Arena</li>}
                </ul>
            </HiddenIfAlertStripeAdvarselSolid>

            <HiddenIfAlertStripeAdvarselSolid hidden={!harUtakstFetcher.data}>
                Utkast til oppfølgingsvedtak vil bli slettet
            </HiddenIfAlertStripeAdvarselSolid>
        </>
    );
}
