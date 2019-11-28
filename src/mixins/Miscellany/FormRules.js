export default {
    data() {
        return {
            rules: {
                requiredInput: [
                    v => !!v || 'Required input'
                ],
                email: [
                    v => !!v || 'The emial is required',
                    v => /.+@.+\..+/.test(v) || 'Enter a valid mail',
                ],
                minLength8: [
                    v => v.length > 7 || 'Please enter more than 8 characters',
                ]
            }
        }
    }
}