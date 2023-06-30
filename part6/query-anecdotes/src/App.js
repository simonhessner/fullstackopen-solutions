import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteForAnecdote } from './requests'
import { useShowNotification } from './notificationContext'

const App = () => {
  const showNotification = useShowNotification(5000)

  const queryClient = useQueryClient()

  const anecdotes = useQuery('anecdotes', getAnecdotes, {
    retry: false
  })

  const voteAnecdoteMutation = useMutation(voteForAnecdote, {
    onSuccess: updatedAnecdote => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const newAnecdotes = anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
      queryClient.setQueryData('anecdotes', newAnecdotes)
      showNotification(`Voted for '${updatedAnecdote.content}'`)
    }
  })  

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  if (anecdotes.isLoading) {
    return "Loading..."
  }

  if (anecdotes.isError) {
    return "anecdote service not available due to problems in the server"
  }

  if (anecdotes.isSuccess) {
    return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.data.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default App
