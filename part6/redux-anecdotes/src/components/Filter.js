import { connect } from "react-redux"
import { filterMessage } from "../reducers/filterReducer"


const Filter = (props) => {
    const handleChange = (event) => {
       props.filterMessage(event.target.value)
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  const mapDispatchToProps = {filterMessage}

  export default connect(null, mapDispatchToProps)(Filter)