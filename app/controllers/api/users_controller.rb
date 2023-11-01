class Api::UsersController < ApplicationController
    wrap_parameters include: User.attribute_names + ['password','firstName','lastName'] 

    before_action :require_logged_out, only: [:create]

    
    
    def create
        @user = User.new(user_params)

        if @user.save
            login(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end


    def liked_trails
        user = User.find(params[:id])
        liked_trails = user.liked_trails # Assuming you have an association set up
        render json: { likedTrails: liked_trails }
    end

    


    private

    def user_params
        params.require(:user).permit(:email, :password,:first_name,:last_name)
    end
end
