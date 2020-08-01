# Neighbor-s-Kitchen

A frontend demo app that connects NYC cooks and chefs with food enthusiasts , allowing cooks to increase their local presence  
while giving food enthusiasts the opportunity to experience new and unique foods from home. 

![The landing page for Neighbor's Kitchen](https://i.imgur.com/MwODixc.png )
 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="https://i.imgur.com/Es8gs8S.png" alt="neighbor's kitchen menu" width="450" height="300"/>  <img src="https://i.imgur.com/yVgHeUH.png" alt="neighbor's kitchen menu" width="450" height="300"/>

### Features

- User based location using geolocation API and Google's geocoding API (api key has been included for security purposes) 
- Users are able to filter their desired food types and narrow them down to their zipcode 
- Users are able to browse a menu with a brief description of each meal
- Users are able to add desired quantity of chosen meals to their food cart

## Getting Started
If you'd like to test this version of the app on your local system you can do so by following the steps below: 
1. Navigate to your desired directory and ```git clone``` the repo url
2. Open the backend folder and run ```bundle install```  
3. Start the service with ```rails s```
4. Navigate to the frontend folder and type ```open index.html```
5. The app will open in a new Chrome window and you should now be able to test out it's features. 

## Built With

* [Faker](https://github.com/faker-ruby/faker) - The faker gem was used for seeding data.
* [BootStrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/) - Bootstrap and custom CSS were used for styling.
* [Ruby on Rails](https://rubyonrails.org/) - The Ruby on Rails framework was used for handling our back-end logic.
* [PostgreSQL](https://www.postgresql.org/) - PostgresSQL was used for  storing all app data.
* [ActiveModelSerializers](https://github.com/rails-api/active_model_serializers) - ActiveModelSerializers were used for organizing backend API responses.

## Authors

* **Hyojin** - [Hyojin](https://github.com/jinnic)
* **Cristian** - [Cristian](https://github.com/ccedacero)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
