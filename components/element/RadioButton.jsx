
const RadioButton = ({ className, htmlFor, children, value, id, onChange, status }) => {
    return (
        <div className={className}>
            <label htmlFor={htmlFor}>
                {children}
            </label>
            <input
                type="radio"
                value={value}
                id={id}
                checked={status === value}
                onChange={onChange} />
        </div>

    )
}

export default RadioButton