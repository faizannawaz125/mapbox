import { setTheme } from 'ngx-bootstrap';
// import { MetaService } from 'ng2-meta';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GoogleMapsAPIWrapper, AgmMap, LatLngBounds, LatLngBoundsLiteral, MapsAPILoader, AgmCoreModule } from '@agm/core';
import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Input } from '@angular/core';
import { getBoundsOfDistance, isPointInPolygon, getPathLength, getBounds, getAreaOfPolygon } from 'geolib';
import { Console } from 'console';
import { create } from 'bbox';

@Injectable({
  providedIn: 'root'
}) 


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'ng6';

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    setTheme('bs4'); // or 'bs4'
  }

  lat: Number = 45.9432;
  lng: Number = 24.9668;
  zoom: any = 6;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  map: any;
  mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
  navigation: any; 
  popup: any;
  inputs: any;

  ngOnInit() {
    this.lat = 45.9432;
    this.lng = 24.9668;
    this.zoom= 6;
  }


  initializeMap() {
		this.mapboxgl.accessToken = 'pk.eyJ1IjoiZmFpemFuNGZpbmUiLCJhIjoiY2s0ODI4ZGpjMHllcjNscXVyM2gxaTB4ZCJ9.1NzDC5BbZ1GODW0TsaOJ7Q';
		this.map = new this.mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/' + this.style,
			minZoom: 3.5,
			center: [this.lng, this.lat],
			zoom: this.zoom // starting zoom
		});

		this.map.addControl(new this.mapboxgl.NavigationControl());
  }
  //style: any = 'mapbox/satellite-v9';
  style: any = 'faizan4fine/ckzcxz04q006415pcbst6g9zx';

  ngAfterViewInit() {
    this.initializeMap();
  }


  onStyleChange(style){
    this.style = style;
    this.map.remove();
    this.initializeMap();
  }

}
