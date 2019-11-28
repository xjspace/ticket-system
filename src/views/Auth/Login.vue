<template>
    <div>
        <v-card max-width="400" outlined class="mx-auto mt-5">
            <v-card-title primary-title>
                Ticket System
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            v-model="email"
                            label="Email"
                            placeholder="jhondoe@domain.com"
                            outlined
                            :rules="rules.email"
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            label="Password"
                            type="password"
                            placeholder="*********"
                            outlined
                            :rules="rules.requiredField"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                            @click="login()"
                            :loading="loading"
                            class="float-right"
                            color="primary"
                            >Login</v-btn
                        >
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import formRules from '@/mixins/Miscellany/FormRules';

export default {
    mixins: [formRules],
    data() {
        return {
            loading: false,
            email: '',
            password: ''
        };
    },
    methods: {
        login() {
            this.loading = true;
            const payload = { email: this.email, password: this.password };
            this.$store
                .dispatch('auth/login', payload)
                .then(response => {
                    setTimeout(() => {
                        window.localStorage.setItem(
                            'token',
                            response.data.token
                        );
                        window.localStorage.setItem(
                            'employee',
                            JSON.stringify(response.data)
                        );
                        this.$store.commit('auth/SET_EMPLOYEE', response.data);
                        this.$router.push('/tickets/list');
                    }, 1000);
                })
                .catch(error => {
                    console.log(error);
                    this.loading = false;
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Wrong credentials',
                        color: 'error',
                        top: true
                    });
                });
        }
    }
};
</script>