<template>
    <div>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="2">
                        <p>Ticket #</p>
                        <p>Subject</p>
                        <p>Date</p>
                    </v-col>
                    <v-col cols="10">
                        <p>{{ ticket.id_ticket }}</p>
                        <p>{{ ticket.subject }}</p>
                        <p>{{ ticket.create_at }}</p>
                    </v-col>
                    <v-col cols="12">
                        <p>Description</p>
                        <p>{{ ticket.description }}</p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card class="mt-2">
            <v-tabs v-model="tab" grow>
                <v-tab>
                    Time Entries
                </v-tab>
                <v-tab>
                    Employees
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>Some entries</v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-title primary-title>
                            <v-btn
                                color="primary"
                                outlined=""
                                class="float-right"
                                @click="showAssignEmployeeToticketDialog = true"
                                >Assign Employee</v-btn
                            >
                        </v-card-title>
                        <v-card-text>
                            <v-data-table
                                :headers="employeesHeaderTable"
                                :items="ticket.employees"
                                no-data-text="No employee asignated"
                            >
                                <template v-slot:item.actions="{ item }">
                                    <v-btn
                                        :to="`/users/view/${item.id_ticket}`"
                                        text
                                        small
                                        color="secondary"
                                        >View</v-btn
                                    >
                                    <v-btn
                                        text
                                        small
                                        color="error"
                                        @click="toggleRemoveEmployeDialog(item)"
                                        >Remove</v-btn
                                    >
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
        <delete-dialog
            title="Remove"
            message="Are you sure you want to remove this employee?"
            buttonLabelConfirm="Remove it"
            buttonLabelCancel="No, keep it"
            :show-dialog="showRemoveEmployeDialog"
            item-name="employee"
            @confirm-delete="confirmRemoveEmploye()"
            @cancel-delete="showRemoveEmployeDialog = false"
        />
        <assign-employee-to-ticket
            @cancel-save="showAssignEmployeeToticketDialog = false"
            @confirm-save="confirmSaveEmployeeAssigned()"
            :show="showAssignEmployeeToticketDialog"
            :ticket="ticket"
        />
    </div>
</template>
<script>
import deleteDialog from '@/components/Interface/DeleteDialog';
import assignEmployeeToTicket from '@/components/Tickets/AssignEmployeeToTicket';

export default {
    components: { deleteDialog, assignEmployeeToTicket },
    mounted() {
        this.requestTicket()
    },
    data() {
        return {
            ticket: {},
            tab: null,
            employeesHeaderTable: [
                { text: 'First Name', value: 'first_name' },
                { text: 'Last Name', value: 'last_name' },
                { text: 'Email', value: 'email' },
                { text: 'Actions', value: 'actions' }
            ],
            showRemoveEmployeDialog: false,
            showAssignEmployeeToticketDialog: false,
            tempEmployeForRemove: {}
        };
    },
    methods: {
        toggleRemoveEmployeDialog(employee) {
            this.showRemoveEmployeDialog = true;
            this.tempEmployeForRemove = employee;
        },
        confirmRemoveEmploye() {
            this.showRemoveEmployeDialog = false;
            this.$store
                .dispatch('tickets/deleteAssignedEmployee', {
                    idTicket: this.ticket.id_ticket,
                    idEmployee: this.tempEmployeForRemove.id_employee
                })
                .then(response => {
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Employee remove',
                        color: 'success',
                        top: true
                    });
                    this.requestTicket();
                })
                .catch(error => {
                    console.log(error);
                });
        },
        confirmSaveEmployeeAssigned(){
            this.showAssignEmployeeToticketDialog = false
            this.requestTicket();
        },
        requestTicket() {
            this.$store
                .dispatch('tickets/getById', this.$route.params.id)
                .then(response => {
                    this.ticket = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>