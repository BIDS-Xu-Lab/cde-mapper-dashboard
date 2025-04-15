<script setup>
import { onMounted, provide, ref } from 'vue';
import { useDataStore } from '../DataStore';
import NaviMenu from '../components/NaviMenu.vue';
import Footer from '../components/Footer.vue';
import Papa from 'papaparse';
import * as toolbox from '../utils/toolbox';

import 'echarts';
import VChart, { THEME_KEY } from 'vue-echarts';
provide(THEME_KEY, 'light');

const store = useDataStore();

async function onChangeDataFiles(event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // read the file
        let data = await toolbox.readXLSXAsync(file);
        console.log(data);
    }
};

const project_data = ref([
{
    project_name: 'ADRD - Gene',
    complete_rate: 0.76,
    tasks: [],
},
{
    project_name: 'ADRD - SDoH',
    complete_rate: 0.58,
    tasks: [],
},
{
    project_name: 'ADRD - Treatment',
    complete_rate: 0.64,
    tasks: [],
},
{
    project_name: 'ADRD - Patient Outcome',
    complete_rate: 0.72,
    tasks: [],
},
{
    project_name: 'ADRD - Health assessment',
    complete_rate: 0.87,
    tasks: [],
},
{
    project_name: 'ADRD - Caregiver information',
    complete_rate: 0.38,
    tasks: [],
},
{
    project_name: 'ADRD - Disease characterization',
    complete_rate: 0.28,
    tasks: [],
},
]);

// All person
const persons = [
    'John',
    'Jane',
    'Adam',
    'Eve',
    'Michael',
    'Emily',
    'Daniel',
    'Olivia',
    'James',
    'Ava',
    'William',
    'Sophia',
    'Ethan',
    'Isabella',
    'Mason',
];
// generate sample data for testing
for (let i = 0; i < project_data.value.length; i++) {
    // create n tasks for each project
    // n is between 10 to 20
    const n = Math.floor(Math.random() * 11) + 10;
    for (let j = 0; j < n; j++) {
        // generate a random stage
        // 10% not started, 20% under mapping, 40% under review, 30% finalized
        let stage = Math.random();
        if (stage < 0.1) {
            stage = 'not-started';
        } else if (stage < 0.3) {
            stage = 'under-mapping';
        } else if (stage < 0.7) {
            stage = 'under-review';
        } else {
            stage = 'finalized';
        }

        // random a last updated time
        let last_updated = new Date();
        last_updated.setDate(last_updated.getDate() - Math.floor(Math.random() * 30));

        // convert to YYYY-MM-DD
        last_updated = last_updated.toISOString().split('T')[0];

        // assign n random person to this task
        const n_person = Math.floor(Math.random() * 5) + 1;
        const assigned_persons = [];
        for (let k = 0; k < n_person; k++) {
            while (true) {
                const person = persons[Math.floor(Math.random() * persons.length)];
                // ensure no duplicate
                if (!assigned_persons.includes(person)) {
                    assigned_persons.push(person);
                    break;
                }
            }
        }

        // generate a random progress
        const progress = Math.random() * .5 + .5;

        project_data.value[i].tasks.push({
            task_id: j,
            stage: stage,
            last_updated: last_updated,
            assigned_persons: assigned_persons,
            n_data_elements: Math.floor(Math.random() * 100) + 1,
            progress: progress,
        });
    }
}


