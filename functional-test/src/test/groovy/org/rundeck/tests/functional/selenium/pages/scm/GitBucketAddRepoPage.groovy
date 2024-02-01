package org.rundeck.tests.functional.selenium.pages.scm

import org.openqa.selenium.By
import org.openqa.selenium.Dimension
import org.openqa.selenium.WebElement
import org.openqa.selenium.support.ui.WebDriverWait
import org.openqa.selenium.support.ui.ExpectedConditions
import org.rundeck.tests.functional.selenium.pages.BasePage
import org.rundeck.util.container.SeleniumContext

import java.time.Duration

import static org.junit.Assert.assertEquals

class GitBucketAddRepoPage extends BasePage {

    String loadPath

    GitBucketAddRepoPage(SeleniumContext context) {
        super(context)
    }

    void addRepo(String repositoryName) {
        driver.get("http://localhost:8080/new")
        driver.manage().window().setSize(new Dimension(1200, 1050))
        driver.findElement(By.id("userName")).click()
        driver.findElement(By.id("userName")).sendKeys("root")
        driver.findElement(By.id("password")).click()
        driver.findElement(By.id("password")).sendKeys("root")
        driver.findElement(By.cssSelector(".btn.btn-success")).click()

        new WebDriverWait(driver, Duration.ofSeconds(10)).until(ExpectedConditions.elementToBeClickable(By.id("name")))
        driver.findElement(By.id("name")).sendKeys(repositoryName)
        for (WebElement input : driver.findElements(By.tagName("input"))){
            if(input.getAttribute("value") != null && input.getAttribute("value").equals("README")){
                input.click()
            }
        }
        driver.findElement(By.cssSelector(".btn.btn-success")).click()
        if(driver.findElements(By.id("error-name")).size() == 0 || !driver.findElement(By.id("error-name")).getText().contains("Repository already exists")){
            assertEquals(driver.getCurrentUrl(), "http://localhost:8080/root/${repositoryName}".toString())
            new WebDriverWait(driver, Duration.ofSeconds(20)).until(ExpectedConditions.numberOfElementsToBe(By.id("repository-url"), 1))
        }
    }
}
