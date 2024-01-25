Feature: Mock Server

  @mock-server
  Scenario: Start Mock Server

    * def startMockServer = Java.type('KarateMockServer')
    * startMockServer.startServer()


#    * def config = { mock: 'classpath:mocks/testAuthMock.feature', port: 9195 }
#    * def startMockServer = () => karate.start(config)
#    * callonce startMockServer