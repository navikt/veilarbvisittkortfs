import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import {
    FeatureToggles,
    PILOT_TOGGLE,
    HENT_PERSONDATA_FRA_PDL_TOGGLE,
    VEDTAKSSTTOTTE_PRELANSERING_TOGGLE
} from '../../api/veilarbpersonflatefs';

const mockFeatures: FeatureToggles = {
    [PILOT_TOGGLE]: true,
    [VEDTAKSSTTOTTE_PRELANSERING_TOGGLE]: true,
    [HENT_PERSONDATA_FRA_PDL_TOGGLE]: true
};

export const veilarbpersonflatefsHandlers: RequestHandlersList = [
    rest.get('/veilarbpersonflatefs/api/feature', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockFeatures));
    })
];
