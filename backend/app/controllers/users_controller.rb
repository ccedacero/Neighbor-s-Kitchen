class UsersController < ApplicationController
# GET /User
def index 
    user = User.all;
    render json: user; 
end

# GET /User/1
def  show
    user = set_user
    render json: user
end

# POST /User
def create
    # byebug
    user = User.create(user_params);
    render json: user
    # if user.save
    # render json: user
    # else
    # render json: user.errors, status: :unprocessable_entity
    # end
end

# PATCH/PUT /kitchen/1
# def update
#     if kitchen.update(kitchen_params)
#     render json: kitchen
#     else
#     render json: kitchen.errors, status: :unprocessable_entity
#     end
# end

# DELETE /User/1
def destroy
    user.destroy()
end

private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
    user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
    params.require(:user).permit(:name, :location, :email, :phone)
    end
end


