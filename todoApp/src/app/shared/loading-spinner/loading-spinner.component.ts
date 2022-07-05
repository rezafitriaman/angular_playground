import { Component } from "@angular/core";

@Component({
    selector: 'app-loading-spinner',
    template: `<div class="lds-ring inline-block w-4 h-4">
                    <div class="box-border block absolute w-6 h-6 m-0 border-4 border-rose-400 rounded-full border-t-rose-400 border-r-transparent border-b-transparent border-l-transparent animate-spin "></div>
                    <div class="box-border block absolute w-6 h-6 m-0 border-4 border-rose-400 rounded-full border-t-rose-400 border-r-transparent border-b-transparent border-l-transparent animate-spin animation-delay-500"></div>
                    <div class="box-border block absolute w-6 h-6 m-0 border-4 border-rose-400 rounded-full border-t-rose-400 border-r-transparent border-b-transparent border-l-transparent animate-spin animation-delay-300"></div>
                    <div class="box-border block absolute w-6 h-6 m-0 border-4 border-rose-400 rounded-full border-t-rose-400 border-r-transparent border-b-transparent border-l-transparent animate-spin animation-delay-150"></div>
                 </div>`,
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {}