async function getPlanets(){
  let req = await fetch('https://swapi.dev/api/planets/');
  let planets = await req.json();

  planets.results.forEach(planet => {
    createButton(planet);
  })
}

function createButton(planet){
  let button = document.createElement('button');
  button.innerHTML = planet.name;

  document.body.appendChild(button);
}

getPlanets();