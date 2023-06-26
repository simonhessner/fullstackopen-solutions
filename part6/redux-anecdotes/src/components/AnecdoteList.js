import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote, loadAnecdotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadAnecdotes())
  }, [dispatch])

  const anecdotes = useSelector(state => {
    const anecdotes = state.anecdotes
    const filter = state.filter
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    return filteredAnecdotes.sort((a,b) => b.votes - a.votes)
  })

  const vote = anecdote => {
    dispatch(voteForAnecdote(anecdote))
    dispatch(showNotification('Vote counted', 5000))
  }

  return <>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div style={{ marginBottom: '5px' }}>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
  </>
}

export default AnecdoteList