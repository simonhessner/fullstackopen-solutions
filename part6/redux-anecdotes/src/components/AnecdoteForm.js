import { useDispatch } from "react-redux"
import { add } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const submit = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(add({ content }))
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