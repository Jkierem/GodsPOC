import styled from 'styled-components'

const prop = (key, obj) => obj ? obj[key] : undefined
const reverse = (arr) => arr.reduce((acc, obj) => [obj, ...acc], [])
const AnyOf = (...args) => obj => {
    const [value, ...keysReversed] = reverse(args);
    const keys = reverse(keysReversed)
    return keys.reduce((prev, next) => {
        return prev || prop(next, obj)
    }, false) || value
}

const Justify = AnyOf('justify', 'main', 'center')
const Align = AnyOf('align', 'cross', 'center')
const Direction = AnyOf("direction", "column")
const Margin = AnyOf("margin", "none")

const FlexContainer = styled.div`
    display: flex;
    justify-content: ${Justify};
    align-items: ${Align};
    flex-direction: ${Direction};
    margin: ${Margin};
`

export default FlexContainer