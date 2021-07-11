import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';

import { ProductsService } from './services/products.service';
import { ProductsReport } from './models/productsReport';
import { DialogNameComponent } from './dialog-name/dialog-name.component';
import { AuthService } from '../auth.service';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  user_name: any;
  productDetailData: any;
  showSidenav: boolean = false;
  displayedColumns: string[] = ['name', 'status'];
  columnsArray: string[];
  dataSource: MatTableDataSource<ProductsReport>;
  columnsTable = new FormControl();

  status: Status[] = [
    { value: 'active', viewValue: 'Active' },
    { value: 'inactive', viewValue: 'Inactive' }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private productsService: ProductsService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // Get User name
    this.user_name = this.authService.getuser();
    // Get products from service by file_name
    let file_name = 'products.json';
    this.productsService.getDataExternalProducts(file_name).subscribe(data => {
      // Assign data returned
      this.products = data;
      // Mat table configuration
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // Get headers array to show on columns
      this.columnsArray = Object.keys(this.products[0]);
      this.columnsTable.setValue(this.displayedColumns); // Set mat-select value like headers given
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

  /** Open Sidenav and show details products */
  openDetailsProduct(row: any) {
    // Assign values to detail product object
    this.showSidenav = true;
    this.productDetailData = this.products[row.id - 1];
    this.sidenav.toggle();
  }

  /** Logout user */
  logout() {
    this.authService.logout().then(() => this.router.navigate(['/']))
  }

  /** Open dialog change name */
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogNameComponent, {
      width: '250px',
      data: { user_name: this.user_name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.saveNameUser(result);
        this.user_name = result;
      }
    });
  }

  /** Hide column table (we can't hide detail column because we must see the details product when clicked) */
  hideColumn(colIndex: any) {
    // Check that table has at least one column
    if (this.displayedColumns.length > 0)
      this.displayedColumns.splice(colIndex, 1);
      this.columnsTable.setValue(this.displayedColumns); // Update the mat-select value too
  }

  /** Select which columns we want to show
   * We get an array which has just the columns that we want to show
   * and then we compare to the header columns array.
   */
  updateColumnsShow() {
    // Check that table has at least one column
    if (this.columnsTable.value.length > 0)
      this.displayedColumns = this.columnsTable.value;
  }
}
