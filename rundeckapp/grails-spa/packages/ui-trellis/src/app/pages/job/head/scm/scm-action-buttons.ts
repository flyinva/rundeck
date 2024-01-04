import {defineComponent, markRaw, provide, reactive} from 'vue'
import {getRundeckContext} from '../../../../../library'

import moment from 'moment'
import JobScmActions from '@/app/pages/job/browse/tree/JobScmActions.vue'
import { JobBrowseItem } from "../../../../../library/types/jobs/JobBrowse";
import { JobPageStoreInjectionKey } from "../../../../../library/stores/JobPageStore";

function init() {
    const rootStore = getRundeckContext().rootStore;
    const page = rootStore.jobPageStore
    const jobPageStore = reactive(page);

    moment.locale(getRundeckContext().locale||'en_US')

    rootStore.ui.addItems([
        {
            section: "job-head",
            location: "job-action-button",
            visible: true,
            widget: markRaw(
                defineComponent({
                    name: "JobHeadScmActions",
                    components: { JobScmActions },
                    props: ["itemData"],
                    setup(props){
                        let job : JobBrowseItem = reactive({ job: true, groupPath: "", id: props.itemData.jobUuid })
                        provide(JobPageStoreInjectionKey, jobPageStore);

                        return { jobPageStore, job }
                    },
                    async mounted() {
                        await this.jobPageStore.load()
                        await jobPageStore.getJobBrowser().loadJobMeta(this.job)
                    },
                    template: `<job-scm-actions :job="job"></job-scm-actions>`
                })),
        },
    ]);
}

window.addEventListener('DOMContentLoaded', init)