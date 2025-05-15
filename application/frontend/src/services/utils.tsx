/**
 * Navigates to a new URL path without reloading the page.
 *
 * @remarks
 * This is a custom navigation function that mimics SPA behavior using the
 * History API and manually dispatches a `popstate` event to notify listeners.
 *
 * @param path - The path to navigate to (e.g., `/rooms`, `/login`)
 *
 * @example
 * ```ts
 * navigate('/dashboard');
 * ```
 */
export function navigate(path: string) {
	window.history.pushState({}, '', path);
	window.dispatchEvent(new PopStateEvent('popstate'));
}

/**
 * Capitalizes the first letter of a given string.
 *
 * @param val - The string to transform.
 * @returns The input string with the first character capitalized.
 *
 * @example
 * ```ts
 * capitalizeFirstLetter('guest'); // 'Guest'
 * ```
 */
export function capitalizeFirstLetter(val: string) {
	return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
