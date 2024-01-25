
Feature: KYC Personal details
  Background: Create an initialise base URL
    Given url _url_b2c
    * def mobileNumber = '8690900557'
    * def token = call read('getToken.feature') {"mobileNumber": '#(mobileNumber)',"platformName": "YUBIFIN","onBoardingConfirmation": false}
  Scenario Outline: To add name and email details for the user
    And path '<path>'
    And params {email : <email>,name : '<name>',user-id : '#(token.userId)'}
    And headers {Content-Type: 'application/json' ,Device-Id : 'test', x-user-id : '#(token.userId)',  yubi-user-id: '#(token.userId)', Authorization : '#("Bearer " + token.authToken)'}
#    And print headers
    When method <method>
    Then status 200



    Examples:
    |path                             |method    |email               | name           |
    |/auth/api/v1/update-email-status |get       | teststs@yopmail.com | Simran Bhatti  |
    |/auth/api/v1/update-email-status |get       | teststestts@yopmail.com | Simran Bhatti  |