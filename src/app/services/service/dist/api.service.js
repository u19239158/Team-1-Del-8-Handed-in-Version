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
    ApiService.prototype.getCategoryType = function () {
        return this.http.get(this.server + "CategoryType/GetCategoryType")
            .pipe(operators_1.map(function (res) {
            return res;
        }));
    };
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
