import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    FormComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
