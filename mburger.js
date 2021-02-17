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

const axios = require("axios");
const qs = require("qs");

const host = "https://mburger.cloud/api/";
const headers = {
  Accept: "application/json",
  "X-MBurger-Version": 3,
};

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
export function createClient(params) {
  if (!params.api_key) {
    throw new TypeError(
      "You have to initialize the Client with an API Key. Visit support.mburger.cloud for more informations"
    );
  }

  return MBurgerInstance(
    axios.create({
      baseURL: host,
      headers: {
        ...{ "X-MBurger-Token": params.api_key },
        ...headers,
      },
    })
  );
}

export function MBurgerInstance(axiosInstance) {
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
  async function getProject(params) {

    let path = 'project';

    let query = {}

    if(params) {
      if (params.locale) {
        query.locale = params.locale
      }

      if (params.include) {
        query.include = params.include
      }
    } else query = null

    return new Promise((resolve) => {
      axiosInstance.get(host + path, {
        params: query,
        headers: headers,
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      })
        .then((response) => {
          resolve(response.data.body);
        }, (error) => {
          console.log(error);
          throw new TypeError('Error #0 while executing Promise of getProject.');
        });
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
  async function getSection(params) {
    if (!params.section_id) {
      throw new TypeError("You have to speficy a section_id. Visit support.mburger.cloud for more informations");
    }

    let path = "sections/" + params.section_id;

    let query = {
      include: "elements",
    };

    if (params.locale) {
      query.locale = params.locale;
    }

    if (params.original_media) {
      query.original_media = params.original_media;
    }

    if (params.force_locale_fallback) {
      query.force_locale_fallback = params.force_locale_fallback;
    }

    if (params.use_slug) {
      query.use_slug = params.use_slug;
    }

    return new Promise((resolve, rejects) => {
      axiosInstance
        .get(host + path, {
          params: query,
          headers: headers,
        })
        .then(
          (response) => {
            let section = {};
            section.body = {};
            section.meta = {};

            for (let key in response.data.body.elements) {
              section.body[key] = response.data.body.elements[key].value;
            }

            section.meta.id = response.data.body.id;
            section.meta.updated_at = response.data.body.updated_at;
            section.meta.available_at = response.data.body.available_at;
            section.meta.order = response.data.body.order;
            section.meta.in_evidence = response.data.body.in_evidence;
            section.meta.visible = response.data.body.visible;
            section.meta.all_locales = response.data.body.all_locales;

            resolve(section);
          },
          (error) => {
            rejects(new TypeError("Error #1 while executing Promise of getSection."));
          }
        );
    });
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
   * @param {boolean} params.filter={} - Set the filters as indicated in the official documentation.
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
   *           'value': 'chiave 1, chiave 2'
   *       }
   * }).then(result => console.log(result));
   *
   */
  async function getBlock(params) {
    if (!params.block_id) {
      throw new TypeError("You have to speficy a block_id. Visit support.mburger.cloud for more informations");
    }

    let path = "blocks/" + params.block_id + "/sections";

    let query = {
      include: "elements",
      sort: "order",
    };

    if (params.force_locale_fallback) {
      query.force_locale_fallback = params.force_locale_fallback;
    }

    if (params.locale) {
      query.locale = params.locale;
    }

    if (params.original_media) {
      query.original_media = params.original_media;
    }

    if (params.order_desc) {
      query.sort = "-order";
    }

    if (params.filter) {
      query.filter = [];
      for (let [key, value] of Object.entries(params.filter)) {
        query.filter[key] = value;
      }
    }

    if (params.extra_params) {
      query = {
        ...query,
        ...params.extra_params,
      };
    }

    return new Promise((resolve, rejects) => {
      axiosInstance
        .get(host + path, {
          params: query,
          headers: headers,
          paramsSerializer: (params) => {
            return qs.stringify(params);
          },
        })
        .then(
          (response) => {
            let items = response.data.body.items.map((value) => {
              let section = {};
              section.body = {};
              section.meta = {};

              for (let key in value.elements) {
                section.body[key] = value.elements[key].value;
              }

              section.meta.id = value.id;
              section.meta.updated_at = value.updated_at;
              section.meta.available_at = value.available_at;
              section.meta.order = value.order;
              section.meta.in_evidence = value.in_evidence;
              section.meta.visible = value.visible;
              section.meta.all_locales = value.all_locales;

              return section;
            });

            resolve(items);
          },
          (error) => {
            rejects(new TypeError("Error #2 while executing Promise of getBlock."));
          }
        );
    });
  }

  /**
   * Retrieve multiple blocks.
   *
   * @constructor
   * @param {array} params.block_ids - ID of the requested Blocks.
   * @param {string} params.locale - Country code of the required locale.
   * @param {boolean} params.filter={} - Set the filters as indicated in the official documentation.
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
  async function getBlocks(params) {
    let path = "blocks";

    if (!params.block_ids) {
      throw new TypeError(
        "You have to speficy the block_ids value (array). Visit support.mburger.cloud for more informations"
      );
    }

    let query = {
      include: "sections.elements",
      sort: "order",
    };

    if (params.locale) {
      query.locale = params.locale;
    }

    if (params.filter) {
      query.filter = { id: params.block_ids.join() };
      for (let [key, value] of Object.entries(params.filter)) {
        query.filter[key] = value;
      }
    }

    if (!query.filter) {
      query.filter = {};
    }

    query.filter["id"] = params.block_ids.join();

    return new Promise((resolve, rejects) => {
      axiosInstance
        .get(host + path, {
          params: query,
          headers: headers,
          paramsSerializer: (params) => {
            return qs.stringify(params);
          },
        })
        .then(
          (response) => {
            let blocks = response.data.body.items.map((block, i) => {
              return block;
            });

            let out = {};
            let sections = blocks.map((value, i) => {
              let sections = value.sections;

              return sections.map((value, i) => {
                let item = {};
                item.body = {};
                item.meta = {};

                for (let key in value.elements) {
                  item.body[key] = value.elements[key].value;
                }

                item.meta = {
                  all_locales: value.all_locales,
                  available_at: value.available_at,
                  id: value.id,
                  in_evidence: value.in_evidence,
                  order: value.order,
                  updated_at: value.updated_at,
                  visible: value.visible,
                };

                return item;
              });
            });

            let metas = blocks.map((value, i) => {
              return {
                id: value.id,
                available_at: value.available_at,
                updated_at: value.updated_at,
                in_evidence: value.in_evidence,
                order: value.order,
                all_locales: value.all_locales,
              };
            });

            for (let [i, value] of Object.entries(blocks)) {
              out[value.title] = {};
              out[value.title]["body"] = sections[i];
              out[value.title]["meta"] = metas[i];
            }

            resolve(out);
          },
          (error) => {
            rejects(new TypeError("Error #3 while executing Promise of getBlocks."));
          }
        );
    });
  }

  return {
    getSection: getSection,
    getBlock: getBlock,
    getBlocks: getBlocks,
    getProject: getProject,
  };
}
