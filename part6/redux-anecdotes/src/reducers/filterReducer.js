const initialState = ''

export const setFilter = value => ({
  type: 'SET',
  payload: value
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return state
  }
}

export default reducer