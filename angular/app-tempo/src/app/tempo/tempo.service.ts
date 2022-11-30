import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITempoAtual } from '../itempo-atual';

@Injectable({
  providedIn: 'root'
})
export class TempoService {

  constructor(private httpClient: HttpClient) { }

  buscarTempoAtual(busca: string | number, pais: string): Observable<ITempoAtual> {

    let uriParams = ''
    if (typeof busca === 'string') {
      uriParams = `q=${busca}`
    } else {
      uriParams = `zip=${busca}`
    }

    if (pais) {
      uriParams = `${uriParams},${pais}`
    }

    return this.httpClient.get<ICurrentWeatherData>(
      `${environment.baseUrl}api.openweathermap.org/data/2.5/weather?` +
      `${uriParams} &appid=${environment.appId}`
    ).pipe(map(data => this.transformToITempoAtual(data)))
  }

  buscarPoluicao (lat: string, lon: string): Observable<PolutionData>{
//http://api.openweathermap.org/data/2.5/air_pollution?lat=-27.8165664&lon=-50.325883&appid=bc93fb691907d0c9163732716afcb58d
    return this.httpClient.get<IcurrentPolutionData>(
      `${environment.baseUrl}api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${environment.appId}`
    ).pipe(map (data => this.transformToPolutionData(data)))

  }

  private transformToITempoAtual(data: ICurrentWeatherData): ITempoAtual {
    return {
      cidade: data.name,
      pais: data.sys.country,
      date: new Date(data.dt * 1000).toLocaleDateString('pt-BR'),
      descricao: data.weather[0].description,
      temperatura: this.convertKelvinToCelcius(data.main.temp),
      image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
    }
  }

  private transformToPolutionData(data: IcurrentPolutionData): PolutionData{
    let airquality = "Good"
    switch(data.list[0].main.aqi)
    {
      case 2: {
        airquality= "Fair"
        break
      }
      case 3: {
        airquality = "Moderate"
        break
      }
      case 4: {
        airquality= "Poor"
        break
      }
      case 5:{
        airquality= "Very Poor"
        break
      }
      default:{
        airquality = "Good"
      }
    }
    
    return{
      airquality, 
      periodcelements: [{name: "Carbono", weight: data.list[0].components["co"].toString(), position: 1, symbol: "co" }]
    }
  }
  private convertKelvinToCelcius(kelvin: number): number {
    return kelvin - 272.15
  }


}

interface ICurrentWeatherData {
  weather: [{ description: string, icon: string }],
  main: { temp: number },
  sys: { country: string },
  dt: number,
  name: string
}


  //{"coord":{"lon":-50.3259,"lat":-27.8166},"list":[{"main":{"aqi":1},"components":{"co":178.58,"no":0,"no2":1.63,"o3":19.67,"so2":0.75,"pm2_5":0.5,"pm10":0.8,"nh3":0.37},"dt":1669762571}]}
  


export interface IcurrentPolutionData{
  coord: Coord;
  list:  List[];
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface List {
  main:       Main;
  components: { [key: string]: number };
  dt:         number;
}

export interface Main {
  aqi: number;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

export interface PolutionData{
  airquality: string;
  periodcelements: PeriodicElement[];

}







