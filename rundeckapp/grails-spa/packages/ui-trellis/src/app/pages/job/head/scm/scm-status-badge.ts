import {defineComponent, markRaw, provide, reactive, ref} from 'vue'
import {getRundeckContext} from '../../../../../library'

import moment from 'moment'
import JobScmStatus from '@/app/pages/job/browse/tree/JobScmStatus.vue'

function init() {
    const rootStore = getRundeckContext().rootStore;
    const page = rootStore.jobPageStore
    const jobPageStore = reactive(page);

    moment.locale(getRundeckContext().locale||'en_US')

    rootStore.ui.addItems([
        {
            section: "job-head",
            location: "job-status-badge",
            visible: true,
            widget: markRaw(
                defineComponent({
                    name: "JobHeadScmStatusBadge",
                    components: { JobScmStatus },
                    props: ["itemData"],
                    setup(props){
                        let scmItemData = reactive({ job: { job: true, groupPath: "", id: props.itemData.jobUuid } })
                        let dataReady = ref(false)
                        return { scmItemData, dataReady }
                    },
                    async mounted() {
                        await jobPageStore.getJobBrowser().loadJobMeta(this.scmItemData.job)
                        this.dataReady = true
                    },
                    template: `<job-scm-status
                        :itemData="scmItemData"
                        :show-clean="true"
                        :show-text="true"
                        :show-export="false"
                        :data-ready="dataReady"
                    />`,
                    updated(){
                        console.log("SCM STATUS BADGE UPDATED!!!!")
                        console.log(this.scmItemData)
                        console.log(this.scmItemData.job)
                        console.log("-----------------------------------------")
                    }
                })),
        },
    ]);
}

window.addEventListener('DOMContentLoaded', init)