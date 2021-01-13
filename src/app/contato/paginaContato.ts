import { Contato } from "./contato";

// Classe com os valores recebidos durante a paginacao. Para passar para o datatable. Os nomes necessitam ser iguais.
export class PaginaContato {
    content : Contato[];
    totalElements : number;
    size : number;
    number : number;
}