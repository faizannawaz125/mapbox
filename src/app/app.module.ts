import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MyHttpInterceptor } from './my-http-interceptor';
import {LoginComponent} from './login/login.component';
//import {PolygonListComponent} from './polygon-list/polygon-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule, DatePipe} from '@angular/common';
import {NeedAuthGuard} from './auth.guard';
import {AgmCoreModule} from '@agm/core';
import { AgmDrawingModule } from '@agm/drawing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgBusyModule} from 'ng-busy';
import {NgxPaginationModule} from 'ngx-pagination';
import { GoogleMapsAPIWrapper} from '@agm/core';
import { MetaConfig, MetaModule } from 'ng2-meta';
import {SocketClientService} from './socket-client.service';
import {WebsocketService} from './websocket.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {ExcelService} from './excel.service';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';

//import { AdminComponent } from './admin/admin.component';

//import { AudienceComponent } from './audience/audience.component';

const metaConfig: MetaConfig = {
  //Append a title suffix such as a site name to all titles
  //Defaults to false
  useTitleSuffix: true,
  // defaults: {
  //   title: 'Drive Time Media',
  //   titleSuffix: '',
  //   'og:image': 'https://www.drivetimeanalytics.com/image',
  //   'og:type': 'Website',
  //   'og:url': 'https://www.drivetimeanalytics.com/'
  // }
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    //AdminComponent,
   // AudienceComponent,
  ],
  imports: [
    NgxPaginationModule,
    NgBusyModule,
    NgbModule,
    NgxSpinnerModule,
    SweetAlert2Module.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatSnackBarModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
	InfiniteScrollModule ,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCsSXA8KTBFDY-89sfor1ChlsiDWkPGiXQ',
      libraries: ["places", "drawing","visualization"]
    }),
	AgmDrawingModule,
    MetaModule.forRoot(metaConfig)
  ],
  providers: [
  NeedAuthGuard, DatePipe, GoogleMapsAPIWrapper, WebsocketService, SocketClientService,ExcelService,
  { provide: LocationStrategy, useClass: PathLocationStrategy },
  {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
