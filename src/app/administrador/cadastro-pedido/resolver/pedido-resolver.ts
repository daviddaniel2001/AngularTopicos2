import {inject} from "@angular/core"
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { Pedido } from "src/app/models/pedido.model";
import { PedidoService } from "src/app/services/pedido.service"

export const pedidoResolver: ResolveFn<Pedido> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(PedidoService).findById(route.paramMap.get('id')!);
    };
