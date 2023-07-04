

export const handler = async (event,data) => {
    
    
    //pull in api key
    //const apiKey=process.env.OpenAIKey

    console.log("Hello there, how are you")
    
    return {
        statusCode: 200,
        body: JSON.stringify({message: "Hello World"})
    };
};


// exports.handler = async function (event, context) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: "Hello World" }),
//     };
//   };