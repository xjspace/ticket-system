<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="show" persistent max-width="500">
                <v-card>
                    <v-card-title class="headline">
                        Assign Employe
                    </v-card-title>
                    <v-card-text>
                        <v-select
                            outlined
                            :items="$store.getters['employees/getEmployees']"
                            v-model="employees"
                            label="Employee(s)"
                            item-value="id_employee"
                            item-text="first_name"
                            :multiple="true"
                        ></v-select>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            :disabled="employees.length === 0"
                            color="success"
                            :loading="loading"
                            @click="saveAssignedEmployees()"
                        >
                            Assign employee
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="error"
                            outlined
                            :loading="loading"
                            @click="$emit('cancel-save')"
                        >
                            Cancel
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
export default {
    props: ['show', 'ticket'],
    mounted() {
        this.$store.dispatch('employees/get').then(response => {
            this.$store.commit('employees/SET_EMPLOYEES', response.data);
        });
    },
    data() {
        return {
            employees: [],
            loading: false
        };
    },
    methods: {
        saveAssignedEmployees() {
            this.$store
                .dispatch('tickets/assignEmploye', {
                    idTicket: this.ticket.id_ticket,
                    employees: this.employees
                })
                .then(response => {
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Employee assigned',
                        color: 'success',
                        top: true
                    });
                    this.$emit('confirm-save');
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>