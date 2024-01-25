@User
Feature:User details API automation

  Background: User details validations
    * def isValidISIN = function(isin) { return isin.matches('[A-Z]{2}[0-9A-Z]{9}[0-9]'); }
    Given url _url_b2c

  Scenario Outline: User details validation KYC completed and investment pending user
    * def emailMobileNumber = <mobile>
    * def token = call read('getToken.feature') {"mobileNumber": '#(emailMobileNumber)',"platformName": "YUBIFIN","onBoardingConfirmation": false}
    * def userdetails = user_details_path
    Given path userdetails
    And headers {Content-Type: 'application/json' ,Device-Id : 'test', x-user-id : '#(token.userId)',  yubi-user-id: '#(token.userId)', Authorization : '#("Bearer " + token.authToken)',x-product-id: 'YUBIFIN'}
    When method get
    And request {}
    Then status 200
    And match response.name == <name>
    And match response.email == <email>
    And match response.mobileNumber != null
    And match response.kycStatus == <kycStatus>
    And match response.userCategory == <userCategory>
    And match response.wishListItemIds == <wishListItemIds>
    And match response.blocked == <blocked>
    And match response.blockedReason == <blockedReason>
    And match response.referralCode == <referralCode>
    And match response.investNowEnabled == <investNowEnabled>

    Examples:
      | mobile       | name              | email                        | kycStatus    | userCategory                  | wishListItemIds | blocked | blockedReason | referralCode | investNowEnabled |
      | "9334202293" | "Simran Bhatti"   | "bhattisimran12@gmail.com"   | "COMPLETE"   | "KYC_DONE_INVESTMENT_PENDING" | []              | false   | null          | "ABABAB"     | true             |
      | "9110586831" | "V Saideep Reddy" | "test156@yopmail.com"        | "COMPLETE"   | "INVESTED"                    | []              | false   | null          | "ABABAB"     | true             |
      | "9454446484" | null              | "automationuser@yopmail.com" | "INCOMPLETE" | "KYC_PENDING"                 | []              | false   | null          | "ABABAB"     | true             |
      | "9576554777" | null              | null                         | "INCOMPLETE" | "KYC_NOT_STARTED"             | []              | false   | null          | "ABABAB"     | true             |
      | "9090909090" | "Simran Bhatti"   | "randomnumber@yopmail.com"   | "FAILED"     | "KYC_FAILED"                  | []              | false   | null          | "ABABAB"     | true             |
      | "6060606062" | "Anitha K N"      | "simran.bhatti@go-yubi.com"  | "IN_REVIEW"  | "KYC_PENDING_IN_REVIEW"       | []              | false   | null          | "ABABAB"     | true             |

  Scenario: Schema validation for user details
    * def emailMobileNumber = "9334202293"
    * def token = call read('getToken.feature') {"mobileNumber": '#(emailMobileNumber)',"platformName": "YUBIFIN","onBoardingConfirmation": false}
    * def userdetails = user_details_path
    Given path userdetails
    And headers {Content-Type: 'application/json' ,Device-Id : 'test', x-user-id : '#(token.userId)',  yubi-user-id: '#(token.userId)', Authorization : '#("Bearer " + token.authToken)',x-product-id: 'YUBIFIN'}
    When method get
    And request {}
    Then status 200
    * def usersSchema = {"name":'#string',"mobileNumber": '#string',"email": '#string',"kycStatus": '#string',"userCategory": '#string',"wishListItemIds": '#[] #object',"blocked": '#boolean',"blockedReason": null ,"referralCode": '#string',"investNowEnabled": '#boolean'}

    And match response ==
      """
      '##(usersSchema)'
      """





