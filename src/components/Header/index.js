import './index.css'
const Header = props => {
  const {cartItems} = props
  const getCartItemsCount = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const renderCartIcon = () => (
    <div className="cart-icon-container">
      <div className="cart-count-badge d-flex justify-content-center align-items-center">
        <p className="cart-count">{getCartItemsCount()}</p>
      </div>
    </div>
  )
  return (
    <header className="nav-bar">
      <div className="cont">
        <h1 className="logo-heading">UNI Resto Cafe</h1>
        <div className="d-flex flex-row align-items-center ms-auto">
          <p className="mt-0 mb-0 me-2 d-none d-sm-block my-orders-text">
            My Orders
          </p>
         
        </div>
        <p>{renderCartIcon()}</p>
      </div>
    </header>
  )
}

export default Header
