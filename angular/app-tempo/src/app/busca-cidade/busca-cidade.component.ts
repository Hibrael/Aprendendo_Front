import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { TempoService } from '../tempo/tempo.service';

@Component({
  selector: 'app-busca-cidade',
  templateUrl: './busca-cidade.component.html',
  styleUrls: ['./busca-cidade.component.css']
})
export class BuscaCidadeComponent implements OnInit {

  busca = new FormControl("", [Validators.minLength(2), Validators.maxLength(15)])

  constructor(private tempoService: TempoService) { }

  ngOnInit(): void {


    this.busca.valueChanges.pipe(debounceTime(1000)).subscribe((valorDabusca) => {
      console.log(valorDabusca)
      if (this.busca.valid) {
        if (valorDabusca) {
          const valorDoInputDebusca = valorDabusca.split(',').map((letra: string) => letra.trim());
          this.tempoService.buscarTempoAtual(
            valorDoInputDebusca[0],
            valorDoInputDebusca.length > 1 ? valorDoInputDebusca[1] : '')
            .subscribe(data => console.log(data))
        }
      }

     
    })
  }


}
