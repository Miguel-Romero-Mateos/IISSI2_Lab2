import { Restaurant, Product, RestaurantCategory, ProductCategory } from '../models/models.js'

//Create method to read all restaurants:
const index = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

// TODO: Complete the following functions

//Create method to create a new restaurant:
const create = async function (req, res) {
  const newRestaurant = Restaurant.build(req.body)
  newRestaurant.userId = 1
  try{
    const restaurant = await newRestaurant.save()
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

//Create method to read a restaurant by id:
const show = async function (req, res) {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id, {
      attributes: { exclude: ['userId'] },
      include: [{
        model: Product,
        as: 'products',
        include: {model: ProductCategory, as: 'productCategory'}
      },
    {
      model: RestaurantCategory,
      as: 'restaurantCategory'
    }],
    order: [[{model:Product, as: 'products'}, 'order', 'ASC']],
    })
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const update = async function (req, res) {
  const restaurant = await Restaurant.findByPk(req.params.id)
  try {
    const updatedRestaurant = await restaurant.update(req.body)
    res.json(updatedRestaurant)
  } catch (err){
    res.status(500).send(err)
  }
}

const destroy = async function (req, res) {
  const restaurant = await Restaurant.findByPk(req.params.id)
  try {
    await restaurant.destroy()
    res.json("Restaurant deleted successfully")
  } catch (err) {
    res.status(500).send(err)
  }
}

const RestaurantController = {
  index,
  create,
  show,
  update,
  destroy
}
export default RestaurantController
