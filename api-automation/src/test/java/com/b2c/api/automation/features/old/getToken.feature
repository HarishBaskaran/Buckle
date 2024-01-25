
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
#    * def mobileNumber = '9576554777'

  Scenario: Verify OTP positive flow
    Given url _url_b2c
    And path '/auth/api/v1/otp-login'
    And headers {Content-Type : 'application/json', Device-Id : 'test'}
    And request {"mobileNumber": '#(mobileNumber)',"platformName": "YUBIFIN","otp": "9999"}
    When method post
    Then status 200
    * def authToken = response.accessToken
    * def userId = response.userId
