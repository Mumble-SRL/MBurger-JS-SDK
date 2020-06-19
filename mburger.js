const axios = require('axios');
const env = require('dotenv').config()

const host = "https://mburger.cloud/api/";

const headers = [
    'Accept:application/json',
    'X-MBurger-Token:' + process.env.MBURGER_API_KEY,
    'X-MBurger-Version:3',
];

export function getBlocks() {

}

export function getBlock() {

}

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
 * @returns {object} Returns a { key: value } object with the field name as key.
 */
export function getSection(section_id, original_media = false, params = {}, filters = {}, order_asc = true, cache_seconds = false, use_slug = false) {
    let path = 'sections/' + secton_id + '/elements';

    let query = {
        ...params,
        ...{
            original_media: original_media,
            locale: 'it',
            force_locale_fallback: true,
            use_slug: use_slug
        }
    };

    // Optionally the request above could also be done as
    axios.get(host + path, {
        params: params
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });


}