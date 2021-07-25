import React, { useState, useEffect } from "react";
//import logo from './logo.svg';
import './App.css';
import { MenuItem, FormControl, Select, CardContent ,Card} from '@material-ui/core';
import InfoBox from "./InfoBox";
import Map from "./Map";
//import MapContainer from "./MapContainer";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
//import LineGraph from "./LineGraph";
function App() {
  //here we directly declare country and setCounty and initially the array is empty[];
  //state=define or write veriable in react;
  //useeffect=runs a particular code
  //https://disease.sh/v3/covid-19/countries
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
const [tableData, setTableData] = useState({});
const [mapCenter,setMapCenter]=useState({lat:34,lng:-40});
const [mapZoom,setMapZoom]=useState(3);
  //async===send request to srver and wait
  useEffect(() => {
   fetch("https://disease.sh/v3/covid-19/all")
   .then(response=>response.json())
   .then(data=>{
     setCountryInfo(data);
   })
  }, [])
  useEffect(() => {
    //code execute only one time when the component loads and not again runs
    const getCountresData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log("DATA CHECKING",data);
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }
          ));
          const sortedData=sortData(data);
          setTableData(sortedData);

          setCountries(countries);
        })

    }
    getCountresData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("pressing", countryCode);
    setCountry(countryCode);
    const url=
    countryCode==='worldwide'?"https://disease.sh/v3/covid-19/all":
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then((response)=>response.json())
    .then((data)=>{
      setCountry(countryCode)
setCountryInfo(data);
setMapCenter([data.countryInfo.lat,data.countryInfo.lng]);
setMapcountries(data);
setMapZoom(4);
    });
  };
  console.log("countryinfo is",countryInfo);
  return (
    <div className="app">
      <div className="app_left" >
        <div className="app_header">

          <h1>Lets build a Covid-19 Tracker with Me!!!</h1>
          <FormControl className="app_dropdown" >
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              <MenuItem value="worldwide" >Worldwide</MenuItem>
              {countries.map((country) => (        
                <MenuItem value={country.value} >{country.name}</MenuItem>
              ))

              }
              {/* <MenuItem  >1</MenuItem>
            <MenuItem>2</MenuItem>
            <MenuItem>3</MenuItem>
            <MenuItem>4</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className="app_stats" >
          <InfoBox tittle="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox tittle="recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox tittle="deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map 
        countries={mapCountries}
        cenetr={mapCenter}
        zoom={mapZoom}
        />

        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

        {/*header,
      title+select drop down option for field
      infoBoxes
      tables
      graphs
      map */}
      </div>
<Card className="app_right" >

  <CardContent>
    <h2>live case by country</h2>
    <Table countries={tableData}/>
    <h2>live case acrroswsx world</h2>
    <LineGraph />
  </CardContent>

</Card>
    </div>
  );
}

export default App;
