@Conf
Feature: KYC validations for PAN
  Background: Create an initialise base URL
    * def mobileNumber = '9538910942'
    * def token = call read('getToken.feature') {"mobileNumber": '#(mobileNumber)',"platformName": "YUBIFIN","onBoardingConfirmation": false}
    Given url 'https://retail-qa-api.myyubiinvest.in'
    And print "user-id : " + '#(token.userId)'
    And print "Authorization :  " +'#("Bearer " + token.authToken)'


  Scenario: To add name and email details for the user
    Given path '/auth/api/v1/update-email-status'
#    * def body = read("/Data/nameEmail.json")
#    And request body
    And params {email : 'teststs@yopmail.com',name : 'Simran Bhatti',user-id : '#(token.userId)'}
    And headers {Content-Type: 'application/json' ,Device-Id : 'test', x-user-id : '#(token.userId)',  yubi-user-id: '#(token.userId)', Authorization : '#("Bearer " + token.authToken)'}
#    And print headers
    When method get
    Then status 200


  Scenario: Upload KYC PAN for a user
    Given path '/kyc/api/v1/flow/kyc/YUBIFIN/documents'
    #location of the file, name of the file, content-header value
    And multipart file document = {read:'../KYC/PANUpload/PAN.pdf',filename: 'PAN.pdf',  Content-Type : 'multipart/form-data' }
    And multipart field category = 'ID'
    And headers {Device-Id : 'test', x-user-id : '#(token.userId)',  yubi-user-id: '#(token.userId)', Authorization : '#("Bearer " + token.authToken)',x-product-id: 'YUBIFIN'}
    When method post
    Then status 200
    And print response
    * def documentId = response.documentId
    * def fileExtension = response.fileExtension

  Scenario:Save PAN for the user
    Given path '/kyc/api/v1/flow/kyc/YUBIFIN/items'
    And headers {Content-Type: 'application/json' ,Device-Id : 'test', x-user-id : '#(token.userId)',  yubi-user-id: '#(token.userId)', Authorization : '#("Bearer " + token.authToken)',x-product-id: 'YUBIFIN'}
    * def body = read("/Data/saveItems.json")
    And request body
    When method post
    Then status 200
    And print response
    * def id_b2c = response.items[0].id
