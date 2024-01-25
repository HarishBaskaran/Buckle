@ignore
Feature: BffService - Get Bond Listing in Aspero

  Background: Get the variables initialized.
    * def config = callonce read('classpath:com/b2c/api/automation/apis/apiPaths.js')
    * def SchemaUtils = Java.type('utils.SchemaUtils')

    * def headers = read ('classpath:com/b2c/api/automation/data/headers/basicHeader.json')

    Given url _url_b2c

  @functionality
  Scenario: Function - Bond Listing to Aspero

    * karate.log('----------BondListing.feature----------')

    * set headers.Authorization = "Bearer " + otp.accessToken
    * set headers.X-User-Id = otp.userId
    * set headers.Yubi-User-Id = otp.userId
    * set headers.X-Product-Id = 'YUBIFIN'

    Given path config.bondsListings
    * configure headers = headers
    And params query
    When method get

    * karate.log('Request Details:',  karate.request)
    * karate.log('Response Details:',  karate.response)

    * string responseBody = response
    * def status = responseStatus

    * if (expectedStatus != status ) karate.fail('The status match failed ' + expectedStatus + ' != ' + status)
    * karate.log(expectedStatus , status)

    * if (status == 200) karate.call('classpath:com/b2c/api/automation/functional/bffService/_17_bondListingController/bondListing.feature@positive-200', { response: responseBody })
    * if (status == 500) karate.fail('The Service is down')


  @positive-200
  Scenario: Function - Verify Positive Bond Listing

    * string schema = read ('classpath:com/b2c/api/automation/data/authService/login_200.json')
    * karate.log(responseBody)
    * karate.log(schema)
    * assert SchemaUtils.compareResponseBody(responseBody, schema)
