export const JustOf = (value) => () => value
export const partition = (arr, part) => {
  return arr.reduce((acc, next, index) => {
    if (index % part === 0) {
      acc = [...acc, []]
    }
    acc[acc.length - 1].push(next);
    return acc;
  }, [])
}

export const dimensions = (width, height) => `
  width: ${width};
  height: ${height};
`
export const flexPosition = (main = "center", cross = "center") => `
    justify-content: ${main};
    align-items: ${cross};
`
export const flex = JustOf("display: flex;");
export const fullSize = JustOf(dimensions("100vw", "100vh"))
export const centerFlex = JustOf(flexPosition())