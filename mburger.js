const axios = require('axios');
const env = require('dotenv').config()

const host = "https://mburger.cloud/api";

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
 * @constructor
 * @param {integer} section_id - ID of the requested Section from MBurger.
 */
export function getSection(section_id) {
    let path = 'sections/' + secton_id + '/elements';

    /*
    let query = array(
        original_media: $original_media,
        locale: app()->getLocale(),
        force_locale_fallback: true,
        use_slug: $use_slug
    );
    */

}