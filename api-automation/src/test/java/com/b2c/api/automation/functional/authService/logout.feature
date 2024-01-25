@ignore
Feature: AuthService - Logout of User in Aspero

  Background: Get the variables initialized.
    * def config = callonce read('classpath:com/b2c/api/automation/apis/apiPaths.js')
    * def SchemaUtils = Java.type('utils.SchemaUtils')

    * def headers = read ('classpath:com/b2c/api/automation/data/headers/basicHeader.json')

    Given url _url_b2c

  @functionality
  Scenario: Function - Logout to Aspero

    * set headers.X-User-Id = otp.userId

    Given path config.logout
    * configure headers = headers
    And param token = otp.refreshToken
    When method delete

    * karate.log('Request Details:',  karate.request)
    * karate.log('Response Details:',  karate.response)

    * string responseBody = response
    * def status = responseStatus

    * if (expectedStatus != status ) karate.fail('The status match failed ' + expectedStatus + ' != ' + status)
    * karate.log(expectedStatus , status)

    * if (status == 200) karate.call('classpath:com/b2c/api/automation/functional/authService/logout.feature@positive-200', { response: responseBody })
    * if (status == 500 && expectedStatus != status) karate.fail('The Service is down')


  @positive-200
  Scenario: Function - Verify Positive Logout

    * string schema = read ('classpath:com/b2c/api/automation/data/authService/logout_200.json')
    * karate.log(responseBody)
    * karate.log(schema)
    * assert SchemaUtils.compareResponseBody(responseBody, schema)
