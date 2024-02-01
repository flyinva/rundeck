package org.rundeck.util.extensions

import org.rundeck.util.annotations.*
import org.spockframework.runtime.AbstractRunListener
import org.spockframework.runtime.extension.IGlobalExtension
import org.spockframework.runtime.model.ErrorInfo
import org.spockframework.runtime.model.IterationInfo
import org.spockframework.runtime.model.SpecInfo

class SetEnvExtension implements IGlobalExtension {
    private static String DEFAULT_COMPOSE_PATH = "docker/compose/oss/base/docker-compose.yml"

    @Override
    void visitSpec(SpecInfo spec) {
        spec.getAnnotations().each {annotation ->
            annotation.annotationType().name
        }
    }

    static class ErrorListener extends AbstractRunListener {
        ErrorInfo errorInfo

        @Override
        void beforeIteration(IterationInfo iteration) {
            errorInfo = null
        }

        @Override
        void error(ErrorInfo error) {
            errorInfo = error
        }
    }
}