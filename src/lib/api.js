/*
 * @Author: Vir Desai 
 * @Date: 2017-10-12 11:16:44 
 * @Last Modified by: Vir Desai
 * @Last Modified time: 2017-10-14 19:39:56
 */

/**
 * API Functions
 */
/* global fetch console */

// Consts and Libs
import { AppUtil } from '@lib/';
import { AppConfig, ErrorMessages, APIConfig } from '@constants/';

// Config
const ENDPOINTS = APIConfig.endpoints;
const WEATHER_ENDPOINTS = APIConfig.weatherEndpoints;
const WEATHER_HOSTNAME  = APIConfig.weatherURL;
const HOSTNAME = APIConfig.hostname;
const USER_AGENT = AppConfig.appName;

// Enable debug output when in Debug mode
const DEBUG_MODE = AppConfig.DEV;

// Number each API request (used for debugging)
let requestCounter = 0;


/* Helper Functions ==================================================================== */
/**
  * Debug or not to debug
  */
function debug(str, title) {
    if (DEBUG_MODE && (title || str)) {
        if (title) {
            console.log(`=== DEBUG: ${title} ===========================`);
        }
        if (str) {
            console.log(str);
            console.log('%c ...', 'color: #CCC');
        }
    }
}

/**
  * Sends requests to the API
  */
function handleError(err) {
    let error = '';
    if (typeof err === 'string') {
        error = err;
    } else if (err && err.error) {
        error = err.error;
    }

    if (!error) { error = ErrorMessages.default; }
    return error;
}

/**
  * Convert param object into query string
  * eg.
  *   {foo: 'hi there', bar: { blah: 123, quux: [1, 2, 3] }}
  *   foo=hi there&bar[blah]=123&bar[quux][0]=1&bar[quux][1]=2&bar[quux][2]=3
  */
function serialize(obj, prefix) {
    const str = [];

    Object.keys(obj).forEach((p) => {
        if (obj[p] !== null) {
            const k = prefix ? `${prefix}[${p}]` : p;
            const v = obj[p];
    
            str.push((v !== null && typeof v === 'object') ? serialize(v, k) : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
        }
    });

    return str.join('&');
}

/**
  * Sends requests to the API
  */
function fetcher(method, inputEndpoint, inputParams, body, hostname) {
    let endpoint = inputEndpoint;
    const params = inputParams;

    return new Promise(async (resolve, reject) => {
        requestCounter += 1;
        const requestNum = requestCounter;

        // After x seconds, let's call it a day!
        const timeoutAfter = 25;
        const apiTimedOut = setTimeout(() => (
            reject(ErrorMessages.timeout)
        ), timeoutAfter * 1000);

        if (!method || !endpoint) { return reject('Missing params (AppAPI.fetcher).'); }

        // Build request
        const req = {
            method:  method.toUpperCase(),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'User-Agent':   USER_AGENT,
            },
        };

        // Add Endpoint Params
        let urlParams = '';
        if (params) {
            // Object - eg. /users?title=this&cat=2
            if (typeof params === 'object') {
                // Replace matching params in API routes eg. /users/{param}/foo
                Object.keys(params).forEach((param) => {
                    if (endpoint.includes(`{${param}}`)) {
                        endpoint = endpoint.split(`{${param}}`).join(params[param]);
                        delete params[param];
                    }
                });

                // Check if there's still an 'id' prop, /{id}?
                // if (params.id) {
                //     if (typeof params.id === 'string' || typeof params.id === 'number') {
                //         urlParams = `/${params.id}`;
                //         delete params.id;
                //     }
                // }

                // Add the rest of the params as a query string
                urlParams = `?${serialize(params)}`;

            // String or Number - eg. /users/23
            } else if (typeof params === 'string' || typeof params === 'number') {
                urlParams = `/${params}`;

            // Something else? Just log an error
            } else {
                debug('You provided params, but it wasn\'t an object!', hostname + endpoint + urlParams);
            }
        }

        // Add Body
        if (body) { req.body = JSON.stringify(body); }

        const thisUrl = `${hostname}${endpoint}${urlParams}`;

        debug('', `API Request #${requestNum} to ${thisUrl}`);

        // Make the request
        return fetch(thisUrl, req)
            .then(async (rawRes) => {
                // API got back to us, clear the timeout
                clearTimeout(apiTimedOut);

                let jsonRes = {};

                try {
                    jsonRes = await rawRes.json();
                } catch (error) {
                    if (rawRes.status !== 200) {
                        const err = { message: ErrorMessages.invalidJson };
                        throw err;
                    }
                }

                // Only continue if the header is successful
                if (rawRes && rawRes.status === 200) { return jsonRes; }
                throw jsonRes;
            })
            .then((res) => {
                debug(res, `API Response #${requestNum} from ${thisUrl}`);
                return resolve(res);
            })
            .catch((err) => {
                // API got back to us, clear the timeout
                clearTimeout(apiTimedOut);

                debug(err, thisUrl);
                return reject(err);
            });
    });
}

/* Create the API Export ==================================================================== */
/**
  * Build services from Endpoints
  * - So we can call AppAPI.users.get() for example
  */
const AppAPI = {
    handleError
};

ENDPOINTS.forEach((endpoint, key) => {
    AppAPI[key] = {
        get:    (params, payload) => fetcher('GET',    endpoint, params, payload, HOSTNAME),
        post:   (params, payload) => fetcher('POST',   endpoint, params, payload, HOSTNAME),
        patch:  (params, payload) => fetcher('PATCH',  endpoint, params, payload, HOSTNAME),
        put:    (params, payload) => fetcher('PUT',    endpoint, params, payload, HOSTNAME),
        delete: (params, payload) => fetcher('DELETE', endpoint, params, payload, HOSTNAME),
    };
});

WEATHER_ENDPOINTS.forEach((endpoint, key) => {
    AppAPI[key] = {
        get:    (params, payload) => fetcher('GET',    endpoint, params, payload, WEATHER_HOSTNAME),
        post:   (params, payload) => fetcher('POST',   endpoint, params, payload, WEATHER_HOSTNAME),
        patch:  (params, payload) => fetcher('PATCH',  endpoint, params, payload, WEATHER_HOSTNAME),
        put:    (params, payload) => fetcher('PUT',    endpoint, params, payload, WEATHER_HOSTNAME),
        delete: (params, payload) => fetcher('DELETE', endpoint, params, payload, WEATHER_HOSTNAME),
    };
})

/* Export ==================================================================== */
export default AppAPI;
