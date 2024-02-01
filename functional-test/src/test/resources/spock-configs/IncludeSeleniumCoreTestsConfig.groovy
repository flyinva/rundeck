import org.rundeck.util.annotations.ScmTest
import org.rundeck.util.annotations.SeleniumCoreTest

runner {
    include SeleniumCoreTest, ScmTest
}