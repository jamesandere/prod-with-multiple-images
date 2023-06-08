class AddImagesProductsAssociation < ActiveRecord::Migration[7.0]
  def change
    create_table :image_products do |t|
      t.belongs_to :image, index: true
      t.belongs_to :product, index: true
    end
  end
end
