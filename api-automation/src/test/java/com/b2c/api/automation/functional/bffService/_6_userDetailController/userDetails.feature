@ignore
Feature: UserService - Get User Details from Aspero

  Background: Get the variables initialized.
    * def config = callonce read('classpath:com/b2c/api/automation/apis/apiPaths.js')
    * def SchemaUtils = Java.type('utils.SchemaUtils')

    * def headers = read ('classpath:com/b2c/api/automation/data/headers/basicHeader.json')

    Given url _url_b2c

  @functionality
  Scenario: Function - Get User Details from Aspero

    * set headers.Authorization = "Bearer " + otp.accessToken
    * set headers.X-User-Id = otp.userId
    * set headers.Yubi-User-Id = otp.userId

    Given path config.userDetails
    * configure headers = headers
    When method get

    * karate.log('Request Details:',  karate.request)
    * karate.log('Response Details:',  karate.response)

    * string responseBody = response
    * def status = responseStatus

    * if (expectedStatus != status ) karate.fail('The status match failed ' + expectedStatus + ' != ' + status)
    * karate.log(expectedStatus , status)

    * if (status == 200) karate.call('classpath:com/b2c/api/automation/functional/userService/userDetails.feature@positive', { response: response })
    * if (status == 500) karate.fail('The Service is down')


  @positive
  Scenario: Function - Verify Positive User Details

    * def schema = read ('classpath:com/b2c/api/automation/data/bffService/userDetails_200.fuzzy.json')
    * karate.log(response, schema)
    * match response contains schema