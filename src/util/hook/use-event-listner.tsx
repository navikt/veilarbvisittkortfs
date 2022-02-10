import { useEffect } from 'react';
import { useEventCallback } from './use-event-callback';

export function useDocumentEventListner(type: string, listener: EventListener) {
	const savedCallBack = useEventCallback(listener);

	useEffect(() => {
		document.body.addEventListener(type, savedCallBack);
		return () => {
			document.body.removeEventListener(type, savedCallBack);
		};
	}, [savedCallBack, type]);
}
