import * as React from 'react';
import { Alert, Link } from '@navikt/ds-react';
import { ExternalLink } from '@navikt/ds-icons';
import { trackAmplitude } from '../../amplitude/amplitude';

export const ArbeidslisteInformasjonsmelding = () => (
    <Alert variant="info" className="arbeidsliste-alert" size="small">
        Arbeidslisten er ikke synlig for personen det gjelder. Derfor skal du ikke skrive sensitive opplysninger eller
        annen informasjon som personen skal ha innsyn i her. Bruk arbeidslisten som huskelapp for deg selv. Innholdet
        vil kunne utleveres ved innsynsbegjæring.
        <br />
        <b>
            <Link
                href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Arbeidslisten-i-Oversikten-i-Modia.aspx"
                target="_blank"
                rel="noopener"
                onClick={() => {
                    trackAmplitude({
                        name: 'navigere',
                        data: { lenketekst: 'Les om hvordan bruke arbeidslisten på Navet', destinasjon: 'navet' }
                    });
                }}
            >
                Les mer om hvordan bruke arbeidslisten på Navet <ExternalLink fr="0" />
            </Link>
        </b>
    </Alert>
);
