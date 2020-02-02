import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [
    HeaderComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    ContentComponent,
  ]
})
export class SharedModule { }
