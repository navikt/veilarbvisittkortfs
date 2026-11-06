import { afterEach, expect, test, vi } from 'vitest';
import { exposeVisittkortAsWebComponent } from './webComponentWrapper';

vi.mock('react-dom/client', () => ({
    default: { createRoot: () => ({ render: vi.fn(), unmount: vi.fn() }) }
}));

afterEach(() => {
    document.body.replaceChildren();
});

test('reserverer høyde i shadow DOM før React har rendret', () => {
    exposeVisittkortAsWebComponent();
    const element = document.createElement('ao-visittkort');
    document.body.appendChild(element);

    expect(element.shadowRoot?.firstElementChild?.classList.contains('visittkort-placeholder')).toBe(true);
    expect(element.shadowRoot?.firstElementChild?.childElementCount).toBe(0);
});
