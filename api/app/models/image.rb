class Image < ApplicationRecord
    has_many :image_products
    has_many :products, :through => :image_products
end
