module.exports = {
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
        'json',
        'vue'
    ],
    transform: {
        '\\.(vue)$': 'vue-jest',
        '^.+\\.tsx?': 'ts-jest'
    },
    testURL: 'http://localhost/',
    testRegex: '(\\.|/)(test|spec)\\.(jsx?|tsx?)$'
}
