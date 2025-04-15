<script setup>
import { onMounted } from 'vue';
import { useDataStore } from '../DataStore';
const store = useDataStore();

onMounted(() => {
    console.log('* mounted Home page');
});
</script>

<template>
<div id="homepage">
    <div style="font-size: 4rem;" class="flex flex-row gap-2 items-center">
            <img width="80px" src="/vue.svg" />
        <div>
            CDEMapper Dashboard
        </div>
    </div>
    <div style="font-size: 1.5rem; font-style: italic;">
        Track the progress of CDE mapping projects
    </div>

    <div class="py-3">
        <Button 
            @click="store.gotoPage('dashboard')"
            style="font-size: 1.5rem;"
            class="">
            <font-awesome-icon icon="fa-solid fa-rocket" />
            Get Started
        </Button>
    </div>
</div>

</template>

<style scoped>
#homepage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    font-size: 20px;
    font-weight: bold;
    background-color: transparent;
}
</style>