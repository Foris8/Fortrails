class Api::ParksController < ApplicationController
    wrap_parameters include: Park.attribute_names + ["photo",'parkName']

    def index
        @parks = Park.all
    end

    def show
        @park = Park.find(params[:id])
    end

    

end
