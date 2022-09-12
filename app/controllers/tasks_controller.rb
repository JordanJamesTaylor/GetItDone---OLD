class TasksController < ApplicationController

    def index
        if params[:group_id]
            render json: Task.where(group_id: params[:group_id]).order('end_time')
        else
            render json: Task.all.order('end_time')
        end
    end

    def show 
        task = Task.find(params[:id])
        render json: task
    end
    
    def create
        render json: Task.create!(task_params), status: :created 
    end

    def update
        task = Task.find(params[:id])
        render json: task.update!(task_params), status: :accepted
    end
    
    def destroy
        task = Task.find(params[:id])
        task.destroy 
        head :no_content
    end
    
    private

    def task_params
        params.permit(:id, :title, :notes, :categories, :tags, :priority, :end_time, :elapsed, :notified, :file, :profile_id, :group_id)
    end
end
