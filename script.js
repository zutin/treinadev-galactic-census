async function getPlanets(){
  let req = await fetch('https://swapi.dev/api/planets/');
  let {results} = await req.json();

  results.forEach(planet => {
    createButton(planet);
  })
}

function createButton(planet){
  let planetList = document.getElementById('planet-list');

  let button = document.createElement('button');
  button.innerHTML = planet.name;
  button.onclick = () => fillPlanetInfo(planet);

  planetList.appendChild(button);
}

function fillPlanetInfo(planet){
  let name = document.getElementById('planet-name');
  let climate = document.getElementById('climate');
  let population = document.getElementById('population');
  let terrain = document.getElementById('terrain');

  name.innerHTML = planet.name;
  climate.innerHTML = planet.climate;
  population.innerHTML = planet.population;
  terrain.innerHTML = planet.terrain;

  fillFamousHabitants(planet);
}

function searchPlanet(){
  let input = document.getElementById('search-input').value;

  let req = fetch(`https://swapi.dev/api/planets/?search=${input}`);

  req.then(res => res.json())
    .then(data => {
      let planet = data.results[0];

      if (!planet) return alert(`Planet "${input}" not found. Did you spell it correctly?`);

      fillPlanetInfo(planet);
    })
    .catch(err => console.log(err));
}

function fillFamousHabitants(planet){
  let residents = planet.residents;
  let famousHabitantsList = document.getElementById('famous-habitants-list');

  famousHabitantsList.innerHTML = '';

  residents.forEach(resident => {
    let req = fetch(`${resident}`);

    req.then(res => res.json())
      .then(data => {
        let tr = document.createElement('tr');
        
        tr.innerHTML = `
          <td>${data.name}</td>
          <td>${data.gender}</td>
          <td>${data.birth_year}</td>
          `

        famousHabitantsList.appendChild(tr);
      })
      .catch(err => console.log(err));
  });
}

getPlanets();