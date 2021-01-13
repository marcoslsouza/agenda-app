import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contato } from '../contato/contato';

@Component({
  selector: 'app-contato-detalhe',
  templateUrl: './contato-detalhe.component.html',
  styleUrls: ['./contato-detalhe.component.css']
})
export class ContatoDetalheComponent implements OnInit {

  // MatDialogRef<ContatoDetalheComponent>, porque esse componente vai ser o dialog que vai ser chamado na outra tela.
  // @Inject(MAT_DIALOG_DATA) public contato : Contato (Injeta o contato que veio da outra tela)
  constructor(public dialogRef : MatDialogRef<ContatoDetalheComponent>, @Inject(MAT_DIALOG_DATA) public contato : Contato) { }

  ngOnInit(): void {
  }

  fechar() {
    this.dialogRef.close();
  }

}
