module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['e2e/steps/**/*.ts', 'e2e/support/**/*.ts'],
    paths: ['e2e/features/**/*.feature'],
    format: ['progress-bar', 'html:e2e/reports/cucumber-report.html'],
    publishQuiet: true,
  },
}
