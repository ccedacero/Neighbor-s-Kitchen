class KitchensController < ApplicationController
    def index 
        kitchen = Kitchen.all;
        render json: kitchen; 
    end
    
end
