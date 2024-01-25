function fn() {
  var env = karate.env; // get system property 'karate.env'
  karate.log('karate.env system property was:', env);

  if (!env) {
    env = 'mock';
  }

  var config = {
    _url_b2c : 'https://retail-qa-api.myyubiinvest.in',
	_url_b2b2c : 'https://partner-qa-api.myyubiinvest.in',
    myVariable: 'initialValue',
  };

    // Function to update the variable
    function updateVariable(newValue) {
      config.myVariable = newValue;
    }

    // Expose the function to update the variable
    config.updateVariable = updateVariable;


  if(env == 'mock') {
    config._url_b2c = 'http://localhost:8080'
  }

  return config;
}