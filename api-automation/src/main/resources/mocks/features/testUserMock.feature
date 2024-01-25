Feature: stateful mock server

  Background:
    * def debugFlag = false

  Scenario: pathMatches('/validate') && methodIs('post')
    * print '--validate user in userMock--'

    * def responseStatus = 200

#    * print request, responseStatus, response
