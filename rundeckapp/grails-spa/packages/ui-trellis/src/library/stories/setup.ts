import { Rundeck, TokenCredentialProvider } from '@rundeck/client'
import {BrowserFetchHttpClient} from '@azure/ms-rest-js/es/lib/browserFetchHttpClient'

const w = window as any
w._rundeck = {
    rdBase: 'http://xubuntu:4440',
    rundeckClient: new Rundeck(new TokenCredentialProvider('foo'), {baseUri: '/', httpClient: new BrowserFetchHttpClient()})
}

console.log('foo')

w.appLinks = {
    adhocHistoryAjax: "/execution/adhocHistoryAjax",
    apiExecutionsBulkDelete: "/execution/deleteBulkApi",
    api_version: "39",
    authProjectsToCreateAjax: "/menu/authProjectsToCreateAjax",
    communityNews: "/community-news",
    disclosureIcon: "/static/images/icon-tiny-disclosure.png",
    disclosureIconOpen: "/static/images/icon-tiny-disclosure-open.png",
    editOptsDuplicate: "/editOpts/duplicate",
    editOptsEdit: "/editOpts/edit",
    editOptsRedo: "/editOpts/redo",
    editOptsRemove: "/editOpts/remove",
    editOptsRender: "/editOpts/renderOpt",
    editOptsRenderAll: "/editOpts/renderAll",
    editOptsRenderSummary: "/editOpts/renderSummary",
    editOptsRenderUndo: "/editOpts/renderUndo",
    editOptsReorder: "/editOpts/reorder",
    editOptsRevert: "/editOpts/revert",
    editOptsSave: "/editOpts/save",
    editOptsUndo: "/editOpts/undo",
    executionAjaxExecNodeState: "/execution/ajaxExecNodeState",
    executionAjaxExecState: "/execution/ajaxExecState",
    executionCancelExecution: "/execution/cancelExecution?format=json",
    executionFollowFragment: "/execution/followFragment",
    executionMarkExecutionIncomplete: "/execution/incompleteExecution?format=json",
    frameworkAdhoc: "/resources/adhoc",
    frameworkCheckResourceModelConfig: "/resources/checkResourceModelConfig",
    frameworkCreateResourceModelConfig: "/resources/createResourceModelConfig",
    frameworkEditResourceModelConfig: "/resources/editResourceModelConfig",
    frameworkNodeSummaryAjax: "/resources/nodeSummaryAjax",
    frameworkNodes: "/resources/nodes",
    frameworkNodesFragment: "/resources/nodesFragment",
    frameworkNodesQueryAjax: "/resources/nodesQueryAjax",
    frameworkReloadNodes: "/resources/reloadNodes",
    frameworkViewResourceModelConfig: "/resources/viewResourceModelConfig",
    help: "https://docs.rundeck.com/docs?utm_source=rundeckapp&utm_medium=3.4.0-SNAPSHOT%20Mac%20OS%20X%20java%201.8.0_275&utm_campaign=helplink&utm_content=menu%2Fhome",
    iconSmallRemoveX: "/static/images/icon-small-removex.png",
    iconSpinner: "/static/images/icon-tiny-disclosure-waiting.gif",
    iconTinyOk: "/static/images/icon-tiny-ok.png",
    iconTinyRemoveX: "/static/images/icon-tiny-removex.png",
    iconTinyWarn: "/static/images/icon-tiny-warn.png",
    menuHomeAjax: "/menu/homeAjax",
    menuHomeSummaryAjax: "/menu/homeSummaryAjax",
    menuJobSearchJson: "/menu/jobsSearchJson",
    menuJobs: "/project",
    menuJobsAjax: "/menu/jobsAjax?format=json",
    menuJobsPicker: "/menu/jobsPicker",
    menuNowrunningAjax: "/menu/nowrunningAjax",
    menuProjectNamesAjax: "/menu/projectNamesAjax",
    menuSaveJobFilterAjax: "/menu/saveJobFilterAjax",
    projectMOTD: "/api/39/project/null/motd.md",
    project_name: "",
    reportsEventsAjax: "/reports/eventsAjax",
    scheduledExecutionActionMenuFragment: "/scheduledExecution/actionMenuFragment",
    scheduledExecutionCreate: "/scheduledExecution/create",
    scheduledExecutionDetailFragment: "/scheduledExecution/detailFragment",
    scheduledExecutionDetailFragmentAjax: "/scheduledExecution/detailFragmentAjax",
    scheduledExecutionExecuteFragment: "/scheduledExecution/executeFragment",
    scheduledExecutionGroupTreeFragment: "/scheduledExecution/groupTreeFragment",
    scheduledExecutionJobExecutionsAjax: "/scheduledExecution/jobExecutionsAjax",
    scheduledExecutionRunAdhocInline: "/scheduledExecution/runAdhocInline",
    scheduledExecutionRunJobInline: "/scheduledExecution/runJobInline",
    scheduledExecutionSanitizeHtml: "/scheduledExecution/sanitizeHtml",
    scheduledExecutionScheduleJobInline: "/scheduledExecution/scheduleJobInline",
    scheduledExecutionWorkflowJson: "/scheduledExecution/workflowJson",
    scmjobs: "/menu/listExport",
    storageKeysApi: "/storage/access/keys",
    storageKeysBrowse: "/menu/storage",
    storageKeysDelete: "/storage/delete/keys",
    storageKeysDownload: "/storage/download/keys",
    tailExecutionOutput: "/execution/tailExecutionOutput?format=json",
    togglescm: "/menu/projectToggleSCM",
    userAddFilterPref: "/user/addFilterPref",
    userClearApiToken: "/user/clearApiToken?format=json",
    userGenerateUserToken: "/user/generateUserToken?format=json",
    userProfilePage: "/user/profile",
    userRenderApiToken: "/user/renderApiToken",
    userRevealTokenData: "/user/renderUsertoken?format=json",
    workflowCopy: "/workflow/copy",
    workflowEdit: "/workflow/edit",
    workflowEditStepFilter: "/workflow/editStepFilter",
    workflowRedo: "/workflow/redo",
    workflowRemove: "/workflow/remove",
    workflowRemoveStepFilter: "/workflow/removeStepFilter",
    workflowRender: "/workflow/renderItem",
    workflowRenderUndo: "/workflow/renderUndo",
    workflowReorder: "/workflow/reorder",
    workflowRevert: "/workflow/revert",
    workflowSave: "/workflow/save",
    workflowSaveStepFilter: "/workflow/saveStepFilter",
    workflowUndo: "/workflow/undo",
    workflowValidateStepFilter: "/workflow/validateStepFilter"
}