////////////////////////////////////////////////////////////
// Sankey chart
////////////////////////////////////////////////////////////
const option_sankey = ref({
    grid: {
        left: '0',
        right: '0',
        top: 0,
        bottom: '0',
    },
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
    },
    series: {
        type: 'sankey',
        nodeAlign: 'right',
        emphasis: {
        focus: 'adjacency'
        },
        nodeWidth: 8,
        lineStyle: {
            color: 'gradient',
        },
        itemStyle: {
            borderRadius: 2,
        },
        data: [
        {
            name: 'User Imported',
            itemStyle: {
                color: '#DEE3E9',
                borderColor: '#efefef',
            },
        },
        {
            name: 'To be Decided',
            itemStyle: {
                color: '#FF8000',
                borderColor: '#efefef',
            },
        },
        {
            name: 'Mapped',
            itemStyle: {
                color: '#FFBE0B',
                borderColor: '#efefef',
            },
        },
        {
            name: 'Reviewed',
            itemStyle: {
                color: '#0074FF',
                borderColor: '#efefef',
            },
        },
        {
            name: 'Under Review',
            itemStyle: {
                color: '#63AAFF',
                borderColor: '#efefef',
            },
        },
        {
            name: 'Suggested',
            itemStyle: {
                color: '#A347FF',
                borderColor: '#efefef',
            },
        },
        {
            name: 'Meta-reviewed',
            itemStyle: {
                color: '#3561C1',
                borderColor: '#efefef',
            },
        },
        {
            name: 'Included',
            itemStyle: {
                color: '#7FD854',
                borderColor: '#efefef',
            },
        },
        {
            name: 'Excluded',
            itemStyle: {
                color: '#A9A9A9',
                borderColor: '#efefef',
            },
        },
        {
            name: 'Proposed as New CDE',
            itemStyle: {
                color: '#00A676',
                borderColor: '#efefef',
            },
        },
    ],
    links: [
        {
            source: 'User Imported',
            target: 'Mapped',
            value: 95
        },
        {
            source: 'User Imported',
            target: 'To be Decided',
            value: 5
        },
        {
            source: 'Mapped',
            target: 'Reviewed',
            value: 85
        },
        {
            source: 'Mapped',
            target: 'Under Review',
            value: 10
        },
        {
            source: 'Reviewed',
            target: 'Meta-reviewed',
            value: 75
        },
        {
            source: 'Reviewed',
            target: 'Excluded',
            value: 10
        },
        {
            source: 'Suggested',
            target: 'Meta-reviewed',
            value: 5
        },
        {
            source: 'Meta-reviewed',
            target: 'Included',
            value: 60
        },
        {
            source: 'Meta-reviewed',
            target: 'Proposed as New CDE',
            value: 5
        },
        {
            source: 'Meta-reviewed',
            target: 'Excluded',
            value: 5
        },
            
        ]
    }
});

////////////////////////////////////////////////////////////
// Semantic Map
////////////////////////////////////////////////////////////
const option_semantic_map = ref({
    grid: {
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        containLabel: true
    },
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
    },
    toolbox: {
        show: true,
        feature: {
            saveAsImage: {
                show: true,
                title: 'Save as Image',
            },
            restore: {
                show: true,
                title: 'Restore',
            },
            dataZoom: {
                show: true,
            },
        },
    },
    dataZoom: [
        {
            type: 'inside',
            orient: 'both',
        }
    ],
    xAxis: [
        {
            type: 'value',
            show: false
        }
    ],
    yAxis: [
        {
            type: 'value',
            show: false
        }
    ],
    series: [
        {
            name: 'CDEs',
            type: 'scatter',
            symbolSize: 5,
            data: []
        }
    ]
});

function loadSemanticMap() {
    store.cdes = [];
    Papa.parse(
        './cde-25k.tsv', {
        download: true,
        skipEmptyLines: true,
        delimiter: '\t',
        header: true,
        dynamicTyping: true,
        step: (row) => {
            let formatted_row = store.formatTsvRow(row.data);
            store.cdes.push(formatted_row);
        },
        complete: () => {
            console.log('* loaded semantic map', store.cdes.length);

            // update the semantic map
            option_semantic_map.value.series[0].data = store.cdes.map(cde => [cde.x, cde.y]);
        }
    });
}

onMounted(() => {
    console.log('* mounted Extract page');
    loadSemanticMap();
});

const showDetails = ref(false);
const currentTask = ref(null);
const panelPosition = ref({ x: 0, y: 0 });

function showTaskDetails(task, project) {
    currentTask.value = {
        ...task,
        project_name: project.project_name
    };
    const cell = event.target;
    const rect = cell.getBoundingClientRect();
    panelPosition.value = {
        x: rect.right + 10,
        y: rect.top - 20
    };
    showDetails.value = true;
}

