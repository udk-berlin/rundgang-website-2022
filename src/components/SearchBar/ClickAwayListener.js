import React, {
	useRef,
	useEffect,
	cloneElement,
} from 'react';


const eventTypeMapping = {
	click: 'onClick',
	focusin: 'onFocus',
	focusout: 'onFocus',
	mousedown: 'onMouseDown',
	mouseup: 'onMouseUp',
	touchstart: 'onTouchStart',
	touchend: 'onTouchEnd'
};

const ClickAwayListener= ({
	children,
	onClickAway,
	focusEvent = 'focusin',
	mouseEvent = 'click',
	touchEvent = 'touchend'
}) => {
	const node = useRef(null);
	const bubbledEventTarget = useRef(null);
	const mountedRef = useRef(false);

	/**
	 * Prevents the bubbled event from getting triggered immediately
	 * https://github.com/facebook/react/issues/20074
	 */
	useEffect(() => {
		setTimeout(() => {
			mountedRef.current = true;
		}, 0);

		return () => {
			mountedRef.current = false;
		};
	}, []);

	const handleBubbledEvents =
		(type) =>
		(event) => {
			bubbledEventTarget.current = event.target;

			const handler = children?.props[type];

			if (handler) {
				handler(event);
			}
		};

	const handleChildRef = (childRef) => {
		node.current = childRef;

		let { ref } = children;

		if (typeof ref === 'function') {
			ref(childRef);
		} else if (ref) {
			ref.current = childRef;
		}
	};

	useEffect(() => {
		const handleEvents = (event)=> {
			if (!mountedRef.current) return;

			if (
				(node.current && node.current.contains(event.target )) ||
				bubbledEventTarget.current === event.target ||
				!document.contains(event.target )
			) {
				return;
			}

			onClickAway(event);
		};

		document.addEventListener(mouseEvent, handleEvents);
		document.addEventListener(touchEvent, handleEvents);
		document.addEventListener(focusEvent, handleEvents);

		return () => {
			document.removeEventListener(mouseEvent, handleEvents);
			document.removeEventListener(touchEvent, handleEvents);
			document.removeEventListener(focusEvent, handleEvents);
		};
	}, [focusEvent, mouseEvent, onClickAway, touchEvent]);

	const mappedMouseEvent = eventTypeMapping[mouseEvent];
	const mappedTouchEvent = eventTypeMapping[touchEvent];
	const mappedFocusEvent = eventTypeMapping[focusEvent];

	return React.Children.only(
		cloneElement(children, {
			ref: handleChildRef,
			[mappedFocusEvent]: handleBubbledEvents(mappedFocusEvent),
			[mappedMouseEvent]: handleBubbledEvents(mappedMouseEvent),
			[mappedTouchEvent]: handleBubbledEvents(mappedTouchEvent)
		})
	);
};

export default ClickAwayListener;