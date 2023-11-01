class Api::LikesController < ApplicationController
   

    def create
        @like = Like.new(like_params)
        if @like.save
        render json: { status: 'success', message: 'Trail was successfully liked.' }
        else
        render json: { status: 'error', message: @like.errors.full_messages.join(", ") }, status: :unprocessable_entity
        end
    end

    def destroy
        @like = Like.find_by(user_id: params[:user_id], trail_id: params[:trail_id])
        if @like&.destroy
        render json: { status: 'success', message: 'Trail was successfully unliked.' }
        else
        render json: { status: 'error', message: 'Error unliking the trail.' }, status: :unprocessable_entity
        end
    end

    private

    def like_params
        params.require(:like).permit(:user_id, :trail_id)
    end
end
