import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  const handleChange = event => dispatch(setFilter(event.target.value))
  return (
    <p>
      Filter: <input onChange={handleChange} />
    </p>
  )
}

export default AnecdoteFilter