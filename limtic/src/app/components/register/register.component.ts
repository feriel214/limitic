import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };
 
  // Add error messages for each validation rule
  validationMessages = {
    firstName: {
      required: 'FirstName est requis.'
    },
    lastName: {
      required: 'LastName est requis.'
    },
    email: {
      required: 'Email est requise.',
      invalidEmail: 'Format d\'adresse e-mail invalide.'
    },
    password: {
      required: 'Le mot de passe est requis.',
      minlength: 'Le mot de passe doit comporter au moins 6 caractères.'
    }
  };
  

  form!: FormGroup;
  submitted = false;
  constructor(private authService: AuthServiceService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }
  ngOnInit(): void {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  
  }
  createForm() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  onSignUp() {
    this.submitted = true;
    
    this.authService.signUp(this.form.value).subscribe(
      (data) => {
        console.log('Sign-up successful:', data);
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie!',
          text: 'Vous pouvez maintenant vous connecter avec votre nouveau compte.'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      (error: any) => {
        console.error('Sign-up error:', error);
        Swal.fire({
          icon: 'error',
          title: "L'inscription a échoué !",
          text: `${error.error.error}`
        });
        this.user = {
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        };
      }
    );
  }

 
}
