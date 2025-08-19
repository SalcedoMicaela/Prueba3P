export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module', // Use 'module' for ES modules
        },
        rules: {
            semi: ['error', 'always'], // Enforce semicolons
            quotes: ['error', 'single'] // Enforce single quotes
        }
    }
];