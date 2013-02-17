class User < ActiveRecord::Base
  belongs_to :district
  has_many :members
  has_many :comments

    validates :name, :presence => true
    validates :paterno, :presence => true
    validates :materno, :presence => true
    validates :sexo, :presence => true
    validates :tipodocumento, :presence => true
    validates :numerodocumento, :presence => true
    validates :direccion, :presence => true
    validates :district_id, :presence => true    
    validates :fechanacimiento, :presence => true
    validates :email, :presence => true
    validates :celular, :presence => true
    validates :nombreusuario, :presence => true
    validates :claveusuario, :presence => true
    
	validates :numerodocumento, :uniqueness => true
	validates :email, :uniqueness => true


end
