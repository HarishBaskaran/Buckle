@regression @auth
Feature: UserService - Get Explore Bond Details in Aspero

  Background: Get the variables initialized.
    * def faker = Java.type('utils.Faker')

  Scenario Outline: Test <type> - Get Individual Bond Detail from Aspero

    * def mobileNumber = '<phonenumber>' == 'new' ? faker.getPhoneNumber() : '<phonenumber>'
    * if ('<phonenumber>' == 'new') karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@functionality' , { mobileNumber: mobileNumber, expectedStatus: 200 } )
    * def otp = karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@functionality' , { mobileNumber:mobileNumber, otp:9999, expectedStatus:200 } )
    * karate.call('classpath:com/b2c/api/automation/functional/bffService/_4_1_listingController/bondDetail.feature@functionality' , { otp:otp, expectedStatus:200} )

    Examples:
      | phonenumber | type     | status |
      | 9498020001  | Positive | 200    |

  Scenario Outline: Test <type> - Get Individual Bond Detail Pdf from Aspero

    * def mobileNumber = '<phonenumber>' == 'new' ? faker.getPhoneNumber() : '<phonenumber>'
    * if ('<phonenumber>' == 'new') karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@functionality' , { mobileNumber: mobileNumber, expectedStatus: 200 } )
    * def otp = karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@functionality' , { mobileNumber:mobileNumber, otp:9999, expectedStatus:200 } )
    * karate.call('classpath:com/b2c/api/automation/functional/bffService/_16_bondPdfController/bondPdf.feature@functionality' , { otp:otp, expectedStatus:200} )

    Examples:
      | phonenumber | type     | status |
      | 9498020001  | Positive | 200    |