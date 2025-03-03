import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Cart from './pages/Cart'
import ProductPage from './pages/ProductPage'
import Shop from './pages/Shop'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Profile from './pages/Profile'
import {
	ADMIN_ROUTE,
	PRODUCT_ROUTE,
	REGISTRATION_ROUTE,
	CART_ROUTE,
	SHOP_ROUTE,
	LOGIN_ROUTE,
	PROFILE_ROUTE,
} from './utils/consts'

export const authRoutes = [
	{
		path: ADMIN_ROUTE,
		Component: Admin,
	},
	{
		path: CART_ROUTE,
		Component: Cart,
	},
]

export const publicRoutes = [
	{
		path: SHOP_ROUTE,
		Component: Shop,
	},
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: REGISTRATION_ROUTE,
		Component: Auth,
	},
	{
		path: PRODUCT_ROUTE + '/:id',
		Component: ProductPage,
	},
	{
		path: '/privacy-policy',
		Component: PrivacyPolicy,
	},
	{
		path: PROFILE_ROUTE,
		Component: Profile,
	},
]
