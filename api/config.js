module.exports = {
  development: {
    isProduction: false,
    apiPort: 3030
  },
  production: {
    isProduction: true,
    apiPort: 3030
  }
}[process.env.NODE_ENV || 'development'];