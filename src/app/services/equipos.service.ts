import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

import { Equipo } from "../models/equipo";


@Injectable({providedIn : 'root'})
export class EquiposService {

  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    // la barra al final del resourse url es importante para los metodos que concatenan el id del recurso (GetById, Put)
    this.resourceUrl = "https://pavii.ddns.net/api/equipos/";
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }

  post(obj:Equipo) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(Id: number, obj:Equipo) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

  delete(Id) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }  

}