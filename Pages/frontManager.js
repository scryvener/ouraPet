
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

    //prob can be a function to do the updating so we aren't repeating so many lines.
    if (activityScore<=30 || sleepScore<=30 || readinessScore<=30){
        document.getElementById('petGif').src="./Assets/lv"+String(lvl)+"_sad.gif"
        document.getElementById('petStatus').innerHTML='Your pet is Sad!'

    } else if (activityScore>=70 && sleepScore>70 && readinessScore>70){
        document.getElementById('petGif').src="./Assets/lv"+String(lvl)+"_content.gif"
        document.getElementById('petStatus').innerHTML='Your pet is Happy!'
    }
    else{
        document.getElementById('petGif').src="./Assets/lv"+String(lvl)+"_normal.gif"
        document.getElementById('petStatus').innerHTML='Your pet feels normal.'

    }

    //remove this later, for trolling

    document.getElementById('petRace').innerHTML='Winged Serpent'

}

async function updateDB(){

    var id=1 //filler for now, eventually should be passing the user's access token?

    //rather than a timer, this could just be done on load/login?
    //that way don't need something constantly running in the background
    //also will need someway to lock the update, that way you can't keep refreshing to get more exp. can be a simple check the timestamp, subtract off current time, and proceed only if time delta is more than X amount
    //if we are tracking history(upload new row everytime somebody updates), then would be pull all from this persons user id, sort by most recent date, then calculate time difference.


    //we can actually run the time check here

    let checkdata={
        'user_id':id,
        'filler':1
    }

    const dbResponse= await frontQuery('/.netlify/functions/DB_Query',checkdata)

    var mostRecentStats=dbResponse[0]

    let last_updated=Date.parse(mostRecentStats.created_at)
    let timeNow=Date.now()

    let timeDiff=(timeNow-last_updated)/86400000

    //only if there is more than a day of time diff do we call the api and update the db.
    if (timeDiff>1) {
        //if date used, must be in YYYY-MM-DD format, ie 2023-06-01
        let data={
            'user_id':id,
            'start_date': null, //eventually need this? not sure, since should just be accessing the most recent data for the day
            'end_date':null
        }

        const apiResponse=await frontQuery('/.netlify/functions/Oura_API_Call',data)

        let insertData={
            'user_id':id,
            'readiness':apiResponse[0],
            'activity':apiResponse[1],
            'sleep':apiResponse[2],
        }

        const dbUpdate=await frontQuery('/.netlify/functions/DB_Update',insertData)



    }


    //DB insertion should be handled on the backend.???

}