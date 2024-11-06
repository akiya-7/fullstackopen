import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  notification: "",
  visible: false,
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification(state, action) {
      state.message = action.payload
      state.visible = true
    },
    clearNotification(state){
      state.message = ""
      state.visible = false
    }

  }
})

export const displayNotification = (notification, duration) => {
  return async dispatch => {
    dispatch(newNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration*(1000))
  }
}

export const {
  newNotification,
  clearNotification,
} = notificationSlice.actions

export default notificationSlice.reducer