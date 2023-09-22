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
