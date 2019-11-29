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
                        ></v-data-table
                    ></v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <create-employee-dialog
            @cancel-creation="closeCreationEmployeDialog()"
            @confirm-creation="confirmEmployeeCreation()"
            :showDialog="showCreationEmployeDialog"
        />
    </div>
</template>
<script>
import createEmployeeDialog from '@/components/Employees/CreateDialog';

export default {
    components: { createEmployeeDialog },
    mounted() {
        this.requestEmployees();
    },
    data() {
        return {
            headers: [
                { text: 'ID', align: 'left', value: 'id_employe' },
                { text: 'First Name', value: 'first_name' },
                { text: 'Last Name', value: 'last_name' },
                { text: 'Email', value: 'email' },
                { text: 'Date Created', value: 'create_at' },
                { text: 'Status', value: 'status' },
                { text: 'Role', value: 'role' },
                { text: 'Actions', value: 'actions' }
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
        confirmEmployeeCreation(){
            this.showCreationEmployeDialog = false
            this.requestEmployees()
        }
    }
};
</script>