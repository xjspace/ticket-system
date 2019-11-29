import httpClient from '@/api/HttpClient'

export default {
    namespaced: true,
    state: {
        tickets: []
    },
    getters: {
        getTickets(state) {
            return state.tickets
        }
    },
    actions: {
        get({
            commit
        }) {
            return httpClient.get(`tickets/tickets`)
        },
        getById({
            commit
        }, idTicket) {
            return httpClient.get(`tickets/tickets/${idTicket}`)
        },
        patch({
            commit
        }, payload) {
            return httpClient.patch(`tickets/tickets/${payload.id_user}`, payload)
        },
        create({
            commit
        }, payload) {
            return httpClient.post(`tickets/tickets`, payload)
        },
        assignEmploye({
            commit
        }, payload) {
            return httpClient.post(`tickets/tickets/${payload.idTicket}/employee`, {
                employees: payload.employees
            })
        },
        delete({
            commit
        }, idTicket) {
            return httpClient.delete(`tickets/tickets/${idTicket}`)
        },
        deleteAssignedEmployee({
            commit
        }, payload) {
            return httpClient.delete(`tickets/tickets/${payload.idTicket}/employee/${payload.idEmployee}`)
        }
    },
    mutations: {
        SET_TICKETS(state, payload) {
            state.tickets = payload
        }
    }
}