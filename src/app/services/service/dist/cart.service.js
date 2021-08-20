"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var CartService = /** @class */ (function () {
    function CartService() {
        this.cartItemList = [];
        this.productList = new rxjs_1.BehaviorSubject([]);
        this.productItems = new rxjs_1.BehaviorSubject([]);
        this.modalItems = [];
    }
    CartService.prototype.getProducts = function () {
        return this.productList.asObservable();
    };
    CartService.prototype.getModalProduct = function () {
        return this.productItems.asObservable();
    };
    CartService.prototype.setProduct = function (product) {
        var _a;
        (_a = this.cartItemList).push.apply(_a, product);
        this.productList.next(product);
    };
    CartService.prototype.addtoCart = function (product) {
        this.cartItemList.push(product);
        this.productList.next(this.cartItemList);
        this.getTotalPrice();
        console.log(this.cartItemList);
    };
    CartService.prototype.showItemModal = function (product) {
        this.modalItems.push(product);
        this.productItems.next(this.modalItems);
        console.log(this.modalItems);
    };
    CartService.prototype.closeItemModal = function (product) {
        this.modalItems = [];
        console.log(this.modalItems);
    };
    CartService.prototype.getTotalPrice = function () {
        var grandTotal = 0;
        this.cartItemList.map(function (a) {
            grandTotal += a.total;
        });
        return grandTotal;
    };
    CartService.prototype.removeCartItem = function (product) {
        var _this = this;
        this.cartItemList.map(function (a, index) {
            if (product.id === a.id) {
                _this.cartItemList.splice(index, 1);
            }
        });
        this.productList.next(this.cartItemList);
    };
    CartService.prototype.removeAllCart = function () {
        this.cartItemList = [];
        this.productList.next(this.cartItemList);
    };
    CartService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;
