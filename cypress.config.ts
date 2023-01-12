import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  video: true,
  videoUploadOnPasses: false,
  fixturesFolder: false,
  videosFolder: 'test/e2e-cypress/videos',
  screenshotsFolder: 'test/e2e-cypress/screenshots',
  e2e: {
    baseUrl: 'https://localhost:8000',
    specPattern: 'test/e2e-cypress/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/e2e-cypress/cypress-support.js',
  },
  env: {
    // Inject the REACT_VERSION env variable, so we can read it in
    // our cypress tests.
    REACT_VERSION: process.env.REACT_VERSION,
  }
})
