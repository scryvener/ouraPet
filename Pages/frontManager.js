
//handles call to serverside function

function frontQuery(user_id){

    let data={
        'user_id':user_id
    }

    try {
        const response = fetch('/.netlify/functions/DB_Query', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const jsonData = response.json();
        return jsonData;
      } catch (error) {
        console.error(error);
      }

}


//pull data from the database and update gif source(eventually the animation/sprite loop) based off of stats.
function updateGifSource(){

    target_user_id=1//will need to modify user_id based on who is logged in.

    mostRecentStats=frontQuery(target_user_id)

    console.log(mostRecentStats)

    document.getElementById('petGif').src="./Assets/lv3_normal.gif"

}