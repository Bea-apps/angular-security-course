import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Directive({
    selector: "[rbacAllow]"
})
export class RbacAllowDirective {

    constructor(
        private templateRef: TemplateRef<any>, 
        private viewCOntainer: ViewContainerRef,
        private authService: AuthService
    ) {}

    @Input()
    set rbacAllow(allowedRoles: string[]) {

    }

}