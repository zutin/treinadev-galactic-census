async function getPlanets(){
  let req = await fetch('https://swapi.dev/api/planets/');
  let planets = await req.json();

  planets.results.forEach(planet => {
    console.log(planet);
  })
}

getPlanets();