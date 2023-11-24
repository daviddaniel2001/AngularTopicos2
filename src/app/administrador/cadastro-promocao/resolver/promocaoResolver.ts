import {inject} from "@angular/core"
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router"
import { Promocao } from "src/app/models/promocao.model";
import { PromocaoService } from "src/app/services/promocao.service";

export const promocaoResolver: ResolveFn<Promocao> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      return inject(PromocaoService).findById(route.paramMap.get('id')!);
    };
