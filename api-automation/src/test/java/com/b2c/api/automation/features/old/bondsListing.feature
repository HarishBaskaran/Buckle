
@List
  @Aggregator
Feature: To test the bonds listing on B2C
  Background: Create and initialise base URL
    * def isValidISIN = function(isin) { return isin.matches('[A-Z]{2}[0-9A-Z]{9}[0-9]'); }
    * def mobileNumber = '6060606060'
    * def token = call read('getToken.feature') {"mobileNumber": '#(mobileNumber)',"platformName": "YUBIFIN","onBoardingConfirmation": false}
#    * def currentDate = java.util.Calendar.getInstance().getTime()
#    * def futureDate = java.util.Calendar.getInstance()
#    * futureDate.add(java.util.Calendar.DAY_OF_MONTH, 30)
#    * def thirtyDaysFromNow = futureDate.getTime()
#    And print thirtyDaysFromNow
#    * def SimpleDateFormat = Java.type('java.text.SimpleDateFormat')
#    * def formattedDate = new SimpleDateFormat('yyyy-MM-dd').format(new SimpleDateFormat('EEE MMM dd HH:mm:ss z yyyy').parse(thirtyDaysFromNow))
#    * def parsedDate = karate.toDate(thirtyDaysFromNow, 'yyyy-MM-dd')
#    * def formattedDate = karate.formatDate(parsedDate, 'yyyy-MM-dd')

    Given url _url_b2c

  Scenario: Listing of bonds
    * def b2c_path = listing_b2c_path
    Given path b2c_path

    And params {page : 1,items : 100}
    And headers {Content-Type: 'application/json' ,Device-Id : 'test', x-user-id : '#(token.userId)',  yubi-user-id: '#(token.userId)', Authorization : '#("Bearer " + token.authToken)',x-product-id: 'YUBIFIN'}
#    * def listing_response = karate.log(response)
    When method get
    And request {}
    Then status 200
   * def count_b2c = response.totalCount
    Then assert count_b2c > 0
    * def b2c_id = response.items[0].id
    Then assert b2c_id > 0
    * def b2c_isin = response.items[0].isin
    Then assert isValidISIN(b2c_isin)
    * def b2c_name = response.items[0].name
    And match b2c_name != null
    And match b2c_name == '#string'

    * def b2c_tag = response.items[0].tag
#    And match b2c_tag containsAny ["MLD", "NCD"]
    * def b2c_total_interest_cashflows = response.items[0].total_interest_cashflows
    Then assert b2c_total_interest_cashflows > 0
    * def b2c_coupon_rate = response.items[0].coupon_rate
    Then assert b2c_coupon_rate > 0
    * def b2c_min_investment = response.items[0].min_investment
    Then assert b2c_min_investment > 0
    * def b2c_min_investment_per_unit = response.items[0].min_investment_per_unit
    Then assert b2c_min_investment_per_unit > 0
    * def b2c_min_units_to_sell = response.items[0].min_units_to_sell
    Then assert b2c_min_units_to_sell > 0
    * def b2c_units_to_sell = response.items[0].units_to_sell
    Then assert b2c_units_to_sell >b2c_min_units_to_sell
#    * def b2c_credit_rating_agency = response.items[0].credit_rating_agency
#    And match b2c_credit_rating_agency containsAny ["CARE", "ICRA", "CRISIL"]
    * def b2c_listed_yield = response.items[0].listed_yield
    Then assert b2c_listed_yield > 0
    * def b2c_maturity_date = response.items[0].maturity_date
#    And print b2c_maturity_date
#    And print thirtyDaysFromNow
#   And assert b2c_maturity_date >= formattedDate
    * def b2c_credit_rating = response.items[0].credit_rating
   And match b2c_credit_rating != null
    * def b2c_sector = response.items[0].sector
    And match b2c_sector != null
    * def expectedValues = ["Finance", "Utilities", "Consumer Services", "Energy", "Industrial", "Others"]
    * def containsAnyValue = false

#    * karate.forEach(expectedValues, function(value) {if (b2c_sector contains value) {containsAnyValue = true;}});

#    * match containsAnyValue == true
    * def b2c_interest_payment_frequency = response.items[0].interest_payment_frequency
    And match b2c_interest_payment_frequency != null
    * def b2c_face_value = response.items[0].face_value
    And match b2c_face_value != null
    Given url _url_b2b2c
    And path '/ims/api/v2/listings'
    And params {category : 'all' ,page : 1 , items : 100}

    And headers {Content-Type: 'application/json' ,x-request-id : '#(token.userId)',  current-user-id: '#(token.userId)', Authorization : '95fca3a27462b019f3cd5ff7dc27622b4d0515c14254fa5bddd1afa5d1ce' ,channel: 'yubifin'}
#    * def listing_response = karate.log(response)
    When method get
    Then status 200
    * def count_b2b2c = response.count;
    And match count_b2c == count_b2b2c

#  Scenario: Newly added listing verification
#    * def b2c_path = listing_b2c_path
#    Given path b2c_path
#    And params {page : 1,items : 100,category : 'latest_added'}
#    And headers {Content-Type: 'application/json' ,Device-Id : 'test', x-user-id : '#(token.userId)',  yubi-user-id: '#(token.userId)', Authorization : '#("Bearer " + token.authToken)',x-product-id: 'YUBIFIN'}
#    When method post
#    And request {}
#    Then status 200
#    * def id_b2c = response.items[0].id
#    * def totalCount = response.totalCount
#    And print "totalCount_b2b2c => " + totalCount
#
#    Given url _url_b2b2c
#    And path listing_b2b2c_path
#    And params {category : 'latest_added',page : 1,items :100 ,trade_date : '2023-06-27' }
#    And headers {Content-Type: 'application/json',x-product-id: 'YUBIFIN', x-request-id : '#(token.userId)',  current-user-id: '#(token.userId)' , Authorization : '95fca3a27462b019f3cd5ff7dc27622b4d0515c14254fa5bddd1afa5d1ce',channel: 'yubifin'}
##    * def listing_response = karate.log(response)
#    When method get
#    Then status 200
#    And print response
#    * def count_b2c = response.count
#    And print "count_b2c => " + count_b2c
#    And match totalCount == count_b2c





