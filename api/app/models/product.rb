class Product < ApplicationRecord
    has_many :image_products
    has_many :images, :through => :image_products
end
