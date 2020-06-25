const axios = require('axios');

const host = "https://mburger.cloud/api/";
const headers = {
    'Accept': 'application/json',
    'X-MBurger-Version': 3,
};

// TODO. Locale ignored
// TODO. Implement caching

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
     * instance.getSection(1234).then(result => console.log(result));
     */
    async function getSection(section_id, original_media = false, cache_seconds = false, use_slug = false) {
        let path = 'sections/' + section_id + '/elements';

        let query = {
            original_media: original_media,
            locale: 'it',
            force_locale_fallback: true,
            use_slug: use_slug
        };

        return new Promise((resolve) => {
            axiosInstance.get(host + path,
                {
                    params: query,
                    headers: headers
                })
                .then((response) => {
                    let items = response.data.body.items;
                    for (let key in items) {
                        items[key] = items[key].value;
                    }

                    items['id'] = section_id;

                    resolve(items);
                }, (error) => {
                    console.log("Error: ", error);
                });
        })
    }

    /**
     * Retrieve a single block.
     *
     * @constructor
     * @param {integer} block_id - ID of the requested Block.
     * @param {boolean} [original_media=false] - Indicate if you want the original media or the converted ones
     * @param {object} [params={}] - The parameters you want to pass to the MBurger params variable. Check our API Reference for more informations.
     * @param {boolean} [order_asc=true] - Express if you want the data in ascendent or descendent order.
     * @param {integer} [cache_seconds=0] - Number of seconds you want to keep the API response stored in your local cache.
     * @returns {object}
     * @example
     * // Import MBurger SDK
     * const mburger = require('mburger');
     *
     * // Init the connection
     * const instance = mburger.createClient('a1b2c3d4');
     *
     * // Retrieve data from the block 123
     * instance.getBlock(123).then(result => console.log(result));
     *
     */
    async function getBlock(block_id, original_media = false, params = {}, order_asc = true, cache_seconds = false) {
        let path = 'blocks/' + block_id + '/sections';

        let query = {
            ...params,
            ...{
                include: 'elements',
                sort: 'order',
                force_locale_fallback: true,
                locale: 'it',
                original_media: original_media
            }
        };

        if (!order_asc) {
            query['sort'] = '-order';
        }

        return new Promise((resolve) => {
            axiosInstance.get(host + path,
                {
                    params: query,
                    headers: headers
                })
                .then((response) => {
                    let items = response.data.body.items.map(value => {
                        let section = value.elements;
                        for (let key in section) {
                            section[key] = section[key].value;
                        }

                        return section;
                    });

                    resolve(items);
                }, (error) => {
                    console.log("Error: ", error);
                });
        })
    }

    /**
     * Retrieve multiple blocks.
     *
     * @constructor
     * @param {array} block_ids - ID of the requested Blocks.
     * @param {boolean} [original_media=false] - Indicate if you want the original media or the converted ones
     * @param {object} [params={}] - The parameters you want to pass to the MBurger params variable. Check our API Reference for more informations.
     * @param {boolean} [order_asc=true] - Express if you want the data in ascendent or descendent order.
     * @param {integer} [cache_seconds=0] - Number of seconds you want to keep the API response stored in your local cache.
     * @returns {object}
     * @example
     * // Import MBurger SDK
     * const mburger = require('mburger');
     *
     * // Init the connection
     * const instance = mburger.createClient('a1b2c3d4');
     *
     * // Retrieve data from the blocks 798 and 799
     * instance.getBlocks([798, 799]).then(result => console.log(result));
     *
     */
    async function getBlocks(block_ids, original_media = false, params = {}, filters = {}, order_asc = true, cache_seconds = false) {
        let path = 'blocks';

        let query = {
            ...params,
            ...{
                include: 'sections.elements',
                sort: 'order',
                force_locale_fallback: true,
                locale: 'it',
                original_media: original_media,
            }
        };

        let filters_query = {
            ...filters,
            ...{
                id: block_ids.join()
            }
        };

        for (let key in filters_query) {
            query['filter[' + key + ']'] = filters_query[key];
        }

        if (!order_asc) {
            query['sort'] = '-order';
        }

        return new Promise((resolve) => {
            axiosInstance.get(host + path,
                {
                    params: query,
                    headers: headers
                })
                .then((response) => {
                    let blocks = response.data.body.items.map((block, i) => {
                        return block;
                    });

                    let sections = blocks.map((value, i) => {
                        let sections = value.sections;

                        let section = sections.map((value, i) => {
                            let section = value.elements;
                            for (let key in section) {
                                section[key] = section[key].value;
                            }
                            return section;
                        });
                        return section;
                    });

                    let out = {};
                    for (let [i, value] of Object.entries(blocks)) {
                        out[value.title] = sections[i];
                    }

                    resolve(out);
                }, (error) => {
                    console.log("Error: ", error);
                });
        })
    }

    return {
        getSection: getSection,
        getBlock: getBlock,
        getBlocks: getBlocks
    }
}
