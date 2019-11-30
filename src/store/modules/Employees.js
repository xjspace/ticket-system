import httpClient from '@/api/HttpClient'

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
            return httpClient.get(`/employees/employees`)
        },
        getById({
            commit
        }, idEmployee) {
            return httpClient.get(`/employees/employees/${idEmployee}`)
        },
        patch({
            commit
        }, payload) {
            return httpClient.patch(`/employees/employees/${payload.id_user}`, payload.employee)
        },
        create({
            commit
        }, payload) {
            return httpClient.post(`/employees/employees/`, payload)
        }
    },
    mutations: {
        SET_EMPLOYEES(state, payload) {
            state.employees = payload
        }
    }
}