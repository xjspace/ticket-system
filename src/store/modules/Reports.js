import httpClient from '@/api/HttpClient'

export default {
    namespaced: true,
    actions: {
        get({
            commit
        },payload) {
            return httpClient.get(`/reports/employees/${payload.start_date}/${payload.end_date}`)
        }
    }
}