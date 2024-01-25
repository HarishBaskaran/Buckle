@regression @auth @mock-auth
Feature: AuthService - SignUp/Login/OTP/Logout of User in Aspero

#  Background: Get the variables initialized.
#    * callonce startMockServer
#    * def b2cUrl = karate.properties['_url_b2c']
#    * def b2b2cUrl = karate.properties['_url_b2b2c']
#    * print b2cUrl, b2b2cUrl

  Scenario Outline: Test - SignUp to Aspero - <Test Case Description> - <type>

    * karate.call('classpath:com/b2c/api/automation/functional/authService/signUp.feature@functionality' , { mobileNumber: '<mobileNumber>', expectedStatus: <status> } )

    Examples:
      | Test Case Description                 | mobileNumber | type     | status |
      | new User                              | 9876543210   | Positive | 200    |
      | Existing User                         | 9876543211   | Negative | 409    |
      | blocked User                          | 9876543212   | Negative | 403    |
      | ValidateUser call failure 400         | 9876543213   | Negative | 500    |
      | ValidateUser call failure 503         | 9876543214   | Negative | 500    |
      | SignIn call failure 400               | 9876543215   | Negative | 500    |
      | SignIn call failure 503               | 9876543216   | Negative | 500    |
  # Field level testing
      | Mobile number has alphabets           | abcdefghij   | Negative | 400    |
      | Mobile number has alphanumerics       | abcde12345   | Negative | 400    |
      | Mobile number less than 10 characters | 998849854    | Negative | 400    |
      | Mobile number more than 10 characters | 99884985467  | Negative | 400    |

  Scenario Outline: Test - Login to Aspero - <Test Case Description> - <type>

    * karate.call('classpath:com/b2c/api/automation/functional/authService/login.feature@functionality' , { mobileNumber: mobileNumber, expectedStatus: <status> } )

    Examples:
      | Test Case Description                 | mobileNumber | type     | status |
      | Existing User                         | 9876543211   | Positive | 200    |
      | new User                              | 9876543210   | Negative | 404    |
      | blocked User                          | 9876543212   | Negative | 403    |
      | ValidateUser call failure 400         | 9876543213   | Negative | 500    |
      | ValidateUser call failure 503         | 9876543214   | Negative | 500    |
      | SignIn call failure 400               | 9876543221   | Negative | 500    |
      | SignIn call failure 503               | 9876543231   | Negative | 500    |
  # Field level testing
      | Mobile number has alphabets           | abcdefghij   | Negative | 400    |
      | Mobile number has alphanumerics       | abcde12345   | Negative | 400    |
      | Mobile number less than 10 characters | 998849854    | Negative | 400    |
      | Mobile number more than 10 characters | 99884985467  | Negative | 400    |

  Scenario Outline: Test <type> - '<phonenumber>' <user> & OTP to Aspero

    * karate.call('classpath:com/b2c/api/automation/functional/authService/otp.feature@functionality' ,{ mobileNumber: mobileNumber, otp: <otp>, expectedStatus: <status> } )

    Examples:
      | mobileNumber | type     | otp   | user   | status |
#      | 9498020566  | Negative | 123   | login  | 403    |
      | 9876543211  | Negative | 1234  | login  | 403    |
#      | 9498020566  | Negative | 12345 | login  | 403    |
#      | 9498020566  | Negative | adcd  | login  | 403    |
#      | 9498020566  | Negative | ab12  | login  | 403    |

