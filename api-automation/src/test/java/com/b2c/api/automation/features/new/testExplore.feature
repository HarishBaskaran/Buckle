@regression @auth
Feature: UserService - Get Explore Bond Details in Aspero

  Background: Get the variables initialized.
    * def faker = Java.type('utils.Faker')

  Scenario Outline: Test <type> - Get Explore Bond Details of '<phonenumber>' from Aspero

    * json query = '<query>'

    * def mobileNumber = '<phonenumber>' == 'new' ? faker.getPhoneNumber() : '<phonenumber>'
    * if ('<phonenumber>' == 'new') karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@functionality' , { mobileNumber: mobileNumber, expectedStatus: 200 } )
    * def otp = karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@functionality' , { mobileNumber:mobileNumber, otp:9999, expectedStatus:200 } )
    * karate.call('classpath:com/b2c/api/automation/functional/bffService/_17_bondListingController/bondListing.feature@functionality' , { query:query, otp:otp, expectedStatus:200} )

    Examples:
      | phonenumber | query                                                                                                           | type     | status |
      | 9498020001  | karate.read('classpath:com/b2c/api/automation/data/bffService/_17_bondListingController/query/basic.json')      | Positive | 200    |
      | 9498020001  | karate.read('classpath:com/b2c/api/automation/data/bffService/_17_bondListingController/query/newlyAdded.json') | Positive | 200    |

  Scenario Outline: Test <type> - Get Explore Bond Filters of '<phonenumber>' from Aspero

    * def mobileNumber = '<phonenumber>' == 'new' ? faker.getPhoneNumber() : '<phonenumber>'
    * if ('<phonenumber>' == 'new') karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@functionality' , { mobileNumber: mobileNumber, expectedStatus: 200 } )
    * def otp = karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@functionality' , { mobileNumber:mobileNumber, otp:9999, expectedStatus:200 } )
    * karate.call('classpath:com/b2c/api/automation/functional/bffService/_17_bondListingController/bondListingFilters.feature@functionality' , { otp:otp, expectedStatus:200} )

    Examples:
      | phonenumber | type     | status |
      | 9498020001  | Positive | 200    |

