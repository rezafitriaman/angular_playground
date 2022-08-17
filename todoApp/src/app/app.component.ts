import {
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';
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
    public timerSubscription: Subscription | undefined;
    
    constructor(
        private accountService: AccountService,
        private dataStorage: DataStorageService
    ) {}
    
    ngOnInit(): void {
        this.dataStorage.autoLogin();
        this.subscription = this.accountService.thereIsError.subscribe((error: string | null) => {
            this.error = error;
            this.timerSubscription = timer(7000).subscribe( _ => this.error = null );
        });
    }
    
    onDismissSnackbar() {
        this.error = null;
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
        this.timerSubscription?.unsubscribe();
    }
}
