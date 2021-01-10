import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario : FormGroup;
  contatos : Contato[] = [];

  constructor(private service : ContatoService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome : ['', Validators.required],
      email : ['', [Validators.email, Validators.required]]
    });
  }

  submit() {
    //console.log(this.formulario.value);
    //const isValid = this.formulario.valid;
    //console.log('Valid', isValid);
    
   /* let erroNomeRequired;
    if(this.formulario.controls.nome.errors) {
      erroNomeRequired = this.formulario.controls.nome.errors.required;
      console.log('erroNomeRequired : ', erroNomeRequired);
    }
    let erroEmailInvalio;
    if( this.formulario.controls.email.errors) {
      erroEmailInvalio =  this.formulario.controls.email.errors.email;
      console.log('erroEmailInvalio : ', erroEmailInvalio);
    }*/
    
    const formValues = this.formulario.value;
    const contato : Contato = new Contato(formValues.nome, formValues.email);
    this.service.save(contato).subscribe(resposta => { 
      // console.log(resposta); 
      this.contatos.push(resposta);
      console.log(this.contatos);
    })
  }

}
