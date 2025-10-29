import { createSystem, defaultConfig, defineRecipe } from "@chakra-ui/react";

const buttonRecipe = defineRecipe({
    variants: {
        variant: {
            outline: {
                bg: "white",
                border: "1px solid",
                borderColor: "gray.300",
                _hover: {
                    border: "2px solid",
                    borderColor: "black",
                    transform: "scale(0.95)",
                },
            },
        },
    },
});

export const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                heading: {
                    value: `'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif`,
                },
                body: {
                    value: `'Inter', 'Segoe UI', 'Helvetica Neue', sans-serif`,
                },
            },
        },
        recipes: {
            button: buttonRecipe,
        },
    },
});
