
const trusted = [
  "'self'",
];

module.exports = directives =  {
    defaultSrc: trusted,
    scriptSrc: [
      "'unsafe-eval'",
      "'unsafe-inline'",
      'https://www.googletagmanager.com',
      '*.googletagmanager.com',
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
    ].concat(trusted),
    styleSrc: [
      "'unsafe-inline'",
      '*.gstatic.com',
      '*.googleapis.com',
      'https://*.typography.com',
    ].concat(trusted),
    frameSrc: [
      '*.stripe.com',
    ].concat(trusted),
    fontSrc: [
      '*.cloudflare.com',
      'https://*.cloudflare.com',
      '*.bootstrapcdn.com',
      '*.googleapis.com',
      '*.gstatic.com',
      'data',
    ].concat(trusted),
    imgSrc: [
      'www.googletagmanager.com',
    ].concat(trusted),
    // set to true if you only want to report errors
    reportOnly: false,
    // set to true if you want to set all headers
    setAllHeaders: false,
    // set to true if you want to force buggy CSP in Safari 5
    safari5: false
}