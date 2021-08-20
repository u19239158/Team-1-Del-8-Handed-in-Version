"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(api, cartService) {
        this.api = api;
        this.cartService = cartService;
        this.categoryTypes = [];
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.getCategoryType()
            .subscribe(function (res) {
            _this.categoryTypes = res;
            console.log(_this.categoryTypes);
            // this.categoryType.forEach((a:any) => {
            //   Object.assign(a,{quantity:1,total:a.price});
            // });
        });
        this.cartService.getModalProduct()
            .subscribe(function (res) {
            _this.products = res;
        });
    };
    HomeComponent = __decorate([
        core_1.Injectable(),
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
