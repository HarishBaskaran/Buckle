@List
Feature: Validate Json schema of the listing API
Background: Create and initialise base URL
    * def isValidISIN = function(isin) { return isin.matches('[A-Z]{2}[0-9A-Z]{9}[0-9]'); }
    * def mobileNumber = '8690900557'
    * def token = call read('getToken.feature') {"mobileNumber": '#(mobileNumber)',"platformName": "YUBIFIN","onBoardingConfirmation": false}
    Given url _url_b2c
    Scenario: Listing of bonds
    * def b2c_path = listing_b2c_path
    Given path b2c_path
      And params {page : 1,items : 100}
      And headers {Content-Type: 'application/json' ,Device-Id : 'test', x-user-id : '#(token.userId)',  yubi-user-id: '#(token.userId)', Authorization : '#("Bearer " + token.authToken)',x-product-id: 'YUBIFIN'}
      When method get
      And request {}
#      And print response
      Then status 200
      *   def itemsSchema = {#[] {"id": { "type": "integer" },"isin": { "type": "string" },"name": { "type": "string" },"tag": { "type": "string" },"total_interest_cashflows": { "type": "number" },"coupon_rate": { "type": "number" },"min_investment": { "type": "number" },"min_investment_per_unit": { "type": "number" },"min_units_to_sell": { "type": "integer" },"units_to_sell": { "type": "integer" },"credit_rating_agency": { "type": "string" },"listed_yield": { "type": "number" },"maturity_date": { "type": "string" },"credit_rating": { "type": "string" },"sector": { "type": "string" },"interest_payment_frequency": { "type": "string" },"face_value": { "type": "number" }}
#      *   def itemsSchema = {#[] {"id":'#integer',"isin": '#string',"name": '#string',"tag": '#string',"total_interest_cashflows": '#number',"coupon_rate": '#number',"min_investment": '#number',"min_investment_per_unit": '#number',"min_units_to_sell": '#integer',"units_to_sell": '#integer',"credit_rating_agency": '#string',"listed_yield": '#number',"maturity_date": '#string',"credit_rating": '#string',"sector": '#string',"interest_payment_frequency": '#string',"face_value": '#number'}
      * def listingSchema = {"items" : '#[] #object',   "totalCount": '#number'}
      And match response ==
      """
      '##(listingSchema)'
      """
