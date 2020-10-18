import { Component, OnInit } from '@angular/core';
import { flatMap, catchError } from 'rxjs/operators';

import { Deck, DeckVM } from '../entities/deck';
import { Card } from '../entities/card';
import { DeckService } from '../services/deck.service';
import { CardService } from '../services/card.service';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteDialogComponent } from '../shared/confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  deckName = '';

  decks = new Array<DeckVM>();
  allCards = new Array<Card>();
  selectedDeck: DeckVM;

  constructor(
    private snackbar: MatSnackBar,
    private deckService: DeckService,
    private cardService: CardService,
    private userService: UserService,
    private deleteDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.snackbar.open('Loading user decks', 'Loading ...', { duration: 3000 });

    this.userService.getUserId().pipe(
      flatMap((id: number) => this.deckService.getDecksByUserId(id)),
      catchError((error) => {
        this.snackbar.open('Error loading user decks', 'Error', { duration: 10000 });
        return error;
      })
    ).subscribe((decks: Array<DeckVM>) => {
      this.decks = decks;
      this.snackbar.open('Loaded user decks', 'Loaded', { duration: 3000 });
    });

    this.cardService.getAllCards().subscribe((cards: Array<Card>) => this.allCards = cards);

  }

  createDeck(name: string): void {
    if (!this.deckNameIsValid(name)) {
      this.snackbar.open('Please enter a name', 'Warning', { duration: 3000 });
      this.deckName = '';
      return;
    }

    const deck = new DeckVM();
    deck.Name = name.trim();
    this.decks.push(deck);
    this.snackbar.open('Creating new deck');
    this.deckName = '';
  }

  editDeck(deck: DeckVM): void {
    this.decks.map(d => {
      if (d.Id === deck.Id) {
        d.editing = !d.editing;
        this.selectedDeck = deck;
      } else {
        d.editing = false;
      }
    });
  }

  verifyDeleteDeck(index: number): void {
    const deleteDialog = this.deleteDialog.open(ConfirmDeleteDialogComponent);
    deleteDialog.afterClosed().subscribe((deleteConfirmed) => {
      if (deleteConfirmed) {
        this.decks.splice(index, 1);
      }
    });
  }

  selectDeck(deck: DeckVM): void {
    for (const d of this.decks) {
      d.editing = false;
    }

    this.selectedDeck = deck;
  }

  addToDeck(card: Card): void {
    if (this.selectedDeck) {
      const count = this.selectedDeck.Cards.filter(c => c.Id === card.Id).length;
      if (count < 4) {
        this.selectedDeck.Cards.push(card);
      } else {
        this.snackbar.open('Unable to add card. Card limit of any specific card is 4', 'Limit', { duration: 10000 });
      }
    } else {
      this.snackbar.open('Please select a deck to add to', 'User Error', { duration: 10000 });
    }
  }

  removeFromDeck(card: Card): void {
    if (this.selectedDeck) {
      const index = this.selectedDeck.Cards.findIndex(c => c.Id === card.Id);
      if (index > -1) {
        this.selectedDeck.Cards.splice(index, 1);
      }
    } else {
      this.snackbar.open('Please select a deck to remove from', 'User Error', { duration: 10000 });
    }
  }

  trackByFn(index: number, item: any): number {
    return index;
  }

  private deckNameIsValid(name: string): boolean {
    if (!name.trim()) {
      return false;
    }

    return true;
  }
}
