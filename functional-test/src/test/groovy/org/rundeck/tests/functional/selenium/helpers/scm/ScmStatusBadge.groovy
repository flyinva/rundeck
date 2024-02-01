package org.rundeck.tests.functional.selenium.helpers.scm

import org.openqa.selenium.By
import org.openqa.selenium.WebElement
import org.rundeck.tests.functional.selenium.pages.jobs.JobShowPage

class ScmStatusBadge {
    final List iconClasses
    final String badgeText
    final String tooltips
    static final By elementSelector = By.xpath("//*[@id='jobInfo_']/span[2]")

    ScmStatusBadge(JobShowPage jobShowPage){
        WebElement statusBadge = jobShowPage.driver.findElement(elementSelector)

        this.tooltips = statusBadge.getAttribute("data-original-title")
        this.badgeText = statusBadge.getText()
        this.iconClasses = statusBadge.findElement(By.tagName("i")).getAttribute("class").split(" ")
    }
}
