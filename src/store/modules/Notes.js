import httpClient from '@/api/HttpClient'

export default {
    namespaced: true,
    state: {
        notes: []
    },
    getters: {
        getNotes(state) {
            state.notes.forEach(note => {
                note.full_name = `${note.first_name} ${note.last_name}`
            });
            return state.notes
        }
    },
    actions: {
        get({
            commit
        }) {
            return httpClient.get(`/notes/notes`)
        },
        create({
            commit
        }, payload) {
            return httpClient.post(`/notes/notes`, payload)
        },
        delete({
            commit
        }, idNote) {
            return httpClient.delete(`/notes/notes/${idNote}`)
        }
    },
    mutations: {
        SET_NOTES(state, payload) {
            state.notes = payload
        }
    }
}