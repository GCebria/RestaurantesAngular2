import {Component, OnInit} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig, Router} from "angular2/router";
import {RestauranteService} from "../services/restaurante.service";
import {Restaurante} from "../model/restaurante";

@Component({
  selector: "restaurantes-list",
  templateUrl: "app/view/restaurantes-list.html",
  directives: [ROUTER_DIRECTIVES],
  providers: [RestauranteService]
})

export class RestaurantesListComponent implements OnInit{
  public titulo:string ="Listado de restaurantes:";
  public restaurantes: Restaurante[];
  public status:string;
  public errorMessage;


  constructor(private _restauranteService: RestauranteService){}

  ngOnInit(){
    this.getRestaurantes();
    console.log("restaurantes-list component cargado");
  }

  getRestaurantes(){
    let box_restaurantes= <HTMLElement>document.querySelector("#restaurantes-list .loading");
    box_restaurantes.style.visibility ="visible";
    this._restauranteService.getRestaurantes().subscribe(
        result => {
          this.restaurantes=result.data;
          this.status = result.status;

          if(this.status !== "success"){
            alert("Error en el servidor");
          }
          box_restaurantes.style.display ="none";
        },
        error=> {
          this.errorMessage = <any>error;
          if(this.errorMessage);
          alert("Error en la petición");
        }
    );


  }

}
