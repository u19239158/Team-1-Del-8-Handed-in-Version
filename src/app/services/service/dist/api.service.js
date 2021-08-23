"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
        this.server = "https://localhost:44393/api/";
        this.httpOptions = {
            headers: new http_1.HttpHeaders({
                ContentType: 'application/json'
            })
        };
    }
    //home page(ProductCategory) SEARCH id endpoint route = GetPCByID/{productcategoryid}
    //home page(ProductCategory) SEARCH description endpoint route = GetPCByDescription/{ProductCategoryDescription}
    //home page(ProductCategory) endpoint route = GetProdCat
    ApiService.prototype.getProductCategory = function () {
        return this.http.get(this.server + "GetProdCat")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //products page(CategoryType) SEARCH description endpoint route = GetCategoryTypeByProdDesc/{productcategorydescription} OR GetCategoryTypeByDescription/{categorytypedescription}
    //products page(CategoryType) SEARCH ID endpoint route = GetCategoryTypeByID/{categorytypeid}
    //products page(CategoryType) endpoint route = CategoryType/GetCategoryType
    ApiService.prototype.getCategoryType = function () {
        return this.http.get(this.server + "CategoryType/GetCategoryType")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //product details modal(CategoryType, productItem) SEARCH id endpoint route = GetPItemsByID/{productitemid}
    //product details modal(CategoryType, productItem) SEARCH ProductItemname endpoint route = GetPItemsByName/{ProductItemname} 
    //product details modal(CategoryType, productItem) SEARCH CategoryTypeName endpoint route = GetPItemsByCatType/{CategoryTypeName}
    //product details modal(CategoryType, productItem) endpoint route = GetProductItems
    ApiService.prototype.getProductItem = function () {
        return this.http.get(this.server + "GetProductItems")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    //dummy data
    ApiService.prototype.getProduct = function () {
        return this.http.get("https://fakestoreapi.com/products")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
    ApiService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ApiService);
    return ApiService;
}());
exports.ApiService = ApiService;