function hideTaskDetails() {
    showDetails.value = false;
}
</script>

<template>
<NaviMenu />

<div class="menu">
    <div class="menu-group">
        <div class="menu-group-box">
            <p class="px-2"
                style="width: 15rem; line-height: 1.3rem;">
                A prototype dashboard for visualizing the progress of CDE mapping projects.
            </p>
        </div>
        <div class="menu-group-title">
            About
        </div>
    </div>

    <div class="menu-group">
        <div class="menu-group-box">

            <Button text
                class="menu-button"
                v-tooltip.bottom="'Show the detailed user manual in a new window.'"
                @click="store.showGuide()">
                <font-awesome-icon icon="fa-solid fa-book" class="menu-icon" />
                <span>
                    How-to Guide
                </span>
            </Button>
        </div>
        <div class="menu-group-title">
            Help
        </div>
    </div>
</div>


<div class="main">

<div class="flex flex-col gap-2 w-1/2 mr-2">
    <Panel class="h-1/2 mr-2 w-full">
    <template #header>
        <div class="w-full flex justify-between">
            <div class="flex">
                <div class="flex-col">
                    <div class="text-lg font-bold">
                        <font-awesome-icon :icon="['far', 'folder-open']" />
                        Project-task level progress
                    </div>
                    <div class="panel-subtitle text-sm">
                        <b>
                            {{ project_data.length }}
                        </b>
                        projects
                    </div>
                </div>
            </div>

            <div>
    
            </div>
        </div>
    </template>


    <div class="flex flex-col gap-2"
        style="height: calc(50svh - 12rem); overflow-y: auto;">
        <table>
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>
                        <div class="flex flex-row">
                            <div v-for="i in Math.max(...project_data.map(p => p.tasks.length))" :key="i"
                                class="task-cell text-sm">
                                T{{ i }}
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in project_data" :key="project.project_name">
                    <td class="text-right pr-2">
                        {{ project.project_name }}
                    </td>
                    <td>
                        <div class="flex flex-row">
                        <div v-for="task in project.tasks" :key="task.task_id"
                            class="task-cell"
                            :class="'task-cell-' + task.stage"
                            @mouseenter="showTaskDetails(task, project)"
                            @mouseleave="hideTaskDetails">
                            <template v-if="task.stage == 'under-review'">
                                <div class="task-cell-progress"
                                    :style="{ height: task.progress * 100 + '%' }">
                                    &nbsp;
                                </div>
                            </template>
                        </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex flex-row gap-8 justify-center">
            <div class="flex flex-row gap-2 items-center">
                <div class="task-cell task-cell-not-started" style="width: 1.5rem; height: 1.5rem;"></div>
                <div>
                    Not started
                </div>
            </div>

            <div class="flex flex-row gap-2 items-center">
                <div class="task-cell task-cell-under-mapping" style="width: 1.5rem; height: 1.5rem;"></div>
                <div>
                    Under mapping
                </div>
            </div>

            <div class="flex flex-row gap-2 items-center">
                <div class="task-cell task-cell-under-review" style="width: 1.5rem; height: 1.5rem;"></div>
                <div>
                    Under review
                </div>
            </div>

            <div class="flex flex-row gap-2 items-center">
                <div class="task-cell task-cell-finalized" style="width: 1.5rem; height: 1.5rem;"></div>
                <div>
                    Finalized
                </div>
            </div>

            
        </div>
    </div>


    </Panel>


    <Panel class="h-1/2 mr-2 w-full">
    <template #header>
        <div class="w-full flex justify-between">
            <div class="flex">
                <div class="flex-col">
                    <div class="text-lg font-bold">
                        <font-awesome-icon :icon="['far', 'folder-open']" />
                        Data element level progress
                    </div>
                    <div class="panel-subtitle text-sm">
                        (ADRD - Patient Outcome)
                    </div>
                </div>
            </div>

            <div>
    
            </div>
        </div>
    </template>



    <div style="width: 100%; height: calc(50svh - 12rem);">
        <v-chart class="chart" 
            :option="option_sankey" 
            autoresize />
    </div>


    </Panel>
