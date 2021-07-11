
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table'  
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
    imports: [
        CommonModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatSidenavModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    exports: [
        CommonModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatSidenavModule,
        MatDialogModule,
        MatSnackBarModule
    ]
})

export class AngularMaterialModule { }