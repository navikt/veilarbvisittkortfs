import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { SWRConfig } from 'swr';
import { Etiketter, PersonaliaGraphqlRequest, usePersonalia } from './veilarbperson';
import { behandlingsnummer } from './behandlingsnummer';
import { logGraphQLError } from './ao-oppfolgingskontor';
import { mockPersonalia } from '../mock/api/veilarbperson';

vi.mock('./ao-oppfolgingskontor', () => ({ logGraphQLError: vi.fn() }));

const brukerFnr = '10108000398';

const mockPersonaliaHandler = (etiketter: Etiketter[]) =>
    http.post('/veilarbperson/graphql', () =>
        HttpResponse.json({ data: { person: { ...mockPersonalia, etiketter } }, errors: null })
    );

const server = setupServer(mockPersonaliaHandler(mockPersonalia.etiketter));

const renderPersonalia = () =>
    renderHook(() => usePersonalia(brukerFnr), {
        wrapper: ({ children }: PropsWithChildren) => (
            <SWRConfig value={{ provider: () => new Map(), shouldRetryOnError: false }}>{children}</SWRConfig>
        )
    });

describe('usePersonalia', () => {
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
    afterEach(() => {
        cleanup();
        server.resetHandlers();
        vi.clearAllMocks();
    });
    afterAll(() => server.close());

    test('tar med etiketter i GraphQL-kallet', async () => {
        let requestBody: PersonaliaGraphqlRequest | undefined;
        server.use(
            http.post<never, PersonaliaGraphqlRequest>('/veilarbperson/graphql', async ({ request }) => {
                requestBody = await request.json();
                return HttpResponse.json({ data: { person: mockPersonalia }, errors: null });
            })
        );

        const { result } = renderPersonalia();

        await waitFor(() => expect(result.current.personalia).toEqual(mockPersonalia));
        expect(requestBody?.query).toMatch(/\betiketter\b/);
        expect(requestBody?.variables).toEqual({ fnr: brukerFnr, behandlingsnummer });
    });

    test.each(Object.values(Etiketter))('beholder etiketten %s', async etikett => {
        server.use(mockPersonaliaHandler([etikett]));

        const { result } = renderPersonalia();

        await waitFor(() => expect(result.current.personalia?.etiketter).toEqual([etikett]));
    });

    test('beholder flere etiketter', async () => {
        const etiketter = Object.values(Etiketter);
        server.use(mockPersonaliaHandler(etiketter));

        const { result } = renderPersonalia();

        await waitFor(() => expect(result.current.personalia?.etiketter).toEqual(etiketter));
    });

    test('beholder en tom etikettliste', async () => {
        server.use(mockPersonaliaHandler([]));

        const { result } = renderPersonalia();

        await waitFor(() => expect(result.current.personalia?.etiketter).toEqual([]));
    });

    test('returnerer feil ved GraphQL-feil', async () => {
        const response = { data: { person: null }, errors: [{ message: 'Testfeil' }] };
        server.use(http.post('/veilarbperson/graphql', () => HttpResponse.json(response)));

        const { result } = renderPersonalia();

        await waitFor(() => expect(result.current.error).toEqual(new Error('Feil ved henting av personalia')));
        expect(result.current.personalia).toBeUndefined();
        expect(logGraphQLError).toHaveBeenCalledWith(response);
    });
});
