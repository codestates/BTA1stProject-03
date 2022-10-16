export const clipboardCopy = ({text}) => {
    console.log(text)
    navigator.clipboard.writeText(text)
}
