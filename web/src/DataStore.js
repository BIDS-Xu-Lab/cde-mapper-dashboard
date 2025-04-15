import { defineStore } from 'pinia';
import { useToast } from "primevue/usetoast";
import router from './router';
import * as toolbox from './utils/toolbox';
import App from './App.vue';

export const useDataStore = defineStore('jarvis', {

state: () => ({
    version: '0.0.1',

    // current current_view
    current_page: '/',

    // the config for app
    app_config: null,

    // the config for user
    config: {
        openai_api_key: null,
        openai_model_name: 'gpt-4o-mini',
        endpoint: null,
    },

    // other system related data
    toast: useToast(),

    // for the router
    router: router,

    // projects
    projects: [],
    // for the input files
    // each input_file is an object with the following properties:
    // - name: the name of the file
    // - data: the converted json data of the file
    cdes: [],

    // which file is being viewed
    current_input_file: null,

    // status of the system
    status: {
        // settings panel visibility
        flag_settings_panel_visible: false,

        // true if the system is busy
        busy: false,
    },
}),

getters: {
},

actions: {
    gotoPage(page) {
        this.current_page = page;
        this.router.push("/" + page);
    },

    showGuide() {
        this.msg('This is a guide message', 'Guide', 'info');
    },

    setFullscreen() {
        // set the fullscreen mode
        document.documentElement.requestFullscreen();
    },

    // make a sample store for development
    makeSampleStore() {
    },


    ///////////////////////////////////////////////////////
    // Settings related
    ///////////////////////////////////////////////////////
    updateSettingsByJSON: function(json) {
        // copy the items from json to store.config
        for (let key in this.config) {
            if (json.hasOwnProperty(key)) {
                this.config[key] = json[key];
            }
        }
    },

    saveSettingsToLocalStorage: function() {
        localStorage.setItem(
            "config",
            JSON.stringify(this.config)
        );

        // also update the Goku instance using the new settings
        Goku.init(this.config);

        console.log('* saved config to local storage');
        this.msg('Settings saved', 'Settings', 'info');
    },

    loadSettingsFromLocalStorage: function() {
        // just load the object from localstorage
        let x = localStorage.getItem('config');

        if (x == null) {
            console.log('* not found config from local');
            return;
        }

        // parse the JSON
        let cfg = JSON.parse(x);
        console.log('* local storage config:', cfg);

        this.updateSettingsByJSON(cfg);

        console.log('* loaded config from local storage');
    },

    clearSettingsFromLocalStorage: function() {
        localStorage.removeItem('config');
        this.msg('Settings cleared', 'Settings', 'info');
    },

    formatTsvRow: function(row) {
        let attrs = [
            // basic information
            'pid',
            'title',
            'year',
            'description',
            'journal',

            // semantic map
            'x',
            'y',

            // for display
            'color',
        ];

        for (let attr of attrs) {
            if (!row.hasOwnProperty(attr)) {
                row[attr] = null;
            }
        }

        return row;
    },

    msg(
        message, 
        title='Message', 
        type='info',
        life=3000
    ) {
        this.toast.add({
            detail: message,
            summary: title,
            severity: type,
            life: life
        });
    },
}
});