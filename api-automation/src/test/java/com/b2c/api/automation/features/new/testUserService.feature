@regression @auth
Feature: UserService - Get User Details in Aspero

  Background: Get the variables initialized.
    * def faker = Java.type('utils.Faker')

  Scenario Outline: Test <type> - Get User Details of '<phonenumber>' from Aspero

    * def mobileNumber = '<phonenumber>' == 'new' ? faker.getPhoneNumber() : '<phonenumber>'
    * if ('<phonenumber>' == 'new') karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@functionality' , { mobileNumber: mobileNumber, expectedStatus: 200 } )
    * def otp = karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@functionality' , { mobileNumber:mobileNumber, otp:9999, expectedStatus:200 } )
    * karate.call('classpath:com/b2c/api/automation/functional/userService/userDetails.feature@functionality' , { mobileNumber:mobileNumber, otp:otp, expectedStatus:200} )

    Examples:
      | phonenumber | type     | status |
      | 9498020001  | Positive | 200    |
#      | 9334202293  | Positive | 200    |
#      | 9110586831  | Positive | 200    |
#      | 9454446484  | Positive | 200    |
#      | 9576554777  | Positive | 200    |
#      | 9090909090  | Positive | 200    |
#      | 6060606062  | Positive | 200    |

#    Examples:
#      | mobile       | name              | email                        | kycStatus    | userCategory                  | wishListItemIds | blocked | blockedReason | referralCode | investNowEnabled |
#      | "9334202293" | "Simran Bhatti"   | "bhattisimran12@gmail.com"   | "COMPLETE"   | "KYC_DONE_INVESTMENT_PENDING" | []              | false   | null          | "ABABAB"     | true             |
#      | "9110586831" | "V Saideep Reddy" | "test156@yopmail.com"        | "COMPLETE"   | "INVESTED"                    | []              | false   | null          | "ABABAB"     | true             |
#      | "9454446484" | null              | "automationuser@yopmail.com" | "INCOMPLETE" | "KYC_PENDING"                 | []              | false   | null          | "ABABAB"     | true             |
#      | "9576554777" | null              | null                         | "INCOMPLETE" | "KYC_NOT_STARTED"             | []              | false   | null          | "ABABAB"     | true             |
#      | "9090909090" | "Simran Bhatti"   | "randomnumber@yopmail.com"   | "FAILED"     | "KYC_FAILED"                  | []              | false   | null          | "ABABAB"     | true             |
#      | "6060606062" | "Anitha K N"      | "simran.bhatti@go-yubi.com"  | "IN_REVIEW"  | "KYC_PENDING_IN_REVIEW"       | []              | false   | null          | "ABABAB"     | true             |
