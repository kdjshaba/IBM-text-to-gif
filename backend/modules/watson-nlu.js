const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

//Authorization for IBM NLU
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2022-04-07',
  authenticator: new IamAuthenticator({
    apikey: process.env.NLU_API_KEY,
  }),
  serviceUrl: process.env.NLU_URL,
});

//Analyzing inputted string with IBM NLU to find the best category for that string
async function textCategory(text){

  const analyzeParams = {
    'text': text,
    'language': "en",
    'features': {
      'categories': {
        'limit': 1
      }
    }
  };

  //Analyze string and return category or error
  const response = await naturalLanguageUnderstanding.analyze(analyzeParams);
  const categories = response.result.categories[0].label;

  //If there is more than one category, it will split them into array and leave only one
  const categoriesArray =  categories.split('/');
  const category = categoriesArray.find(element => {return element !== ''})

  return(category)
};

// Checking error message and returning more user-friendly error message
function checkErr(err){
  if(err.message == "Cannot read properties of undefined (reading 'label')"){
    err.message = "Invalid text, try to input word or text in English"
  }
  return(err)
}

module.exports = { textCategory, checkErr }