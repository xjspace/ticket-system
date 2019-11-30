<template>
    <div>
        <div>
            <p class="title">Edit Ticket# {{ ticket.id_ticket }}</p>
        </div>
        <v-select
            outlined
            :items="status"
            v-model="selectStatus"
            label="Status"
        ></v-select>
        <div>
            <v-btn
                :loading="loadingEdit"
                color="success"
                :disabled="selectStatus === ''"
                @click="saveEdit()"
                >Save</v-btn
            >
        </div>
    </div>
</template>
<script>
export default {
    props: ['ticket'],
    data() {
        return {
            status: ['open', 'close', 'waiting the user'],
            selectStatus: '',
            loadingEdit: false
        };
    },
    methods: {
        saveEdit() {
            this.loadingEdit = true;
            this.$store
                .dispatch('tickets/patch', {
                    id_ticket: this.ticket.id_ticket,
                    ticket: { status: this.selectStatus }
                })
                .then(response => {
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Ticket updated',
                        color: 'success',
                        top: true
                    });
                    this.$emit('ticket-updated')
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.loadingEdit = false;
                });
        }
    }
};
</script>