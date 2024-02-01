package org.rundeck.tests.functional.selenium.helpers.scm

enum ScmIntegration {
    IMPORT("import"),
    EXPORT("export")
    final String name
    ScmIntegration(String name){
        this.name = name
    }
}