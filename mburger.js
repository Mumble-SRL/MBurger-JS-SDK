const axios = require('axios');

const host = "https://mburger.cloud/api/";
const headers = {
    'Accept': 'application/json',
    'X-MBurger-Version': 3,
};

/**
 * Initiate an MBurger connection.
 *
 * @constructor
 * @param {string} api_key - MBurger project API Key.
 * @returns {MBurgerInstance}
 * @example
 * // Import MBurger SDK
 * const mburger = require('mburger');
 *
 * // Init the connection
 * const instance = mburger.createClient('a1b2c3d4');
 *
 */
export function createClient(api_key) {
    return MBurgerInstance(
        axios.create({
            baseURL: host,
            headers: {
                ...{'X-MBurger-Token': api_key},
                ...headers
            }
        })
    );
}

export function MBurgerInstance(axiosInstance) {

    /**
     * Retrieve a single section.
     *
     * @constructor
     * @param {integer} section_id - ID of the requested Section from MBurger.
     * @param {boolean} [original_media=false] - Indicate if you want the original media or the converted ones.
     * @param {object} [params={}] - The parameters you want to pass to the MBurger params variable. Check our API Reference for more informations.
     * @param {object} [filters={}] - The filters you want to pass to the MBurger filters variable. Check our API Reference for more informations.
     * @param {boolean} [order_asc=true] - Express if you want the data in ascendent or descendent order.
     * @param {integer} [cache_seconds=0] - Number of seconds you want to keep the API response stored in your local cache.
     * @param {boolean} [use_slug=false] - Declare if you want to use the section slug instead of the ID to retrieve data.
     * @returns {object}
     * @example
     * // Import MBurger SDK
     * const mburger = require('mburger');
     *
     * // Init the connection
     * const instance = mburger.createClient('a1b2c3d4');
     *
     * // Retrieve data from the section 1234
     * let data = instance.getSection(1234);
     * console.log(data);
     */
    function getSection(section_id, original_media = false, params = {}, filters = {}, order_asc = true, cache_seconds = false, use_slug = false) {
        let path = 'sections/' + section_id + '/elements';

        let query = {
            ...params,
            ...{
                original_media: original_media,
                locale: 'it',
                force_locale_fallback: true,
                use_slug: use_slug
            }
        };


        // AXIOS GET Call to MBurger
        axiosInstance.get(host + path, {
            params: params,
            headers: headers
        })
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }

    return {
        getSection: getSection
    }
}
