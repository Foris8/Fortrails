class Api::TrailsController < ApplicationController

    def index
        @trails = Trail.all
        render 'api/trails/index'

    end

    def show
        @trail = Trail.find(params[:id])
        render 'api/trails/show'
    end

    def create
    end

    def search
        query = params[:query]
        #ILIKE is find the sentence has that query
        @trails = Trail.where('trail_name ILIKE ?',"%#{query}%")

        render :search
    end

    private
    def trail_params
        params.require(:trail).permit(
            :trail_name,
            :description,
            :lat,
            :lng
        )
    end


end
