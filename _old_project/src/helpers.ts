export const cssVariable = (variableName: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(`--${variableName}`);
}
