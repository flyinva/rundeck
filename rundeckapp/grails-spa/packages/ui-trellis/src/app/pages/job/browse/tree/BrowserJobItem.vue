<template>
    <div
        class="job-list-row-item hover-reveal-hidden"
        @click="handleClick"
        ref="itemDiv"
    >
        <ui-socket
            section="job-browse-item"
            location="before-job-name"
            :socket-data="{ job }"
            :key="'before/'+job.id"
        />
        <ui-socket
            v-for="meta in job.meta"
            :location="`before-job-name:meta:${meta.name}`"
            section="job-browse-item"
            :socket-data="{ job, meta: meta.data }"
            :key="'before/'+job.id+'/'+meta.name"
        />
        <a :href="jobLinkHref(job)" :data-job-id="job.uuid" class="link-quiet">
            {{ job.jobName }}
        </a>
        <span class="text-secondary job-description" v-if="job.description">
            {{ shortDescription }}
        </span>
        <ui-socket
            v-for="meta in job.meta"
            :location="`after-job-name:meta:${meta.name}`"
            section="job-browse-item"
            :socket-data="{ job, meta: meta.data }"
            :key="'after/'+job.id+'/'+meta.name"
        />
        <ui-socket
            location="after-job-name"
            section="job-browse-item"
            :socket-data="{ job }"
            :key="'after/'+job.id"
        />
    </div>
</template>

<script lang="ts">
import { getRundeckContext } from "@/library";
import UiSocket from "@/library/components/utils/UiSocket.vue";
import {JobPageStore, JobPageStoreInjectionKey} from '@/library/stores/JobPageStore'
import { JobBrowseItem } from "@/library/types/jobs/JobBrowse";
import { defineComponent,PropType,inject } from "vue";

const context = getRundeckContext();
const eventBus = context.eventBus;
export default defineComponent({
    name: "BrowserJobItem",
    components: { UiSocket },
    props: {
        job: {
            type: Object as PropType<JobBrowseItem>,
            required: true,
        },
        loadMeta:{
          type:Boolean,
          default:false,
        }
    },
    setup() {
      return {
        jobPageStore: inject(JobPageStoreInjectionKey) as JobPageStore,
      }
    },
    methods: {
        jobLinkHref(job: JobBrowseItem) {
            return `${context.rdBase}project/${context.projectName}/job/show/${job.id}`;
        },
        /**
         * Check if the element has a parent with a nodeName in the list
         * @param el element
         * @param top stop at this ancestor
         * @param nodeTypes list of node names to check
         */
        hasDomParent(el:HTMLElement, top:HTMLElement, nodeTypes:string[]){
            while(top!==el){
                if(nodeTypes.indexOf(el.nodeName)>-1){
                    return true
                }
                el = el.parentElement as HTMLElement
            }
            return false
        },
        async handleClick(event) {
            if (!this.hasDomParent(event.target, this.$refs.itemDiv, ['INPUT','BUTTON','A'])) {
                //only emit if the click was not within a button,input or link
                eventBus.emit(
                    `browser-job-item-click:${this.job.id}`,
                    this.job
                );
                if(this.loadMeta && !this.job.meta){
                    await this.jobPageStore.getJobBrowser().loadJobMeta(this.job)
                }
            }
        },
    },
    computed: {
        shortDescription() {
            if(!this.job.description){
              return ''
            }
            if(this.job.description.indexOf('\n')>-1){
              return this.job.description.split('\n')[0]
            }
            return this.job.description
        },
    },
});
</script>

<style scoped lang="scss">
.job-description {
    margin-left: var(--spacing-2);
}
.job-list-row-item{
  padding: 1px 0 1px 3px;
  border-style: solid;
  border-width: 0 0 3px 0;
  border-color: transparent;
  cursor: pointer;
}
.hover .job-list-row-item{
  background: var(--background-color-accent-lvl2);
  border-color: var(--border-color);
}
</style>