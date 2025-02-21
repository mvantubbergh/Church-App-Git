import { Component, OnInit, ViewChild } from '@angular/core';
import { ChurchService } from './church-service.service';
import { FormsModule } from '@angular/forms'; 
import { CommonModule, DatePipe } from '@angular/common'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { NbLayoutModule, NbButtonModule, NbInputModule, NbCardModule, NbListModule, NbAlertModule, NbDialogService, NbDialogModule, NbDatepickerModule, NbTimepickerModule, NB_TIME_PICKER_CONFIG  } from '@nebular/theme';  
import { CorsInterceptor } from '../cors/interceptor';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    FormsModule,        
    CommonModule,       
    HttpClientModule,    
    NbLayoutModule,      
    NbButtonModule,      
    NbInputModule,       
    NbCardModule,        
    NbListModule,
    NbAlertModule,
    NbDatepickerModule,
    NbTimepickerModule,
    DatePipe
    // NbDialogModule,
  ],
  providers: [ChurchService,
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true },
    { provide: NB_TIME_PICKER_CONFIG, useValue: {} }
  ]
})
export class AppComponent implements OnInit {
  churchServices: any[] = [];
  newChurchService: any = { location: '', seats: null, time: null };
  currentChurchService = { id: null, location: '', seats: null, time: null as Date | null };
  editMode = false;
  showSuccessMessage = false;
  successMessage = ''
  selectedService : any = null
  itemViewed = false;

  @ViewChild('viewServiceModal') viewServiceModal: any;


  constructor(private churchService: ChurchService, private dP : DatePipe) {} //, private dialogueService: NbDialogService) {}

  ngOnInit(): void {
    this.churchService.getChurchServices().subscribe(data => {
      console.log(data)
      this.churchServices = data;
    });
  }

  // view 
  viewServiceDetails(service : any): void {
    this.selectedService = service;
    this.itemViewed = true;
  }

  // convert datetime to time for view
  convertToTime(time : string | null) : string {
    if (!time) return '';

    const date = new Date(time);
    return this.dP.transform(date, 'HH:mm') ?? '';
  }

  // create
  createChurchService(): void {
    //validaiton
    if (!this.newChurchService.time || !this.newChurchService.location || !this.newChurchService.seats) {
      this.successMessage = 'All fields are required to create a new church service.';
      this.showSuccessMessage = true;
      return; 
    }
    
    // our time fix
    if (this.newChurchService.time) {
      const time = new Date(this.newChurchService.time);
      time.setHours(time.getUTCHours() + 2);
      this.newChurchService.time = time;
    }

    this.churchService.createChurchService(this.newChurchService).subscribe({
      next: (response) => {
        this.successMessage = 'Service created successfully!'
        this.showSuccessMessage = true;
  
        this.churchService.getChurchServices().subscribe({
          next: (data) => {
            this.churchServices = data;
          },
          error: (error) => {
            console.error('Error fetching updated ChurchServices:', error);
          }
        });
  
        this.resetForm();
        this.autoCloseAlert();
      },
      error: (error) => {
        console.error('Error creating ChurchService:', error);
      },
      complete: () => {
        console.log('ChurchService creation process completed.');
      }
    });
  }

  // delete
  deleteChurchService(service: any): void {
    this.churchService.deleteChurchService(service.id, service).subscribe({
      next: (response) => {
        this.successMessage = 'Church service has been successfully deleted!';
        this.showSuccessMessage = true;

        this.churchService.getChurchServices().subscribe({
          next: (data) => {
            this.churchServices = data;
            this.editMode = false;
            this.currentChurchService = { id: null, location: '', seats: null, time: new Date() };
          },
          error: (error) => {
            console.error('Error fetching updated ChurchServices:', error);
          }
        });

        this.autoCloseAlert();
      },
      error: (error) => {
        console.error('Error updating ChurchService:', error);
      }
    });
  }

  // edit & update
  editChurchService(service: any): void {
    console.log(service);
    this.currentChurchService = { ...service };
    this.editMode = true;
    this.selectedService = null;
  
    if (this.currentChurchService.time) {
      const date = new Date(this.currentChurchService.time);
      if (!isNaN(date.getTime())) {
        // our time
        date.setHours(date.getUTCHours() + 2);
        this.currentChurchService.time = date;
      } else {
        console.error('time format STILL invalid');
        this.currentChurchService.time = null;
      }
    }
  }  

  updateChurchService(): void {
    if (this.currentChurchService.id) {
      console.log(this.churchService);
      this.churchService.updateChurchService(this.currentChurchService.id, this.currentChurchService)
        .subscribe({
          next: (response) => {
            this.successMessage = 'Church service has been successfully updated!';
            this.showSuccessMessage = true;
  
            this.churchService.getChurchServices().subscribe({
              next: (data) => {
                this.churchServices = data;
                this.editMode = false;
                this.currentChurchService = { id: null, location: '', seats: null, time: new Date() };
              },
              error: (error) => {
                console.error('Error fetching updated ChurchServices:', error);
              }
            });
  
            this.autoCloseAlert();
          },
          error: (error) => {
            console.error('Error updating ChurchService:', error);
          }
        });
    }
  }
  

  resetForm() {
    this.editMode = false;
    this.currentChurchService = { id: null, location: '', seats: null, time: null };
  }

  // alert things
  onClose() {
    this.showSuccessMessage = false;  
  }

  autoCloseAlert() {
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 10000);
  }

}

