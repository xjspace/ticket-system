<template>
    <div>
        <user-menu />
        <v-container>
            <router-view />
        </v-container>
    </div>
</template>
<script>
import userMenu from "@/components/Interface/Menu";

export default {
    components: { userMenu }
};
</script>