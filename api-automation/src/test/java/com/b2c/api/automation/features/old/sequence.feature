Feature: Sequence for execution

  Scenario: Run all of the tests in order

    * call read('KYC_PersonalDetails.feature')
    * call read('KYC_PAN.feature')
#    * call read('third.feature')