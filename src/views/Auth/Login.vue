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
                            label="Username"
                            placeholder="jhondoe@domain.com"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Password"
                            type="password"
                            placeholder="*********"
                            outlined
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
export default {
    data() {
        return {
            loading: false
        };
    },
    methods: {
        login() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        }
    }
};
</script>