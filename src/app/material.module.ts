import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {MatButtonModule,MatInputModule,MatToolbarModule,MatCardModule,MatDialogModule,MatIconModule,MatSnackBarModule} from '@angular/material';
@NgModule({
    imports:[MatButtonModule,MatInputModule,MatToolbarModule,MatCardModule,MatDialogModule,MatIconModule,MatSnackBarModule],
    exports:[MatButtonModule,MatInputModule,MatToolbarModule,MatCardModule,MatDialogModule,MatIconModule,MatSnackBarModule]
})

export class MaterialModule{}
