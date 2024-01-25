@Auth
Feature: Sign up & Login
  Background: Random mobile number for sign up
    * def generateRandomMobileNumber =
  """
  function() {
    let number = '9';
    for (let i = 1; i <= 9; i++) {
      const digit = Math.floor(Math.random() * 10);
      number += digit;
    }
    return number;
  }
  """
    * def randomMobileNumber = call generateRandomMobileNumber
    * def requestPayload = {"mobileNumber": karate.config.existingMobile, "platformName": "YUBIFIN", "onBoardingConfirmation": "false"}
    * def existingMobile = '9988498546'


  Scenario: Signup of a new user
    Given url _url_b2c
    And path '/auth/api/v1/signup'
    And headers {Content-Type : 'application/json', Device-Id : 'test'}
    And request {"mobileNumber": '#(randomMobileNumber)',"platformName": "YUBIFIN","onBoardingConfirmation": "false"}
    When method post
    Then status 200
    * def authToken = response.accessToken
    * def userId = response.userId
    And match response  ==
    """
    {
    "message": "OTP sent successfully"
}
    """
    * def b2c_message = response.message
    And match b2c_message != null
    And match b2c_message == '#string'

  Scenario: Signup of a new user with existing number
    Given url _url_b2c
    And path '/auth/api/v1/signup'
    And headers {Content-Type : 'application/json', Device-Id : 'test'}
    And request {"mobileNumber": '#(existingMobile)',"platformName": "YUBIFIN","onBoardingConfirmation": "false"}
    When method post
    Then status 409
    * def message = response.errors[0].message
    And match message  == 'You are already a Yubi Customer'
    And match message != null
    And match message == '#string'

  Scenario: Schema validation of Sign up
    * def randomMobileNumber = '9' + karate.repeat(9, function(){ return Math.floor(Math.random() * 10); }).join('')
    Given url _url_b2c
    And path '/auth/api/v1/signup'
    And headers {Content-Type : 'application/json', Device-Id : 'test'}
    And request {"mobileNumber": '#(randomMobileNumber)',"platformName": "YUBIFIN","onBoardingConfirmation": "false"}
    When method post
    Then status 200
    * def authToken = response.accessToken
    * def userId = response.userId
    And match response  ==
    """
    {
    "message":'#string'
}
    """

  Scenario: Login positive flow
    Given url _url_b2c
    And path '/auth/api/v1/login'
    And headers {Content-Type : 'application/json', Device-Id : 'test'}
    And request {"mobileNumber": '#(existingMobile)',"platformName": "YUBIFIN"}
    When method post
    Then status 200
    And match response.message  == 'OTP sent successfully'
    And match response.message  == '#string'

  Scenario: Login negative flow
    Given url _url_b2c
    And path '/auth/api/v1/login'
    And headers {Content-Type : 'application/json', Device-Id : 'test'}
    And request {"mobileNumber": '#(randomMobileNumber)',"platformName": "YUBIFIN"}
    When method post
    Then status 404
    And match response.errors[].message  == 'User not found, Please signup and try again'
    And match response.errors[].errorCode  == '#string'
    And match response.errors[].message  == '#string'

  Scenario: Login schema validation
    Given url _url_b2c
    And path '/auth/api/v1/login'
    And headers {Content-Type : 'application/json', Device-Id : 'test'}
    And request {"mobileNumber": '#(existingMobile)',"platformName": "YUBIFIN"}
    When method post
    Then status 200

    And match response ==
      """
    {
    "message": '#string'
}
      """

  Scenario: Verify OTP positive flow
    Given url _url_b2c
    And path '/auth/api/v1/otp-login'
    And headers {Content-Type : 'application/json', Device-Id : 'test'}
    And request {"mobileNumber": '#(existingMobile)',"platformName": "YUBIFIN","otp": "9999"}
    When method post
    Then status 200
    * def authToken = response.accessToken
    * def userId = response.userId

  Scenario: Schema validation of Verify OTP
    Given url _url_b2c
    And path '/auth/api/v1/otp-login'
    And headers {Content-Type : 'application/json', Device-Id : 'test'}

    And request {"mobileNumber": '#(existingMobile)',"platformName": "YUBIFIN","otp": "9999"}
    When method post
    Then status 200
    * def authToken = response.accessToken
    * def userId = response.userId
#    * def verifyOtpSchema = {"userId": '#string',"accessToken": '#string',"refreshToken": '#string'}
    And match response ==
    """
      {
      "userId": '#string',
      "accessToken": '#string',
      "refreshToken": '#string'
     }
      """

  Scenario: Verify OTP with not existing user flow
    Given url _url_b2c
    And path '/auth/api/v1/otp-login'
    And headers {Content-Type : 'application/json', Device-Id : 'test'}
    And request {"mobileNumber": '#(randomMobileNumber)',"platformName": "YUBIFIN","otp": "9999"}
    When method post
    Then status 404
    And match response.errors[].errorCode == "err.auth.user-not-found"
    And match response.errors[].message = "User not found, Please signup and try again"
    And match response.errors[].message == '#string'
    And match response.errors[].errorCode == '#string'

  Scenario: Verify Logout
    Given url _url_b2c
    And path '/auth/api/v1/otp-login'
    And headers {Content-Type : 'application/json', Device-Id : 'test'}
    And request {"mobileNumber": '#(existingMobile)',"platformName": "YUBIFIN","otp": "9999"}
    When method post
    Then status 404
    And match response.errors[].errorCode == "err.auth.user-not-found"
    And match response.errors[].message = "User not found, Please signup and try again"
    And match response.errors[].message == '#string'
    And match response.errors[].errorCode == '#string'