import { Component } from '@angular/core';
import { PolutionData, TempoService } from '../tempo/tempo.service';

@Component({
  selector: 'app-poluicao',
  templateUrl: './poluicao.component.html',
  styleUrls: ['./poluicao.component.css']
})
export class PoluicaoComponent {
  displayedColumns: string[] = ['demo-name', 'demo-weight', 'demo-symbol'];
  polutionData?:PolutionData 

  constructor(tempoService: TempoService) {
    tempoService.buscarPoluicao("-27.590465150887418", "-50.36225636499196").subscribe(data => this.polutionData = data);
  }
  // this.tempoService.BuscarPoluicao("-27.590465150887418", "-50.36225636499196").subscribe(data=>console.log(data))

}


