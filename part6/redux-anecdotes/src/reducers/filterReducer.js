const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER_UPDATE":
      return state = action.payload
    default:
      return state
  }
}

export const filterChange = (filter) => {
  console.log("New filter:", filter)
  return {type: "FILTER_UPDATE", payload: filter}
}

export default filterReducer