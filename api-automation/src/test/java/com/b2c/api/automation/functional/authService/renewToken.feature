@ignore
Feature: AuthService - Renew Token of User in Aspero

  Background: Get the variables initialized.
    * def config = callonce read('classpath:com/b2c/api/automation/apis/apiPaths.js')
    * def SchemaUtils = Java.type('utils.SchemaUtils')

    * def headers = read ('classpath:com/b2c/api/automation/data/headers/basicHeader.json')

    Given url _url_b2c

  @functionality
  Scenario: Function - Renew Token to Aspero

    * def jsonBody = read ('classpath:com/b2c/api/automation/data/authService/renewToken.json')
    * set jsonBody.refreshToken = otp.refreshToken

    * set headers.Device-Id = 'unknown'

    Given path config.renewToken
    * configure headers = headers
    And request jsonBody
    When method post

    * karate.log('Request Details:',  karate.request)
    * karate.log('Response Details:',  karate.response)

    * string responseBody = response
    * def status = responseStatus

    * if (expectedStatus != status ) karate.fail('The status match failed ' + expectedStatus + ' != ' + status)
    * karate.log(expectedStatus , status)

    * if (status == 200) karate.call('classpath:com/b2c/api/automation/functional/authService/renewToken.feature@positive-200', { response: responseBody })
    * if (status == 500 && expectedStatus != status) karate.fail('The Service is down')


  @positive-200
  Scenario: Function - Verify Positive Renew Token

    * def schema = read ('classpath:com/b2c/api/automation/data/authService/renewToken_200_fuzzy.json')
    * karate.log(response, schema)
    * match response contains schema
