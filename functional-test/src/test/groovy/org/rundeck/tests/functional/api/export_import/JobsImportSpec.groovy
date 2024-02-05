package org.rundeck.tests.functional.api.export_import

import org.rundeck.util.annotations.APITest
import org.rundeck.util.container.BaseContainer

import java.time.LocalDateTime
import java.time.ZoneId

@APITest
class JobsImportSpec extends BaseContainer {

    def setupSpec() {
        startEnvironment()
        setupProject()
    }

    def "import RunDeck Jobs in jobs.xml format (multipart request)"() {
        when:
            def path = generatePath()
            def responseImport = client.doPostWithMultipart("/project/${PROJECT_NAME}/jobs/import", new File(path), "xmlBatch")
        then:
            verifyAll {
                responseImport.code() == 200
                def json = jsonValue(responseImport.body(), Map)
                json.succeeded.size() == 1
                json.failed.size() == 0
                json.skipped.size() == 0
                json.succeeded[0].name == "cli job"
                json.succeeded[0].group == "api-test"
                json.succeeded[0].project == PROJECT_NAME
            }
    }

    def "import RunDeck Jobs in jobs.xml format (urlencode)"() {
        when:
            def path = generatePath()
            def responseImport = client.doPostWithFormData("/project/${PROJECT_NAME}/jobs/import", new File(path).text, "xmlBatch")
        then:
            verifyAll {
                responseImport.code() == 200
                def json = jsonValue(responseImport.body(), Map)
                json.succeeded.size() == 1
                json.failed.size() == 0
                json.skipped.size() == 0
                json.succeeded[0].name == "cli job"
                json.succeeded[0].group == "api-test"
                json.succeeded[0].project == PROJECT_NAME
            }
    }

    def generatePath() {
        def xmlJob = "<joblist>\n" +
                "   <job>\n" +
                "      <name>cli job</name>\n" +
                "      <group>api-test</group>\n" +
                "      <description></description>\n" +
                "      <loglevel>INFO</loglevel>\n" +
                "      <context>\n" +
                "          <project>xml-project-name</project>\n" +
                "      </context>\n" +
                "      <dispatch>\n" +
                "        <threadcount>1</threadcount>\n" +
                "        <keepgoing>true</keepgoing>\n" +
                "      </dispatch>\n" +
                "      <sequence>\n" +
                "        <command>\n" +
                "        <exec>xml-args</exec>\n" +
                "        </command>\n" +
                "      </sequence>\n" +
                "   </job>\n" +
                "</joblist>"


        def xmlJobAux = xmlJob.replaceAll('xml-args', 'echo hello there')
                .replaceAll('xml-project-name', PROJECT_NAME)
        def tempFile = File.createTempFile("temp", ".xml")
        tempFile.text = xmlJobAux
        tempFile.deleteOnExit()
        tempFile.path
    }

}
