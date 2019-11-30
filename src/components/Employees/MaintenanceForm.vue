<template>
    <div>
        <v-card>
            <v-card-title class="headline">
                Create employee
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-form ref="createEmployeeForm">
                            <v-text-field
                                v-model="employee.firstName"
                                outlined
                                name="first_name"
                                label="First Name"
                                id="first_name"
                                :rules="rules.requiredInput"
                            ></v-text-field>
                            <v-text-field
                                v-model="employee.lastName"
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
                            <v-text-field
                                v-model="employee.password"
                                :rules="rules.minLength8"
                                outlined
                                type="password"
                                name="password"
                                label="Password"
                                id="password"
                            ></v-text-field>
                            <v-text-field
                                v-model="employee.confirmPassword"
                                :rules="rules.minLength8"
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
    data() {
        return {
            status: ['active', 'inactive'],
            employee: {
                firstName: '',
                lastName: '',
                email: '',
                status: 'active',
                password: '',
                confirmPassword: ''
            },
            loading: false
        };
    },
    methods: {
        create() {
            if (this.$refs.createEmployeeForm.validate()) {
                this.loading = true;
                this.$store
                    .dispatch('employees/create', this.employee)
                    .then(response => {
                        this.$store.commit('snackbar/setSnackbar', {
                            show: true,
                            message: 'Employee created',
                            color: 'success',
                            top: true
                        });
                        this.$emit('confirm-creation');
                    })
                    .catch(error => {
                        this.loading = false;
                        this.$store.commit('snackbar/setSnackbar', {
                            show: true,
                            message:
                                'Opss an error ocurred, please try again later',
                            color: 'error',
                            top: true
                        });
                        console.log(error);
                    });
            }
        }
    }
};
</script>