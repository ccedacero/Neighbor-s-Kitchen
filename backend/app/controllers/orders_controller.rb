class OrdersController < ApplicationController
def index 
    orders = Order.all;
    render json: orders; 
end

  # GET /kitchen/1
  def  show
    order = set_order
    render json: order
end

# POST /kitchen
def create
    order = Order.create(order_params)
    if order.save
    render json: order
    else
    render json: order.errors, status: :unprocessable_entity
    end
end

# PATCH/PUT /kitchen/1
def update
    if order.update(order_params)
    order json: order
    else
    order json: order.errors, status: :unprocessable_entity
    end
end

# DELETE /kitchen/1
def  destroy
    order.destroy
end

private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
    order = Order.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def order_params
    params.require(:order).permit(:date, :total_price, :user_id, :kitchen_id)
    end

end
