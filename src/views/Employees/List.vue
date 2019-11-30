<template>
    <div>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-btn
                            class="float-right"
                            color="primary"
                            @click="openCreationEmployeDialog()"
                            >Create employee</v-btn
                        >
                    </v-col>
                    <v-col cols="12">
                        <v-data-table
                            :headers="headers"
                            :items="$store.getters['employees/getEmployees']"
                            :items-per-page="5"
                        >
                            <template v-slot:item.create_at="{ item }">
                                {{ parseDate(item.create_at, 'DD/MM/YYYY') }}
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-btn text small color="secondary">View</v-btn>
                                <v-btn
                                    text
                                    small
                                    color="secondary"
                                    :to="{
                                        name: 'edit employee',
                                        params: { id: item.id_employee }
                                    }"
                                    >Edit</v-btn
                                >
                                <v-btn text small color="error"
                                    >Desactive</v-btn
                                >
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-row justify="center">
            <v-dialog
                v-model="showCreationEmployeDialog"
                persistent
                max-width="500"
            >
                <maintenance-form-employees
                    @cancel-creation="closeCreationEmployeDialog()"
                    @confirm-creation="confirmEmployeeCreation()"
                />
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
import MaintenanceFormEmployees from '@/components/Employees/MaintenanceForm';
import moment from 'moment';

export default {
    components: { MaintenanceFormEmployees },
    mounted() {
        this.requestEmployees();
    },
    data() {
        return {
            headers: [
                { text: 'ID', align: 'left', value: 'id_employee' },
                { text: 'First Name', value: 'first_name' },
                { text: 'Last Name', value: 'last_name' },
                { text: 'Email', value: 'email' },
                { text: 'Date Created', value: 'create_at' },
                { text: 'Status', value: 'status' },
                { text: 'Role', value: 'role' },
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            showCreationEmployeDialog: false
        };
    },
    methods: {
        closeCreationEmployeDialog() {
            this.showCreationEmployeDialog = false;
        },
        openCreationEmployeDialog() {
            this.showCreationEmployeDialog = true;
        },
        requestEmployees() {
            this.$store.dispatch('employees/get').then(response => {
                this.$store.commit('employees/SET_EMPLOYEES', response.data);
            });
        },
        confirmEmployeeCreation() {
            this.showCreationEmployeDialog = false;
            this.requestEmployees();
        },
        parseDate(date, format) {
            return moment(date).format(format);
        }
    }
};
</script>