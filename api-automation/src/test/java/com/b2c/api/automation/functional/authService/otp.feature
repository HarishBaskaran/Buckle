@ignore
Feature: AuthService - OTP process of User in Aspero

  Background: Get the variables initialized.
    * def config = callonce read('classpath:com/b2c/api/automation/apis/apiPaths.js')
    * def SchemaUtils = Java.type('utils.SchemaUtils')

    * def headers = read ('classpath:com/b2c/api/automation/data/headers/basicHeader.json')

    Given url _url_b2c

  @functionality
  Scenario: Function - OTP process to Aspero

    * def jsonBody = read ('classpath:com/b2c/api/automation/data/authService/otp.json')
    * set jsonBody.mobileNumber = mobileNumber
    * set jsonBody.otp = otp

    Given path config.otpLogin
    * configure headers = headers
    And request jsonBody
    When method post

    * karate.log('Request Details:',  karate.request)
    * karate.log('Response Details:',  karate.response)

    * string responseBody = response
    * def status = responseStatus

   # * if (expectedStatus != status ) karate.fail('The status match failed ' + expectedStatus + ' != ' + status)
    * karate.log(expectedStatus , status)

    * if (status == 200) karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@positive-200', { response: responseBody })
    * if (status == 403) karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@negative-403', { response: responseBody })
    * if (status == 404) karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@negative-404', { response: responseBody })
#    * if (status == 500 && expectedStatus != status) karate.fail('The Service is down')

    * def accessToken = status == 200 ?  response.accessToken : ""
    * def refreshToken = status == 200 ?  response.refreshToken : ""
    * def userId = status == 200 ? response.userId : ""


  @positive-200
  Scenario: Function - Verify Positive OTP process
    * string schema = read ('classpath:com/b2c/api/automation/data/authService/otp_200.schema.json')
    * karate.log(responseBody)
    * karate.log(schema)
    * assert SchemaUtils.compareResponseSchema(response, schema)

  @negative-403
  Scenario: Function - Verify Negative OTP process
    * string schema = read ('classpath:com/b2c/api/automation/data/authService/otp_403.json')
    * karate.log(responseBody)
    * karate.log(schema)
    * assert SchemaUtils.compareResponseBody(response, schema)

  @negative-404
  Scenario: Function - Verify Negative User OTP process

    * string schema = read ('classpath:com/b2c/api/automation/data/authService/otp_404.json')
    * karate.log(responseBody)
    * karate.log(schema)
    * assert SchemaUtils.compareResponseBody(response, schema)
