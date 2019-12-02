<template>
    <div>
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-icon class="float-right" @click="$emit('close-dialog')"
                    >fa-window-close</v-icon
                >
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12 text-center">
                        <v-avatar
                            size="100"
                            color="grey"
                            class="mb-0"
                        >
                            <v-icon color="white" size="80">fa-user-circle</v-icon>
                        </v-avatar>
                    </v-col>
                    <v-col cols="12 text-center">
                        <p class="font-weight-bold mt-0">
                            {{ employee.first_name }} {{ employee.last_name }}
                        </p>
                        <p class="mb-0">{{ employee.email }}</p>
                    </v-col>
                    <v-col cols="12"><v-divider></v-divider></v-col>
                    <v-col cols="4 font-weight-bold">Create date:</v-col>
                    <v-col cols="8">{{ employee.create_at }}</v-col>
                    <v-col cols="4 font-weight-bold">Status:</v-col>
                    <v-col cols="8">{{ employee.status }}</v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    props: ['employee']
};
</script>