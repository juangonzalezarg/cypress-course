const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Determinar el entorno
      const environment = config.env.ENV || "local";

      // Cargar el archivo .env adecuado
      dotenv.config({ path: `.env.${environment}` });

      // Sobrescribir las variables de entorno en Cypress
      config.env.BASE_URL = process.env.REACT_APP_BASE_URL;

      return config;
    },
  },
});
