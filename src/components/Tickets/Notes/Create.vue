<template>
    <div>
        <v-row>
            <v-col cols="12 title text--black">Add note</v-col>
            <v-col cols="12">
                <v-form ref="createNotesForm">
                    <v-textarea
                        v-model="note.note"
                        outlined
                        name="note"
                        label="Note"
                        :rules="rules.minLength8"
                        lazy-validation
                    ></v-textarea>
                </v-form>
            </v-col>
            <v-col cols="12">
                <v-btn
                    color="primary"
                    :loading="loadingSave"
                    :disabled="note.note.length < 7"
                    @click="save()"
                    >Save</v-btn
                >
            </v-col>
        </v-row>
    </div>
</template>
<script>
import formRules from '@/mixins/Miscellany/FormRules';

export default {
    mixins: [formRules],
    props: ['ticket'],
    data() {
        return {
            note: {
                note: '',
                id_ticket: ''
            },
            loadingSave: false
        };
    },
    methods: {
        save() {
            if (!this.$refs.createNotesForm.validate()) {
                return false;
            }

            this.loadingSave = true;
            this.note.id_ticket = this.ticket.id_ticket;
            this.$store
                .dispatch('notes/create', this.note)
                .then(response => {
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Note saved',
                        color: 'success',
                        top: true
                    });
                    this.note.note = '';
                    this.$emit('note-created');
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.loadingSave = false;
                });
        }
    }
};
</script>