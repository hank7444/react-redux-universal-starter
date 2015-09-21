module.exports = {
  development: {
    isProduction: false,
    port: 3000,
    apiPort: 3030,
    app: {
      name: 'React Redux Example Development'
    },
    debug: true
  },
  production: {
    isProduction: true,
    port: 3000,
    apiPort: 3030,
    app: {
      name: 'React Redux Example Production'
    }
  }
}[process.env.NODE_ENV || 'development'];