import { useSelector, useDispatch } from 'react-redux'
import { voteFor, set } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import axios from 'axios'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('http://localhost:3001/anecdotes').then(result => {
      console.log(result)
      dispatch(set(result.data))
    })
  }, [dispatch])

  const anecdotes = useSelector(state => {
    const anecdotes = state.anecdotes
    const filter = state.filter
    const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    return filteredAnecdotes.sort((a,b) => b.votes - a.votes)
  })

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
    dispatch(setNotification('Vote counted'))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  return <>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div style={{ marginBottom: '5px' }}>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
  </>
}

export default AnecdoteList