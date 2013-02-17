class OptionsController < ApplicationController
  def register_tournament
    @tournament = Tournament.find(params[:id])

    @member = Member.new
    @member.tournament_id = @tournament.id
    @member.user_id = User.find_by_nombreusuario($user.nombre).id

    if !Member.find_by_tournament_id_and_user_id(@tournament.id, User.find_by_nombreusuario($user.nombre).id)
      if @tournament.cantregis + 1 > @tournament.cant_part
        @tournament_message = "The tournament is complete."
      else
        @tournament.cantregis += 1
        @tournament.save

        @member.save

        @tournament_message = "The member was registered successfully."
      end
    else
        @tournament_message = "The member already is registered in this tournament."
    end
  end

  def filter_by_local
    @option = Option.new(params[:option])

    @tournaments = Tournament.where(:local_id => @option.local_id)
   end

  def filter_by_status
    @option = Option.new(params[:option])

    @tournaments = Tournament.where(:estado => @option.estado)
  end

  def filter_by_capacity
    @tournaments = Tournament.where("cantregis != cant_part")
  end

  # GET /options
  # GET /options.json
  def index
    @options = Option.all
    $option = Option.new
 @tournaments = Tournament.all
  @tournament = Tournament.new(params[:tournament])
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @options }
       format.json { render json: @tournaments }
    end
 
    
  end

  # GET /options/1
  # GET /options/1.json
  def show
    @option = Option.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @option }
    end
  end

  # GET /options/new
  # GET /options/new.json
  def new
    @option = Option.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @option }
    end
  end

  # GET /options/1/edit
  def edit
    @option = Option.find(params[:id])
  end

  # POST /options
  # POST /options.json
  def create
    @option = Option.new(params[:option])

    respond_to do |format|
      if @option.save
        format.html { redirect_to @option, notice: 'Option was successfully created.' }
        format.json { render json: @option, status: :created, location: @option }
      else
        format.html { render action: "new" }
        format.json { render json: @option.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /options/1
  # PUT /options/1.json
  def update
    @option = Option.find(params[:id])

    respond_to do |format|
      if @option.update_attributes(params[:option])
        format.html { redirect_to @option, notice: 'Option was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @option.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /options/1
  # DELETE /options/1.json
  def destroy
    @option = Option.find(params[:id])
    @option.destroy

    respond_to do |format|
      format.html { redirect_to options_url }
      format.json { head :no_content }
    end
  end
end
