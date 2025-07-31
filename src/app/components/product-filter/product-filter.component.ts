import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Output() filterChange = new EventEmitter<{ category: string; text: string }>();

  filterForm!: FormGroup;

  categories = [
    { value: '', label: 'Toutes catégories' },
    { value: 'ventilateur', label: 'Ventilateur' },
    { value: 'climatiseur', label: 'Climatiseur' },
    { value: 'refroidisseur', label: 'Refroidisseur' },
  ];

  ngOnInit() {
    this.filterForm = this.fb.group({
      text: [''],
      category: [''],
    });

    this.filterForm.valueChanges.subscribe(value => {
      this.filterChange.emit(value);
    });
  }
}
