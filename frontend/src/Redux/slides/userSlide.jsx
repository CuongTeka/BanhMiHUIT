import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    phone: '',
    avatar: '',
    id: '',
    isAdmin: false,
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { name = '', email = '', phone = '', avatar = '', _id = ''} = action.payload
            state.name = name ? name : state.name;
            state.email = email ? email : state.email;
            state.phone = phone ? phone : state.phone;
            state.avatar = avatar ? avatar : state.avatar;
            state.id = _id ? _id : state.id

        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
            state.avatar = '';
            state.id = '';
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer