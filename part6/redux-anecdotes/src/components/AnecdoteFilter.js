import { useDispatch, useSelector } from "react-redux"
import { setFilter, resetFilter } from "../reducers/filterReducer"

const AnecdoteFilter = () => {
  const dispatch = useDispatch()
  const handleChange = event => dispatch(setFilter(event.target.value))
  const filter = useSelector(state => state.filter)
  const reset = () => dispatch(resetFilter())
  return (
    <p>
      Filter: <input value={filter} onChange={handleChange} />
      <button onClick={reset}>reset</button>
    </p>
  )
}

export default AnecdoteFilter