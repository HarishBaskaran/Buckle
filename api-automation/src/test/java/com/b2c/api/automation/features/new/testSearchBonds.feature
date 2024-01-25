@regression @auth
Feature: UserService - Get User Details in Aspero

  Background: Get the variables initialized.
    * def faker = Java.type('utils.Faker')

  Scenario Outline: Test <type> - Get User Details of '<phonenumber>' from Aspero

    * def mobileNumber = '<phonenumber>' == 'new' ? faker.getPhoneNumber() : '<phonenumber>'
    * if ('<phonenumber>' == 'new') karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@functionality' , { mobileNumber: mobileNumber, expectedStatus: 200 } )
    * def otp = karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@functionality' , { mobileNumber:mobileNumber, otp:9999, expectedStatus:200 } )
    * karate.call('classpath:com/b2c/api/automation/functional/bffService/_7_searchController/searchBonds.feature@functionality' , { otp:otp, query:'<query>' ,expectedStatus: <status>} )

    Examples:
      | phonenumber | query |type     | status |
      | 9498020001  | gold  |Positive | 200    |