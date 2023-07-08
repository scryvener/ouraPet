
//handles call to serverside function

const frontQuery = async (data) =>{

    try {
        const response = await fetch('/.netlify/functions/DB_Query', {
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

    target_user_id=1//will need to modify user_id based on who is logged in.

    let data={
        'user_id':target_user_id,
        'filler':1
    }

    const dbResponse= await frontQuery(data)

    var mostRecentStats=dbResponse[0]

    console.log(mostRecentStats.activity)

    document.getElementById('petGif').src="./Assets/lv3_normal.gif"

}