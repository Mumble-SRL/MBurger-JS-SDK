/*
 *  __  __ ___                            _ ___   ___ ___  _  __
 * |  \/  | _ )_  _ _ _ __ _ ___ _ _   _ | / __| / __|   \| |/ /
 * | |\/| | _ \ || | '_/ _` / -_) '_| | || \__ \ \__ \ |) | ' <
 * |_|  |_|___/\_,_|_| \__, \___|_|    \__/|___/ |___/___/|_|\_\
 *                     |___/
 *
 * Repo:     https://github.com/Mumble-SRL/MBurger-JS-SDK
 * Credits:  Mumble <https://mumbleideas.it>
 * Platform: MBurger <https://mburger.cloud>
 *
 */

import {AxiosInstance, AxiosResponse} from 'axios'
import axios from 'axios'
import {
    MBurgerBlock,
    CreateClientParams,
    GetProjectParams,
    MBurgerGetSectionsParams,
    MBurgerGetSectionsResponse,
    MBurgerSection,
    MBurgerSize,
    Query,
    MBurgerType,
    MBurgerGetSectionParams, MBurgerGetSectionResponse, MBurgerGetBlocksParams, MBurgerGetBlocksResponse, MBurgerElement
} from "./types";

const host = 'https://mburger.cloud/api/'

const headers = {
    Accept: 'application/json',
    'X-MBurger-Version': 3,
}

// TODO. Implement caching

/**
 * Initiate an MBurger connection.
 *
 * @constructor
 * @param {string} params.api_key - MBurger project API Key.
 * @returns {MBurgerInstance}
 * @example
 * // Import MBurger SDK
 * const mburger = require('mburger');
 *
 * // Init the connection
 *  const instance = mburger.createClient({
 *     api_key: '1234567890'
 *   });
 *
 */
export function createClient(params: CreateClientParams) {
    if (!params.api_key) {
        throw new TypeError(
            'You have to initialize the Client with an API Key. Visit support.mburger.cloud for more informations'
        )
    }

    return MBurgerInstance(
        axios.create({
            baseURL: host,
            headers: {
                ...{'X-MBurger-Token': params.api_key},
                ...headers,
            },
        })
    )
}

