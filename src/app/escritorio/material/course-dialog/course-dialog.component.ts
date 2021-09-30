import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit {

  form: FormGroup;
  description = '';
  title = '';
  txtAcept = 'Aceptar';
  txtCancel = 'Cancelar';
  result = 'cancel';

  constructor(
      private fb: FormBuilder,
      public dialog: MatDialog,
      private dialogRef: MatDialogRef<CourseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {
      this.description = data.description;
      this.title = data.title;
      this.txtAcept = data.txtAcept ?? this.txtAcept;
      this.txtCancel = data.txtCancel ?? this.txtCancel;
  }

  ngOnInit(): any {
      this.form = this.fb.group({
        // description: [this.description, []],
      });
  }

  save(): any {
    this.dialogRef.close(true);
  }

  close(): any {
    this.dialogRef.close(false);
  }

}
