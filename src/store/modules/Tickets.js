import httpClient from '@/api/HttpClient'

export default {
    namespaced: true,
    state: {
        tickets: [],
        timeEntries: []
    },
    getters: {
        getTickets(state) {
            state.tickets.forEach(ticket => {
                ticket.employees.forEach(employee => {
                    ticket.all_employees = (ticket.all_employees === undefined) ?
                        `${employee.first_name} ${employee.last_name}` :
                        ticket.all_employees + ` - ${employee.first_name} ${employee.last_name}`
                })
            })
            return state.tickets
        },
        getTimeEntries(state) {
            state.timeEntries.forEach(entry => {
                entry.employee.full_name = `${entry.employee.first_name} ${entry.employee.last_name}`
            });
            return state.timeEntries
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
        getTimeEntries({
            commit
        }, idTicket) {
            return httpClient.get(`tickets/tickets/${idTicket}/time-entries`)
        },
        patch({
            commit
        }, payload) {
            return httpClient.patch(`tickets/tickets/${payload.id_ticket}`, payload.ticket)
        },
        create({
            commit
        }, payload) {
            return httpClient.post(`tickets/tickets`, payload)
        },
        createTimeEntry({
            commit
        }, payload) {
            return httpClient.post(`tickets/tickets/${payload.idTicket}/time-entries`, payload.timeEntry)
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
        },
        deleteTimeEntry({
            commit
        }, payload) {
            return httpClient.delete(`tickets/tickets/${payload.idTicket}/time-entries/${payload.idEntry}`)
        }
    },
    mutations: {
        SET_TICKETS(state, payload) {
            state.tickets = payload
        },
        SET_TIME_ENTRIES(state, payload) {
            state.timeEntries = payload
        }
    }
}