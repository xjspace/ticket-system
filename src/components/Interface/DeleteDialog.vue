<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="showDialog" persistent max-width="500">
                <v-card>
                    <v-card-title class="headline">
                        {{ title }}
                    </v-card-title>
                    <v-card-text>
                        {{ message }}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                            color="error"
                            :loading="loading"
                            @click="$emit('confirm-delete')"
                        >
                            {{ buttonLabelConfirm }}
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="success"
                            outlined
                            :loading="loading"
                            @click="$emit('cancel-delete')"
                        >
                            {{ buttonLabelCancel }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
<script>
export default {
    props: [
        'showDialog',
        'loading',
        'title',
        'message',
        'buttonLabelConfirm',
        'buttonLabelCancel'
    ]
};
</script>