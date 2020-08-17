const fs = require('fs');
const https = require('https');
const _ = require('lodash')
const api = fs.readFileSync('./api.txt', {encoding: 'utf8'})

const actor_id = 455207


let actors = fs.readFileSync('./cra_cast.json', {encoding:'utf8'})
actors = JSON.parse(actors)
//iterate through every actor/ress in cra_cast.json
// for each of them get their bio and movie credits. 

function getActorInfo(actor){
  console.log(actor)
  const url = `https://api.themoviedb.org/3/person/${actor_id}?api_key=${api}&language=en-US&append_to_response=movie_credit`
  https.get(url, (res) => {
    let data = ''
    res.on('data', d => data += d)
    res.on('end', () => {
      console.log (data)
    })
  })
   
}

getActorInfo(actors[0])