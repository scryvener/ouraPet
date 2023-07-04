

export const handler = async (event,data) => {
    
    //const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

    //pull in api key
    //for testing is pulled from personal access, need to implement Oauth
    const apiKey=process.env.OURA_PA_KEY

    async function apiCall(path){
        try {
            const response = await fetch(path, {
                method: 'GET',
                headers: { 
                    'Authorization': 'Bearer '+apiKey
                }
            });

            if (!response.ok) {
                console.log('Error!')
                throw new Error(response.statusText);
            }
            const jsonData = await response.json();

            return jsonData;

        } catch (error) {
            console.error(error);
        }

    }

    //dates need to become variables
    api_call_path='https://api.ouraring.com/v2/usercollection/daily_readiness'

    var apiResponse= await apiCall(api_call_path)

    return {
        statusCode: 200,
        body: JSON.stringify({message: apiResponse})
    };

}
// exports.handler = async function (event, context) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: "Hello World" }),
//     };
//   };