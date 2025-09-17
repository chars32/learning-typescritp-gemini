/**
 * Define los tipos de filtro posibles para una mejor legibilidad del código.
 * Al exportar el enum, podemos acceder a sus valores desde otros módulos.
 */
export var FilterType;
(function (FilterType) {
    FilterType[FilterType["All"] = 0] = "All";
    FilterType[FilterType["Completed"] = 1] = "Completed";
    FilterType[FilterType["Pending"] = 2] = "Pending";
})(FilterType || (FilterType = {}));
//# sourceMappingURL=models.js.map