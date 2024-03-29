"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MBurgerInstance = exports.createClient = void 0;
var axios_1 = require("axios");
var host = 'https://mburger.cloud/api/';
var headers = {
    Accept: 'application/json',
    'X-MBurger-Version': 3
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
function createClient(params) {
    if (!params.api_key) {
        throw new TypeError('You have to initialize the Client with an API Key. Visit support.mburger.cloud for more informations');
    }
    return MBurgerInstance(axios_1["default"].create({
        baseURL: host,
        headers: __assign({ 'X-MBurger-Token': params.api_key }, headers)
    }));
}
exports.createClient = createClient;
function MBurgerInstance(axiosInstance) {
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
    function getProject(params) {
        return __awaiter(this, void 0, void 0, function () {
            var path, query;
            return __generator(this, function (_a) {
                path = 'project';
                query = {};
                if (params) {
                    if (params.locale) {
                        query.locale = params.locale;
                    }
                    if (params.include) {
                        query.include = params.include;
                    }
                }
                else
                    query = null;
                return [2 /*return*/, new Promise(function (resolve, rejects) {
                        axiosInstance
                            .get(host + path, {
                            params: query,
                            headers: headers
                        })
                            .then(function (response) {
                            resolve(response.data.body);
                        }, function (error) {
                            rejects(error);
                        });
                    })];
            });
        });
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
    function getSection(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var path, query, size;
            return __generator(this, function (_b) {
                if (!params.section_id) {
                    throw new TypeError('You have to speficy a section_id. Visit support.mburger.cloud for more informations');
                }
                path = 'sections/' + params.section_id;
                query = {
                    include: 'elements'
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
                size = (_a = params.size) !== null && _a !== void 0 ? _a : 'short';
                return [2 /*return*/, new Promise(function (resolve, rejects) {
                        axiosInstance
                            .get(host + path, {
                            params: query,
                            headers: headers
                        })
                            .then(function (response) {
                            if (size === 'short') {
                                var section = response.data.body;
                                var elements = section.elements;
                                var responseShort = {
                                    id: section.id,
                                    visible: section.visible,
                                    available_at: section.available_at,
                                    updated_at: section.updated_at
                                };
                                for (var key in elements) {
                                    // @ts-ignore
                                    responseShort[key] = section.elements[key].value;
                                }
                                resolve(responseShort);
                            }
                            else {
                                var responseFull = response.data.body;
                                resolve(responseFull);
                            }
                        }, function (error) {
                            rejects(error);
                        });
                    })];
            });
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
    function getSections(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var path, query, _i, _b, _c, key, value, size;
            return __generator(this, function (_d) {
                if (!params.block_id) {
                    throw new TypeError('You have to speficy a block_id. Visit support.mburger.cloud for more informations');
                }
                path = 'blocks/' + params.block_id + '/sections';
                query = {
                    include: 'elements',
                    sort: 'order'
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
                    query.sort = '-order';
                }
                if (params.filter) {
                    query.filter = {};
                    for (_i = 0, _b = Object.entries(params.filter); _i < _b.length; _i++) {
                        _c = _b[_i], key = _c[0], value = _c[1];
                        query.filter[key] = value;
                    }
                }
                if (params.extra_params) {
                    query = __assign(__assign({}, query), params.extra_params);
                }
                size = (_a = params.size) !== null && _a !== void 0 ? _a : 'short';
                return [2 /*return*/, new Promise(function (resolve, rejects) {
                        axiosInstance
                            .get(host + path, {
                            params: query,
                            headers: headers
                        })
                            .then(function (response) {
                            if (size === 'short') {
                                var responseShort = response.data.body.items.map(function (section) {
                                    var elements = section.elements;
                                    var result = {
                                        id: section.id,
                                        visible: section.visible,
                                        available_at: section.available_at,
                                        updated_at: section.updated_at
                                    };
                                    for (var key in elements) {
                                        // @ts-ignore
                                        result[key] = section.elements[key].value;
                                    }
                                    return result;
                                });
                                resolve(responseShort);
                            }
                            else {
                                var responseFull = {
                                    sections: response.data.body.items,
                                    meta: response.data.body.meta
                                };
                                resolve(responseFull);
                            }
                        }, function (error) {
                            rejects(error);
                        });
                    })];
            });
        });
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
    function getBlocks(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var path, query, _i, _b, _c, key, value, size;
            return __generator(this, function (_d) {
                path = 'blocks';
                if (!params.block_ids) {
                    throw new TypeError('You have to speficy the block_ids value (array). Visit support.mburger.cloud for more informations');
                }
                query = {
                    include: 'sections.elements',
                    sort: 'order'
                };
                if (params.locale) {
                    query.locale = params.locale;
                }
                if (params.filter) {
                    query.filter = { id: params.block_ids.join() };
                    for (_i = 0, _b = Object.entries(params.filter); _i < _b.length; _i++) {
                        _c = _b[_i], key = _c[0], value = _c[1];
                        query.filter[key] = value;
                    }
                }
                if (!query.filter) {
                    query.filter = {};
                }
                query.filter['id'] = params.block_ids.join();
                size = (_a = params.size) !== null && _a !== void 0 ? _a : 'short';
                return [2 /*return*/, new Promise(function (resolve, rejects) {
                        axiosInstance
                            .get(host + path, {
                            params: query,
                            headers: headers
                        })
                            .then(function (response) {
                            if (size === 'short') {
                                var blocks = response.data.body.items;
                                var responseShort = blocks.map(function (block) {
                                    var sections = block.sections.map(function (section) {
                                        var elements = section.elements;
                                        var result = {
                                            id: section.id,
                                            visible: section.visible,
                                            available_at: section.available_at,
                                            updated_at: section.updated_at
                                        };
                                        for (var key in elements) {
                                            // @ts-ignore
                                            result[key] = section.elements[key].value;
                                        }
                                        return result;
                                    });
                                    return __assign(__assign({}, block), { sections: sections });
                                });
                                resolve(responseShort);
                            }
                            else {
                                var responseShort = {
                                    blocks: response.data.body.items,
                                    meta: response.data.body.meta
                                };
                                resolve(responseShort);
                            }
                        }, function (error) {
                            rejects(error);
                        });
                    })];
            });
        });
    }
    return {
        getProject: getProject,
        getSection: getSection,
        getSections: getSections,
        getBlocks: getBlocks
    };
}
exports.MBurgerInstance = MBurgerInstance;
