import {inject} from "@angular/core"
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { Transportadora } from "src/app/models/transportadora.model";
import { TransportadoraService } from "src/app/services/transportadora.service"

export const transportadoraResolver: ResolveFn<Transportadora> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(TransportadoraService).findById(route.paramMap.get('id')!);
    };
