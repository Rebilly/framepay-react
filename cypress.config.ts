import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  video: true,
  videoUploadOnPasses: false,
  fixturesFolder: false,
  videosFolder: 'test/e2e/videos',
  screenshotsFolder: 'test/e2e/screenshots',
  e2e: {
    baseUrl: 'http://localhost:8000',
    specPattern: 'test/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'test/e2e/cypress-support.js',
  },
  env: {
    // Inject the REACT_VERSION env variable, so we can read it in
    // our cypress tests.
    REACT_VERSION: process.env.REACT_VERSION,
  }
})
