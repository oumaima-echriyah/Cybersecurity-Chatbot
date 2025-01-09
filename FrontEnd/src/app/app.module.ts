import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatInterfaceComponent } from './components/chat-interface/chat-interface.component';
import { DiffusionModelInterfaceComponent } from './components/diffusion-model-interface/diffusion-model-interface.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    ChatInterfaceComponent,
    DiffusionModelInterfaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