</div>


<Panel class="h-full w-1/2">
    <template #header>
        <div class="w-full flex justify-between">
            <div class="flex">
                <div class="flex-col">
                    <div class="text-lg font-bold">
                        <font-awesome-icon :icon="['far', 'folder-open']" />
                        Data element-leve semantic distribution
                    </div>
                    <div class="panel-subtitle text-sm">
                        <b>
                            {{ store.cdes.length }}
                        </b>
                        CDEs
                    </div>
                </div>
            </div>

            <div>

            </div>
        </div>
    </template>

    <div style="width: 100%; height: calc(100svh - 20rem);">
        <v-chart class="chart" 
            :option="option_semantic_map" 
            autoresize />
    </div>
</Panel>

</div>  

<Footer />

<div v-if="showDetails" class="task-details-panel" :style="{ left: panelPosition.x + 'px', top: panelPosition.y + 'px' }">
<div style="background-color: #E3EBF7; width: 100%; height: 100%; text-align: center; padding: 0.5rem; font-size: 1rem; font-weight: bold;">
    <span>{{ currentTask.project_name }}</span> (T{{ currentTask.task_id }})
</div>
    <div class="task-details-content">
        <div class="task-details-item">
            <span class="label">
                <font-awesome-icon :icon="['far', 'file-lines']" />
                Task ID:
            </span>
            <span class="value">{{ currentTask.task_id }}</span>
        </div>
        <div class="task-details-item">
            <span class="label">
                <font-awesome-icon :icon="['fas', 'circle-half-stroke']" />
                Progress status:
            </span>
            <span class="value">{{ currentTask.stage }}</span>
        </div>
        <div class="task-details-item">
            <span class="label">
                <font-awesome-icon :icon="['far', 'clock']" />
                Last Updated:
            </span>
            <span class="value">{{ currentTask.last_updated }}</span>
        </div>
        <div class="task-details-item">
            <span class="label">
                <font-awesome-icon :icon="['far', 'user']" />
                Assigned to:
            </span>
            <span class="value">{{ currentTask.assigned_persons.join(', ') }}</span>
        </div>
        <div class="task-details-item">
            <span class="label">
                <font-awesome-icon :icon="['fas', 'database']" />
                Data Elements:
            </span>
            <span class="value">{{ currentTask.n_data_elements }}</span>
        </div>
        <div class="task-details-item">
            <span class="label">
                <font-awesome-icon :icon="['far', 'percent']" />
                Progress:
            </span>
            <span class="value">{{ Math.round(currentTask.progress * 100) }}%</span>
        </div>
    </div>
</div>
</template>

<style scoped>
.task-cell {
    width: 2rem;
    height: 2rem;
    border-radius: 0.2rem;
    margin-right: 2px;
    cursor: pointer;
    border: 1px solid transparent;
    position: relative;
}

.task-cell:hover {
    border: 1px solid #000000;
}

.task-cell-not-started {
    background-color: #d8d8d8;
}

.task-cell-under-mapping {
    background-color: #FFBE0B;
}

.task-cell-under-review {
    background-color: #BBD0FF;
}   

.task-cell-finalized {
    background-color: #7FD854;
}

.task-cell-progress {
    width: 100%;
    background-color: #63AAFF;
    position: absolute;
    bottom: 0;
}

.task-details-panel {
    position: fixed;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    min-width: 250px;
}

.task-details-panel::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 15%;
    transform: translateY(-15%);
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid white;
    filter: drop-shadow(-2px 0 2px rgba(0, 0, 0, 0.1));
}


.task-details-content h3 {
    margin: 0 0 1rem 0;
    font-size: 1.1rem;
    color: #333;
}

.task-details-item {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
}

.task-details-item .label {
    font-weight: bold;
    color: #003A80;
    margin: 0 1rem;
}

.task-details-item .value {
    color: #333;
    text-align: left;
    margin: 0 1rem;
}
</style>