const Alert = ( {message, type} ) => {
    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const defaultStyle = {
        color: 'white',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message === null || type === null) {
        return null;
    }

    switch(type){
        case 'success':
            type = successStyle
            break
        case 'error':
            type = errorStyle
            break
        default:
            type = defaultStyle
            break
    }

    return(
        <div style={type}>
            {message}
        </div>
    )
}

export default Alert