const sequelize = require('../db')
const {DataType, DataTypes} = require('sequelize')

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	email: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
    role: {type: DataTypes.STRING, defaultValue: "USER"},
	created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
	updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
})

const Cart = sequelize.define(
	'user_cart',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	}
)

const CartProduct = sequelize.define(
	'cart_product',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	}
)

const Product = sequelize.define(
	'product',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, unique: true, allowNull: false },
		price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
		rating: { type: DataTypes.DECIMAL(3, 2), defaultValue: 0 },
		image_url: { type: DataTypes.STRING, allowNull: false },
	}
)

const Brand = sequelize.define(
	'brand',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		name: { type: DataTypes.STRING, unique: true, allowNull: false },
	}
)

const Type = sequelize.define('type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Rating = sequelize.define(
	'rating',
	{
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		rating: { type: DataTypes.DECIMAL(3, 2), allowNull: false },
	}
)

const ProductDetails = sequelize.define('product_detail', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	title: { type: DataTypes.STRING, allowNull: false },
	description: { type: DataTypes.STRING, allowNull: false },
	productId: { type: DataTypes.INTEGER, allowNull: false },
})

const TypeBrand = sequelize.define('type_brand', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Cart)
Cart.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Cart.hasMany(CartProduct)
CartProduct.belongsTo(Cart)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(Rating)
Rating.belongsTo(Product)

Product.hasMany(CartProduct)
CartProduct.belongsTo(Product)

Product.hasMany(ProductDetails, {as: 'info'})
ProductDetails.belongsTo(Product)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, { through: TypeBrand })

module.exports = {
	User,
	Cart,
	CartProduct,
	Product,
	ProductDetails,
	Brand,
	Type,
	Rating,
    TypeBrand,
}