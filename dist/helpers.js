export const cssVariable = (variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${variableName}`);
};
//# sourceMappingURL=helpers.js.map