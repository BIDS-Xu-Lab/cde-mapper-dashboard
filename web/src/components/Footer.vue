<script setup>
import { useDataStore } from "../DataStore";
import { onMounted, ref } from "vue";
const store = useDataStore();

onMounted(() => {
    // console.log('* mounted Footer');
});
</script>

<template>
<div class="footer">
<div class="footer-left">

</div>

<div class="footer-right flex flex-row items-center">
    <div>
    </div>
    <div>
        <font-awesome-icon icon="fa-solid fa-ear-listen" />
        {{ store.app_config.system.name }} 
        {{ store.version }}
    </div>
</div>
</div>


</template>