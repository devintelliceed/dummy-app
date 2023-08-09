// outsource dependencies
import qs from 'qs';
import axios from 'axios';
import storage from 'sync-storage';
import { Platform } from 'react-native';

// local dependenccies
import { config } from '../constants';

// helpers
const isObjectEmpty = (objectName) =>
(
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
);


// absolute path to base API
const BASE_API = `${config.serviceUrl}/${config.apiPath}`;
// absolute url to patient API
const API_PATH = BASE_API;

// private names
const AUTH_STORE = 'sAuth';
const AUTH_BEARER = 'Bearer ';
const AUTH_HEADER = 'Authorization';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const paramsSerializer = options => qs.stringify(options, { arrayFormat: 'repeat', encode: false });
// const instanceAPI = axios.create({
//     headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//     },
//     baseURL: "http://142.93.134.108:1111/",
// });

const instanceAPI = axios.create({
    paramsSerializer,
    baseURL: API_PATH,
    withCredentials: false,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        'user-platform': Platform.OS === 'ios' ? 'IOS' : 'ANDROID',
    },
});

export const authAPI = {
    async createUser(username, password) {
        return await instanceAPI.post(`${API_PATH}/patient-service/public/patients/sign-up`, { username, password });
    },
    async loginUser(username, password) {
        return await instanceAPI.post(`${BASE_API}/auth/token`, { username, password });
    },
    async logout() {
        return await instanceAPI.post(`${BASE_API}/auth/logout`);
    },
    async me() {
        console.log(storage, 'getAccessToken()');
        return await instanceAPI.get(`${API_PATH}/patient-service/patients/me`, {
            headers: {
                [AUTH_HEADER]: `${AUTH_BEARER}${getAccessToken()}`,
            },
        });
    },
    async refresh() {
        console.log('REFRESH');
        return await instance.post(
            "refresh",
            {},
            {
                headers: {
                    [AUTH_HEADER]: `${AUTH_BEARER}${storage.get(getRefreshToken())}`,
                },
            }
        );
    },
};
/**
 * origin axios instance response interceptors
 * @see{https://github.com/axios/axios#interceptors}
 * @private
 */
axios.interceptors.response.use(
    prepareResponse,
    prepareAxiosError
);

/**
 * get session from local storage
 * @returns {Object}
 * @private
 */
const getSession = () => {
    try {
        return JSON.parse(storage.get(AUTH_STORE));
    } catch (e) {
        return {};
    }
};

/**
 * Get access token from local storage
 * @return {String}
 * @private
 */
const getAccessToken = () => getSession()[ACCESS_TOKEN];

/**
 * Get refresh token from local storage
 * @return {String}
 * @private
 */
const getRefreshToken = () => getSession()[REFRESH_TOKEN];

/**
 * sync check to known is user logged in
 * @returns {Boolean}
 * @public
 */
const isLoggedIn = () => !isObjectEmpty(getSession());


/**
 * sync update storage
 * @param {Object|null} session
 * @returns {Object}
 * @private
 */
const updateSession = session => (session ? storage.set(AUTH_STORE, JSON.stringify({
    [ACCESS_TOKEN]: session[ACCESS_TOKEN],
    [REFRESH_TOKEN]: session[REFRESH_TOKEN]
})) : storage.remove(AUTH_STORE) || {});

/**
 * Logout from API
 * @param {Object} [transfer = {}] - data to return after logout
 * @returns {Promise|Object}
 * @public
 */
const logout = async (transfer = {}) => {
    if (!isLoggedIn()) {
        delete instanceAPI.defaults.headers[AUTH_HEADER];
        return transfer;
    }
    const resp = await authAPI.logout();
    updateSession(null);
    delete instanceAPI.defaults.headers[AUTH_HEADER];
    return transfer;
}

/**
 * try to refresh session using refresh_token
 * @returns {Promise}
 * @public
 */
async function refreshSession() {
    // NOTE remove authentication header if it present
    delete instanceAPI.defaults.headers[AUTH_HEADER];

    return await authAPI.refresh().then(session => {
        updateSession(session);
        instanceAPI.defaults.headers[AUTH_HEADER] = AUTH_BEARER + session[ACCESS_TOKEN];
        return session;
    }).catch(logout);
}
/**
 * sync check to known is user logged in
 * @see{https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c}
 * @private
 */
instanceAPI.interceptors.response.use(
    prepareResponse,
    error => ((
            isLoggedIn()
            && error.request.status === 401
            && !/logout|\/oauth\/token/.test(error.config.url)
        ) ? refreshSession() : prepareAxiosError(error))
);

function prepareResponse(response) {
    config.DEBUG && console.info('%c RESPONSE ', 'background: green; color: #fff;', response);
    return response.data;
}

/**
 * prepare error
 *
 * @param {Object} error
 * @return {Promise}
 * @private
 */
function prepareAxiosError(error) {
    if (config.DEBUG) {
        console.warn('%c Interceptor: ', 'background: #EC1B24; color: #fff; font-size: 14px;', error);
    }
    return Promise.reject({ ...error.response, message: 'error message' });
}

const login = async (email, password) => {
    const session = await authAPI.loginUser(email, password);
    if (session) {
        updateSession(session)
        instanceAPI.defaults.headers[AUTH_HEADER] = AUTH_BEARER + session[ACCESS_TOKEN];
        await authAPI.me();
    } else {
        await authAPI.logout();
    }
};

const signUp = async (email, password) => {
     await authAPI.createUser(email, password);
};

export {
    login,
    logout,
    signUp,
}
