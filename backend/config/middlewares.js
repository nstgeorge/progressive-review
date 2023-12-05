module.exports = ({ env }) => [
  'strapi::errors',
  'strapi::poweredBy',
  {
    name: 'strapi::security',
    config: {
      referrerPolicy: {
        policy: 'origin-when-cross-origin'
      },
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http:', 'https:'],
          'img-src': ['self', 'data:', 'cdn.jsdelivr.net', 'strapi.io', `${env('AWS_BUCKET_NAME')}.s3.${env('AWS_REGION')}.amazonaws.com`],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
      origin: ['http://localhost', 'https://www.theprogressivereview.com']
    }
  },
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
