import React, { useEffect } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { HiddenIfAlertStripeAdvarselSolid } from '../../../components/hidden-if/hidden-if-alertstripe';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { OrNothing } from '../../../../util/type/ornothing';
import { useFetchHarUtkast } from '../../../../api/veilarbvedtaksstotte';
import { AvslutningStatus } from '../../../../api/veilarboppfolging';
import { useFetchHarTiltak } from '../../../../api/veilarbaktivitet';

export function AvsluttOppfolgingInfoText(props: {
    harYtelser?: boolean;
    vedtaksstottePrelanseringEnabled: boolean;
    avslutningStatus: OrNothing<AvslutningStatus>;
    datoErInnenFor28DagerSiden: boolean;
    harUbehandledeDialoger: boolean;
    fnr: string;
}) {
    const fetchHarTiltak = useFetchHarTiltak(props.fnr);
    const fetchHarUtkast = useFetchHarUtkast(props.fnr, { manual: true });

    useEffect(() => {
        if (!props.vedtaksstottePrelanseringEnabled) {
            fetchHarUtkast.fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (fetchHarTiltak.loading || (!props.vedtaksstottePrelanseringEnabled && fetchHarUtkast.loading)) {
        return <NavFrontendSpinner type="XL" />;
    }

    const harTiltak = fetchHarTiltak.data;
    const hentTiltakFeilet = !!fetchHarTiltak.error;

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

            <HiddenIfAlertStripeAdvarselSolid hidden={!fetchHarUtkast.data}>
                Utkast til oppfølgingsvedtak vil bli slettet
            </HiddenIfAlertStripeAdvarselSolid>
        </>
    );
}
