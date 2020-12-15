import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { RegistreringData } from '../../api/veilarbregistrering';

const mockRegistrering: RegistreringData = {
    type: 'ORDINAER',
    registrering: {
        manueltRegistrertAv: null,
    },
};

export const veilarbregistreringHandlers: RequestHandlersList = [
    rest.get('/veilarbregistrering/api/registrering', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockRegistrering));
    }),
];
