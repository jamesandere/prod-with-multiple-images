class PhotosController < ApplicationController
    def create
        result = Cloudinary::Uploader.upload(params[:image])
        render json: result
    end

    private
    def photos_params
        params.permit(:image)
    end
end
