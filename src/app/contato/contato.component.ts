import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { MatDialog } from '@angular/material/dialog';

import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario : FormGroup;
  contatos : Contato[] = [];
  // Define a ordem do cabecalho das colunas da tabela.
  colunas = ["foto", "id", "nome", "email", "favorito"];

  constructor(private service : ContatoService, private fb : FormBuilder, private dialog : MatDialog) { }

  ngOnInit(): void {
    this.montarFormulario();

    this.listarContatos();
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      nome : ['', Validators.required],
      email : ['', [Validators.email, Validators.required]]
    });
  }

  listarContatos() {
    this.service.list().subscribe(
      response => {
        this.contatos = response;
      });
  }

  favorite(contato : Contato) {
    this.service.favorite(contato).subscribe(response => {
      contato.favorito = !contato.favorito;
    });
  }

  // event captura os arquivos pelo evento change no inputfile
  uploadFoto(event, contato) {
    // targe = inputfile.
    // files representa um array de arquivos
    const files = event.target.files;
    if(files) {
      // Recebe o primeiro arquivo
      const foto = files[0];
      const formData : FormData = new FormData();
      // "foto" parametro para ser enviado ao backend
      formData.append("foto", foto);
      this.service.upload(contato, formData).subscribe(response => this.listarContatos());
    }
  }

  visualizarContato(contato : Contato) {
    this.dialog.open(ContatoDetalheComponent, {
      width : '400px',
      height : '450px',
      data : contato
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
      let linha : Contato[] = [...this.contatos, resposta];
      this.contatos = linha;
      console.log(this.contatos);
    })
  }

}
