<template>
    <div>
        <v-card>
            <v-card-title primary-title>
                Ticket creation
            </v-card-title>
            <v-card-text>
                <v-form ref="ticketCreationForm">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                outlined
                                name="subject"
                                label="subject"
                                id="subject"
                                v-model="ticket.subject"
                                :rules="rules.requiredInput"
                            ></v-text-field>
                            <v-select
                                outlined
                                :items="
                                    $store.getters['employees/getEmployees']
                                "
                                v-model="ticket.id_employee"
                                label="Employee(s)"
                                item-value="id_employee"
                                item-text="first_name"
                                :rules="rules.requiredInput"
                                :loading="loadingEmployees"
                            ></v-select>
                            <p>The ticket status is "OPEN" by default.</p>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                v-model="ticket.description"
                                outlined
                                name="description"
                                label="Description"
                                :rules="rules.minLength8"
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-btn
                                color="success"
                                :loading="loadingCreation"
                                class="mr-5"
                                @click="createTicket()"
                            >
                                Save
                            </v-btn>

                            <v-btn color="error" :loading="loadingCreation">
                                Cancel
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import formRules from '@/mixins/Miscellany/FormRules';

export default {
    mounted() {
        this.loadingEmployees = true;
        this.$store
            .dispatch('employees/get')
            .then(response => {
                this.loadingEmployees = false;
                this.$store.commit('employees/SET_EMPLOYEES', response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },
    mixins: [formRules],
    data() {
        return {
            employees: [],
            ticket: {
                subject: '',
                id_employee: '',
                description: ''
            },
            loadingEmployees: false,
            loadingCreation: false
        };
    },
    methods: {
        createTicket() {
            if (!this.$refs.ticketCreationForm.validate()) {
                return false;
            }
            this.loadingCreation = true;
            this.$store
                .dispatch('tickets/create', this.ticket)
                .then(response => {
                    this.loadingCreation = false;
                    this.$router.push('/tickets/list');
                }).catch(error=>{
                    console.log(error);
                    this.loadingCreation = false
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Opss, an error ocurred, please try again later',
                        color: 'error',
                        top: true
                    });
                })
        }
    }
};
</script>