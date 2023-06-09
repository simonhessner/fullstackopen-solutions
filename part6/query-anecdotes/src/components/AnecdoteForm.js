import { useMutation, useQueryClient } from 'react-query'
import { addAnecdote } from '../requests'
import { useShowNotification } from '../notificationContext'

const AnecdoteForm = () => {
  const showNotification = useShowNotification(3000)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
      showNotification(`'${newAnecdote.content}' was created`)
    },
    onError: error => {
      showNotification(error.response.data.error, 'error')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
