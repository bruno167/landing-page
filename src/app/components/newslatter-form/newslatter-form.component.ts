import { Component, signal } from '@angular/core';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewslatterService } from '../../services/newslatter.service';

@Component({
  selector: 'newslatter-form',
  standalone: true,
  imports: [
    BtnPrimaryComponent,
    ReactiveFormsModule,
  ],
  providers: [
    NewslatterService,
  ],
  templateUrl: './newslatter-form.component.html',
  styleUrl: './newslatter-form.component.scss'
})
export class NewslatterFormComponent {
  newslatterForm!: FormGroup;
  loading = signal(false);

  constructor(private service: NewslatterService) {
    this.newslatterForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email]),
    });
  }

  onSubmit(){
    this.loading.set(true);
    if(this.newslatterForm.valid){
      this.service.sendData(this.newslatterForm.value.name, this.newslatterForm.value.email).subscribe({
        next: () => {
          this.newslatterForm.reset();
          this.loading.set(false);
        }
      })
    }
  }

}
