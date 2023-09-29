# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string           not null
#  last_name       :string           not null
#
class User < ApplicationRecord
    has_secure_password

    validates :email, 
        uniqueness: true, 
        length: { in: 6..255 }, 
        format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :session_token, presence: true, uniqueness: true
    validates :password, length: { in: 6..255 }, allow_nil: true
    validates :first_name, :last_name, presence: true
    
    before_validation :ensure_session_token

    has_many :reviews, foreign_key: :author_id, dependent: :destroy, inverse_of: :author

    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        # has_secure_password gives us the authenticate method
        if user&.authenticate(password) 
            return user
        else
            nil 
        end
    end

    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end

    def reset_session_token!
        self.session_token = generate_unique_session_token
        save!
        session_token
    end

    private

    def generate_unique_session_token
        while true
            token = SecureRandom.urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end

end
