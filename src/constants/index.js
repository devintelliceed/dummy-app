import env from 'react-native-config';

const config = {
    apiPath: env.API_PATH,
    gameSlots: env.GAME_SLOTS,
    landingUrl: env.LANDING_URL,
    websiteUrl: env.WEBSITE_URL,
    serviceUrl: env.SERVICE_URL,
    environment: env.ENVIRONMENT,
    googleFitDataUrl: env.GOOGLE_FIT_DATA_URL,
    DEBUG: env.APP_DEBUG === String(true),
};

// eslint-disable-next-line no-console
console.disableYellowBox = true;

if (config.DEBUG) {
    console.info(
        '%c CONFIG ',
        'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
        , '\n ENVIRONMENT:', config.environment
        , '\n config:', config
        , '\n env:', env
    );
}

export default config;
export { config };
