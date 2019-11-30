<template>
    <div>
        <v-card :loading="loading">
            <v-card-title class="headline">
                Edit employee
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-form ref="createEmployeeForm">
                            <v-text-field
                                v-model="employee.first_name"
                                outlined
                                name="first_name"
                                label="First Name"
                                id="first_name"
                                :rules="rules.requiredInput"
                            ></v-text-field>
                            <v-text-field
                                v-model="employee.last_name"
                                :rules="rules.requiredInput"
                                outlined
                                name="last_name"
                                label="Last Name"
                                id="last_name"
                            ></v-text-field>
                            <v-text-field
                                v-model="employee.email"
                                :rules="rules.email"
                                outlined
                                type="email"
                                name="email"
                                label="Email"
                                id="email"
                            ></v-text-field>
                            <v-select
                                v-model="employee.status"
                                :rules="rules.requiredInput"
                                outlined
                                :items="status"
                                label="Status"
                            ></v-select>
                            <p>Enter the password only if you want change</p>
                            <v-text-field
                                v-model="employee.password"
                                outlined
                                type="password"
                                name="password"
                                label="Password"
                                id="password"
                            ></v-text-field>
                            <v-text-field
                                v-model="employee.confirm_password"
                                outlined
                                type="password"
                                name="password2"
                                label="Confirm password"
                                id="password2"
                            ></v-text-field>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" :loading="loading" @click="create()">
                    Save
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="error"
                    :loading="loading"
                    @click="$emit('cancel-creation')"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import FormRules from '@/mixins/Miscellany/FormRules';

export default {
    mixins: [FormRules],
    mounted() {
        this.requestEmployee();
    },
    data() {
        return {
            status: ['active', 'inactive'],
            employee: {
                first_name: '',
                last_name: '',
                email: '',
                status: '',
                password: '',
                confirm_password: ''
            },
            loading: false
        };
    },
    methods: {
        create() {
            if (this.$refs.createEmployeeForm.validate()) {
                this.loading = true;
                this.$store
                    .dispatch('employees/patch', {
                        id_user: this.$route.params.id,
                        employee: this.employee
                    })
                    .then(response => {
                        this.$store.commit('snackbar/setSnackbar', {
                            show: true,
                            message: 'Employee updated',
                            color: 'success',
                            top: true
                        });
                    })
                    .catch(error => {
                        if (error.response.status === 403) {
                            this.$store.commit('snackbar/setSnackbar', {
                                show: true,
                                message:
                                    'You no have a role for due that',
                                color: 'error',
                                top: true
                            });
                        }else{
                            this.$store.commit('snackbar/setSnackbar', {
                                show: true,
                                message:
                                    'Opss an error ocurred, please try again later',
                                color: 'error',
                                top: true
                            });
                        }

                        console.log(error);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        requestEmployee() {
            this.loading = true;
            this.$store
                .dispatch('employees/getById', this.$route.params.id)
                .then(response => {
                    this.employee.first_name = response.data.first_name;
                    this.employee.last_name = response.data.last_name;
                    this.employee.email = response.data.email;
                    this.employee.status = response.data.status;
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>