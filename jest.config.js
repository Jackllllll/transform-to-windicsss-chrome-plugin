// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    collectCoverage: true,
    coverageReporters: ['text'],
    preset: 'ts-jest',
    // collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
    testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
        '^.+\\.jsx?$': 'babel-jest'
    }
};
