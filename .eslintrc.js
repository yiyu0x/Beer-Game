module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "commonjs": true
    },
    "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module",
        "parser": "babel-eslint"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": "off"
    }
};