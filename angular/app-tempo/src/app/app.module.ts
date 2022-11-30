import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { TempoAtualComponent } from './tempo-atual/tempo-atual.component';
import { TempoService } from './tempo/tempo.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { BuscaCidadeComponent } from './busca-cidade/busca-cidade.component';
import { PoluicaoComponent } from './poluicao/poluicao.component'

@NgModule({
  declarations: [
    AppComponent,
    TempoAtualComponent,
    BuscaCidadeComponent,
    PoluicaoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TempoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
