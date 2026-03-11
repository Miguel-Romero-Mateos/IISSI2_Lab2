import RestaurantController from '../controllers/RestaurantController.js'

const loadFileRoutes = function (app) {

  app.route('/restaurants')
    .get(RestaurantController.index) //Read all restaurants
    .post(RestaurantController.create) //Create a new restaurant

  app.route('/restaurants/:id')
    .get(RestaurantController.show) //Read a restaurant by id
    .put(RestaurantController.update) //Update a restaurant by id
    .delete(RestaurantController.destroy) //Delete a restaurant by id

}
export default loadFileRoutes
