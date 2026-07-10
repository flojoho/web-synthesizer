export const getCssVariable = (variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${variableName}`);
};
//# sourceMappingURL=helpers.js.map