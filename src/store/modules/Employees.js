import httpClient from 'src/api/HttpClient'

export default {
    namespaced: true,
    state: {
        employees: []
    },
    getters: {
        getEmployees(state) {
            return state.employees
        }
    },
    actions: {
        get({
            commit
        }) {
            return httpClient.get(`${process.env.API}/employees/employees`)
        },
        patch({
            commit
        }, payload) {
            return httpClient.patch(`${process.env.API}/employees/employees/${payload.id_user}`, payload)
        },
        save({
            commit
        }, payload) {
            return httpClient.post(`${process.env.API}/employees/employees/`, payload)
        }
    },
    mutations: {
        SET_EMPLOYEES(state, payload) {
            state.employees = payload
        }
    }
}