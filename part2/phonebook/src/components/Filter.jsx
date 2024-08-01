const Filter = ({ onFilterChange }) => {

    const handleFilterChange = (e) => {
        const newFilter = e.target.value;
        console.log("Filter:",newFilter)
        onFilterChange(newFilter)

    }
    return(
        <div>
            <p>
                filter shown with: {<input onChange={handleFilterChange}/>}
            </p>
        </div>
    )
}

export default Filter;