<script setup>
import { RouterView } from 'vue-router';
import SettingsPanel from './components/SettingsPanel.vue';
</script>

<template>
<RouterView />
<Toast />
<SettingsPanel />

</template>