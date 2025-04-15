<script setup>
import { ref } from "vue";
import { useDataStore } from "../DataStore";

const store = useDataStore();

</script>

<template>
<div class="card flex justify-center">
<Drawer v-model:visible="store.status.flag_settings_panel_visible"
    class="!w-[40rem]"
    position="right">

<template #header>
    <div class="flex items-center gap-2">
        <!-- gear icon -->
        <font-awesome-icon :icon="['fas', 'cog']" class="mr-1" />
        <span class="font-bold">Settings</span>
    </div>
</template>

<div>
    <p>You can change system settings in this panel.</p>
    
    <div class="flex flex-col gap-2 mt-4">
        <div class="flex flex-col justify-start gap-2">
            <label for="setting_openai_api_key">
                <!-- key icon -->
                <font-awesome-icon :icon="['fas', 'key']" class="mr-1" />
                OpenAI API Key
            </label>
            <InputText id="setting_openai_api_key" v-model="store.config.openai_api_key" />
            <p class="text-sm text-gray-500">
                OpenAI API key is a string like <code class="font-bold">sk-...XXXX</code>. Your OpenAI API key is required for using the GPT models for risk stratification. We only use your API key for your own data and won't share it with others. The key is stored in your browser's local storage only. The cost of using the OpenAI API depends on the number of tokens in your provided pathology and MRI reports. Please refer to the OpenAI website for more pricing information.
            </p>
        </div>
    </div>

    <div class="flex flex-col gap-2 mt-4">
        <div class="flex flex-col justify-start gap-2">
            <label for="setting_openai_model_name">
                <!-- model icon -->
                <font-awesome-icon :icon="['fas', 'kaaba']" class="mr-1" />
                OpenAI Model Name
            </label>
            <Select v-model="store.config.openai_model_name" 
                :options="store.openai_model_options" class="w-full" />
    
            <p class="text-sm text-gray-500">
                The GPT model to be used for the risk stratification.
            </p>
        </div>
    </div>
    
    <div class="flex flex-col gap-2 mt-4">
        <div class="flex flex-col justify-start gap-2">
            <label for="setting_endpoint">
                <!-- server icon -->
                <font-awesome-icon :icon="['fas', 'server']" class="mr-1" />
                Endpoint URL
            </label>
            <InputText id="setting_endpoint" v-model="store.config.endpoint" />
            <p class="text-sm text-gray-500">
                Endpoint URL is a string like <code class="font-bold">http://localhost:8070</code>. Endpoint URL is the address of the backend server for risk stratification. You can change the endpoint URL to your own server address. This URL is stored in your browser's local storage only. If your server is not working correctly, you can change the endpoint URL to the default address. 
                <br>
                <Button size="small"
                    severity="secondary"
                    @click="store.config.endpoint = store.default.endpoint;">
                    <font-awesome-icon :icon="['fas', 'undo']" class="mr-1" />
                    Reset to Default Endpoint URL
                </Button>
            </p>
        </div>
    </div>
</div>

<template #footer>
    <div class="flex items-center gap-2">
        <Button icon="pi pi-save" 
            label="Save Settings" 
            @click="store.saveSettingsToLocalStorage();"
            outlined>
        </Button>
    </div>
</template>


</Drawer>
</div>
</template>