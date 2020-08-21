const fs = require('fs');
const https = require('https');
const _ = require('lodash')
const api = fs.readFileSync('./api.txt', {encoding: 'utf8'})



let actors = fs.readFileSync('./cra_cast.json', {encoding:'utf8'})
actors = JSON.parse(actors)

//iterate through every actor/ress in cra_cast.json
//for each of them get their bio and movie credits. 

function getActorInfo(actorIndex){
  const actor = actors[actorIndex];
  console.log(actor)
  if (!actor) return

  const url = `https://api.themoviedb.org/3/person/${actor.id}?api_key=${api}&language=en-US&append_to_response=movie_credits`
  https.get(url, (res) => {
    let data = ''
    res.on('data', d => data += d)
    res.on('end', () => {
      
      const {name, id, birthday, deathday, gender, popularity, biography, place_of_birth, movie_credits} = JSON.parse(data);

      //merge actor bio with our original actor info,
      Object.assign(actor, {
        name, id, birthday, deathday, gender, popularity, biography, 
        birthplace: place_of_birth,
        movies: _.map(movie_credits.cast, ({credit_id, id}) => {
          return {id, credit_id}
        })
      }),
      

      // Write actors array to file
      fs.writeFileSync('./cra_cast.json',
      JSON.stringify(actors))
      console.log ('file saved');
      getActorInfo(actorIndex += 1)
    })

  })
   
}

getActorInfo(0)