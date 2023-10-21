class LikesController < ApplicationController
  before_action :set_trail

  def create
    @like = @trail.likes.new(user: current_user)
    if @like.save
      # Redirect or render as necessary
      redirect_to @trail, notice: 'Trail liked successfully!'
    else
      # Handle error
      redirect_to @trail, alert: 'Error liking trail!'
    end
  end

  def destroy
    @like = @trail.likes.find_by(user: current_user)
    if @like.destroy
      # Redirect or render as necessary
      redirect_to @trail, notice: 'Trail unliked successfully!'
    else
      # Handle error
      redirect_to @trail, alert: 'Error unliking trail!'
    end
  end

  private

  def set_trail
    @trail = Trail.find(params[:trail_id])
  end
end
