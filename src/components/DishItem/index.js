import './index.css'
const DishItem = props => {
  const {dishDetails, cartItems, addItemToCart, removeItemFromCart} = props
  const {
    dishId,
    dishName,
    dishType,
    dishPrice,
    dishCurrency,
    dishDescription,
    dishImage,
    dishColories,
    addOnCat,
    dishAvailability,
  } = dishDetails
  const onIncreaseQuantity = () => addItemToCart(dishDetails)

  const onDecreaseQuantity = () => removeItemFromCart(dishDetails)

  const getQuantity = () => {
    const cartItem = cartItems.find(item => item.dishId === dishId)
    return cartItem ? cartItem.quantity : 0
  }
  const renderControllerButton = () => (
    <div className="controller-container">
      <button className="button" type="button" onClick={onDecreaseQuantity}>
        -
      </button>
      <p>{getQuantity()}</p>
      <button className="button" type="button" onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  )

  return (
    <li className="mb-3 p-3 dish-item-container d-flex">
      <div className={`${dishType === 1 ? 'non-veg-border' : 'veg-border'}`}>
        <div className={`${dishType === 1 ? 'non-veg-round' : 'veg-round'} `} />
      </div>
      <div className="dish-details-container">
        <h1 className="dish-name">{dishName}</h1>
        <p className="dish-currency-price">
          {dishCurrency} {dishPrice}
        </p>
        <p className="dish-description">{dishDescription}</p>
        {dishAvailability && renderControllerButton()}
        {!dishAvailability && (
          <p className="not-availability-text text-danger">Not available</p>
        )}
        {addOnCat.length !== 0 && (
          <p className="addon-avaialability-text">Customizations available</p>
        )}
      </div>
      <p className="dish-colories text-warning">{dishColories} calories</p>
      <img className="dish-image" src={dishImage} alt={dishName} />
    </li>
  )
}
export default DishItem
