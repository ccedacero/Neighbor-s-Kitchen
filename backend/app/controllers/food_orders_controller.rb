class FoodOrdersController < ApplicationController
     # GET /kitchen
     def index 
        foodorders = FoodOrder.all;
        render json: foodorders; 
    end

    # GET /kitchen/1
    def  show
        foodorders = set_foodorders
        render json: foodorders
    end

    # POST /kitchen
    def create
        foodorders = FoodOrder.create(foodorders_params)
        # if kitchen.save
        render json: foodorders
        # else
        # render json: kitchen.errors, status: :unprocessable_entity
        # end
    end

    # PATCH/PUT /kitchen/1
    def update
        FoodOrder.update(foodorders_params)
        render json: foodorders
    end

    # DELETE /kitchen/1
    def  destroy
        kitchen.destroy
    end

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_foodorders
        foodorder = FoodOrder.find(params[:id])
        end

        # Only allow a trusted parameter "white list" through.
        def foodorders_params
        params.require(:food_order).permit(:food_id,:order_id)
        end
end
