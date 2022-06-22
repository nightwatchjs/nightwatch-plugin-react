import {version} from 'react/package.json';

/**
 * React 18 brings a new rendering API, so we need a way to
 * detect when we should import the `react-dom/client` instead of
 * the old default `react-dom` import.
 *
 * @returns {boolean}
 */
exports.shouldNewDOMAPIBeUsed = () => parseInt(version, 10) >= 18;