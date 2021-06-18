import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ProductsService } from './services/products.service';
import { ProductsReport } from './models/productsReport';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  displayedColumns: string[] = ['name', 'status', 'details'];
  dataSource: MatTableDataSource<ProductsReport>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    // Get products from service by file_name
    let file_name = 'products.json';
    this.productsService.getDataExternalProducts(file_name).subscribe(data => {
      // Assign data returned
      this.products = data;
      // Mat table configuration
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  /** Filter table elements by value */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
