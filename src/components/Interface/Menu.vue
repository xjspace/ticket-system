<template>
    <div>
        <v-toolbar>
            <v-toolbar-items>
                <v-btn to="/tickets/list" text>Tickets</v-btn>
                <v-btn to="/employees/list" text>Employees</v-btn>
                <v-btn to="/reports/employees" text>Reports</v-btn>
            </v-toolbar-items>
            <template v-if="$vuetify.breakpoint.smAndUp">
                <v-spacer></v-spacer>
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn text v-on="on">
                            <v-icon class="mr-2">fa-user</v-icon>
                            {{ $store.getters['auth/getEmployee'].first_name }}
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item>
                            <v-list-item-title
                                ><v-btn text to="/auth/logout"
                                    >Logout</v-btn
                                ></v-list-item-title
                            >
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-toolbar>
    </div>
</template>
<script>
export default {};
</script>