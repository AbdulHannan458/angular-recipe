import { Component, OnInit, Output, EventEmitter, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/services/data.storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuhtenticated: boolean = false;
  private userSub : Subscription;

  constructor(private dataStorageService: DataStorageService,
    private auhtService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.auhtService.user.subscribe((user) => {
      this.isAuhtenticated = !!user;
      console.log(!user);
      console.log(!!user);
    })
  }

  onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  onFetchData(): void {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(): void {
    this.auhtService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
