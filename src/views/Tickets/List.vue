<template>
    <div>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-btn
                            class="float-right"
                            color="primary"
                            to="/tickets/create"
                            >Create Ticket</v-btn
                        >
                    </v-col>
                    <v-col cols="12">
                        <v-data-table
                            :headers="headers"
                            :items="$store.getters['tickets/getTickets']"
                            :items-per-page="5"
                        >
                            <template v-slot:item.actions="{ item }">
                                <v-btn :to="`/tickets/view/${item.id_ticket}`" text small color="secondary">View</v-btn>
                                <v-btn text small color="secondary">Edit</v-btn>
                                <v-btn text small color="error">Delete</v-btn>
                            </template>
                        </v-data-table></v-col
                    >
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    mounted() {
        this.$store
            .dispatch('tickets/get')
            .then(response => {
                this.$store.commit('tickets/SET_TICKETS', response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },
    data() {
        return {
            headers: [
                { text: '#', align: 'left', value: 'id_ticket' },
                { text: 'Description', value: 'description' },
                { text: 'Employee(s)', value: 'employees' },
                { text: 'Date', value: 'create_at' },
                { text: 'Status', value: 'status' },
                { text: 'Actions', value: 'actions' }
            ]
        };
    }
};
</script>