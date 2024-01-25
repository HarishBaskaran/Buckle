Feature: stateful mock server

  Background:
    * def debugFlag = false

  Scenario: pathMatches('/{platformName}/users/validate') && methodIs('post') && typeContains('json')
    * print '--validate user--'

    * print requestHeaders
    * print request

    * def content = read ('classpath:mocks/data/authService/validateUserResponse.json')
    * set content.mobileNumberExists = request.mobileNumber == '9876543211' || request.mobileNumber =='9876543221' || request.mobileNumber =='9876543231' ? true : false
    * set content.existingCustomer = request.mobileNumber == '9876543211' || request.mobileNumber =='9876543221' || request.mobileNumber =='9876543231' ? true : false
    * set content.blocked = request.mobileNumber == '9876543212' ? true : false
    * set content.blockedReason = request.mobileNumber == '9876543212' ? "Testing Blocked" : "Not Blocked"

    * def statusContent = 200
    * if(request.mobileNumber == '9876543213') statusContent = 400
    * if(request.mobileNumber == '9876543214') statusContent = 503

    * def response = content
    * def responseStatus = statusContent

#    * print request, responseStatus, response


  Scenario: pathMatches('/passwordless/start') && methodIs('post') && typeContains('json')
    * print '--sign in user--'

    * def content = read ('classpath:mocks/data/authService/signUpResponse.json')
    * set content.id = 0
    * set content.phoneNumber = request.phone_number
    * set content.phoneVerified = true

    * def statusContent = 200
    * if(request.phone_number == '+919876543215') statusContent = 400
    * if(request.phone_number == '+919876543216') statusContent = 503

    * def response = content
    * def responseStatus = statusContent

#    * print request, responseStatus, response

  Scenario: pathMatches('/oauth/token') && methodIs('post') && typeContains('json')
    * print '--otp verification--'
    * def content = read ('classpath:mocks/data/authService/otpVerificationResponse.json')

    * def response = content
    * def responseStatus = 200

    * print request, responseStatus, response

  Scenario: pathMatches('/userinfo') && methodIs('get')
    * print '--get userInfo--'

    * def response = {"id":10}
    * def responseStatus = 200

#    * print request, responseStatus, response

  Scenario: pathMatches('/api/v2/users/{user_id}') && methodIs('patch')
    * print '--update userInfo with id--'
    * def content = read ('classpath:mocks/data/authService/updateUserInfoResponse.json')

    * def response = content
    * def responseStatus = 200

#    * print request, responseStatus, response

  Scenario: pathMatches('/api/v2/users') && methodIs('patch')
    * print '--update userInfo--'
    * def content = read ('classpath:mocks/data/authService/updateUserInfoResponse.json')

    * def response = content
    * def responseStatus = 200

#    * print request, responseStatus, response

#    * def responseDelay = 850


