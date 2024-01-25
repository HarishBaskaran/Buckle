@ignore
Feature: AuthService - SignUp of User in Aspero

  Background: Get the variables initialized.
    * def config = callonce read('classpath:com/b2c/api/automation/apis/apiPaths.js')
    * def SchemaUtils = Java.type('utils.SchemaUtils')

    * def headers = read ('classpath:com/b2c/api/automation/data/headers/basicHeader.json')

    Given url _url_b2c

  @functionality
  Scenario: Function - SignUp to Aspero

    * def jsonBody = read ('classpath:com/b2c/api/automation/data/authService/signUp.json')
    * set jsonBody.mobileNumber = mobileNumber
    * set jsonBody.onBoardingConfirmation = "false"

    Given path config.signup
    * configure headers = headers
    And request jsonBody
    When method post

    * karate.log('Request Details:',  karate.request)
    * karate.log('Response Details:',  karate.response)

    * string responseBody = response
    * def status = responseStatus

    * if (expectedStatus != status ) karate.fail('The status match failed ' + expectedStatus + ' != ' + status)
    * karate.log(expectedStatus , status)

    * if (status == 200) karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@positive-200', { response: responseBody })
    * if (status == 400) karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@negative-400', { mobileNumber: mobileNumber, response: responseBody })
    * if (status == 409) karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@negative-409', { mobileNumber: mobileNumber, response: responseBody })
    * if (status == 500 && expectedStatus != status) karate.fail('The Service is down')


  @positive-200
  Scenario: Function - Verify Positive SignUp

    * string schema = read ('classpath:com/b2c/api/automation/data/authService/signUp_200.json')
    * assert SchemaUtils.compareResponseBody(response, schema)

  @negative-400
  Scenario: Function - Verify Negative SignUp
# take care on the variable names mentioning the test type
    * string schema =  read ('classpath:com/b2c/api/automation/data/authService/signUp_409.schema.json')
    * assert SchemaUtils.compareResponseSchema(response, schema)

    * json jsonBody = read ('classpath:com/b2c/api/automation/data/authService/signUp_400.json')
    * set jsonBody.errors[0].constraintViolations[0].rejectedValue = mobileNumber
    * string schema = jsonBody

    * karate.log('Response json', response)
    * karate.log('Response schema', schema)

    * assert SchemaUtils.compareResponseBody(response, schema)

  @negative-409
  Scenario: Function - Verify Negative SignUp
# take care on the variable names mentioning the test type
    * string schema =  read ('classpath:com/b2c/api/automation/data/authService/signUp_409.schema.json')
    * assert SchemaUtils.compareResponseSchema(response, schema)

    * json jsonBody = read ('classpath:com/b2c/api/automation/data/authService/signUp_409.json')
    * set jsonBody.errors[0].constraintViolations[0].rejectedValue = mobileNumber
    * string reason = 'The number you provided, +91 ' + mobileNumber + ' is already registered with us. Clicking on continue will take you to login Continue with the same number?'
    * set jsonBody.errors[0].constraintViolations[0].reason = reason
    * string schema = jsonBody

    * karate.log('Response json', response)
    * karate.log('Response schema', schema)

    * assert SchemaUtils.compareResponseBody(response, schema)
