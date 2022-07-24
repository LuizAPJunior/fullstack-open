import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  const regexSearch = new RegExp(filter, "i")
  const anecdotesToShow = filter
    ? anecdotes.filter((anecdote) => anecdote.content.match(regexSearch))
    : anecdotes

  return (
    <>
      {anecdotesToShow.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(vote(anecdote))
                dispatch(setNotification(`You voted ${anecdote.content}`, 5))
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
