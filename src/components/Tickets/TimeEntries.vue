<template>
    <div>
        <div>
            <v-btn color="primary" outlined @click="addTimeEntryDialog = true"
                >Add time entry</v-btn
            >
        </div>
        <v-data-table
            :headers="timeEntriesHeaderTable"
            :items="$store.getters['tickets/getTimeEntries']"
            no-data-text="No times entries"
        >
            <template v-slot:item.create_at="{ item }">
                {{ parseTimeStamp(item.create_at,'DD/MM/YYYY h:mm:ss A') }}
            </template>
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
                    @click="toggleDeleteEntryDialog(item)"
                    >Delete</v-btn
                >
            </template>
        </v-data-table>
        <delete-dialog
            title="Delete"
            message="Are you sure you want to delete this entry?"
            buttonLabelConfirm="Delete"
            buttonLabelCancel="No, keep it"
            :show-dialog="showDeleteEntryDialog"
            @confirm-delete="confirmDeleteEntry()"
            @cancel-delete="showDeleteEntryDialog = false"
        />
        <v-row justify="center">
            <v-dialog
                v-model="addTimeEntryDialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
            >
                <v-card>
                    <v-card-title class="headline">
                        Ticket Information
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="2">
                                <p class="font-weight-bold">Ticket #</p>
                                <p class="font-weight-bold">Subject</p>
                                <p class="font-weight-bold">Status</p>
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
                                            'DD/MM/YYYY h:mm:ss A'
                                        )
                                    }}
                                </p>
                            </v-col>
                            <v-col cols="4">
                                <p>Time entry information</p>
                                <v-select
                                    outlined
                                    :items="
                                        $store.getters['employees/getEmployees']
                                    "
                                    v-model="timeEntry.employees"
                                    label="Employee(s)"
                                    item-value="id_employee"
                                    item-text="first_name"
                                    :multiple="true"
                                ></v-select>
                            </v-col>
                            <v-col cols="8"></v-col>
                            <v-col cols="6">
                                <v-datetime-picker
                                    label="Start date"
                                    v-model="timeEntry.from_date"
                                    :text-field-props="{ outlined: true }"
                                >
                                    <template slot="dateIcon">
                                        <v-icon>fa-calendar</v-icon>
                                    </template>
                                    <template slot="timeIcon">
                                        <v-icon>fa-clock</v-icon>
                                    </template>
                                </v-datetime-picker>
                            </v-col>
                            <v-col cols="6">
                                <v-datetime-picker
                                    label="End date"
                                    v-model="timeEntry.to_date"
                                    :text-field-props="{ outlined: true }"
                                >
                                    <template slot="dateIcon">
                                        <v-icon>fa-calendar</v-icon>
                                    </template>
                                    <template slot="timeIcon">
                                        <v-icon>fa-clock</v-icon>
                                    </template>
                                </v-datetime-picker>
                            </v-col>
                            <v-col cols="12">
                                <p>Note</p>
                                <v-textarea
                                    v-model="timeEntry.note"
                                    outlined
                                    name="note"
                                    placeholder="Please enter a note for the user"
                                    label="Note"
                                    :rules="rules.minLength8"
                                ></v-textarea>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            color="success"
                            @click="saveTimeEntry()"
                            :loading="loadingSaveEntry"
                            >Save</v-btn
                        >
                        <v-btn
                            color="error"
                            @click="addTimeEntryDialog = false"
                            :loading="loadingSaveEntry"
                            >Cancel</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
import deleteDialog from '@/components/Interface/DeleteDialog';
import formRules from '@/mixins/Miscellany/FormRules';
import moment from 'moment';

export default {
    props: ['ticket'],
    mixins: [formRules],
    components: { deleteDialog },
    data() {
        return {
            timeEntriesHeaderTable: [
                { text: 'Employee', value: 'employee.full_name' },
                { text: 'Date', value: 'create_at' },
                { text: 'Description', value: 'note' },
                { text: 'Actions', value: 'actions' }
            ],
            showDeleteEntryDialog: false,
            tempTimeEntryForDelete: {},
            addTimeEntryDialog: false,
            timeEntry: {
                from_date: '',
                to_date: '',
                note: '',
                employees: []
            },
            loadingSaveEntry: false
        };
    },
    methods: {
        toggleDeleteEntryDialog(timeEntry) {
            this.tempTimeEntryForDelete = timeEntry;
            this.showDeleteEntryDialog = true;
        },
        saveTimeEntry() {
            if (
                this.timeEntry.from_date.length === 0 ||
                this.timeEntry.to_date.length === 0
            ) {
                this.$store.commit('snackbar/setSnackbar', {
                    show: true,
                    message: 'Please enter a valid date',
                    color: 'error',
                    top: true
                });
                return false;
            }
            this.timeEntry.from_date = this.parseTimeStamp(
                this.timeEntry.from_date,
                'YYYY-MM-DD h:mm:ss'
            );
            this.timeEntry.to_date = this.parseTimeStamp(
                this.timeEntry.to_date,
                'YYYY-MM-DD h:mm:ss'
            );

            this.loadingSaveEntry = true;
            this.$store
                .dispatch('tickets/createTimeEntry', {
                    idTicket: this.ticket.id_ticket,
                    timeEntry: this.timeEntry
                })
                .then(response => {
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Entry Saved',
                        color: 'success',
                        top: true
                    });
                    this.requestTicketTimeEntries();
                    this.addTimeEntryDialog = false;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.loadingSaveEntry = false;
                });
        },
        confirmDeleteEntry() {
            this.$store
                .dispatch('tickets/deleteTimeEntry', {
                    idTicket: this.tempTimeEntryForDelete.id_ticket,
                    idEntry: this.tempTimeEntryForDelete.id_time_entry
                })
                .then(response => {
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Entry delete',
                        color: 'success',
                        top: true
                    });
                    this.requestTicketTimeEntries();
                })
                .catch(error => {
                    if (error.response.status === 403) {
                        this.$store.commit('snackbar/setSnackbar', {
                            show: true,
                            message: 'You not have authorization for due this',
                            color: 'error',
                            top: true
                        });
                    }
                })
                .finally(() => {
                    this.showDeleteEntryDialog = false;
                });
        },
        requestTicketTimeEntries() {
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
                });
        },
        parseTimeStamp(timeStamp, format) {
            return moment(timeStamp).format(format);
        }
    }
};
</script>