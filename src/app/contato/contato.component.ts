import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { MatDialog } from '@angular/material/dialog';

import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  /*********************************Paginacao */
  totalElementos = 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions : number[] = [10];
  /*********************************Fim Paginacao */

  constructor(private service : ContatoService, private fb : FormBuilder, private dialog : MatDialog, private snackbar : MatSnackBar) { }

  ngOnInit(): void {
    this.montarFormulario();

    this.listarContatos(this.pagina, this.tamanho);
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      nome : ['', Validators.required],
      email : ['', [Validators.email, Validators.required]]
    });
  }

/*********************************Paginacao */
  // Listar os contatos paginados.
  listarContatos(page = 0, size = 10) {
    this.service.list(page, size).subscribe(
      // response, pois em contato.service.ts a "funcao list(page, size) : Observable<PaginaContato>" recebe um Observable de PaginaContato.
      response => {
        this.contatos = response.content;
        this.totalElementos = response.totalElements;
        this.pagina = response.number;
      });
  }

  // Ao clicar no paginator
  paginar(event : PageEvent) {
    // Ao clicar no botão da proxima pagina "event.pageIndex" indica a pagina que deseja ir.
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho);
  }
  /******************************************Fim paginacao */

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
      //let linha : Contato[] = [...this.contatos, resposta];
      //this.contatos = linha;
      this.listarContatos();
      this.snackbar.open("Contato adicionado!", 'Sucesso!', {duration: 2000});
      this.formulario.reset();
    })
  }

}
