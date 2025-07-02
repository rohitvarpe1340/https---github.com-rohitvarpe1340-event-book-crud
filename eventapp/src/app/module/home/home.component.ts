import { Component } from '@angular/core';
import { EventService } from 'src/app/service/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
editingEvent: any = null;
showModal: boolean = false;

openEditModal(event: any) {
  this.editingEvent = { ...event };
  this.showModal = true;
}
events: any[] = [];
  newEvent = {
    name: '',
    email: '',
    phone: '',
    event: '',
    location: '',
    message: ''
  };

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.loadEvents();
  }

 loadEvents() {
  this.eventService.getEvents().subscribe(res => {
    console.log('loaded events:', JSON.stringify(res, null, 2));
     this.events = res;
  });
}

addEvent() {
  if (
    !this.newEvent.name ||
    !this.newEvent.email ||
    !this.newEvent.phone ||
    !this.newEvent.event ||
    !this.newEvent.location ||
    !this.newEvent.message
  ) {
    alert("Please required all fields!");
    return;
  }

  this.eventService.addEvent(this.newEvent).subscribe(() => {
    this.loadEvents();
    this.newEvent = { name: '', email: '', phone: '', event: '', location: '', message: '' };
  });
}

deleteEvent(id: number) {
  if (confirm('confirm  to delete this event?')) {
    this.eventService.deleteEvent(id).subscribe({
      next: () => {
        alert('Event deleted successfully');
        this.loadEvents();
       },
      error: (err) => {
        console.error(err);
        alert('Error while deleting');
      }
    });
  }
}







}
