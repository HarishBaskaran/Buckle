@regression @auth
Feature: AuthService - SignUp/Login/OTP/Logout of User in Aspero

  Background: Get the variables initialized.
    * def faker = Java.type('utils.Faker')
    * string existingNo = '9988498546'

  Scenario Outline: Test <type> - SignUp to Aspero

    * def mobileNumber =  '<phonenumber>' == 'new' ? faker.getPhoneNumber() : '<phonenumber>'
    * karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@functionality' , { mobileNumber: mobileNumber, expectedStatus: <status> } )

    Examples:
      | phonenumber | type     | status |
      | new         | Positive | 200    |
      | 9988498546  | Negative | 409    |
      | abcdefghij  | Negative | 400    |
      | abcde12345  | Negative | 400    |
      | 998849854   | Negative | 400    |
      | 99884985467 | Negative | 400    |


  Scenario Outline: Test <type> - Login to Aspero

    * def mobileNumber =  '<phonenumber>' == 'new' ? faker.getPhoneNumber() : '<phonenumber>'
    * karate.call('classpath:com/b2c/api/automation/functional/authService/login.feature@functionality' , { mobileNumber: mobileNumber, expectedStatus: <status> } )

    Examples:
      | phonenumber | type     | status |
      | 9988498546  | Positive | 200    |
      | new         | Negative | 404    |
      | abcdefghij  | Negative | 400    |
      | abcde12345  | Negative | 400    |
      | 998849854   | Negative | 400    |
      | 99884985467 | Negative | 400    |


  Scenario Outline: Test <type> - '<phonenumber>' <user> & OTP to Aspero

    * def mobileNumber =  '<phonenumber>' == 'new' ? faker.getPhoneNumber() : '<phonenumber>'
    * if('<user>' == 'signup') karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@functionality' , }{ mobileNumber: mobileNumber, expectedStatus:200  )
    * karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@functionality' , { mobileNumber: mobileNumber, otp: <otp>, expectedStatus: <status> } )

    Examples:
      | phonenumber | type     | otp   | user   | status |
      | new         | Negative | 1234  | signup | 403    |
      | 9498020566  | Negative | 123   | login  | 403    |
      | 9498020566  | Negative | 1234  | login  | 403    |
      | 9498020566  | Negative | 12345 | login  | 403    |
      | 9498020566  | Negative | adcd  | login  | 403    |
      | 9498020566  | Negative | ab12  | login  | 403    |

      | new         | Positive | 9999  | signup | 200    |
      | 9498020566  | Positive | 9999  | login  | 200    |
      | new         | Negative | 9999  | login  | 404    |


  Scenario Outline: Test <type> - '<phonenumber>''s Renew Token in Aspero

    * def mobileNumber =  '<phonenumber>' == 'new' ? faker.getPhoneNumber() : '<phonenumber>'
    * if('<user>' == 'signup') karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@functionality' , { mobileNumber: mobileNumber, expectedStatus:200 } )
    * def otp = karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@functionality' , { mobileNumber: mobileNumber, otp: 9999, expectedStatus: 200 } )
    * karate.call('classpath:com/b2c/api/automation/functional/authService/renewToken.feature@functionality' , { otp:otp, expectedStatus: <status> } )

    Examples:
      | phonenumber | type     | otp  | user   | status |
      | new         | Positive | 9999 | signup | 500    |
      | 9498020566  | Positive | 9999 | login  | 500    |


  Scenario Outline: Test <type> - Logout from Aspero

    * def mobileNumber = faker.getPhoneNumber()
    * karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@functionality' , { mobileNumber:mobileNumber, expectedStatus:200} )
    * def otp = karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@functionality' , { mobileNumber:mobileNumber, otp:9999, expectedStatus:200 } )
    * karate.call('classpath:com/b2c/api/automation/functional/authService/logout.feature@functionality' , { mobileNumber:mobileNumber, otp:otp, expectedStatus:200} )

    Examples:
      | phonenumber | type     | status |
      | new         | Positive | 200    |

