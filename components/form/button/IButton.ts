interface IButton {
    type?: string
    Figure?: any
    label?: string
    onClick?: (...params: any) => any
    disabled?: boolean
}
export default IButton
