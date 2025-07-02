import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
@Input() editingEvent: any = {
    id: null,
    name: '',
    email: '',
    phone: '',
    event: '',
    location: '',
    message: ''
  };

  @Input() showModal: boolean = false;
  @Output() updateDone = new EventEmitter<void>();

  constructor(private eventService: EventService) {}

  saveUpdate() {
    if (this.editingEvent && this.editingEvent.id) {
      this.eventService.updateEvent(this.editingEvent.id, this.editingEvent).subscribe({
        next: () => {
          alert('Event updated successfully');
          this.updateDone.emit(); 
        },
        error: (err) => {
          console.error(err);
          alert('Error while updating');
        }
      });
    }
  }
}
