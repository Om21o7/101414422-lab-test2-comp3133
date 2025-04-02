import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacexapiService } from '../network/spacexapi.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent implements OnInit {
  mission: any;
  loading: boolean = true; // to show a loading indicator
  error: string = ''; // to show error messages

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexapiService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); 

    if (id) {
      const missionId = Number(id);  // Convert id to number
      if (isNaN(missionId)) {
        this.error = 'Invalid Mission ID';
        this.loading = false;
        return;
      }

      this.spacexService.getMissionByFlightNumber(missionId).subscribe(
        data => {
          this.mission = data;
          this.loading = false; // stop loading once the data is fetched
        },
        err => {
          this.error = 'Failed to load mission data. Please try again later.';
          this.loading = false;
        }
      );
    } else {
      this.error = 'Mission ID not found.';
      this.loading = false;
    }
  }
}
