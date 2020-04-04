module.exports = {
    setupFiles: ['<rootDir>/src/tests/setup.js'],
    transform: {
        "^.+\\.js$": "babel-jest",
        ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
    },
}