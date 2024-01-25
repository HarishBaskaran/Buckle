@Bond
Feature: To test the bond details in B2C
  Background: Create and initialise base URL
    * def isValidISIN = function(isin) { return isin.matches('[A-Z]{2}[0-9A-Z]{9}[0-9]'); }
    * def mobileNumber = '9334202293'
    * def token = call read('getToken.feature') {"mobileNumber": '#(mobileNumber)',"platformName": "YUBIFIN","onBoardingConfirmation": false}
    Given url _url_b2c

  Scenario: Bond details
    * def b2c_path = bond_details_path
    Given path b2c_path
    And params {page : 1,items : 100}
    And headers {Content-Type: 'application/json' ,Device-Id : 'test', x-user-id : '#(token.userId)',  yubi-user-id: '#(token.userId)', Authorization : '#("Bearer " + token.authToken)',x-product-id: 'YUBIFIN'}
#    * def listing_response = karate.log(response)
    When method get
    And request {}
    Then status 200
    * def listing_id = response.id
    Then assert listing_id > 0
    * def b2c_isin = response.isin
    Then assert isValidISIN(b2c_isin)
   * def b2c_name = response.name
    And match b2c_name != null
    And match b2c_name == '#string'
    * def b2c_category = response.category
    And match b2c_category != null
    And match b2c_category == '#string'
    * def b2c_tag = response.tag
    And match b2c_tag != null
    * def depository = response.demat.depository
    And match depository != null
    And match depository == '#string'
    * def document_number = response.demat.document_number
    And match document_number != null
    And match document_number == '#string'
    * def broker_name = response.demat.broker_name
    And match broker_name != null
    And match broker_name == '#string'
    * def listed_yield = response.listed_yield
    Then assert listed_yield > 0
    * def units_to_sell = response.units_to_sell
    Then assert units_to_sell > 0
    * def units_to_sell = response.units_to_sell
    And match units_to_sell == '#number'
  * def maturity_date = response.maturity_date
  #################
    * def min_units_to_sell = response.min_units_to_sell
    And match min_units_to_sell == '#number'
    Then assert min_units_to_sell > 0
    * def credit_rating_agency = response.credit_rating_agency
    And match credit_rating_agency == '#string'
    And match credit_rating_agency != null
    * def credit_rating = response.credit_rating
    And match credit_rating == '#string'
    And match credit_rating != null
    * def interest_payment_frequency = response.interest_payment_frequency
    And match interest_payment_frequency == '#string'
    And match interest_payment_frequency != null
    * def total_interest_cashflows = response.total_interest_cashflows
    And match total_interest_cashflows == '#number'
    Then assert total_interest_cashflows > 0
    * def min_investment = response.min_investment
    And match min_investment == '#number'
    Then assert min_investment > 0
    * def min_investment_per_unit = response.min_investment_per_unit
    And match min_investment_per_unit == '#number'
    Then assert min_investment_per_unit > 0
   * def quality_detail = response.quality_detail
    And match quality_detail == '#array'
    And match quality_detail != null
    * def rating_detail = response.rating_detail
    And match rating_detail == '#array'
    And match rating_detail != null
    * def rating_detail_key = response.rating_detail[0].key
    And match rating_detail_key == '#string'
    And match rating_detail_key != null
    * def rating_detail_value = response.rating_detail[0].value
    And match rating_detail_value == '#string'
    And match rating_detail_value != null
    * def rating_detail_credit_rating = response.rating_detail[0].credit_rating
    And match rating_detail_credit_rating == '#string'
    And match rating_detail_credit_rating != null
    * def rating_detail_credit_rating_agency = response.rating_detail[0].credit_rating_agency
    And match rating_detail_credit_rating_agency == '#string'
    And match rating_detail_credit_rating_agency != null
    * def im_link = response.im_link
    And match im_link == '#string'
    And match im_link != null
    * def fundamental_detail = response.fundamental_detail
    And match fundamental_detail == '#array'
    And match fundamental_detail != null
    * def current_yield = response.current_yield
    And match current_yield == '#string'
    And match current_yield != null
    * def expected_trade_date = response.expected_trade_date
    And match expected_trade_date == '#string'
    And match expected_trade_date != null
    * def face_value = response.face_value
    And match face_value == '#string'
    And match face_value != null
   Then assert face_value > 0
    * def clean_price = response.clean_price
    And match clean_price == '#string'
    And match clean_price != null
    Then assert clean_price > 0
    * def dirty_price = response.dirty_price
    And match dirty_price == '#string'
    And match dirty_price != null
    Then assert dirty_price > 0





