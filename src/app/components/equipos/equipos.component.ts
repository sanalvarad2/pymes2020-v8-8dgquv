import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";
import {EquiposService} from "../../services/equipos.service";
import {Equipo} from "../../models/equipo";



@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  Titulo = "Equipos"; 
  TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  AccionABMC = "L"; 
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };

  Lista: Equipo[] = [];
  RegistrosTotal: number;
  Pagina = 1;
  ListadoporPagina = 10;

  FormReg: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private equiposService: EquiposService,
    private modalDialogService: ModalDialogService
  ) { }

  ngOnInit() {
    this.FormReg = this.formBuilder.group({
      IdEquipo : [0],
      EquipoNombre: [
        "",
        [Validators.required]
      ],
      EquipoRanking:["",
      [Validators.required, Validators.pattern("[0-9]{1,7}")]
      ]

    })
    this.getEquipos();
  }


  getEquipos(){
    this.equiposService.get().subscribe((res: Equipo[]) => {
      this.RegistrosTotal = res.length;
      this.Lista = res.slice((this.Pagina - 1) * this.ListadoporPagina, this.Pagina * this.ListadoporPagina);
    })
  }

  getEquipoById(obj:Equipo){

    this.equiposService.getById(obj.IdEquipo).subscribe((res:Equipo)=>{
      this.FormReg.patchValue(res);
      this.AccionABMC = 'C';
      
    })
  }

  Consultar(obj:Equipo){
      this.getEquipoById(obj);
      
  }

  Editar(obj:Equipo){
    this.AccionABMC = 'M';
    this.FormReg.patchValue(obj);
  }

  Grabar(){
    this.submitted = true;
    
     if (this.FormReg.invalid) {
      return;
    }

    
    const itemCopy = { ...this.FormReg.value };

    

    // agregar post
    if (itemCopy.IdEquipo == 0 || itemCopy.IdEquipo == null) {
      this.equiposService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert('Registro agregado correctamente.');
        this.getEquipos();
      });
    } else {
      // modificar put
      this.equiposService
        .put(itemCopy.IdEquipo, itemCopy)
        .subscribe((res: any) => {
          this.Volver();
          this.modalDialogService.Alert('Registro modificado correctamente.');
          this.getEquipos();
        });
    }
  }
  

  Agregar(){
    this.AccionABMC = "A";
    this.FormReg.reset(this.FormReg.value);

    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }

  Volver(){
    this.FormReg.reset();
    this.getEquipos();
    this.AccionABMC = 'L';
  }

}