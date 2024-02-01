package org.rundeck.tests.functional.selenium.helpers.scm

enum ScmActionId {
    JOB_COMMIT("job-commit")
    final String name
    ScmActionId(String name){
        this.name = name
    }
}