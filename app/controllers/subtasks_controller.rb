class SubtasksController < ApplicationController
        before_action :set_task, only: [:show, :update, :destroy]

    def index
        render json: Task.all
    end

    def show 
        render json: @task
    end
    
    def create
        render json: Task.create!(task_params), status: :created 
    end

    def update
        render json: @task.update!(task_params), status: :accepted
    end
    
    def destroy
        @task.destroy 
        head :no_content
    end
    
    private

    def set_task
        @task = Task.find(params[:id])
    end

    def task_params
        params.permit(:title, :notes, :categories, :tags, :priority, :end_time, :file)
    end
end
