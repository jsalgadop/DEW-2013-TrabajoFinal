# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130216000334) do

  create_table "comments", :force => true do |t|
    t.text     "comentario"
    t.integer  "calificacion"
    t.integer  "tournament_id"
    t.integer  "user_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "comments", ["tournament_id"], :name => "index_comments_on_tournament_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "districts", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "filters", :force => true do |t|
    t.integer  "opcion"
    t.integer  "local_id"
    t.string   "estado"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "filters", ["local_id"], :name => "index_filters_on_local_id"

  create_table "locals", :force => true do |t|
    t.string   "name"
    t.string   "address"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "telefono"
    t.integer  "district_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  add_index "locals", ["district_id"], :name => "index_locals_on_district_id"

  create_table "logins", :force => true do |t|
    t.string   "nombre"
    t.string   "clave"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "members", :force => true do |t|
    t.string   "ganador"
    t.integer  "tournament_id"
    t.integer  "user_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "members", ["tournament_id"], :name => "index_members_on_tournament_id"
  add_index "members", ["user_id"], :name => "index_members_on_user_id"

  create_table "options", :force => true do |t|
    t.string   "opcion"
    t.integer  "local_id"
    t.string   "estado"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "options", ["local_id"], :name => "index_options_on_local_id"

  create_table "tournaments", :force => true do |t|
    t.string   "name"
    t.integer  "cant_part"
    t.datetime "fecha_hora"
    t.string   "estado"
    t.integer  "local_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "cantregis"
  end

  add_index "tournaments", ["local_id"], :name => "index_tournaments_on_local_id"

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "paterno"
    t.string   "materno"
    t.string   "sexo"
    t.string   "tipodocumento"
    t.string   "numerodocumento"
    t.string   "direccion"
    t.string   "email"
    t.date     "fechanacimiento"
    t.string   "celular"
    t.string   "nombreusuario"
    t.string   "claveusuario"
    t.integer  "district_id"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  add_index "users", ["district_id"], :name => "index_users_on_district_id"

end
