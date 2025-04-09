import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { User } from "../model/user";
import { Subscription } from "rxjs";
import * as _ from "lodash";

@Directive({
    selector: "[rbacAllow]"
})
export class RbacAllowDirective implements OnDestroy {

    allowedRoles: string[];
    user: User;

    sub: Subscription;

    @Input()
    set rbacAllow(allowedRoles: string[]) {
        this.allowedRoles = allowedRoles;
        this.showIfUserAllowed();
    }

    constructor(
        private templateRef: TemplateRef<any>, 
        private viewContainer: ViewContainerRef,
        private authService: AuthService
    ) {
        this.sub = authService.user$.subscribe(
            user => {
                this.user = user;
                this.showIfUserAllowed();
            }
        );

    }

    /**
     * Unsubscribe from this centralized service when this directive gets destroyed
     * in order to be sure that we don´t create memory leaks due to missings unsubscriptions.
     */
    ngOnDestroy(): void {
        this.sub.unsubscribe(); 
    }

    /**
     * showIfUserAllowed checks if the user has admin permissions in order to show
     * the 'Login As User' view.
     */
    showIfUserAllowed() {

        if (!this.allowedRoles || this.allowedRoles.length === 0 ||
            !this.user // !this.user means that we don´t have the user data yet.
        ) {
            this.viewContainer.clear();
            return;
        }

        const isUserAllowed = _.intersection(this.allowedRoles, this.user.roles).length > 0;

        if (isUserAllowed) {
            // show the element.
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            // hide the element.
            this.viewContainer.clear();
        }


    }

}