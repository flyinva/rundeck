package org.rundeck.tests.functional.selenium.tests.scm


import org.rundeck.tests.functional.selenium.helpers.scm.ScmStatusBadge
import org.rundeck.tests.functional.selenium.pages.appadmin.KeyStoragePage
import org.rundeck.tests.functional.selenium.pages.jobs.JobShowPage
import org.rundeck.tests.functional.selenium.pages.login.LoginPage
import org.rundeck.tests.functional.selenium.pages.scm.ConfigureScmPage
import org.rundeck.tests.functional.selenium.pages.scm.GitBucketAddRepoPage
import org.rundeck.tests.functional.selenium.pages.scm.PerformScmActionPage
import org.rundeck.util.annotations.ScmTest
import org.rundeck.util.annotations.SeleniumCoreTest
import org.rundeck.util.container.SeleniumBase

@ScmTest
@SeleniumCoreTest
class ScmStatusBadgeSpec extends SeleniumBase {

    private static String REPO_NAME = "statusBadgeTest"
    private static String PROJECT_LOCATION = "/projects-import/scm/PScmStatusBadgeTest.rdproject.jar"
    private static String PROJECT_NAME = 'PScmStatusBadgeTest'
    private static ConfigureScmPage configureScmPage

    @Override
    def setupSpec() {
        go(GitBucketAddRepoPage).addRepo(REPO_NAME)
        go(LoginPage).login(TEST_USER, TEST_PASS)

        def keyStoragePage = go(KeyStoragePage)
        keyStoragePage.addPasswordSimplified("root", "scm", "scm.password")
        keyStoragePage.checkKeyExists("scm.password", "scm")

        setupProject(PROJECT_NAME, PROJECT_LOCATION)
        configureScmPage = page(ConfigureScmPage, PROJECT_NAME)
        configureScmPage.go()
        configureScmPage.disableScmExport()
        configureScmPage.disableScmImport()
    }

    def cleanup(){
        configureScmPage.go()
        configureScmPage.disableScmExport()
        configureScmPage.disableScmImport()
    }

    def "job scm import status badge for a newly created job"(){
        given:
        configureScmPage.go()
        configureScmPage.enableScmImport()

        JobShowPage jobShowPage = page(JobShowPage, PROJECT_NAME).forJob("740791d7-8734-4d8a-a77d-465aa2ccfe63")
        jobShowPage.go()

        when:
        ScmStatusBadge scmStatusBadge = jobShowPage.getScmStatusBadge()

        then:
        scmStatusBadge.iconClasses.containsAll(['glyphicon','glyphicon-question-sign'])
        scmStatusBadge.badgeText == 'Import Status: Not Tracked'
        scmStatusBadge.getTooltips() == 'Not Tracked for SCM Import'
    }

    def "job scm import status badge after import job changes"(){
        given:
        final String jobUuid = "08879a4b-3d0d-427c-9b69-226296ce30af"
        configureScmPage.go()
        configureScmPage.enableScmExport()

        page(PerformScmActionPage, PROJECT_NAME).commitJobChanges(jobUuid, "message example")
        configureScmPage.go()
        configureScmPage.disableScmExport()
        configureScmPage.enableScmImport()

        JobShowPage jobShowPage = page(JobShowPage, PROJECT_NAME).forJob(jobUuid)
        jobShowPage.go()

        when:
        ScmStatusBadge scmStatusBadge = jobShowPage.getScmStatusBadge()

        then:
        scmStatusBadge.iconClasses.containsAll(['glyphicon','glyphicon-exclamation-sign'])
        scmStatusBadge.badgeText == 'Import Needed'
        scmStatusBadge.getTooltips() == 'Import Status: Job changes need to be pulled'
    }


    def "job scm export status badge when job created and after commit"(){
        given:
        final String jobUuid = "1ccd6bc5-63ae-4853-8f00-5fdaad031a24"
        configureScmPage.go()
        configureScmPage.enableScmExport()

        JobShowPage jobShowPage = page(JobShowPage, PROJECT_NAME).forJob(jobUuid)
        jobShowPage.go()

        when:
        ScmStatusBadge scmStatusBadge = jobShowPage.getScmStatusBadge()

        then:
        scmStatusBadge.iconClasses.containsAll(['glyphicon','glyphicon-exclamation-sign'])
        scmStatusBadge.badgeText == 'Created'
        scmStatusBadge.getTooltips() == 'Export Status: New Job, Not yet added to SCM'

        when:
        page(PerformScmActionPage, PROJECT_NAME).commitJobChanges(jobUuid, "message example")
        jobShowPage.go()
        ScmStatusBadge scmStatusBadgeAfterCommit = jobShowPage.getScmStatusBadge()

        then:
        scmStatusBadgeAfterCommit.iconClasses.containsAll(['glyphicon','glyphicon-ok'])
        scmStatusBadgeAfterCommit.badgeText == 'No Change'
        scmStatusBadgeAfterCommit.getTooltips() == 'Export Status: Clean'
    }
}
