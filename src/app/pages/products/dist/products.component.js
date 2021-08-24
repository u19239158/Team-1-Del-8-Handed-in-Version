"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsComponent = void 0;
var core_1 = require("@angular/core");
var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(api, cartService) {
        this.api = api;
        this.cartService = cartService;
        this.modalItems = [];
    }
    ProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Home page different categories of products
        this.api.getProductCategory()
            .subscribe(function (res) {
            _this.categoryTypes = res;
            console.log(_this.categoryTypes);
        });
        //product page content
        this.api.getCategoryType()
            .subscribe(function (res) {
            _this.categoryTypes = res;
            console.log(_this.categoryTypes);
        });
        //modal product type dropdown
        this.api.getProductItem()
            .subscribe(function (res) {
            _this.productList = res;
            _this.productList.forEach(function (a) {
                Object.assign(a, { quantity: 1, total: a.price });
            });
        });
        //dummy data
        this.api.getProduct()
            .subscribe(function (res) {
            _this.productList = res;
            _this.productList.forEach(function (a) {
                Object.assign(a, { quantity: 1, total: a.price });
            });
        });
        this.cartService.getModalProduct()
            .subscribe(function (res) {
            _this.products = res;
        });
    };
    //outside ng oninit
    ProductsComponent.prototype.addtocart = function (item) {
        this.cartService.addtoCart(item);
    };
    ProductsComponent.prototype.openmodal = function (productItems) {
        document.querySelector('.modal').classList.add('is-active');
        this.cartService.showItemModal(productItems);
    };
    ProductsComponent.prototype.closemodal = function (item) {
        this.modalItems = [];
        document.querySelector('.modal').classList.remove('is-active');
        this.cartService.closeItemModal(item);
    };
    ProductsComponent.prototype.Itemdropdown = function () {
        document.querySelector('.dropdown').classList.add('is-active');
    };
    ProductsComponent.prototype.ItemdropdownClose = function () {
        document.querySelector('.dropdown').classList.remove('is-active');
    };
    ProductsComponent = __decorate([
        core_1.Injectable(),
        core_1.Component({
            selector: 'app-products',
            templateUrl: './products.component.html',
            styleUrls: ['./products.component.scss']
        })
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
