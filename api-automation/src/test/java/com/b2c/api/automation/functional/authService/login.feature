@ignore
Feature: AuthService - Login of User in Aspero

  Background: Get the variables initialized.
    * def config = callonce read('classpath:com/b2c/api/automation/apis/apiPaths.js')
    * def SchemaUtils = Java.type('utils.SchemaUtils')

    * def headers = read ('classpath:com/b2c/api/automation/data/headers/basicHeader.json')

    Given url _url_b2c

  @functionality
  Scenario: Function - Login to Aspero

    * def jsonBody = read ('classpath:com/b2c/api/automation/data/authService/login.json')
    * set jsonBody.mobileNumber = mobileNumber
    * set jsonBody.onBoardingConfirmation = "false"

    Given path config.login
    * configure headers = headers
    And request jsonBody
    When method post

    * karate.log('Request Details:',  karate.request)
    * karate.log('Response Details:',  karate.response)

    * string responseBody = response
    * def status = responseStatus

    * if (expectedStatus != status ) karate.fail('The status match failed ' + expectedStatus + ' != ' + status)
    * karate.log(expectedStatus , status)

    * if (status == 200) karate.call('classpath:com/b2c/api/automation/functional/authService/login.feature@positive-200', { response: responseBody })
    * if (status == 403) karate.call('classpath:com/b2c/api/automation/functional/authService/login.feature@negative-403', { mobileNumber:mobileNumber, response: responseBody })
    * if (status == 404) karate.call('classpath:com/b2c/api/automation/functional/authService/login.feature@negative-404', { mobileNumber:mobileNumber, response: responseBody })
    * if (status == 500 && expectedStatus != status) karate.fail('The Service is down')


  @positive-200
  Scenario: Function - Verify Positive Login

    * string schema = read ('classpath:com/b2c/api/automation/data/authService/login_200.json')
    * karate.log(responseBody)
    * karate.log(schema)
    * assert SchemaUtils.compareResponseBody(responseBody, schema)


  @negative-403
  Scenario: Function - Verify Negative Login

    * string schema = read ('classpath:com/b2c/api/automation/data/authService/login_403.json')
    * karate.log(responseBody)
    * karate.log(schema)
    * assert SchemaUtils.compareResponseSchema(responseBody, schema)

  @negative-404
  Scenario: Function - Verify Negative Login

    * string schema = read ('classpath:com/b2c/api/automation/data/authService/login_404.json')
    * karate.log(responseBody)
    * karate.log(schema)
    * assert SchemaUtils.compareResponseBody(responseBody, schema)


  @error-resolve
  Scenario: Function - Login to Aspero

    * def jsonBody = read ('classpath:com/b2c/api/automation/data/authService/login.json')
    * set jsonBody.mobileNumber = mobileNumber
    * set jsonBody.onBoardingConfirmation = "false"

    Given path config.login
    * configure headers = headers
    And request jsonBody
    When method post

    * karate.log('Request Details:',  karate.request)
    * karate.log('Response Details:',  karate.response)

    * string responseBody = response
    * def status = responseStatus
