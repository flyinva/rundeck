<g:if test="${scmExportEnabled && scmExportStatus?.get(scheduledExecution.extid)}">
    %{renderedActions++}%
    <g:if test="${authRead}">
        <li class="divider"></li>
    </g:if>

    <li class="dropdown-header"><g:message code="scm.export.plugin" /></li>

    <g:set var="jobstatus" value="${scmExportStatus?.get(scheduledExecution.extid)}"/>
    <g:set var="exportStateClean" value="${jobstatus?.synchState?.toString()=='CLEAN'}"/>
    <g:set var="exportStateCreate" value="${'CREATE_NEEDED'==jobstatus?.synchState?.toString()}"/>
    <g:each in="${jobstatus?.actions}" var="action">
        <g:if test="${action.id == '-'}">
            <li class="divider"></li>
        </g:if>
        <g:else>
            <li>
                <g:render template="/scm/actionLink"
                          model="[action:action,
                                  integration:'export',
                                  project:params.project,
                                  linkparams:[id: scheduledExecution.extid]]"
                />

            </li>
        </g:else>
    </g:each>
    <g:unless test="${exportStateCreate}">
        <li><g:link controller="scm"
                    params="[project: scheduledExecution.project,id:scheduledExecution.extid,integration: 'export']"
                    action="diff"
        >
            <g:render template="/scm/statusBadge"
                      model="[exportStatus: jobstatus?.synchState?.toString(),
                              importStatus: null,
                              text  : '',
                              notext: true,
                              integration: 'export',
                              icon:'glyphicon-eye-open',
                              exportCommit  : jobstatus?.commit]"/>
            <g:if test="${exportStateClean}">
                <g:message code="scm.action.diff.clean.button.label" default="View Commit Info"/>
            </g:if>
            <g:else>
                <g:message code="scm.action.diff.button.label" default="Diff Changes"/>
            </g:else>
        </g:link>
        </li>
    </g:unless>
</g:if>

<g:if test="${scmImportEnabled && scmImportStatus?.get(scheduledExecution.extid)}">
    %{renderedActions++}%


    <g:set var="jobstatus" value="${scmImportStatus?.get(scheduledExecution.extid)}"/>
    <g:set var="importStateClean" value="${jobstatus?.synchState?.toString()=='CLEAN'}"/>

    <g:set var="importStateUnknown" value="${'UNKNOWN'==jobstatus?.synchState?.toString()}"/>
    <g:if test="${authRead}">
        <li class="divider"></li>
    </g:if>
    <li class="dropdown-header"><g:message code="scm.import.plugin" /></li>
    <g:each in="${jobstatus?.actions}" var="action">
        <g:if test="${action.id == '-'}">
            <li class="divider"></li>
        </g:if>
        <g:else>
            <li>
                <g:render template="/scm/actionLink"
                          model="[action:action,
                                  integration:'import',
                                  project:params.project,
                                  linkparams:[id: scheduledExecution.extid]]"
                />

            </li>
        </g:else>
    </g:each>
    <g:unless test="${importStateUnknown}">
        <li>
            <g:link controller="scm"
                    params="[project: scheduledExecution.project,id:scheduledExecution.extid,integration: 'import']"
                    action="diff">
                <g:render template="/scm/statusBadge"
                          model="[importStatus: jobstatus?.synchState?.toString(),
                                  text  : '',
                                  notext: true,
                                  integration: 'import',
                                  icon:'glyphicon-eye-open',
                                  exportCommit  : jobstatus?.commit]"/>
                <g:if test="${importStateClean}">
                    <g:message code="scm.action.diff.clean.button.label" default="View Commit Info"/>
                </g:if>
                <g:else>
                    <g:message code="scm.action.diff.button.label" default="Diff Changes"/>
                </g:else>
            </g:link>
        </li>
    </g:unless>
    <g:if test="${importStateUnknown}">
        <li class="dropdown-header">
            <g:render template="/scm/statusBadge"
                      model="[importStatus: jobstatus?.synchState?.toString(),
                              exportStatus:null,
                              text: '',
                              notext: false,
                              integration: 'import',
                              importCommit: jobstatus?.commit]"
            />
        </li>
    </g:if>
</g:if>