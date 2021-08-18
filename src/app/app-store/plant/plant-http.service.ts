import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Plant } from 'src/app/app-store/plant/plant.model';
import { HttpService, AppHttpResponse, AppHttpRequest } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PlantHttpService {

  baseUrl = 'plants/'

  constructor(
    private httpService: HttpService
  ) { }

  getPlants(): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'getPlants',
      loadingMsg: 'Loading plants...',
      errorMsg: 'Failed to load plants',
    }
    return this.httpService.post<AppHttpResponse>(options)
  }

  getPlant() { }

  addPlant(plant: Plant): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'addPlant',
      payload: { plant },
      loadingMsg: 'Adding a new plant...',
      successMsg: `New plant '${plant.name}' has been created`,
      errorMsg: 'Failed to add a plant'
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  updatePlant(plant: Plant): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'updatePlant',
      payload: { plant },
      loadingMsg: 'Updating the plant...',
      successMsg: `Plant has been updated`,
      errorMsg: 'Failed to update the plant'
    }
    return this.httpService.post<AppHttpResponse>(options);
  }

  deletePlant(plantId): Observable<AppHttpResponse> {
    const options: AppHttpRequest = {
      url: this.baseUrl + 'deletePlant',
      payload: { plantId },
      loadingMsg: 'Deleting the plant...',
      successMsg: `Plant has been deleted`,
      errorMsg: 'Failed to delete the plant',
    }
    return this.httpService.post<AppHttpResponse>(options);
  }
}
