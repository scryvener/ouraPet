

export const handler = async (event,data) => {

    //pull in api key
    //for testing is pulled from personal access, need to implement Oauth, likely getting passed in by backend function call?
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

    var inputData=JSON.parse(event.body)

    var user_id=inputData.user_id//only for db update, needs to be passed into api call as well.
    var start_Date=inputData.start_date
    var end_Date=inputData.end_date

    if (start_Date!=null && end_Date!=null){
        var call_paths=[
            'https://api.ouraring.com/v2/usercollection/daily_readiness?start_date='+start_Date+'&end_date='+end_Date,
            'https://api.ouraring.com/v2/usercollection/daily_activity?start_date='+start_Date+'&end_date='+end_Date,
            'https://api.ouraring.com/v2/usercollection/daily_sleep?start_date='+start_Date+'&end_date='+end_Date
        ]
    }else{
        var call_paths=[
            'https://api.ouraring.com/v2/usercollection/daily_readiness',
            'https://api.ouraring.com/v2/usercollection/daily_activity',
            'https://api.ouraring.com/v2/usercollection/daily_sleep'
        ]
    }

    var apiResponse=[]//storing for debug purposes/if we want more detailed calculation later
    var scores=[]
    for (var i=0;i<3;i++){
        apiResponse[i]=await apiCall(call_paths[i])

        scores[i]=apiResponse[i].data[0].score
        
    }

    //arrange data, in the future also where we call the algo to see how much exp to update?

    


    return {
        statusCode: 200,
        body: JSON.stringify(scores)
    };

}
// exports.handler = async function (event, context) {
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: "Hello World" }),
//     };
//   };