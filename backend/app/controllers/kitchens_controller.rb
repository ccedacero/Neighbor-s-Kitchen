class KitchensController < ApplicationController
    
    # GET /kitchens
    def index 
        kitchens = Kitchen.all;
        render json: kitchens; 
    end

    # GET /kitchens/1
    def  show
        kitchen = set_kitchen
        render json: kitchen
    end

    # POST /kitchens
    def create
        kitchen = Kitchen.new(kitchen_params)

        if kitchen.save
        render json: kitchen, status: :created, location: kitchen
        else
        render json: kitchen.errors, status: :unprocessable_entity
        end
    end

    # PATCH/PUT /kitchens/1
    def update
        if kitchen.update(kitchen_params)
        render json: kitchen
        else
        render json: kitchen.errors, status: :unprocessable_entity
        end
    end

    # DELETE /kitchens/1
    def  destroy
        kitchen.destroy
    end

    private
        # Use callbacks to share common setup or constraints between actions.
        def set_kitchen
        kitchen = Kitchen.find(params[:id])
        end

        # Only allow a trusted parameter "white list" through.
        def kitchen_params
        params.require(:kitchen).permit(:username, :description, :location, :food_type,
                                        menu_attributes: [:id, :date, :kitchen_id,
                                        foods_attributes: %i[id name description price img_src availability menu_id _destroy]])
        end
end
