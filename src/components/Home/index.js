import {useState, useEffect} from 'react'
import Header from '../Header'
import DishItem from '../DishItem'
import './index.css'
const Home = () => {
  const [isLoading, setLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setCategoryId] = useState('')
  const [cartItems, setCartItems] = useState([])
  const addItemToCart = dish => {
    const isAlready = cartItems.find(each => each.dishId === dish.dishId)
    if (!isAlready) {
      const newDish = {...dish, quantity: 1}
      setCartItems(prev => [...prev, newDish])
    } else {
      setCartItems(prev =>
        prev.map(each =>
          each.dishId === dish.dishId
            ? {...each, quantity: each.quantity + 1}
            : each,
        ),
      )
    }
  }
  const removeItemFromCart = dish => {
    const isAlready = cartItems.find(each => each.dishId === dish.dishId)
    if (isAlready) {
      setCartItems(prev =>
        prev
          .map(each =>
            each.dishId === dish.dishId
              ? {...each, quantity: each.quantity - 1}
              : each,
          )
          .filter(each => each.quantity > 0),
      )
    }
  }

  const getUpdatedata = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(each => ({
        dishId: each.dish_id,
        dishName: each.dish_name,
        dishType: each.dish_Type,
        dishPrice: each.dish_price,
        dishCurrency: each.dish_currency,
        dishDescription: each.dish_description,
        dishImage: each.dish_image,
        dishColories: each.dish_calories,
        addOnCat: each.addonCat,
        dishAvailability: each.dish_Availability,
      })),
    }))

  const fetchRestarentApi = async () => {
    const api =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(api)
    const data = await response.json()
    const updateData = getUpdatedata(data[0].table_menu_list)
    setResponse(updateData)
    setCategoryId(updateData[0].menuCategoryId)
    setLoading(false)
  }

  useEffect(() => {
    fetchRestarentApi()
  }, [])

  const onUpdateCategoryId = menuCategoryId => setCategoryId(menuCategoryId)

  const renderTabMenuList = () =>
    response.map(each => {
      const onClickHandler = () => onUpdateCategoryId(each.menuCategoryId)
      return (
        <li
          className={`each-tab-item ${
            each.menuCategoryId === activeCategoryId ? 'active-tab-item' : ''
          }`}
          key={each.menuCategoryId}
          onClick={onClickHandler}
        >
          <button type="button" className="tab-category-button">
            {each.menuCategory}
          </button>
        </li>
      )
    })
  const renderDishes = () => {
    const {categoryDishes} = response.find(
      each => each.menuCategoryId === activeCategoryId,
    )
    return (
      <ul className="dishes-list-container">
        {categoryDishes.map(each => (
          <DishItem
            key={each.dishId}
            dishDetails={each}
            cartItems={cartItems}
            addItemToCart={addItemToCart}
            removeItemFromCart={removeItemFromCart}
          />
        ))}
      </ul>
    )
  }
  const rendrSpinner = () => (
    <div className="spinner-container">
      <div className="spinner-border" role="status" />
    </div>
  )
  return isLoading ? (
    rendrSpinner()
  ) : (
    <div>
      <Header cartItems={cartItems} />
      <ul className="m-0 ps-0 d-flex tab-container">{renderTabMenuList()}</ul>
      {renderDishes()}
    </div>
  )
}
export default Home
