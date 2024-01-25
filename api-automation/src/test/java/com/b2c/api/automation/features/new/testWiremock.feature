@ignore
Feature: Cleanup - Resolve Wiremock in Aspero

    Scenario: Test Wiremock
      * def wiremock = Java.type('utils.WiremockServer')
      * wiremock.startServer()

      Given url 'http://localhost:8097'
      Then path '/users/get'
      When method get

      * karate.log('Request Details:',  karate.request)
      * karate.log('Response Details:',  karate.response)

      * wiremock.stopServer()
