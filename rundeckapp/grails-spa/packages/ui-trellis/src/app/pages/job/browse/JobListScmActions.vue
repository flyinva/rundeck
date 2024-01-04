<template>
    <template v-if="scmDataReady">
        <li>
            <i class="fas fa-spinner fa-pulse"></i>
            Loading Scm Actions
        </li>
    </template>
    <template v-if="scmExportEnabled">
        <li v-if="scmExportActions" class="divider"></li>
        <li
            v-if="scmExportActions"
            role="presentation"
            class="dropdown-header"
        >
            <i class="glyphicon glyphicon-circle-arrow-right" />
            {{ $t("scm.export.actions.title") }}
        </li>
        <li v-for="action in scmExportActions">
            <a
                :href="
                    jobPageStore.createProjectScmActionHref(action.id, 'export')
                "
                :title="action.description"
            >
                {{ action.title }}
            </a>
        </li>
    </template>
    <template v-if="scmImportEnabled">
        <li v-if="scmImportActions" class="divider"></li>
        <li
            v-if="scmImportActions"
            role="presentation"
            class="dropdown-header"
        >
            <i class="glyphicon glyphicon-circle-arrow-left" />
            {{ $t("scm.import.actions.title") }}
        </li>
        <li v-for="action in scmImportActions">
            <a
                :href="
                    jobPageStore.createProjectScmActionHref(action.id, 'import')
                "
                :title="action.description"
            >
                {{ action.title }}
            </a>
        </li>
    </template>
    <template
        v-if="
            authProjectSCMAdmin &&
            (scmImport?.configured || scmExport?.configured)
        "
    >
        <li class="divider"></li>
        <li>
            <a @click="toggleModal = true">
                {{ $t(`job.toggle.scm.menu.${enabledStatus ? "off" : "on"}`) }}
            </a>
        </li>
        <Teleport to="body">
            <modal :title="$t('job.toggle.scm.confirm.panel.title')" v-model="toggleModal">
                <p>
                    {{
                        $t(
                            `job.toggle.scm.confirm.${
                                enabledStatus ? "off" : "on"
                            }`
                        )
                    }}
                </p>
                <template #footer>
                    <btn @click="toggleModal = false">
                        {{ $t("no") }}
                    </btn>
                    <btn type="danger" @click="actionToggleScm(!enabledStatus)">
                        {{
                            $t(
                                `job.toggle.scm.button.label.${
                                    enabledStatus ? "off" : "on"
                                }`
                            )
                        }}
                    </btn>
                </template>
            </modal>
        </Teleport>
    </template>
</template>

<script lang="ts">
import { getRundeckContext } from "@/library";
import { scmProjectToggle } from "@/library/services/jobBrowse";
import {
    JobBrowserStore,
    JobBrowserStoreInjectionKey,
} from "@/library/stores/JobBrowser";
import {
    JobPageStore,
    JobPageStoreInjectionKey,
} from "@/library/stores/JobPageStore";
import { JobBrowseMeta } from "@/library/types/jobs/JobBrowse";
import {defineComponent, inject, PropType, ref} from "vue";
import {JobBrowseItem} from "../../../../library/types/jobs/JobBrowse";
import {ScmMeta} from "../../../../library/interfaces/scm/ScmMeta";

interface ScmIntegrationMeta {
    enabled: boolean;
    configured: boolean;
    actions: ScmAction[];
}

interface ScmAction {
    id: string;
    title: string;
    description: string;
}

const EXPORT_META_KEY = "scmExport"
const IMPORT_META_KEY = "scmImport"

export default defineComponent({
    name: "JobListScmActions",
    props: {
        jobPageStore: {
            type: Object as PropType<JobPageStore>
        },
        scmDataStore: {
          type: Object as PropType<ScmMeta>
        },
        jobUuid: {
          type: String
        }
    },
    setup(props) {
        return {
            toggleModal: ref(false),
            scmDataReady: ref(false)
        };
    },
    methods: {
        projectScmAction(id: string) {
            return `${this.jobPageStore.projectScmHref}/performAction?actionId=${id}`;
        },
        async actionToggleScm(enabled: boolean) {
            this.toggleModal = false;
            let result = await scmProjectToggle(
                getRundeckContext().projectName,
                enabled
            );
        }
    },
    computed: {
        enabledStatus(): boolean {
            return this.scmExportEnabled || this.scmImportEnabled
        },
        authProjectSCMAdmin(): boolean {
            return this.scmDataStore?.authSCMAdmin()
        },
        scmExportEnabled(): boolean {
          return this.scmDataStore?.getEnabledStatus(EXPORT_META_KEY)
        },
        scmExportActions(): ScmAction[] {
          return this.scmDataStore?.getActions(EXPORT_META_KEY);
        },
        scmImportEnabled(): boolean {
            return this.scmDataStore?.getEnabledStatus(IMPORT_META_KEY)
        },
        scmImportActions(): ScmAction[] {
            return this.scmDataStore?.getActions(IMPORT_META_KEY);
        },
        scmExport(): ScmIntegrationMeta | undefined {
            return this.jobPageStore.findMeta(this.getExportMetaKey());
        },
        scmImport(): ScmIntegrationMeta | undefined {
            return this.jobPageStore.findMeta(this.getImportMetaKey());
        },
    },
    async updated() {
      this.scmDataReady = true
      console.log(":::::::::::::::::::.UPDATED JobListScmActions")
      console.log(this.scmImport)
      console.log(this.scmExport)
      console.log(this.jobUuid)

      console.log(this.jobPageStore)
      console.log("BELOW THE SCM DATA STORE")
      console.log(this.scmDataStore.getActions("scmExport"))
      console.log(this.scmDataStore.getCommit("scmExport"))
      console.log(this.scmDataStore.getSynchState("scmExport"))
      console.log(this.scmDataStore.getEnabledStatus("scmExport"))
      console.log("----------------------------------------------")
    }
});
</script>

<style scoped lang="scss"></style>