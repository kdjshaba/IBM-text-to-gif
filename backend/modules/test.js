const watson = require('./watson-nlu')

const testuoju = async (text) => {
    const category = await watson.textCategory(text);
    console.log (category)
}

testuoju('I love computers, I am very good at programming')