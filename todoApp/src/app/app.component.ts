import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AccountService } from './account/account.service';
import { DataStorageService } from './shared/storage/data-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
    public title = 'Easy-List';
    public error: string | null = null;
    public subscription: Subscription | undefined;
    
    constructor(
        private accountService: AccountService,
        private dataStorage: DataStorageService
    ) {}
    
    ngOnInit(): void {
        this.dataStorage.autoLogin();
        this.subscription = this.accountService.thereIsError.subscribe((error: string | null) => {
            this.error = error;

            of(null).pipe(
                delay(6000)
            ).subscribe(value => {
                this.error = value;
            })
        });
    }
    
    onDismissSnackbar() {
        this.error = null;
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
