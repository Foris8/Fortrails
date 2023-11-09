class Api::ReviewsController < ApplicationController
    before_action :require_logged_in
    wrap_parameters include: Review.attribute_names + [:trailId,:authorId]

    def create
        # Check if the current user has already reviewed this trail
        existing_review = current_user.reviews.find_by(trail_id: review_params[:trail_id])

        if existing_review
            render json: { errors: ["You have already left a review for this trail."] }, status: :unprocessable_entity
        else
            @review = current_user.reviews.build(review_params)

            if @review.save
            render :show, status: :created
            else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
            end
        end
    end

    def destroy
        @review = current_user.reviews.find(params[:id])
        unless @review
        render json: { message: 'Unauthorized' }, status: :unauthorized
        return
        end
        @review.destroy
        render :show
    end

    def update
        @review = current_user.reviews.find_by(id: params[:id])

        unless @review
            render json: { message: 'Review not found or not authorized to update this review' }, status: :not_found
            return
        end

        if @review.update(review_params)
            render :show
        else
            render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def review_params
        params.require(:review).permit(:rating, :body, :trail_id, :author_id)
    end
end
