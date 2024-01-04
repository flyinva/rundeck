<template>
    <template v-if="displayExport || displayImport">
      <popover trigger="hover"
               placement="left"
               viewport="#section-content"
               append-to="#section-content"
               position-by="#section-main"
      >
        <span class="text-info">
            <i class="glyphicon glyphicon-exclamation-sign"></i>
            {{ defaultDisplayText }}
        </span>
        <template #popover>
            <dl v-if="displayExport">
              <dt>{{ $t("scm.export.title") }}</dt>
              <dd>
                {{ exportMessage }}
              </dd>
            </dl>
            <dl v-if="displayImport">
              <dt>{{ $t("scm.import.title") }}</dt>
              <dd>
                {{ importMessage }}
              </dd>
            </dl>
        </template>
      </popover>
    </template>
</template>

<script lang="ts">
import {
    JobPageStore,
    JobPageStoreInjectionKey,
} from "@/library/stores/JobPageStore";
import { defineComponent, inject } from "vue";
import {ScmTextUtilities} from "../../../../library/utilities/scm/scmTextUtilities";

export default defineComponent({
    name: "JobListScmStatus",

    setup(props) {
        const jobPageStore: JobPageStore = inject(
            JobPageStoreInjectionKey
        ) as JobPageStore;
        return {
            jobPageStore,
        };
    },
    data(){
      return {
        scmTextProcessor: new ScmTextUtilities(this.$t)
      }
    },
    computed: {
        scmImport: function () {
            return this.jobPageStore.findMeta("scmImport");
        },
        importState() {
            return this.scmImport?.status?.state;
        },
        scmExport: function () {
            return this.jobPageStore.findMeta("scmExport");
        },
        exportState() {
            return this.scmExport?.status?.state;
        },
        displayExport() {
            return this.exportState && this.exportState !== "CLEAN";
        },
        displayImport() {
            return this.importState && this.importState !== "CLEAN";
        },
        defaultDisplayText() {
            if(this.displayExport){
              return this.exportDisplayText
            }else{
              return this.importDisplayText
            }
        },
        importDisplayText() {
            return this.scmTextProcessor.importDisplayText(this.importState)
        },
        exportDisplayText() {
          return this.scmTextProcessor.exportDisplayText(this.exportState)
        },
        exportMessage() {
            return this.scmExport?.status?.message;
        },
        importMessage() {
            return this.scmImport?.status?.message;
        },
    },
});
</script>

<style scoped lang="scss"></style>
