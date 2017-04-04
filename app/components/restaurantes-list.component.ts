import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service"

@Component({
  selector: "restaurantes-list",
  templateUrl: "app/view/restaurantes-list.html",
  providers: [RestauranteService]
})

export class RestaurantesListComponent implements OnInit{
  public titulo:string ="Listado de restaurantes:";

  constructor(private _restauranteService: RestauranteService){}

  ngOnInit(){
    this.getRestaurantes();
    console.log("restaurantes-list component cargado");
  }

  getRestaurantes(){
    this._restauranteService.getRestaurantes().subscribe(
        result => {
          this.restaurantes=result.data;
          this.status = result.status;

          if(this.status !== "success"){
            alert("Error en el servidor");
          }

        },
        error=> {
          this.errorMessage = <any>error;
          if(this.errorMessage);
          alert("Error en la petición");
        }
    );


  }

}
