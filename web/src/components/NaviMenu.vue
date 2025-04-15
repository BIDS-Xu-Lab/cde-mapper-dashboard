<script setup>
import { useRouter } from "vue-router";
import { useDataStore } from "../DataStore";
import { onMounted, ref } from "vue";
const store = useDataStore();
const router = useRouter();

onMounted(() => {
    console.log('* mounted Footer');
});
</script>

<template>
<div id="navi">
    <div class="navi-left prevent-select">
        <div class="navi-item home"
            @click="store.gotoPage('')">
            <font-awesome-icon :icon="['fa', 'home']" />
            Home
        </div>
        
        <div class="navi-item" 
            v-tooltip.bottom="'Manage variables from the loaded data files.'"
            @click="store.gotoPage('dashboard')" :class="{ 'active-page': store.current_page == 'dashboard' }">
            <font-awesome-icon :icon="['fas', 'cogs']" />
            Dashboard
        </div>

    </div>

    <div class="navi-right">
        <div class="navi-item" v-tooltip.bottom="'Make this interface full screen.'" @click="store.setFullscreen()">
            <font-awesome-icon :icon="['fas', 'expand']" class="mr-1" />
        </div>

        <div class="navi-item !mx-0" v-tooltip.bottom="'Change system settings'"
            @click="store.status.flag_settings_panel_visible = true">
            <font-awesome-icon :icon="['fas', 'cog']" class="mr-1" />
            <span>
                Settings
            </span>
        </div>
    </div>
</div>
</template>

<style scoped>

#navi {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 2.5rem;
    position: absolute;
    top: 0;

    z-index: 10;
}

.navi-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

.navi-right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 0 0.5rem 0 0;
}

.navi-item {
    margin-right: 0.5rem;
    padding: 0.5rem 1rem;
    border: 1px solid transparent;
    border-bottom: 0;
    text-align: center;
    cursor: pointer;
}

.navi-item:hover {
    background-color: var(--bg-color-menu-hover);
}

.navi-item.active-page {
    font-weight: bold;
    border: 1px solid var(--bd-color);
    border-bottom: 0;
    background-color: var(--bg-color-menu);

    /* offset for merging to the menu */
    position: relative;
    bottom: -1px;
}
.home {
    color: white;
    background: #03620e;
}
.home:hover {
    background: #03620e;
}
</style>