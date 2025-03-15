# TableMart


## Description
E-commerce store to sell tables.


### User Stories
----------------
- User
    1. Login
    1. Register
    1. View all products
    1. View one product (description)
    1. Purhase/Add to cart
    1. Checkout
    1. View order history
    1. Add to wishlist

- Admin
    1. Add product
    1. Update product
    1. Delete product
    1. View all orders

### Models
-----------
- User (id,email,password, name, address, phone, user_type)
- Product (id, name, description, price, imageUrl, stock)
- Order (id, user_id, product_id, quantity, total)
- Wishlist (id, user_id, product_id)

### Components
- Authentication
    - Login
    - Register

- Product
    - Home (View all products) 
    - View product (description)

- Wishlist
    - Add to wishlist
    - View wishlist

- Orders
    - Checkout
    - View order history

- Admin panel
    - Add product
    - Update product
    - Delete product
    - View all orders# tablemart
