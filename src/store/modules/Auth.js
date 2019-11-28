import httpClient from '@/api/HttpClient'

export default {
    namespaced: true,
    state: {
        employee: {}
    },
    getters: {
        getEmployee(state) {
            return state.employee;
        }
    },
    actions: {
        login({
            commit
        }, payload) {
            return httpClient.post(`/auth/login`, payload)
        }
    },
    mutations: {
        SET_EMPLOYEE(state, payload) {
            state.employee = payload
        }
    }
}