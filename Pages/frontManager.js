
//handles call to serverside function

const frontQuery = async (path,data) =>{

    try {
        const response = await fetch(path, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.error(error);
      }

}


//pull data from the database and update gif source(eventually the animation/sprite loop) based off of stats.
async function updateGifSource(){

    var target_user_id=1//will need to modify user_id based on who is logged in.

    let data={
        'user_id':target_user_id,
        'filler':1
    }

    const dbResponse= await frontQuery('/.netlify/functions/DB_Query',data)

    var mostRecentStats=dbResponse[0]

    let activityScore=mostRecentStats.activity
    let sleepScore=mostRecentStats.sleep
    let readinessScore=mostRecentStats.readiness

    let lvl=mostRecentStats.pet_lvl

    if (activityScore<=30 || sleepScore<=30 || readinessScore<=30){
        document.getElementById('petGif').src="./Assets/lv"+String(lvl)+"_sad.gif"
    } else if (activityScore>=70 || sleepScore<70 || readinessScore<70){
        document.getElementById('petGif').src="./Assets/lv"+String(lvl)+"_content.gif"}
    else{
        document.getElementById('petGif').src="./Assets/lv"+String(lvl)+"_normal.gif"
        }


}

async function updateDB(){

    //if date used, must be in YYYY-MM-DD format, ie 2023-06-01
    let data={
        'user_id':1,//filler for now, eventually should be passing the user's access token?
        'start_date': null, //eventually need this? not sure, since should just be accessing the most recent data for the day
        'end_date':null
    }

    const apiResponse=await frontQuery('/.netlify/functions/Oura_API_Call',data)
    //DB insertion should be handled on the backend.

}