const Filter = ({ onFilterChange }) => {

    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    }

    return(
        <div>
            <p>Find Countries: <input onChange={handleFilterChange}></input></p>
        </div>
    )
}

export default Filter