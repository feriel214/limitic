import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  validationMessages = {
    email: {
      required: 'Email est requis.',
      invalidEmail: 'Format d\'adresse e-mail invalide.'
    },
    password: {
      required: 'Le mot de passe est requis.'
    }
  };

  form!: FormGroup;
  submitted = false;

  constructor(private authService: AuthServiceService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', Validators.required]
    });
  }

  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  onSignIn() {
    this.submitted = true;

    if (this.form.valid) {
      this.authService.signIn(this.form.value).subscribe(
        (data: any) => {
          console.log('Sign-in successful:', data);

          if (data.success) {
           if(data.user.role==1){
              this.router.navigate(['/dashboard/list/annuaire']);
              Swal.fire({
                icon: 'success',
                title: 'Connexion réussie !',
                text: `Bonjour ${data.user.firstName} ${data.user.lastName}`,
              }).then(() => {
                localStorage.setItem('token', data.token);
                // Redirect to the dashboard page
                this.router.navigate(['/dashboard/list/annuaire']);
              });
           }else if(data.user.role==0){
            this.router.navigate(['/home/presentation']);
            Swal.fire({
              icon: 'success',
              title: 'Connexion réussie !',
              text: `Bonjour ${data.user.firstName} ${data.user.lastName}`,
            }).then(() => {
              localStorage.setItem('token', data.token);
              // Redirect to the dashboard page
              this.router.navigate(['/home/presentation']);
            });
           }else{
           /* Swal.fire({
              icon: 'warning',
              title: "Connexion n'est pas autorisé !",
              text: `vous devez etre admin ou opérateur pour pouvouir connecter !!`,
            })*/
           }
          }
        },
        (error) => {
          console.error('Sign-in error:', error);
        /*  Swal.fire({
            icon: 'error',
            title: 'Échec de la connexion !!',
            text: "Veuillez vérifier vos informations d'identification.",
          });*/
        }
      );
    }
  }
}
