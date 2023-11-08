class Api::TrailsController < ApplicationController
    wrap_parameters include: Trail.attribute_names + ['parkName']
    def index
        @trails = Trail.all
        render 'api/trails/index'

    end

    def show
        @trail = Trail.find(params[:id])
        render 'api/trails/show'
    end

    def update
        @trail = Trail.find(params[:id])
        if @trail.update(trail_params)
        render 'api/trails/show'
        else
        render json: @trail.errors, status: :unprocessable_entity
        end
    end

    def create
        @trail = current_user.trails.new(trail_params)
        if @trail.save
            render 'api/trails/show', status: :created, location: api_trail_url(@trail)
        else
            render json: @trail.errors, status: :unprocessable_entity
        end
    end


    def destroy
        @trail = Trail.find(params[:id])
        if @trail.owner_id == current_user.id
            @trail.destroy
            head :no_content
        else
            render json: { error: 'Not authorized' }, status: :unauthorized
        end
    end

    def search
        query = params[:query]
        #ILIKE is find the sentence has that query
        @trails = Trail.where('trail_name ILIKE ?',"%#{query}%")

        render :search
    end

    private
    def set_trail
      @trail = Trail.find(params[:id])
    end

    def trail_params
      params.require(:trail).permit(
        :trail_name,
        :description,
        :lat,
        :lng,
        :difficulty,
        :start_lat,
        :start_lng,
        :end_lat,
        :end_lng,
        :park_name,
        :picture
      )
    end


end
