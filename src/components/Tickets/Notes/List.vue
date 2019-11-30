<template>
    <div>
        <v-row
            v-for="(note, index) in $store.getters['notes/getNotes']"
            :key="index"
        >
            <v-col cols="9">{{ note.full_name }} - {{ note.email }}</v-col>
            <v-col cols="3">
                <p class="float-right">
                    {{ parseDate(note.create_at, 'DD/MM/YYYY h:mm:ss A') }}
                </p>
            </v-col>
            <v-col cols="12">
                <div class="mb-4">
                    <p class="black--text">{{ note.note }}</p>
                </div>
                <div>
                    <v-divider></v-divider>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import moment from 'moment';
export default {
    methods: {
        parseDate(date, format) {
            return moment(date).format(format);
        }
    }
};
</script>