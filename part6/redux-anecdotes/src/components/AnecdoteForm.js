import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const submit = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(addAnecdote(content))
    dispatch(showNotification(`'${content}' added`, 5000))
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