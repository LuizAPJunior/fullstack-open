const Filter = ({setSearchName}) => {
   
    const handleSearchChange = ((event) => setSearchName(event.target.value))
    
    return (
        <div>
            filter shown with: <input onChange={handleSearchChange} />
        </div>
    )
}

export default Filter;