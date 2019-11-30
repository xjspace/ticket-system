<template>
    <div>
        <v-row
            v-for="(note, index) in $store.getters['notes/getNotes']"
            :key="index"
        >
            <v-col cols="10">{{ note.full_name }} - {{ note.email }}</v-col>
            <v-col cols="2">{{ note.create_at }}</v-col>
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
export default {};
</script>