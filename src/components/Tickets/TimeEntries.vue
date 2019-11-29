<template>
    <div>
        <v-data-table
            :headers="timeEntriesHeaderTable"
            :items="$store.getters['tickets/getTimeEntries']"
            no-data-text="No times entries"
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
    </div>
</template>
<script>
import deleteDialog from '@/components/Interface/DeleteDialog';

export default {
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
            tempTimeEntryForDelete: {}
        };
    },
    methods: {
        toggleDeleteEntryDialog(timeEntry) {
            this.tempTimeEntryForDelete = timeEntry;
            this.showDeleteEntryDialog = true;
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
                .dispatch(
                    'tickets/getTimeEntries',
                    this.tempTimeEntryForDelete.id_ticket
                )
                .then(response => {
                    this.$store.commit(
                        'tickets/SET_TIME_ENTRIES',
                        response.data
                    );
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>