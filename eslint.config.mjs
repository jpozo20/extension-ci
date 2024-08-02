import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules, fixupConfigRules } from "@eslint/compat";

import js from "@eslint/js";
import path from "node:path";
import tsParser from "@typescript-eslint/parser";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["**/node_modules", "**/dist", "**/coverage", "**/.eslintcache"],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
)), {
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },

        "import/resolver": {
            typescript: {},
        },

        react: {
            version: "detect",
        },
    },

    rules: {
        "import/no-unused-modules": [1, {
            unusedExports: true,
        }],
    },
}, ...compat.extends("plugin:jest/recommended", "plugin:testing-library/react").map(config => ({
    ...config,
    files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
})), ...fixupConfigRules(
    compat.extends("plugin:@typescript-eslint/recommended", "plugin:import/typescript"),
).map(config => ({
    ...config,
    files: ["**/*.ts?(x)"],
})), {
    files: ["**/*.ts?(x)"],

    languageOptions: {
        parser: tsParser,
    },
}];