<template>
    <div>
        <v-card>
            <v-card-title primary-title>
                <v-btn color="success" outlined class="mr-5">Edit</v-btn>
                <v-btn color="error" @click="deleteTicket()" outlined
                    >Delete</v-btn
                >
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="2">
                        <p class="font-weight-bold">Ticket #</p>
                        <p class="font-weight-bold">Subject</p>
                        <p class="font-weight-bold">status</p>
                        <p class="font-weight-bold">Date</p>
                    </v-col>
                    <v-col cols="10">
                        <p>{{ ticket.id_ticket }}</p>
                        <p>{{ ticket.subject }}</p>
                        <p>{{ ticket.status }}</p>
                        <p>
                            {{
                                parseTimeStamp(
                                    ticket.create_at,
                                    'DD/MM/YY h:mm:ss A'
                                )
                            }}
                        </p>
                    </v-col>
                    <v-col cols="12">
                        <p class="font-weight-bold">Description</p>
                        <p>{{ ticket.description }}</p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card class="mt-2">
            <v-tabs v-model="tab" grow>
                <v-tab @click="requestTicketTimeEntries()">
                    Time Entries
                </v-tab>
                <v-tab>
                    Employees
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-card flat :loading="loadingTimeEntries">
                        <v-card-text>
                            <time-entries :ticket="ticket" />
                        </v-card-text>
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
                                        >Edit</v-btn
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
        <v-card class="mt-2">
            <v-card-title primary-title>
                Notes
            </v-card-title>
            <v-card-text>
                <notes-list />
                <create-notes @note-created="requestNotes()" :ticket="ticket" />
            </v-card-text>
        </v-card>
        <delete-dialog
            title="Remove"
            message="Are you sure you want to remove this employee?"
            buttonLabelConfirm="Remove it"
            buttonLabelCancel="No, keep it"
            :show-dialog="showRemoveEmployeDialog"
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
import timeEntries from '@/components/Tickets/TimeEntries';
import notesList from '@/components/Tickets/Notes/List';
import createNotes from '@/components/Tickets/Notes/Create';
import moment from 'moment';

export default {
    components: {
        deleteDialog,
        assignEmployeeToTicket,
        timeEntries,
        notesList,
        createNotes
    },
    async mounted() {
        this.loadingTimeEntries = true;
        await this.requestTicket();
        this.requestTicketTimeEntries();
        this.requestNotes();
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
            tempEmployeForRemove: {},
            loadingTimeEntries: false
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
        confirmSaveEmployeeAssigned() {
            this.showAssignEmployeeToticketDialog = false;
            this.requestTicket();
        },
        async requestTicket() {
            return this.$store
                .dispatch('tickets/getById', this.$route.params.id)
                .then(response => {
                    this.ticket = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        requestTicketTimeEntries() {
            this.loadingTimeEntries = true;
            this.$store
                .dispatch('tickets/getTimeEntries', this.ticket.id_ticket)
                .then(response => {
                    this.$store.commit(
                        'tickets/SET_TIME_ENTRIES',
                        response.data
                    );
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.loadingTimeEntries = false;
                });
        },
        deleteTicket() {
            let request = confirm('Are you sure you want delete this ticket ?');
            if (request) {
                this.$store
                    .dispatch('tickets/delete', this.ticket.id_ticket)
                    .then(response => {
                        this.$router.push('/tickets/list');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        parseTimeStamp(timeStamp, format) {
            return moment(timeStamp).format(format);
        },
        requestNotes() {
            this.$store
                .dispatch('notes/get')
                .then(response => {
                    this.$store.commit('notes/SET_NOTES', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>