export function MBurgerInstance(axiosInstance: AxiosInstance) {
    /**
     * Retrieve the project.
     *
     * @constructor
     * @param {string} params.locale - Country code of the required locale.
     * @param {Array} params.include=[] - Specify which relations to load and include in response.
     * @returns {object}
     * @example
     * // Import MBurger SDK
     * const mburger = require('mburger');
     *
     * // Init the connection
     * const instance = mburger.createClient({
     *   api_key: '1234567890'
     * });
     *
     * // Retrieve a specific block
     * instance.getProject({
     *       locale: 'it',
     *       include: ['contracts'],
     * }).then(result => console.log(result));
     *
     */
    async function getProject(params: GetProjectParams) {
        const path = 'project'

        let query: Query<'getProject'> = {}

        if (params) {
            if (params.locale) {
                query.locale = params.locale
            }

            if (params.include) {
                query.include = params.include
            }
        } else query = null

        return new Promise((resolve, rejects) => {
            axiosInstance
                .get(host + path, {
                    params: query,
                    headers: headers,
                })
                .then(
                    (response) => {
                        resolve(response.data.body)
                    },
                    (error) => {
                        rejects(error)
                    }
                )
        })
    }

    /**
     * Retrieve a single section.
     *
     * @constructor
     * @param {integer} params.section_id - ID of the requested Section from MBurger.
     * @param {string} params.locale - Country code of the required locale.
     * @param {boolean} params.original_media=false - Indicate if you want the original media or the converted ones.
     * @param {boolean} params.force_locale_fallback=false - Set the parameters force_locale_fallback as indicated in the documentation.
     * @param {boolean} params.use_slug=false - Declare if you want to use the section slug instead of the ID to retrieve data.
     * @returns {object}
     * @example
     * // Import MBurger SDK
     * const mburger = require('mburger');
     *
     * // Init the connection
     *   const instance = mburger.createClient({
     *       api_key: '1234567890'
     *   });
     *
     * // Retrieve data from the section 10088
     *    instance.getSection({
     *       section_id: 10088,
     *       locale: 'it',
     *       force_locale_fallback: false
     *   }).then(result => console.log(result));
     */
    async function getSection<
        Elements extends { [key in string]: MBurgerElement<MBurgerType, Size> },
        Size extends MBurgerSize = 'short',
    >
    (params: MBurgerGetSectionParams<Size>): Promise<MBurgerGetSectionResponse<Size, Elements>> {
        if (!params.section_id) {
            throw new TypeError('You have to speficy a section_id. Visit support.mburger.cloud for more informations')
        }

        const path = 'sections/' + params.section_id

        const query: Query<'getSection'> = {
            include: 'elements',
        }

        if (params.locale) {
            query.locale = params.locale
        }

        if (params.original_media) {
            query.original_media = params.original_media
        }

        if (params.force_locale_fallback) {
            query.force_locale_fallback = params.force_locale_fallback
        }

        if (params.use_slug) {
            query.use_slug = params.use_slug
        }

        const size: MBurgerSize = params.size ?? 'short'

        return new Promise((resolve, rejects) => {
            axiosInstance
                .get(host + path, {
                    params: query,
                    headers: headers,
                })
                .then(
                    (response: AxiosResponse<{ body: MBurgerSection }>) => {

                        if (size === 'short') {
                            const section = response.data.body
                            const elements = section.elements as any
                            let responseShort = {
                                id: section.id,
                                visible: section.visible,
                                available_at: section.available_at,
                                updated_at: section.updated_at,
                            } as MBurgerGetSectionResponse<Size, Elements>
                            for (let key in elements) {
                                // @ts-ignore
                                responseShort[key] = section.elements[key].value;
                            }
                            resolve(responseShort)
                        } else {
                            const responseFull = response.data.body as MBurgerGetSectionResponse<Size, Elements>
                            resolve(responseFull)
                        }
                    },
                    (error) => {
                        rejects(error)
                    }
                )
        })
    }

    /**
     * Retrieve a single block.
     *
     * @constructor
     * @param {integer} params.block_id - ID of the requested Block.
     * @param {string} params.locale - Country code of the required locale.
     * @param {boolean} params.original_media=false - Indicate if you want the original media or the converted ones
     * @param {object} params.extra_params={} - The parameters you want to pass to the MBurger params variable. Check our API Reference for more informations.
     * @param {boolean} params.order_desc=true - Express if you want the data in ascendent or descendent order.
     * @param {boolean} params.force_locale_fallback=false - Set the parameters force_locale_fallback as indicated in the documentation.
     * @param {object} params.filter={} - Set the filters as indicated in the official documentation.
     * @returns {object}
     * @example
     * // Import MBurger SDK
     * const mburger = require('mburger');
     *
     * // Init the connection
     * const instance = mburger.createClient({
     *   api_key: '1234567890'
     * });
     *
     * // Retrieve a specific block
     * instance.getBlock({
     *       section_id: 884,
     *       locale: 'it',
     *       original_media: false,
     *       filter: {
     *           'value': 'chiave 1,chiave 2'
     *       }
     * }).then(result => console.log(result));
     *
     */
    async function getSections<
        Elements extends { [key in string]: MBurgerElement<MBurgerType, Size> },
        Size extends MBurgerSize = 'short'
    >(params: MBurgerGetSectionsParams<Size>): Promise<MBurgerGetSectionsResponse<Size, Elements>> {
        if (!params.block_id) {
            throw new TypeError('You have to speficy a block_id. Visit support.mburger.cloud for more informations')
        }

        const path = 'blocks/' + params.block_id + '/sections'

        let query: Query<'getSections'> = {
            include: 'elements',
            sort: 'order',
        }

        if (params.force_locale_fallback) {
            query.force_locale_fallback = params.force_locale_fallback
        }

        if (params.locale) {
            query.locale = params.locale
        }

        if (params.original_media) {
            query.original_media = params.original_media
        }

        if (params.order_desc) {
            query.sort = '-order'
        }

        if (params.filter) {
            query.filter = {}
            for (const [key, value] of Object.entries(params.filter)) {
                query.filter[key] = value
            }
        }

        if (params.extra_params) {
            query = {
                ...query,
                ...params.extra_params,
            }
        }

        const size: MBurgerSize = params.size ?? 'short'

        return new Promise((resolve, rejects) => {
            axiosInstance
                .get(host + path, {
                    params: query,
                    headers: headers,
                })
                .then((response: AxiosResponse<{
                        body: {
                            items: MBurgerSection[],
                            meta: { from: number; to: number; total: number }
                        }
                    }>) => {
                        if (size === 'short') {
                            const responseShort = response.data.body.items.map(section => {
                                const elements = section.elements as any
                                const result = {
                                    id: section.id,
                                    visible: section.visible,
                                    available_at: section.available_at,
                                    updated_at: section.updated_at,
                                }
                                for (let key in elements) {
                                    // @ts-ignore
                                    result[key] = section.elements[key].value;
                                }
                                return result
                            }) as MBurgerGetSectionsResponse<Size, Elements>

                            resolve(responseShort)
                        } else {
                            const responseFull = {
                                sections: response.data.body.items,
                                meta: response.data.body.meta,
                            } as MBurgerGetSectionsResponse<Size, Elements>

                            resolve(responseFull)
                        }
                    },
                    (error) => {
                        rejects(error)
                    }
                )
        })
    }

    /**
     * Retrieve multiple blocks.
     *
     * @constructor
     * @param {array} params.block_ids - ID of the requested Blocks.
     * @param {string} params.locale - Country code of the required locale.
     * @param {object} params.filter={} - Set the filters as indicated in the official documentation.
     * @returns {object}
     * @example
     *   // Import MBurger SDK
     *   const mburger = require('mburger');
     *
     *   // Init the connection
     *   const instance = mburger.createClient({
     *       api_key: '123457890'
     *   });
     *
     *  // Retrieve data from the blocks 798 and 799
     *  instance.getBlocks({
     *       block_ids: [798, 799],
     *       locale: 'it',
     *       filter: {
     *           'value': 'chiave 1, chiave 2'
     *       }
     *   }).then(result => console.log(result));
     *
     */
    async function getBlocks<
        Elements extends { [key in string]: MBurgerElement<MBurgerType, Size> },
        Size extends MBurgerSize = 'short'
    >(params: MBurgerGetBlocksParams<Size>): Promise<MBurgerGetBlocksResponse<Size, Elements>> {
        const path = 'blocks'

        if (!params.block_ids) {
            throw new TypeError(
                'You have to speficy the block_ids value (array). Visit support.mburger.cloud for more informations'
            )
        }

        const query: Query<'getBlocks'> = {
            include: 'sections.elements',
            sort: 'order',
        }

        if (params.locale) {
            query.locale = params.locale
        }

        if (params.filter) {
            query.filter = {id: params.block_ids.join()}
            for (const [key, value] of Object.entries(params.filter)) {
                query.filter[key] = value
            }
        }

        if (!query.filter) {
            query.filter = {}
        }

        query.filter['id'] = params.block_ids.join()

        const size: MBurgerSize = params.size ?? 'short'

        return new Promise((resolve, rejects) => {
            axiosInstance
                .get(host + path, {
                    params: query,
                    headers: headers,
                })
                .then((response: AxiosResponse<{
                        body: {
                            items: MBurgerBlock[],
                            meta: { from: number; to: number; total: number }
                        }
                    }>) => {
                        if (size === 'short') {
                            let blocks = response.data.body.items

                            const responseShort = blocks.map((block) => {
                                const sections: MBurgerSection<'short'>[] = block.sections.map(section => {
                                    const elements = section.elements as any
                                    const result = {
                                        id: section.id,
                                        visible: section.visible,
                                        available_at: section.available_at,
                                        updated_at: section.updated_at,
                                    }
                                    for (let key in elements) {
                                        // @ts-ignore
                                        result[key] = section.elements[key].value;
                                    }
                                    return result
                                })

                                return {
                                    ...block,
                                    sections
                                }
                            }) as MBurgerGetBlocksResponse<Size, Elements>

                            resolve(responseShort)
                        } else {
                            const responseShort = {
                                blocks: response.data.body.items,
                                meta: response.data.body.meta
                            } as MBurgerGetBlocksResponse<Size, Elements>

                            resolve(responseShort)
                        }
                    },
                    (error) => {
                        rejects(error)
                    }
                )
        })
    }

    return {
        getProject,
        getSection,
        getSections,
        getBlocks,
    }
}
