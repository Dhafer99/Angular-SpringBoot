import { Injectable } from "@angular/core";
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree
} from "@angular/router";
import { JwtClientService } from "./jwt-client.service";

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private authService: JwtClientService,
		private router: Router) { }
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): boolean | Promise<boolean> {
		var isAuthenticated = this.authService.getAuthenticated();
		if (!isAuthenticated ) {
			this.router.navigate(['']);
		}
		return isAuthenticated;
	}
}
