{
  "parser": "@typescript-eslint/parser",
  "plugins": ["react", "react-hooks", "@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}

