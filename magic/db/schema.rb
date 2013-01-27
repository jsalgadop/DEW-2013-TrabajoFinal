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

ActiveRecord::Schema.define(:version => 20130127181051) do

  create_table "comments", :force => true do |t|
    t.integer  "tournament_id"
    t.integer  "user_id"
    t.text     "comentario"
    t.integer  "calificacion"
    t.text     "replica"
    t.string   "calificador"
    t.text     "duplica"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "comments", ["tournament_id"], :name => "index_comments_on_tournament_id"
  add_index "comments", ["user_id"], :name => "index_comments_on_user_id"

  create_table "locals", :force => true do |t|
    t.string   "nombre"
    t.string   "direccion"
    t.string   "distrito"
    t.text     "dirmaps"
    t.string   "telefono"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "members", :force => true do |t|
    t.integer  "tournament_id"
    t.integer  "user_id"
    t.boolean  "ganador"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "members", ["tournament_id"], :name => "index_members_on_tournament_id"
  add_index "members", ["user_id"], :name => "index_members_on_user_id"

  create_table "tournaments", :force => true do |t|
    t.string   "nombre"
    t.integer  "cantparti"
    t.integer  "local_id"
    t.datetime "fechahora"
    t.string   "estado"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "tournaments", ["local_id"], :name => "index_tournaments_on_local_id"

  create_table "users", :force => true do |t|
    t.string   "nombre"
    t.string   "paterno"
    t.string   "materno"
    t.string   "sexo"
    t.string   "tipodocumento"
    t.string   "numerodocumento"
    t.string   "direccion"
    t.string   "distrito"
    t.string   "email"
    t.date     "fechanacimiento"
    t.string   "celular"
    t.string   "nombreusuario"
    t.string   "claveusuario"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

end
