import { makeAutoObservable } from 'mobx'

export default class ProductStore {
	constructor() {
		this._types = []
		this._brands = []
		this._products = []
		this._selectedType = {}
		this._selectedBrand = {}
		this._page = 1
		this._totalCount = 0
		this._limit = 3
		makeAutoObservable(this)
	}

	setTypes(types) {
		this._types = types
	}
	setSelectedType(type) {
		this.setPage(1)
		this._selectedType = type
	}
	setBrands(brands) {
		this._brands = brands
	}
	setSelectedBrand(brand) {
		this.setPage(1)
		this._selectedBrand = brand
	}
	setProducts(products) {
		this._products = products
	}
	setPage(page) {
		this._page = page
	}
	setTotalCount(count) {
		this._totalCount = count
	}

	get types() {
		return this._types
	}

	get selectedType() {
		return this._selectedType
	}

	get brands() {
		return this._brands
	}

	get selectedBrand() {
		return this._selectedBrand
	}

	get products() {
		return this._products
	}
	get totalCount() {
		return this._totalCount
	}
	get page() {
		return this._page
	}
	get limit() {
		return this._limit
	}
}
