/**
 * @param {any} expr
 * @param {any} context?
 * @returns {HTMLElement} DOM Element matched by expr selector in context
 */
export const $ = ( expr, context = document ) => typeof expr === 'string' ? ( context || document ).querySelector( expr ) : expr || null;

/**
 * @param {string} expr
 * @param {any} context?
 * @returns {array} Array of DOM Elements from a DOM Nodelist selected by expr selector in context
 */
export const $$ = ( expr, context = document ) => {
    return [...typeof expr === 'string' ? ( context || document ).querySelectorAll( expr ) : expr || null];
};