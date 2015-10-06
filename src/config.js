module.exports = {
  development: {
    isProduction: false,
    port: 3000,
    apiPort: 3030,
    app: {
      name: 'React Redux Example Development'
    },
    locale: 'tw',
    locales: ['tw', 'en'],
    debug: true
  },
  production: {
    isProduction: true,
    port: 8080,
    apiPort: 3030,
    app: {
      name: 'React Redux Example Production'
    },
    locale: 'tw',
    locales: ['tw', 'en'],
    debug: true
  }
}[process.env.NODE_ENV || 'development'];
