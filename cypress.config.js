const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "5hcz76",
  viewportHeight: 1080,
  viewportWidth: 1920, //rozdzielczość przeglądarki do testów
  e2e: {
    baseUrl: "https://webdriveruniversity.com",
    includeShadowDom: true, //to się może kiedyś przydać ale nie wiem do czego
    chromeWebSecurity: true, //to jest konieczne do przechodzenia pomiędzy hostami, np. z local host do sieci
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', //to dodaje możliwość m.in. bardziej tradycyjnego zapisu plików z testami - spec.js (nowszy to cy.js)
    excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*'] //wyklucza z runnera foldery z przykładowymi testami cypress
    },
});