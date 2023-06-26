import { useDispatch } from "react-redux"
import { add } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import axios from "axios"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const submit = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const result = await axios.post('http://localhost:3001/anecdotes', {
      content,
      votes: 0
    })

    dispatch(add(result.data))
    dispatch(setNotification(`'${content}' added`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return <>
    <h2>create new anecdote</h2>
    <form onSubmit={submit}>
      <div>
        <input name="anecdote" />
      </div>
      <button>create</button>
    </form>
  </>
}

export default AnecdoteForm