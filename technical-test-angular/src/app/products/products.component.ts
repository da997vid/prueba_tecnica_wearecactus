import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ProductsService } from './services/products.service';
import { ProductsReport } from './models/productsReport';
import { DialogNameComponent } from './dialog-name/dialog-name.component';

import { AuthService } from '../auth.service';

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
  displayedColumns: string[] = ['name', 'status', 'details'];
  dataSource: MatTableDataSource<ProductsReport>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('sidenav') public sidenav: MatSidenav;

  constructor(private productsService: ProductsService,
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef, 
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
  openDetailsProduct(index: number) {
    // Assign values to detail product object
    this.showSidenav = true;
    this.productDetailData = this.products[index];
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
      data: { user_name: this.user_name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.authService.saveNameUser(result);
        this.user_name = result;
      }
    });
  }
}
