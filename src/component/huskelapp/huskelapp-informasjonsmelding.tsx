import * as React from 'react';
import { Alert, Link } from '@navikt/ds-react';
import { ExternalLink } from '@navikt/ds-icons';
import { trackAmplitude } from '../../amplitude/amplitude';

export const HuskelappInformasjonsmelding = () => (
    <Alert variant="info" className="huskelapp-alert" size="small">
        Huskelapp er ikke synlig for personen det gjelder...
        <br />
        <b>
            <Link
                href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-arbeidsrettet-brukeroppfolging/SitePages/Arbeidslisten-i-Oversikten-i-Modia.aspx"
                target="_blank"
                rel="noopener"
                onClick={() => {
                    trackAmplitude({
                        name: 'navigere',
                        data: { lenketekst: 'Les om hvordan bruke huskelapp på Navet', destinasjon: 'navet' }
                    });
                }}
            >
                Les mer om hvordan bruke huskelapp på Navet <ExternalLink fr="0" />
            </Link>
        </b>
    </Alert>
);
