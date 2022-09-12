class UsersMailer < ApplicationMailer
    
    def welcome
        @user = params[:user]
        mail to: @user.email, subject: 'Welcome to GetItDone!'
    end

end
