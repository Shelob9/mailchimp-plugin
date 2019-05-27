import {attributes} from "./attributes";

export const createBlockOptions = (options) => {
    return {
        ...options,
        attributes: options.hasOwnProperty('attributes') ? options.attributes : attributes,
        icon: 'feedback',
        category: 'caldera',
    }
};
