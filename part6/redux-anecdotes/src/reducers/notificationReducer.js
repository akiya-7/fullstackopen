import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notification: "",
  visible: false,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    voteNotification(state, action) {
      state.message = `you voted '${action.payload}'`
      state.visible = true
    },
    newAnecdoteNotification(state, action) {
      state.message = `'${action.payload.content}' has been added`
      state.visible = true
    },
    clearNotification(state){
      state.message = ""
      state.visible = false
    }

  }
})

export const {
  voteNotification,
  clearNotification,
  newAnecdoteNotification
} = notificationSlice.actions

export default notificationSlice.reducer