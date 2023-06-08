class ProductsController < ApplicationController
  before_action :set_product, only: %i[ show update destroy ]

  require 'json'

  # GET /products
  def index
    @products = Product.all

    render json: @products
  end

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = Product.create!(product_params)
    params[:images].each do |t|
      result = Cloudinary::Uploader.upload(t)
      if result
        @product.images.create(url: result["url"])
      end
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.permit(:title)
    end
end
